import { useEffect, useRef, useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import { IVideoComment, IVideoCommentPublic } from '../../types/video-comment.type';
import { toast } from 'sonner';
import { createVideoComment } from '../../services/video-commnt.service';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
interface IProps {
  onCancel?: () => void;
  onPostSuccess?: (comment: IVideoComment) => void;
  comment: IVideoCommentPublic;
}
function CommentReplayBox({ comment, onCancel, onPostSuccess }: IProps) {
  const [content, setContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useCurrentUser();
  const channel = user?.app.channel;

  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    current.focus();
  }, []);

  async function handelPostReplay() {
    setIsLoading(true);
    const toastId = toast.loading('Replaying...', { richColors: true });

    try {
      const response = await createVideoComment({ parentId: comment.id, content });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message, { id: toastId, richColors: true });
      onPostSuccess?.(response.data);
    } catch (err) {
      const message = (err as Error).message || DEFAULT_ERROR_MESSAGE;
      toast.error(message, { id: toastId, richColors: true });
    } finally {
      setIsLoading(false);
    }
  }

  const owner = comment.owner;
  const isSelfReplay = channel?.uniqueName === owner.uniqueName;

  const isDisabled = isLoading || content.trim().length < 1;

  return (
    <div className="p-2" ref={ref}>
      <div className="flex gap-2">
        <img src={channel?.profilePhotoUrl} alt="" className="size-8 rounded-full" />
        <div className=" grow">
          <p className="text-sm mb-1  font-medium">
            {isSelfReplay ? 'Replaying to your self' : `Replaying to ${owner.uniqueName}`}
          </p>
          <textarea
            onChange={e => setContent(e.target.value)}
            placeholder="Write your replay.."
            className="p-2  outline-none w-full min-h-14 max-h-32 border-2  border-secondary rounded-md"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={() => onCancel && onCancel()} className="font-semibold text-gray-700">
          Cancel
        </button>
        <button
          onClick={handelPostReplay}
          disabled={isDisabled}
          className="font-semibold text-primary disabled:text-gray-200"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CommentReplayBox;
