import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlinePublic } from 'react-icons/md'

const ContentTableCard = () => {
    const [isDropDownOpen,setIsDropDownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    
useEffect(()=>{
   const handler = (e:MouseEvent)=>{
       const target = e.target as Node
       const current = dropdownRef.current
       if(!current) return
 
      if(!current.contains(target)){
        setIsDropDownOpen(false)
      }
   }
   document.addEventListener("click",handler)
   
   return ()=>{
    document.removeEventListener("click",handler)
   }
 },[isDropDownOpen])

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" className="px-6 py-4  text-gray-900  dark:text-white min-w-[600px]">
       <div className='flex  items-center gap-4'>
        <img src="https://3.imimg.com/data3/BH/QL/MY-12724382/animation.jpg" alt="" className=' object-cover w-52 rounded-lg' />
        <div>
            <h4 className='text-[1.1rem] text-black font-primary font-medium line-clamp-2'>
            hol | Coke Studio Pakistan | Season 15 | Maanu x Annural Khalid
            </h4>
            <p className=' line-clamp-2  font-normal text-gray-700 text-[0.7rem mt-1 '>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores nemo voluptas, nesciunt provident hic cum commodi fuga ea adipisci error expedita recusandae consequatur nobis saepe, unde velit, nulla laborum soluta reprehenderit quidem numquam. Quos animi exercitationem ipsum quidem aliquam recusandae.
            </p>
        </div>
       </div>
    </th>
    <td className="px-6 py-4">
        <div className='flex items-center gap-1'>
            <span className='text-xl text-black'>
            <MdOutlinePublic />
            </span>
            <p className='text-black font-medium' >Public</p>
        </div>
    </td>
    <td className="px-6 py-4">
    <p className='text-black font-medium' >Draft</p>
    </td>
    <td className="px-6 py-4 min-w-[200px]">
            
            <p className='text-black font-medium' >{new Date().toDateString()}</p>
       
    </td>
    <td className="px-6 py-4 text-right ">
      <p className='text-black font-medium'>{(335534).toLocaleString()}</p>
    </td>
    <td className="px-6 py-4 text-right ">
      <p className='text-black font-medium'>{(3334).toLocaleString()}</p>
    </td>
    <td className="px-6 py-4 text-right ">
      <p className='text-black font-medium'>{(33234).toLocaleString()}</p>
    </td>
    <td className="px-6 py-4 text-right ">
      <p className='text-black font-medium'>{(534).toLocaleString()}</p>
    </td>
    <td className="px-6 py-4 text-right  relative">
     <button onClick={(e)=> {e.stopPropagation()
         setIsDropDownOpen(true)}} className='text-xl  text-black'>
     <HiOutlineDotsVertical />
     </button>
     
        <div ref={dropdownRef} className={`text-start absolute  right-0 w-40 min-h-20 bg-white  shadow-xl z-40 rounded-md p-5  space-y-2   gap-3 ${isDropDownOpen ? 'opacity-100':'opacity-0'} transition-all`}>
            <button className=' text-black font-medium block'>Edit This</button>
            <button className=' text-black font-medium  hover:text-red-500 block'>Delete</button>
        </div>
   
    
    </td>
</tr>
  )
}

export default ContentTableCard