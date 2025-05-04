import React, { useState } from 'react'
import ChannelVideoCard from '../../cards/ChannelVideoCard'

function ChannelVideos() {
    const filters = ["Latest","Popular","Oldest"]
      const [activeIndex,setActiveIndex] =  useState(0);
  return (
    <div>
           <div className='flex items-center gap-2 mb-5 categories_tab_container'>
          {
  filters.slice(0,12).map((tab,index)=><button onClick={()=>setActiveIndex(index)} className={` tab__btn whitespace-nowrap px-6 py-2 ${index === activeIndex ? ' active ':'bg-gray-100'} rounded-md font-medium`}>
    {tab}
  </button>
)}
  </div>
        <div className='mt-5'>
         <div className='grid lg:grid-cols-4 gap-5'>
         {
                Array.from({length:10}).map((video,index)=>(<ChannelVideoCard key={index}/>))
            }
         </div>
        </div>
    </div>
  )
}

export default ChannelVideos