import { useEffect, useMemo, useReducer, useState } from 'react';
import { useGetSearchVideosQuery } from '../redux/features/video/video.api';
import VideoResultCard from '../component/cards/VideoResultCard';
import VideoResultLoadingCard from '../component/cards/VideoResultLoadingCard';
import { IPublicVideo } from '../types/video.type';
import useScreenSize, { EScreenSizeType } from '../component/hooks/useScreenSize';
import useLoadingBounce from '../hooks/useLoadingBounce';
import { useSearchParams } from 'react-router-dom';

const types = [
  {
    display: 'All',
    value: 'all',
  },
  {
    display: 'Watched',
    value: 'watched',
  },
  {
    display: 'Unwatched',
    value: 'Unwatched',
  },
  {
    display: 'Subscribed',
    value: 'subscribed',
  },
  {
    display: 'Recent upload',
    value: 'recent',
  },
];
function ResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeType, setActiveType] = useState('all');
  const [page, setPage] = useState(1);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const { screenSizeType } = useScreenSize();

  const [allVideos, setAllVideos] = useState<IPublicVideo[]>([]);

  const params = useMemo(() => {
    return [
      { name: 'search_query', value: searchParams.get('search_query') || '' },
      { name: 'type', value: activeType },
      { name: 'page', value: page },
    ];
  }, [searchParams, activeType, page]);

  const { data, isLoading, isFetching, refetch } = useGetSearchVideosQuery(params);
  const videos = data?.data || [];
  const meta = data?.meta;

  const paginationBouncedLoading = useLoadingBounce(isPaginationLoading, 5000);

  // Change filter type
  const handleChangeFilterType = (type: string) => {
    setActiveType(type);
    setPage(1);
    setAllVideos([]);
  };

  // Handle new video loading and avoid duplicates
  useEffect(() => {
    if (videos.length) {
      setAllVideos(prev => {
        const map = new Map(prev.map(v => [v.id, v]));
        videos.forEach(v => map.set(v.id, v)); // Replace or add
        return Array.from(map.values());
      });
    }
  }, [videos]);

  // Stop pagination loading when data fetch completes
  useEffect(() => {
    if (!isFetching) {
      setIsPaginationLoading(false);
    }
  }, [isFetching]);

  // Infinite scroll
  useEffect(() => {
    const container = document.getElementById('layout-content-container');
    if (!container) return;

    const threshold = [EScreenSizeType.SM, EScreenSizeType.MD].includes(screenSizeType) ? 50 : 100;

    function handleScroll() {
      if (!container) return;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      const nearBottom = scrollTop + clientHeight + threshold >= scrollHeight;
      const canPaginate =
        !isFetching && paginationBouncedLoading && allVideos.length < (meta?.totalResult || 0);

      if (nearBottom && canPaginate) {
        setIsPaginationLoading(true);
        setPage(p => p + 1);
      }
    }

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [screenSizeType, isFetching, paginationBouncedLoading, allVideos.length, meta?.totalResult]);

  return (
    <div className=" xl:w-10/12 mx-auto">
      {/*Filter  Tabs */}
      <div className="md:mt-5">
        <div className="flex  justify-between lg:items-center w-full">
          <div className="flex items-center overflow-hidden overflow-x-auto  gap-2 md:gap-4 hide-scrollbar">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <button
                    key={index}
                    className="w-40 h-10  bg-gray-300 animate-pulse   rounded-md "
                  ></button>
                ))
              : types.map((type, index) => (
                  <button
                    onClick={() => handleChangeFilterType(type.value)}
                    key={index}
                    className={` tab__btn px-6 py-2 ${type.value === activeType ? 'active ' : 'bg-gray-100'} rounded-md text-xs md:text-[1rem]  `}
                  >
                    {type.display}
                  </button>
                ))}
          </div>
          <div></div>
        </div>
      </div>

      {/* Results  */}
      <div className="mt-10 grid grid-cols-1 gap-y-5">
        {(isLoading || isFetching) && !isPaginationLoading
          ? Array.from({ length: 10 }).map((_, index) => <VideoResultLoadingCard key={index} />)
          : allVideos.map(video => <VideoResultCard key={video.id} video={video} />)}
        {paginationBouncedLoading
          ? Array.from({ length: 6 }).map((_, index) => <VideoResultLoadingCard key={index} />)
          : null}
      </div>
    </div>
  );
}

export default ResultPage;
