import React from 'react';
import ChannelVideoCard from '../../cards/ChannelVideoCard';

const FeaturedVideos = () => {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-primary text-black font-semibold">Featured Videos</h1>
      <div className="mt-5">
        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 10 }).map((video, index) => (
            <ChannelVideoCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideos;
