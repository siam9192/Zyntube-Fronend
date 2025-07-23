import React, { useEffect, useState } from 'react';
import ChannelVideoCard from '../../cards/ChannelVideoCard';
import { useGetChannelPublicVideosQuery } from '../../../redux/features/video/video.api';
import VideoLoadingCard from '../../cards/VideoLoadingCard';
import useLoadingBounce from '../../../hooks/useLoadingBounce';
import { IPublicVideo } from '../../../types/video.type';
import useScreenSize, { EScreenSizeType } from '../../hooks/useScreenSize';
interface IProps {
  channelId:string
}
function ChannelVideos({channelId}:IProps) {
  const filters = ['Latest', 'Popular', 'Oldest'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [page,setPage] = useState(1)
  const params = [
    {
      name:'type',
      value:filters[activeIndex]
    },

    {
      name:'page',
      value:page
    },

    {
      name:'limit',
      value:1
    }
  ]
 
  const {screenSizeType} = useScreenSize()
  const [allVideos,setAllVideos] =  useState<IPublicVideo[]>([])
  const [isPaginationLoading,setIsPaginationLoading] = useState(false)
  const {data,isLoading,isFetching} = useGetChannelPublicVideosQuery({channelId,params})
  const videos =  data?.data||[]
  const meta =  data?.meta
  const bouncedLoading =  useLoadingBounce(isLoading||isFetching);
  const paginationBouncedLoading = useLoadingBounce(isPaginationLoading,500)



   // Stop pagination loading when data fetch completes
    useEffect(() => {
      if (!isFetching) {
        setIsPaginationLoading(false);
      }
    }, [isFetching]);
  
    // Infinite scroll
    useEffect(() => {
      const container = document.getElementById('channel_videos_container');
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
    <div >
      <div className="flex items-center gap-2 mb-5 categories_tab_container">
        {filters.slice(0, 12).map((tab, index) => (
          <button
            onClick={() => setActiveIndex(index)}
            className={` tab__btn whitespace-nowrap px-6 py-2 ${index === activeIndex ? ' active ' : 'bg-gray-100'} rounded-md font-medium`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div id="channel_videos_container" className="mt-5">
        <div className="grid lg:grid-cols-4 gap-5">
         {
          bouncedLoading?
           Array.from({ length: 10 }).map((_, index) => (
            <VideoLoadingCard key={index} />
          ))
          :
        <>
        {
             videos.map((video) => (
            <ChannelVideoCard video={video} key={video.id} />
          ))
        }

        {
          paginationBouncedLoading ? 
            Array.from({ length: 10 }).map((_, index) => (
            <VideoLoadingCard key={index} />
          ))
          :
          null

        }
        </>

         }
        </div>
      </div>
    </div>
  );
}

export default ChannelVideos;
