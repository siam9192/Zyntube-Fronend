import { useEffect, useRef, useState } from 'react';
import { IVideoComment, IVideoCommentPublic } from '../../types/video-comment.type';
import useCurrentUser from '../../hooks/useCurrentUser';
import { toast } from 'sonner';
import { updateVideoComment } from '../../services/video-commnt.service';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
interface IProps {
  onCancel?: () => void;
  onUpdateSuccess?: (comment: IVideoComment) => void;
  comment: IVideoComment | IVideoCommentPublic;
}

function CommentUpdateBox({ comment, onCancel, onUpdateSuccess }: IProps) {
  const { user } = useCurrentUser();
  const channel = user?.app.channel;
  const [content, setContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    current.focus();
  }, []);

  const isDisabled = isLoading || content.trim().length < 1;

  async function handelUpdate() {
    setIsLoading(true);
    const toastId = toast.loading('Updating comment...', { richColors: true });
    try {
      const response = await updateVideoComment(comment.id, { content });

      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message, { id: toastId, richColors: true });
      onUpdateSuccess && onUpdateSuccess(response.data);
      onCancel && onCancel();
    } catch (err) {
      const message = (err as Error).message || DEFAULT_ERROR_MESSAGE;
      toast.error(message, { id: toastId, richColors: true });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="p-2" ref={ref}>
      <p className="text-sm mb-1 text-end font-medium">Edit your comment</p>
      <div className="flex gap-2">
        <img src={channel?.profilePhotoUrl} alt="" className="size-8 rounded-full" />
        <div className=" grow">
          <textarea
            ref={textareaRef}
            defaultValue={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your replay.."
            className="p-2  outline-none w-full min-h-40 max-h-52 border-2  border-secondary rounded-md"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={() => onCancel && onCancel()} className="font-semibold text-gray-700">
          Cancel
        </button>
        <button
          onClick={handelUpdate}
          disabled={isDisabled}
          className="font-semibold text-primary disabled:text-gray-200"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default CommentUpdateBox;
