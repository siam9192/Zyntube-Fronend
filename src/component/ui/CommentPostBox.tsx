import { useRef, useState } from 'react';
import { useCreateVideoCommentMutation } from '../../redux/features/video-comment/video-comment.api';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useVideoCommentContext } from '../sections/watch/VideoComments';
import { formatToPublicComment } from '../../helpers';

interface IProps {
  videoId: string;
}

function CommentPostBox({ videoId }: IProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [createVideo, { isLoading }] = useCreateVideoCommentMutation();
  const { setComments } = useVideoCommentContext();
  const handelPostVideo = async () => {
    try {
      const res = await createVideo({
        content,
        videoId,
      });
      const error: any = res.error;
      if (error) {
        throw new Error(error.data.message);
      }
      // Add posted comments on states
      const comment = formatToPublicComment(res.data?.data, { reactionType: null, isOwner: true });
      setComments(pre => [comment, ...pre]);
      // Reset all state fields values;
      clear();
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
  };

  function clear() {
    setContent('');
    const current = textareaRef.current;
    if (current) current.value = '';
  }

  const { isUserExist } = useCurrentUser();

  return (
    <div className="mt-4">
      {!isUserExist ? (
        <p className="text-sm md:text-lg text-red-500">Please login first to drop comment here..</p>
      ) : null}
      <div className="mt-3 flex gap-2 ">
        <textarea
          ref={textareaRef}
          name=""
          id=""
          onChange={e => setContent(e.target.value)}
          placeholder="Write here..."
          className="md:min-h-32 min-h-20 max-h-80 border-2 border-gray-700/20 w-full  p-2 rounded-md focus:outline-secondary  placeholder:font-medium  font-primary"
        ></textarea>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <button onClick={clear} className="px-6 py-2 bg-gray-100  rounded-md text-black">
          Clear
        </button>
        <button
          disabled={isLoading}
          onClick={handelPostVideo}
          className="px-6 py-2 bg-primary hover:bg-pink-700  rounded-md text-white"
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </div>
  );
}

export default CommentPostBox;
