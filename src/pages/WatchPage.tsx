import React, { useEffect, useRef, useState } from 'react'
import { BsDot } from 'react-icons/bs';
import VideoCardShortOptions from '../component/ui/VideoCardShortOptions';
import VideoPlayer from '../component/sections/watch/VideoPlayer';
import VideoDetails from '../component/sections/watch/VideoDetails';
import VideoComments from '../component/sections/home/VideoComments';
import { useLocation } from 'react-router-dom';

const WatchPage = () => {
const {pathname} =  useLocation()
  const tabs = [
        "Related",
        "Recommended",
        "For You",
       "From Excited.."
      ];
      
      const ref = useRef<HTMLDivElement>(null)

      useEffect(()=>{
      const current = ref.current
      if(current){
        current.scrollIntoView({behavior:"smooth",block:'start'})
      }

      },[pathname])

      const [activeIndex,setActiveIndex] =  useState(0);
  let title = "Build This Complete Modern Website Using Only HTML And"
  title = title.length > 50 ? title.slice(0,50) + "...":title
   let channelName = "Excited boy gaming";
   channelName = channelName.length > 20 ? channelName.slice(0,20)+"..":channelName 
 
  return (
    <div>
      <div ref={ref} className='lg:grid grid-cols-6 gap-8'>
        <div className='col-span-4'>
      <VideoPlayer/>
      <VideoDetails/>
      <VideoComments/>
        </div>
        <div className='col-span-2'>
          <div className='flex items-center gap-2 mb-5 categories_tab_container'>
          {
  tabs.slice(0,12).map((tab,index)=><button onClick={()=>setActiveIndex(index)} className={` tab__btn whitespace-nowrap px-6 py-2 ${index === activeIndex ? ' active ':'bg-gray-100'} rounded-md`}>
    {tab}
  </button>)
}
          </div>
          <div className='flex flex-col gap-5'>
        {
          Array.from({length:20}).map((_,index)=>(<div  className='relative' key={index}>
              <div className='flex md:flex-row flex-col gap-4 '>
                <div className='lg:w-[40%] md:size-52 w-full md:h-full h-60  relative'>
                  <img src="https://3.imimg.com/data3/BH/QL/MY-12724382/animation.jpg" className='rounded-md h-full w-full   object-cover'/>
                      <p className='p-1 rounded-sm text-sm scale-80 bg-primary text-white absolute bottom-2 right-1'>10:20</p>
                </div>
                <div className=' grow-1 '>
                  <h4 className='text-black font-semibold text-[0.9rem]'>{title}</h4>
                  <div className='lg:mt-4 mt-2 font-primary'>
                    <p className='text-sm text-gray-700'>{channelName}</p>
                   <p className='text-gray-700 text-xs mt-0.5'><span>4.3M views</span> <span><BsDot className='inline' /></span> <span>4 days ago</span></p>
                  </div>
                </div>
              </div>
              <VideoCardShortOptions className='absolute right-0 bottom-0  p-2 hover:bg-secondary hover:rounded-full hover:text-white'/>
          </div>))
        }
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchPage