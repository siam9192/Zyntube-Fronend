import React, { useEffect, useRef, useState } from 'react'
interface IProps {
  index:number,
  activeIndex:number,
  onClick:(index:number)=>void,
  name:string
}
function CategoryCarouselButton({index,activeIndex,onClick,name}:IProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [width,setWidth] = useState(100)
    useEffect(()=>{
      if(ref.current)setWidth(ref.current.clientWidth)
    },[ref.current])
  
  return (
    <button ref={ref} onClick={()=>onClick(index)}  className={`px-4 py-2 max-w-[150px]   ${activeIndex === index ? 'bg-black text-white':' bg-gray-100'} rounded-md   absolute   text-nowrap overflow-hidden  duration-200`} style={{transform:`translateX(-${(activeIndex*170)}px)` ,left:`${(index*170)}px`} }  >
            {name}
        </button>
  )
}

export default CategoryCarouselButton