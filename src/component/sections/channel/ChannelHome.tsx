import React from 'react'
import FeaturedVideos from './FeaturedVideos'
import ChannelVideoCard from '../../cards/ChannelVideoCard'

const ChannelHome = () => {
  return (
    <div>
          <div >
        <h1 className='text-2xl font-primary text-black font-semibold'>Featured Videos</h1>
        <div className='mt-5'>
         <div className='grid lg:grid-cols-4 gap-5'>
         {
                Array.from({length:7}).map((video,index)=>(<ChannelVideoCard key={index}/>))
            }
         </div>
        </div>
    </div>
    <div className='mt-8'>
        <h1 className='text-2xl font-primary text-black font-semibold'>Popular Videos</h1>
        <div className='mt-5'>
         <div className='grid grid-cols-4 gap-5'>
         {
                Array.from({length:10}).map((video,index)=>(<ChannelVideoCard key={index}/>))
            }
         </div>
        </div>
    </div>

    <div className='my-8'>
        <h1 className='text-2xl font-primary text-black font-semibold'>Latest Upload</h1>
        <div className='mt-5'>
         <div className='grid lg:grid-cols-4 gap-5'>
         {
                Array.from({length:4}).map((video,index)=>(<ChannelVideoCard key={index}/>))
            }
         </div>
        </div>
    </div>
    </div>
  )
}

export default ChannelHome