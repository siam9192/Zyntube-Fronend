import React from 'react'
import Avatar from '../ui/Avatar'
import { GoHome } from 'react-icons/go'
import {  IoExitOutline, IoVideocamOutline } from 'react-icons/io5'
import { SiGoogleanalytics } from "react-icons/si";
import { Link, useLocation } from 'react-router-dom'
import { BiCustomize } from 'react-icons/bi'
import { HiOutlineUserGroup } from 'react-icons/hi'

function StudioSidebar() {
      const routes =  [
            {
                title:"Content",
                icon:IoVideocamOutline,
                href:'/studio'
            },
            {
                title:"Customization",
                icon:BiCustomize,
                href:'/studio/customize-channel'
            },
            {
                title:"My Subscribers",
                icon:HiOutlineUserGroup,
                href:'/studio/subscribers'
            },
            {
                title:"Channel Analysis",
                icon:SiGoogleanalytics,
                href:'/studio/channel-analysis'
            },

        ]

        const {pathname} = useLocation()
  return (
    <div className='py-3 px-2 border-r h-full border-r-gray-700/10'>
       <div>
       <Avatar url='https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj' className=' lg:size-20 xl:size-32 rounded-full mx-auto'/>
        <p className='text-center font-medium mt-2'>Your profile</p>
        <p className='text-gray-800 text-center text-sm'>Excited boy Gaming</p>
       </div>
       <div  className="space-y-2 w-full p-3 border-t border-gray-700/10 mt-4">
            {
             routes.map(route=>(
                    <Link to={route.href} key={route.title}  className="block w-full" >
                    <button className={`flex lg:justify-center xl:justify-start  items-center gap-3 lg:p-4 xl:rounded-md rounded-full xl:px-2 xl:py-3 hover:bg-gray-50 ${pathname === route.href ? "bg-gray-100 ":''} xl:hover:rounded-md lg:mx-auto xl:w-full `}>
                        <span className="text-2xl">
                            <route.icon/>
                        </span>
                        <p className=" font-secondary lg:hidden xl:block ">{route.title}</p>
                    </button>
                     </Link>
                ))
            }
        </div>
        <div  className="space-y-2 w-full p-3 border-t border-gray-700/10 mt-4">
        
        <button className="flex lg:justify-center xl:justify-start  items-center gap-3 px-2 py-3 hover:bg-gray-50 hover:rounded-md w-full">              <span className="text-2xl">
                        <IoExitOutline />
                        </span>
                        <p className=" font-secondary lg:hidden xl:block ">Exit Studio</p>
                    </button>
                    
        </div>
    </div>
  )
}

export default StudioSidebar