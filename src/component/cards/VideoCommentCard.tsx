import React, { useState } from 'react'
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
import { PiThumbsDown, PiThumbsUp } from 'react-icons/pi'
import { BsReply } from 'react-icons/bs'
import {  HiOutlineDotsVertical } from 'react-icons/hi'
import CommentReplayBox from '../ui/CommentReplayBox'

function VideoCommentCard() {

  const [isReadMore,setIsReadMore] =  useState(false)
  const [isOptionOpen,setIsOptionOpen] = useState(true)
  const [isReplayBoxOpen,setIsReplayBoxOpen] = useState(false)
  const content = `A lot of people are not getting the video so here is an in depth explanation. Maanu (Male singer) gives his scarf to Annural (Female singer) when he sees that she is cold and it becomes a symbol of their love as she keeps it with her and wears it everywhere. Then we see Maanu start singing and drops the scarf as he enters the train and it starts moving and we get a transition through the window into the past which you will see is the event that led him to leave the scarf and board the train. Maanu and Annural are both performing at a nighclub and Maanu walks towards Annurals room and sees a man (Her assistant) come out and starts having negative thoughts but brushes them off and goes and talks to her then leaves to go perform. Annural puts on the scarf and heads towards the seating area to watch him before she goes on and we see that she sits next to another man that we learn is a friend of both (The same man we see at the bar with a jealous look on his face watching Maanu). The man bumps into another women before he sits down which leads that women to keep a close eye on him. Maanu finishes performing and walks towards their table where he sees a man (Annurals assistant) talking to her and again starts having negative thoughts (Which the jealous friend notices). Annural gets up to go perform and leaves the scarf. Maanu greets his friend and they both start watching Annural perform and we see a shot of the Jealous friend staring daggers at Maanu and then looks at the scarf and realizes he can ruin them by simply putting the scarf in her assistants room. As he does this the women who has been watching him sees everything. The friend comes back to Maanu and tells him he found her scarf in the assistants room and he should go check for himself (which he does). Maanu upset and hurt takes the scarf and leaves leading to the train scene. Annural sees him leaving but has to finish her performance and when she goes back to the room the unknown woman follows her and tells her everything so she runs to the train station and gets there seconds too late as she finds the scarf on the floor and Maanu already gone.

`



  return (
 <div >
   <div className='relative  p-2'>
     <div className='flex  gap-2'>
         <Avatar url='https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj' className='rounded-full size-10'/>
         <div>
     <div>
     <p>
      <Link to="">
      <span className='font-medium text-sm'>@ext682 </span>
      </Link>
       <span className='font-medium text-gray-600 font-secondary text-[0.9rem]'>10 months ago</span>
      </p>
    
      <p className={`mt-2 text-sm text-gray-800 ${isReadMore?'':'line-clamp-4'} `} dangerouslySetInnerHTML={{__html:content}}/>
      <button onClick={()=>setIsReadMore(!isReadMore)} className='text-secondary   font-medium text-sm'>
       {
        isReadMore ? 'Read less':'Read more'
       }
      </button>
      <div className='mt-2 flex items-center gap-3'>
        <button className='flex items-center gap-0.5'>
            <span className='text-xl text-black '>
            <PiThumbsUp />
            </span>
            <span className='text-sm text-gray-900'>
              40
            </span>
        </button>
        <button className='flex items-center gap-0.5'>
            <span className='text-xl text-black '>
            <PiThumbsDown />
            </span>
            <span className='text-sm text-gray-900'>
              402
            </span>
        </button>
        <button onClick={()=>setIsReplayBoxOpen(true)} className='flex items-center gap-0.5'>
            <span className='text-xl text-black '>
            <BsReply />
            </span>
            <span className='text-sm text-gray-900'>
            Replay
            </span>
        </button>
    </div>    
    {
    isReplayBoxOpen ? 
    <CommentReplayBox  onCancel={()=>setIsReplayBoxOpen(false)} />
    :
    null
  }   
     </div>
         </div>
    </div>
    <button className='absolute bottom-0 right-0 text-lg hover:text-primary'>
    <HiOutlineDotsVertical />
    </button>
  </div>
  
 </div>
  )
}

export default VideoCommentCard