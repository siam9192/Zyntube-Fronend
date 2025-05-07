import React from 'react';

const VideoNotFound = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <img
        src="https://img.freepik.com/premium-vector/get-this-doodle-mini-illustration-video-error_67813-13830.jpg"
        alt=""
        className="mx-auto"
      />
      <h1 className="text-center text-2xl font-medium  font-primary lg:w-1/2 w-10/12 mx-auto  md:leading-[2.5rem] leading-[2rem]">
        <span className="text-primary">Oops! </span>This video is no longer available — it may have
        been deleted or removed.
      </h1>
    </div>
  );
};

export default VideoNotFound;
