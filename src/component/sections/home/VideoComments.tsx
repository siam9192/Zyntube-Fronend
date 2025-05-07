import { MdSort } from 'react-icons/md';
import VideoCommentCard from '../../cards/VideoCommentCard';
import CommentPostBox from '../../ui/CommentPostBox';
import { useState } from 'react';
const VideoComments = () => {
  const [isDisplay, setIsDisplay] = useState(true);
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
              {(34555).toLocaleString()} Comments
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
          <CommentPostBox />
          <div className="mt-5  grid grid-cols-1 gap-4">
            {Array.from({ length: 20 }).map((comment, index) => (
              <VideoCommentCard key={index} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default VideoComments;
