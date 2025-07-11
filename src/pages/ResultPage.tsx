import { useState } from 'react';
import { useGetSearchVideosQuery } from '../redux/features/video/video.api';
import VideoResultCard from '../component/cards/VideoResultCard';

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
  const [activeType, setActiveType] = useState('all');
  const searchParams = new URLSearchParams(window.location.search);
  const params = [
    {
      name: 'search_query',
      value: searchParams.get('search_query') || '',
    },
  ];
  const { data, isLoading, isFetching } = useGetSearchVideosQuery(params);
  const videos = data?.data;
  const meta = data?.meta;

  return (
    <div className=" xl:w-10/12 mx-auto">
      <div className="mt-3 md:mt-5">
        <div className="flex  justify-between lg:items-center w-full">
          <div className="flex items-center overflow-hidden overflow-x-auto  gap-4 hide-scrollbar">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <button
                    key={index}
                    className="w-40 h-10  bg-gray-300 animate-pulse   rounded-md"
                  ></button>
                ))
              : types.map((type, index) => (
                  <button
                    onClick={() => setActiveType(type.value)}
                    key={index}
                    className={` tab__btn px-6 py-2 ${type.value === activeType ? 'active ' : 'bg-gray-100'} rounded-md`}
                  >
                    {type.display}
                  </button>
                ))}
          </div>
          <div>
            {/* <div className=' lg:block hidden flex justify-end mt-5'>
           <SearchVideoFilterModal/>
           </div> */}
          </div>
        </div>
        {/* <div className=' lg:hidden flex justify-end mt-5'>
           <SearchVideoFilterModal/>
           </div> */}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-y-5">
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="flex gap-5">
                <div className=" bg-gray-300 animate-pulse w-[40%] h-[100px] md:h-[200px] lg:h-[250px]  rounded-lg"></div>
                <div className="w-[60%]">
                  <div className="  bg-gray-300 animate-pulse  h-6 md:h-8 rounded-md"></div>
                  <div className="w-[80%] mt-2  bg-gray-300 animate-pulse  h-4 md:h-5 rounded-md"></div>
                  <div className="mt-5 flex items-center gap-2">
                    <div className=" size-8 md:size-10  bg-gray-300 animate-pulse rounded-full"></div>
                    <div className=" grow">
                      <div className=" w-1/3 bg-gray-300 animate-pulse  h-2 md:h-3 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : videos?.map(video => <VideoResultCard key={video.id} video={video} />)}
      </div>
    </div>
  );
}

export default ResultPage;
