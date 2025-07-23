import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiThumbsDown, PiThumbsUp } from 'react-icons/pi';
import { BsReply } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import CommentReplayBox from '../ui/CommentReplayBox';
import { formatToPublicComment, timeAgo } from '../../helpers';
import { IVideoComment, IVideoCommentPublic } from '../../types/video-comment.type';
import {
  changeVideoCommentPinStatus,
  deleteVideoComment,
} from '../../services/video-commnt.service';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import { MdOutlinePushPin } from 'react-icons/md';
import CommentUpdateBox from '../ui/CommentUpdateBox';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { useGetVideoCommentAllRepliesQuery } from '../../redux/features/video-comment/video-comment.api';
import VideoCommentReplayCard from './VideoCommentReplayCard';
import { EVideoReactionType } from '../../types/video-reaction.type';
import useCurrentUser from '../../hooks/useCurrentUser';
import { switchVideoCommentReaction } from '../../services/video-comment-reaction.service';

interface IProps {
  comment: IVideoCommentPublic;
  onDeleteSuccess?: (id: string) => void | any;
  onChangePinStatusSuccess?: (id: string, status: boolean) => void | any;
  onUpdateSuccess?: (comment: IVideoComment) => void | any;
  onPostReplaySuccess?: (replay: IVideoComment) => void | any;
  isReplay?: boolean;
}
function VideoCommentCard({
  comment,
  onDeleteSuccess,
  onChangePinStatusSuccess,
  onUpdateSuccess,
}: IProps) {
  const { isUserExist } = useCurrentUser();

  const [isReadMore, setIsReadMore] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReplayBoxOpen, setIsReplayBoxOpen] = useState(false);
  const [isUpdateBoxOpen, setIsUpdateBoxOpen] = useState(false);
  const [isOnBottom, setIsOnBottom] = useState(false);

  const dropDownRef = useRef<HTMLUListElement>(null);
  const defaultDisplayLength = 200;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayReplies, setIsDisplayReplies] = useState(false);
  const { data } = useGetVideoCommentAllRepliesQuery(comment.id);
  const [allReplies, setAllReplies] = useState<IVideoCommentPublic[]>([]);

  const [reactionType, setReactionType] = useState(comment.reactionType);

  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [dislikesCount, setDislikesCount] = useState(comment.dislikesCount);

  const replies = data?.data;
  const isPinned = comment.isPinned;

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
  useEffect(() => {
    if (replies && replies.length) {
      setAllReplies(prev => [...prev, ...replies]);
    }
  }, [replies]);

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

  async function handelChangePinStatus() {
    setIsLoading(true);
    const toastId = toast.loading('Pinning comment...', { richColors: true });

    try {
      const status = !isPinned;
      const response = await changeVideoCommentPinStatus(comment.id, { status });

      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message, { id: toastId, richColors: true });
      onChangePinStatusSuccess && onChangePinStatusSuccess(comment.id, status);
    } catch (err) {
      const message = (err as Error).message || DEFAULT_ERROR_MESSAGE;
      toast.error(message, { id: toastId, richColors: true });
    } finally {
      setIsLoading(false);
    }
  }

  async function handelPostReplay(replay: IVideoComment) {
    setIsReplayBoxOpen(false);
    const format = formatToPublicComment(replay, { isOwner: true, reactionType: null });
    setAllReplies(pre => [...pre, format]);
    // onPostReplaySuccess && onPostReplaySuccess(replay);
    setTimeout(() => {
      setIsDisplayReplies(true);
    }, 0);
  }

  function handelUpdateComment(updated: IVideoComment) {
    setAllReplies(prev =>
      prev.map(comment =>
        comment.id === updated.id ? { ...comment, content: updated.content } : comment,
      ),
    );
  }

  function handelReplayDelete(id: string) {
    setAllReplies(prev => prev.filter(_ => _.id !== id));
  }

  function toggleUpdateBox() {
    setIsUpdateBoxOpen(p => !p);
  }

  function handelTriggerDropdownButton(name: 'delete' | 'edit' | 'pin' | 'report') {
    switch (name) {
      case 'delete':
        handleDeleteComment();
        break;
      case 'pin':
        handelChangePinStatus();
        break;
      case 'edit':
        toggleUpdateBox();
        break;
    }
    setIsDropdownOpen(false);
  }

  async function handelSwitchReaction(type: EVideoReactionType) {
    if (!isUserExist) {
      return;
    }

    const prevType = reactionType; // previous reaction (LIKE, DISLIKE, or null)
    const updateType = prevType === type ? null : type; // toggle logic

    let likes = likesCount;
    let dislikes = dislikesCount;

    if (prevType === EVideoReactionType.LIKE) {
      likes -= 1;
    }
    if (prevType === EVideoReactionType.DISLIKE) {
      dislikes -= 1;
    }

    if (updateType === EVideoReactionType.LIKE) {
      likes += 1;
    }
    if (updateType === EVideoReactionType.DISLIKE) {
      dislikes += 1;
    }

    setReactionType(updateType);
    setLikesCount(likes);
    setDislikesCount(dislikes);

    try {
      const response = await switchVideoCommentReaction({
        commentId: comment.id,
        type: updateType,
      });
      if (!response.success) {
        throw new Error();
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
      setReactionType(prevType);
    }
  }

  return (
    <div ref={cardRef} id={`video-comment-card-${comment.id}`} className="p-2 md:p-5">
      <div className="relative   w-full ">
        <div className="flex  gap-2">
          <img
            src={owner.profilePhotoUrl}
            className="rounded-full size-10 outline-primary outline-1 outline-offset-1"
          />
          <div>
            {isPinned ? (
              <div className="flex items-center gap-1 text-gray-700">
                <span className=" text-sm">
                  <MdOutlinePushPin />
                </span>
                <span className="text-sm font-secondary">Pinned by author</span>
              </div>
            ) : null}
            <div>
              <div className="flex items-center gap-2">
                <Link to="">
                  <span
                    className={`font-medium text-sm p-1 ${isPinned ? 'bg-secondary text-white' : ''} rounded-full`}
                  >
                    {owner.uniqueName}{' '}
                  </span>
                </Link>
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
                <button
                  onClick={() => handelSwitchReaction(EVideoReactionType.LIKE)}
                  className="flex items-center gap-0.5"
                >
                  <span
                    className={`text-xl ${reactionType === EVideoReactionType.LIKE ? 'text-primary' : ' text-black'}`}
                  >
                    <PiThumbsUp />
                  </span>
                  <span
                    className={`text-sm ${reactionType === EVideoReactionType.LIKE ? 'text-primary' : 'text-gray-900 '}`}
                  >
                    {likesCount}
                  </span>
                </button>
                <button
                  onClick={() => handelSwitchReaction(EVideoReactionType.DISLIKE)}
                  className="flex items-center gap-0.5"
                >
                  <span
                    className={`text-xl ${reactionType === EVideoReactionType.DISLIKE ? 'text-primary' : ' text-black'}`}
                  >
                    <PiThumbsDown />
                  </span>
                  <span
                    className={`text-sm ${reactionType === EVideoReactionType.DISLIKE ? 'text-primary' : 'text-gray-900 '}`}
                  >
                    {dislikesCount}
                  </span>
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
            <li
              onClick={() => handelTriggerDropdownButton('pin')}
              className={`p-2 ${isDropdownOpen ? 'opacity-100 duration-300' : 'opacity-0'} hover:bg-primary`}
            >
              {isPinned ? 'Unpin this' : 'Pin this'}
            </li>

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

      {allReplies?.length ? (
        <div>
          <button
            onClick={() => setIsDisplayReplies(p => !p)}
            className="mt-2 mx-auto lg:mx-0 text-primary font-medium flex items-center gap-2 text-sm"
          >
            <span>
              {isDisplayReplies ? 'Hide' : 'Show'} {allReplies.length} replies
            </span>{' '}
            <span className={`${isDisplayReplies ? 'rotate-180' : ''} duration-100 text-3xl`}>
              <RiArrowDropDownFill />
            </span>
          </button>
          {isDisplayReplies ? (
            <div className="px-5">
              {allReplies.map(replay => (
                <VideoCommentCard
                  onDeleteSuccess={handelReplayDelete}
                  onPostReplaySuccess={handelPostReplay}
                  onUpdateSuccess={handelUpdateComment}
                  key={replay.id}
                  comment={replay}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default VideoCommentCard;
