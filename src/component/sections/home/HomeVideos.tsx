import React from 'react'
import VideoCard from '../../cards/VideoCard'
import VideoLoadingCard from '../../cards/VideoLoadingCard'

const HomeVideos = () => {
  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:py-10 py-5'>
   {
    Array.from({length:100}).map((video,index)=><VideoCard key={index}/>)
   }
    {/* {
    Array.from({length:25}).map((video,index)=><VideoLoadingCard key={index}/>)
   } */}
    </div>
  )
}

export default HomeVideos