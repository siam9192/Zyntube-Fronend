import { useContext } from 'react';
import { HomeContext } from '../../../pages/Home';
import VideoCard from '../../cards/VideoCard';
import VideoLoadingCard from '../../cards/VideoLoadingCard';
import useLoadingBounce from '../../../hooks/useLoadingBounce';

const HomeVideos = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useContext must be used within a HomeContext.Provider');
  }
  const { isLoading, isFetching, videos, perPage } = context;
  const bouncedLoading = useLoadingBounce(isLoading || isFetching, 1000);
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:py-10 py-5">
      {bouncedLoading
        ? Array.from({ length: perPage }).map((video, index) => <VideoLoadingCard key={index} />)
        : videos.map((video, index) => <VideoCard video={video} key={index} />)}
    </div>
  );
};

export default HomeVideos;
