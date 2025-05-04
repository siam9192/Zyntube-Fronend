import React from 'react'
import { HiDotsVertical } from 'react-icons/hi'

interface IProps {
    className?:string
}

const VideoCardShortOptions = ({className}:IProps) => {
  return (
   <button className={className||"text-2xl"}>
    <HiDotsVertical />
   </button>
  )
}

export default VideoCardShortOptions