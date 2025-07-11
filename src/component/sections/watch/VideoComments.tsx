import { MdSort } from 'react-icons/md';
import VideoCommentCard from '../../cards/VideoCommentCard';
import CommentPostBox from '../../ui/CommentPostBox';
import { useEffect, useRef, useState } from 'react';
import { useGetVideoCommentsQuery } from '../../../redux/features/video-comment/video-comment.api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useLoadingBounce from '../../../hooks/useLoadingBounce';
import { IVideoComment, IVideoCommentPublic } from '../../../types/video-comment.type';
import { formatToPublicComment } from '../../../helpers';
interface IProps {
  videoId: string;
}

const commentTypes = [
  {
    display: 'All',
    value: 'All',
  },
  {
    display: 'Top',
    value: 'top',
  },
  {
    display: 'Member ',
    value: 'member',
  },
  {
    display: 'Own',
    value: 'own',
  },
];

const VideoComments = ({ videoId }: IProps) => {
  const [isDisplay, setIsDisplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [allRetrievedComments, setAllRetrievedComments] = useState<IVideoCommentPublic[]>([]);
  const [selectedType, setSelectedType] = useState(commentTypes[0].value);
  const [page, setPage] = useState(1);
  const isFirstTimeFetched = useRef<boolean>(false);

  const {
    data,
    isLoading: isCommentsLoading,
    isFetching: isCommentsFetching,
    refetch,
  } = useGetVideoCommentsQuery({
    params: [
      {
        name: 'type',
        value: selectedType,
      },
    ],
    videoId,
  });
  const comments = data?.data || [];
  const meta = data?.meta;
  const bouncedLoading = useLoadingBounce(isCommentsLoading || isCommentsFetching, 1000);

  useEffect(() => {
    if (!bouncedLoading) {
      refetch();
    }
  }, [videoId]);

  if (!isFirstTimeFetched.current) {
    isFirstTimeFetched.current = true;
  }

  useEffect(() => {
    if (comments && comments.length) {
      setAllRetrievedComments(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const newComments = comments.filter(c => !existingIds.has(c.id));
        return [...prev, ...newComments];
      });
    }
  }, [comments]);

  useEffect(() => {
    const handler = () => {
      const rect = document.body.getBoundingClientRect();
      const bottom = rect.bottom;
      const windowHeight = window.innerHeight;

      const isNearBottom = bottom - windowHeight < 100; // Adjust threshold as needed

      if (
        isNearBottom &&
        !bouncedLoading &&
        !isCommentsFetching &&
        meta &&
        meta.totalResult > allRetrievedComments.length
      ) {
        setPage(meta.page + 1);
      }
    };

    document.addEventListener('scroll', handler, true); // `true` to capture scroll from all parents

    return () => {
      document.removeEventListener('scroll', handler, true);
    };
  }, []);

  const handelPostCommentSuccess = (comment: IVideoComment) => {
    const formatComment = formatToPublicComment(comment, { isOwner: true, reactionType: null });
    console.log(formatComment);
    setAllRetrievedComments(prev => [formatComment, ...prev]);

    setTimeout(() => {
      const card = document.getElementById(`video-comment-card-${comment.id}`);
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  function handelCommentDelete(id: string) {
    setAllRetrievedComments(prev => prev.filter(_ => _.id !== id));
  }

  function handelChangePinStatus(id: string, status: boolean) {
    setAllRetrievedComments(prev =>
      prev.map(comment => (comment.id === id ? { ...comment, isPinned: status } : comment)),
    );
  }

  function handelUpdateComment(updated: IVideoComment) {
    setAllRetrievedComments(prev =>
      prev.map(comment =>
        comment.id === updated.id ? { ...comment, content: updated.content } : comment,
      ),
    );
  }

  function handelCommentReplay(comment: IVideoComment) {}

  function handelChangeFilterType(type: string) {
    setSelectedType(type);
    setAllRetrievedComments([]);
  }

  return (
    <div className="py-5">
      <div className="text-end">
        <button
          onClick={() => setIsDisplay(!isDisplay)}
          className={`mb-2 font-medium ${isDisplay ? 'text-red-600' : 'text-secondary'} `}
        >
          {isDisplay ? 'Hide comments' : 'Show  Comments'}
        </button>
      </div>
      {isDisplay ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="md:text-2xl text-xl text-black font-primary font-medium">
              {(meta?.total || 0).toLocaleString()} Comments
            </h1>
            <div>
              <button className="flex items-center gap-2">
                <span className="text-2xl">
                  <MdSort />
                </span>
                <span className="font-semibold font-secondary">Sort Comments</span>
              </button>
            </div>
          </div>
          <CommentPostBox videoId={videoId} onPostSuccess={handelPostCommentSuccess} />
          <div ref={containerRef} className="mt-5">
            {!bouncedLoading ? (
              allRetrievedComments.length ? (
                <div>
                  <div className=" flex items-center flex-wrap gap-2 mb-5 categories_tab_container">
                    {commentTypes.map(type => (
                      <button
                        onClick={() => handelChangeFilterType(type.value)}
                        className={` tab__btn whitespace-nowrap px-6 py-2 ${selectedType === type.value ? ' active ' : 'bg-gray-100'} rounded-md`}
                      >
                        {type.display}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5  grid grid-cols-1 gap-4">
                    {allRetrievedComments.map(comment => (
                      <VideoCommentCard
                        comment={comment}
                        onDeleteSuccess={handelCommentDelete}
                        onChangePinStatusSuccess={handelChangePinStatus}
                        onUpdateSuccess={handelUpdateComment}
                        key={comment.id}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center">This video have no comments</p>
                </div>
              )
            ) : (
              <div>
                <DotLottieReact
                  src="/src/assets/animations/Animation - hands-loading.lottie"
                  className=""
                  loop
                  autoplay
                />
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default VideoComments;
