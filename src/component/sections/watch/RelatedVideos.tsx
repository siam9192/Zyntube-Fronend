import { useState } from 'react';
import VideoCardShortOptions from '../../ui/VideoCardShortOptions';
import { BsDot } from 'react-icons/bs';
import RelatedVideoCard from '../../cards/RelatedVideoCard';
import { useGetRelatedVideosQuery } from '../../../redux/features/video/video.api';
import usEScreenSize, { EScreenSizeType } from '../../hooks/useScreenSize';
import VideoCard from '../../cards/VideoCard';
const tabs = ['Related', 'Recommended', 'For You', 'From Excited..'];

interface IProps {
  id: string;
}

function RelatedVideos({ id }: IProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const {screenSizeType} =  usEScreenSize()
  const isSmallScreenSize = [EScreenSizeType.SM, EScreenSizeType.MD].includes(screenSizeType); 
  const { data, isLoading } = useGetRelatedVideosQuery(id);

  const videos = data?.data || [];
  

  return (
    <div className="col-span-2">
      <div className="flex items-center gap-2 mb-5 categories_tab_container">
        {tabs.slice(0, 12).map((tab, index) => (
          <button
            onClick={() => setActiveIndex(index)}
            className={` tab__btn whitespace-nowrap px-6 py-2 ${index === activeIndex ? ' active ' : 'bg-gray-100'} rounded-md`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={` ${isSmallScreenSize ? 'grid md:grid-cols-2 grid-cols-1' :'flex flex-col'   }  gap-5`}>
        {videos.map((_, index) => {
         if(isSmallScreenSize) {
          return <VideoCard video={_} key={index}/>
         }
         else {
          return <RelatedVideoCard  video={_} key={index}/>
         }
        })}
      </div>
    </div>
  );
}

export default RelatedVideos;
