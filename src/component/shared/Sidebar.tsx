import { AiOutlineHistory, AiOutlineLike } from "react-icons/ai"
import { BsCollectionPlay, BsQuestionCircle } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { FaRegFlag } from "react-icons/fa"
import { GoHome } from "react-icons/go"
import { IoBookmarkOutline, IoCalendarClearOutline, IoFlagOutline, IoSettingsOutline, IoTrendingUpSharp } from "react-icons/io5"
import { LuFolder } from "react-icons/lu"
import { Link } from "react-router-dom"
import SignInButton from "../ui/SignInButton"

const Sidebar = () => {
    const baseicRoutes =  [
        {
            title:"Home",
            icon:GoHome,
            href:''
        },
        {
            title:"Trending",
            icon:IoTrendingUpSharp,
            href:''
        },
        {
            title:"Subscriptions",
            icon:BsCollectionPlay,
            href:''
        },
        {
            title:"Library",
            icon:LuFolder,
            href:''
        },
        {
            title:"History",
            icon:IoCalendarClearOutline,
            href:''
        },
        {
            title:"Watch Later",
            icon:AiOutlineHistory ,
            href:''
        },
        {
            title:"Liked Videos",
            icon:AiOutlineLike,
            href:''
        },
    ]
    const supportRoutes =  [
        {
            title:"Setting",
            icon:IoSettingsOutline,
            href:''
        },
        {
            title:"Report History",
            icon:IoFlagOutline,
            href:''
        },
        {
            title:"Help",
            icon:BsQuestionCircle,
            href:''
        },
        {
            title:"Send Feedback",
            icon:FaRegFlag,
            href:''
        },
      
    ]
  return (
    <div className="h-full overflow-y-auto  w-full hide-scrollbar ">
        <div  className="space-y-2 w-full p-3">
            {
              baseicRoutes.map(route=>(
                    <Link to='' key={route.title}  className="block w-full" >
                    <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 hover:rounded-md w-full">
                        <span className="text-2xl">
                            <route.icon/>
                        </span>
                        <p className=" font-secondary lg:hidden xl:block ">{route.title}</p>
                    </button>
                     </Link>
                ))
            }
        </div>
        <div className="p-5  border-t border-b border-gray-400/20 lg:hidden xl:block">
         <p className="font-secondary text-gray-800">Signin to like videos,comments and subscribe.</p>
     <SignInButton/>
        </div>
        <div className="p-3  border-t border-b border-gray-400/20 lg:hidden xl:block">
            <h3 className="text-lg font-medium">Subscribed Channels</h3>
            <div className="mt-3 space-y-4">
                {
                    Array.from({length:5}).map((_,index)=>(
                      <Link to="" >
                       <div className="flex items-center gap-2 hover:bg-gray-100 hover:rounded-md p-2 " key={index}>
                            <img  src="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj" alt=""   className="size-10 rounded-full outline-2 outline-offset-1 outline-primary"/>
                            <p className="font-medium">
                                Excited Boy Gaming
                            </p>
                        </div> 
                      </Link>
                    ))
                }
            </div>
        </div>
        <div className="p-3">
        <h3 className="text-lg font-medium lg:hidden xl:block">Support By ZynTube</h3>
        <div  className="space-y-2 mt-3">
            {
                supportRoutes.map(route=>(
                    <Link to='' key={route.title}  className="block w-full" >
                    <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 hover:rounded-md w-full">
                        <span className="text-2xl">
                            <route.icon/>
                        </span>
                        <p className=" font-secondary lg:hidden xl:block ">{route.title}</p>
                    </button>
                     </Link>
                ))
            }
        </div>
        </div>
    </div>
  )
}

export default Sidebar