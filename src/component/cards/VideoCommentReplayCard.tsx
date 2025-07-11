import { useEffect, useRef, useState } from 'react';
import { PiThumbsDown, PiThumbsUp } from 'react-icons/pi';
import { BsReply } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import CommentReplayBox from '../ui/CommentReplayBox';
import { timeAgo } from '../../helpers';
import { IVideoComment, IVideoCommentPublic } from '../../types/video-comment.type';
import { deleteVideoComment } from '../../services/video-commnt.service';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import CommentUpdateBox from '../ui/CommentUpdateBox';

interface IProps {
  comment: IVideoCommentPublic;
  onDeleteSuccess?: (id: string) => void | any;
  onUpdateSuccess?: (comment: IVideoComment) => void | any;
  onPostReplaySuccess?: (replay: IVideoComment) => void | any;
  isReplay?: boolean;
}
function VideoCommentReplayCard({
  comment,
  onDeleteSuccess,
  onUpdateSuccess,
  onPostReplaySuccess,
}: IProps) {
  const [isReadMore, setIsReadMore] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReplayBoxOpen, setIsReplayBoxOpen] = useState(false);
  const [isUpdateBoxOpen, setIsUpdateBoxOpen] = useState(false);
  const [isOnBottom, setIsOnBottom] = useState(false);
  const dropDownRef = useRef<HTMLUListElement>(null);
  const defaultDisplayLength = 200;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handler = () => {
      const currentDropdown = cardRef.current;
      if (!currentDropdown) return;

      const rect = currentDropdown.getBoundingClientRect();
      const dropdownBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // If dropdown bottom is going out of the viewport
      setIsOnBottom(dropdownBottom > windowHeight - 50);
    };
    document.addEventListener('scroll', handler, true); // useCapture true to catch scroll from all parents
    window.addEventListener('resize', handler); // re-check on resize too

    return () => {
      document.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [isOnBottom]);

  let content = comment.content;
  content =
    content.length > defaultDisplayLength
      ? !isReadMore
        ? content.slice(defaultDisplayLength) + '...'
        : content
      : content;

  const owner = comment.owner;

  function toggleDropdown() {
    setIsDropdownOpen(p => !p);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;

      const dropdown = dropDownRef.current;
      const card = cardRef.current;

      // Close dropdown if clicked outside
      if (dropdown && !dropdown.contains(target)) {
        setIsDropdownOpen(false);
      }

      // Close reply/update boxes if clicked outside
      if (card && !card.contains(target)) {
        setIsReplayBoxOpen(false);
        setIsUpdateBoxOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isUpdateBoxOpen, isReplayBoxOpen, isDropdownOpen]);

  async function handleDeleteComment() {
    setIsLoading(true);
    const toastId = toast.loading('Deleting comment...', { richColors: true });

    try {
      const response = await deleteVideoComment(comment.id);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message, { id: toastId, richColors: true });
      onDeleteSuccess?.(comment.id);
    } catch (err) {
      const message = (err as Error).message || DEFAULT_ERROR_MESSAGE;
      toast.error(message, { id: toastId, richColors: true });
    } finally {
      setIsLoading(false);
    }
  }

  async function handelPostReplay(replay: IVideoComment) {
    setIsReplayBoxOpen(false);
    onPostReplaySuccess && onPostReplaySuccess(replay);
  }

  function toggleUpdateBox() {
    setIsUpdateBoxOpen(p => !p);
  }

  function handelTriggerDropdownButton(name: 'delete' | 'edit' | 'pin' | 'report') {
    switch (name) {
      case 'delete':
        handleDeleteComment();
        break;
      case 'edit':
        toggleUpdateBox();
        break;
    }
    setIsDropdownOpen(false);
  }

  return (
    <div ref={cardRef} id={`video-comment-card-${comment.id}`} className="p-2 md:p-5">
      <div className="relative   w-full ">
        <div className="flex  gap-2">
          <img
            src={owner.profilePhotoUrl}
            className="rounded-full size-9 outline-primary outline-1 outline-offset-1"
          />
          <div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600 font-secondary text-[0.9rem]">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>

              <div className={`mt-2 text-sm text-gray-800  whitespace-pre-line`}>{content}</div>
              {content.length > defaultDisplayLength ? (
                <button
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="text-secondary   font-medium text-sm"
                >
                  {isReadMore ? 'Read less' : 'Read more'}
                </button>
              ) : null}
              <div className="mt-2 flex  items-center gap-3">
                <button className="flex items-center gap-0.5">
                  <span className="text-xl text-black ">
                    <PiThumbsUp />
                  </span>
                  <span className="text-sm text-gray-900">{comment.likesCount}</span>
                </button>
                <button className="flex items-center gap-0.5">
                  <span className="text-xl text-black ">
                    <PiThumbsDown />
                  </span>
                  <span className="text-sm text-gray-900">{comment.dislikesCount}</span>
                </button>
                <button
                  onClick={() => setIsReplayBoxOpen(true)}
                  className="flex items-center gap-0.5"
                >
                  <span className="text-xl text-black ">
                    <BsReply />
                  </span>
                  <span className="text-sm text-gray-900">Replay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 ">
          <button onClick={toggleDropdown} className="text-lg hover:text-primary">
            <HiOutlineDotsVertical />
          </button>

          <ul
            ref={dropDownRef}
            className={`${isDropdownOpen ? 'duration-300' : 'hidden'} absolute ${isOnBottom ? '-top-32' : 'top-8'} right-0 z-50 w-60  bg-black shadow-md text-white hover:*:cursor-pointer`}
          >
            {comment.isOwner ? (
              <>
                <li
                  className={` p-2 ${isDropdownOpen ? 'opacity-100 duration-300' : 'opacity-0'} hover:bg-primary`}
                  onClick={() => handelTriggerDropdownButton('edit')}
                >
                  Edit
                </li>
                <li
                  className={` p-2 ${isDropdownOpen ? 'opacity-100 duration-300' : 'opacity-0'} hover:bg-primary`}
                  onClick={() => handelTriggerDropdownButton('delete')}
                >
                  Delete
                </li>
              </>
            ) : (
              <li
                className={`p-2 ${isDropdownOpen ? 'opacity-100 duration-300' : 'opacity-0'} hover:bg-primary`}
              >
                Report
              </li>
            )}
          </ul>
        </div>
      </div>
      {isReplayBoxOpen ? (
        <CommentReplayBox
          onPostSuccess={handelPostReplay}
          comment={comment}
          onCancel={() => setIsReplayBoxOpen(false)}
        />
      ) : null}
      {isUpdateBoxOpen ? (
        <CommentUpdateBox
          onUpdateSuccess={onUpdateSuccess}
          onCancel={() => setIsUpdateBoxOpen(false)}
          comment={comment}
        />
      ) : null}
    </div>
  );
}

export default VideoCommentReplayCard;
