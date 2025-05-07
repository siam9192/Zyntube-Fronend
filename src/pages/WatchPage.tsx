import React, { useEffect, useRef, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import VideoCardShortOptions from '../component/ui/VideoCardShortOptions';
import VideoPlayer from '../component/sections/watch/VideoPlayer';
import VideoDetails from '../component/sections/watch/VideoDetails';
import VideoComments from '../component/sections/home/VideoComments';
import { useLocation } from 'react-router-dom';
import RelatedVideos from '../component/sections/watch/RelatedVideos';

const WatchPage = () => {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const current = ref.current;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname]);

  return (
    <div>
      <div ref={ref} className="lg:grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <VideoPlayer />
          <VideoDetails />
          <VideoComments />
        </div>
        <RelatedVideos />
      </div>
    </div>
  );
};

export default WatchPage;
