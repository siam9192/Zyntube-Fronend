import React from 'react'
import { BsDot } from 'react-icons/bs'
import VideoCardShortOptions from '../ui/VideoCardShortOptions'
import { Link } from 'react-router-dom'

const VideoCard = () => {
  return (
    <div className='bg-white relative group'>
     <Link to="/watch">
     <div className='relative'>
       <img src="https://res.cloudinary.com/ddlfpv4gl/image/upload/v1724258429/images/rgnshssq3tb4umregfj8.png" alt="" className=' h-60 lg:h-52 w-full rounded-lg group-hover:hidden block' />
       <img src="https://64.media.tumblr.com/0f7f92a7b776d46633c1e439ef6a877c/tumblr_inline_o0lu2nvsg41to8h2v_500.gif" alt="" className=' h-60 lg:h-52 w-full rounded-lg hidden group-hover:block group-hover:rounded-none duration-100' />
       
       <p className='p-1 rounded-sm text-sm scale-80 bg-primary text-white absolute bottom-2 right-1'>10:20</p>
       </div>
     </Link>
      <Link to='/watch'>
      <div className='mt-3 px-2 flex gap-2'>
         <img src="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj" alt="" className='size-10 rounded-full' />
         <div>
            <h3 className=' font-medium  text-gray-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, explicabo?</h3>
            <div className='mt-2'>
            <Link to='/'>
            <p className='text-gray-800'>Excited boy Gaming</p>
            </Link>
                <p className='text-gray-800 text-sm'><span>4.3M views</span> <span><BsDot className='inline' /></span> <span>4 days ago</span></p>
            </div>
         </div>
        </div>
      </Link>
       <VideoCardShortOptions className='absolute right-0 bottom-2 text-xl p-2 hover:bg-secondary hover:rounded-full hover:text-white'/>
    </div>
  )
}

export default VideoCard