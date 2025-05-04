import React, { useState } from 'react'
import { LuSearch } from 'react-icons/lu'

const MySubscribers = () => {
  const [activeIndex,setActiveIndex] = useState(0);
  const tabs = [
 "Latest","Oldest","Name A-Z","Name Z-A"
  ]
  return (
    <div>
    <h1 className='md:text-3xl text-2xl text-black font-semibold font-primary'>
     Subscribers
    </h1>
    <div className='mt-5 flex lg:flex row flex-col lg:items-center justify-between lg:gap-0 gap-2'>
          <div className="lg:w-1/3 w-full flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-md relative ">
              <span className="text-2xl text-gray-600">
              <LuSearch />
              </span>
                  <input  type="text" placeholder="Search.." className="w-full text-black  border-none outline-none " />
            </div>
            <div>
              <p className='text-xl  lg:text-start text-end'>
             <span className='text-primary'>
             {(763738).toLocaleString()}</span> Subscribers
              </p>
            </div>
    </div>
    <div>
            <div className='mt-5 flex items-center gap-2 mb-5 categories_tab_container'>
          {
  tabs.slice(0,12).map((tab,index)=><button onClick={()=>setActiveIndex(index)} className={` tab__btn whitespace-nowrap px-6 py-2 ${index === activeIndex ? ' active ':'bg-gray-100'} rounded-md`}>
    {tab}
  </button>)
}
          </div>
            </div>
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-5'>
     {
        Array.from({length:30}).map((sub,indx)=>(
            <div key={indx} className='flex  flex-col md:flex-row  gap-2 md:p-5 p-2 border-2 rounded-md border-gray-600/10'>
            <img src="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj" alt="" className='size-12 rounded-full' />
          <div>
          <p className='font-medium text-lg '>
                Excited boy gaming
            </p>
            <p className='font-medium  text-gray-600'>120K</p>
            <p className='text-sm text-gray-700 '>
                Since 10,2,2014
            </p>
          </div>
            </div>
        ))
     }
    </div>
    </div>
  )
}

export default MySubscribers