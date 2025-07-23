import { MdSort } from 'react-icons/md';
import VideoCommentCard from '../../cards/VideoCommentCard';
import CommentPostBox from '../../ui/CommentPostBox';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useGetVideoCommentsQuery } from '../../../redux/features/video-comment/video-comment.api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useLoadingBounce from '../../../hooks/useLoadingBounce';
import { IVideoComment, IVideoCommentPublic } from '../../../types/video-comment.type';
import CommentLoadingCard from '../../cards/CommentLoadingCard';

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

export type TVideoCommentContext = {
  comments: IVideoCommentPublic[];
  setComments: Dispatch<SetStateAction<IVideoCommentPublic[]>>;
  isCommentsLoading: boolean;
  isCommentsFetching: boolean;
  isTypeCommentsLoading: boolean;
  refetch: () => void | any;
};

export const VideoCommentContext = createContext<TVideoCommentContext | null>(null);

const VideoComments = ({ videoId }: IProps) => {
  const [isDisplay, setIsDisplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [allRetrievedComments, setAllRetrievedComments] = useState<IVideoCommentPublic[]>([]);
  const [selectedType, setSelectedType] = useState(commentTypes[0].value);
  const [page, setPage] = useState(1);
  const [isTypeCommentsLoading, setIsTypeCommentsLoading] = useState(false);
  const [isPageCommentsLoading, setIsPageCommentsLoading] = useState(false);
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
      {
        name: 'page',
        value: page,
      },
    ],
    videoId,
  });
  const comments = data?.data || [];
  const meta = data?.meta;
  const bouncedLoading = useLoadingBounce(
    isCommentsLoading || isCommentsFetching || isPageCommentsLoading,
    500,
  );
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
        setIsPageCommentsLoading(true);
      }
    };

    document.addEventListener('scroll', handler, true); // `true` to capture scroll from all parents

    return () => {
      document.removeEventListener('scroll', handler, true);
    };
  }, []);

  useEffect(() => {
    if (!isCommentsLoading && !isCommentsFetching) {
      if (isTypeCommentsLoading) setIsTypeCommentsLoading(false);
      if (isPageCommentsLoading) setIsPageCommentsLoading(false);
    }
  }, [isTypeCommentsLoading, isPageCommentsLoading]);

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

  function handelChangeFilterType(type: string) {
    setSelectedType(type);
    setIsTypeCommentsLoading(true);
    setAllRetrievedComments([]);
  }

  const contextValue: TVideoCommentContext = {
    comments: allRetrievedComments,
    setComments: setAllRetrievedComments,
    isCommentsLoading,
    isCommentsFetching,
    isTypeCommentsLoading,
    refetch,
  };

  return (
    <VideoCommentContext.Provider value={contextValue}>
      <div className="py-5">
        {/* Sort button */}
        <div className="text-end hidden">
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
              <div className="hidden">
                <button className="flex items-center gap-2">
                  <span className="text-2xl">
                    <MdSort />
                  </span>
                  <span className="font-semibold font-secondary">Sort Comments</span>
                </button>
              </div>
            </div>
            {/* Comment post box */}
            <CommentPostBox videoId={videoId} />

            {/* All  comments container */}
            <div ref={containerRef} className="mt-5">
              {/* Types */}
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

              {!bouncedLoading && !isPageCommentsLoading ? (
                allRetrievedComments.length ? (
                  <div>
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
                      {isPageCommentsLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <CommentLoadingCard key={index} />
                          ))
                        : null}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-center">This video have no comments</p>
                  </div>
                )
              ) : (
                <div>
                  <div className="mt-5  grid grid-cols-1 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <CommentLoadingCard key={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </VideoCommentContext.Provider>
  );
};

export default VideoComments;

export function useVideoCommentContext() {
  const context = useContext(VideoCommentContext);
  if (!context) throw new Error('Must be under at VideoCommentContext');
  return context;
}
