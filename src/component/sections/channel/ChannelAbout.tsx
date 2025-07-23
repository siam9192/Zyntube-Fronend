import {IPublicChannel } from "../../../types/channel.type"
import { TiWorldOutline } from "react-icons/ti";
import { RxVideo } from "react-icons/rx";
import { LuEye } from "react-icons/lu";
import { HiUserGroup } from "react-icons/hi";

interface IProps {
    channel:IPublicChannel
}

function ChannelAbout({channel}:IProps) {
    const about = channel.about
  return (
    <div className="lg:w-1/2">
        <p className="text-gray-900">
            {
                about && about.length ? about :'This channel has no description yet.'
            }
        </p>
        <div className="mt-5 space-y-1">
         <div className="flex items-center gap-2 font-medium text-gray-700">
            <span className="text-2xl">
                <TiWorldOutline />
            </span>
            <p>Bangladesh</p>
         </div>
             <div className="flex items-center gap-2  font-medium text-gray-700">
            <span className="text-xl">
                <RxVideo />
            </span>
            <p>220 Videos</p>
         </div>
                   <div className="flex items-center gap-2  font-medium text-gray-700">
            <span className="text-xl">
               <HiUserGroup />
            </span>
            <p>76743378638 Subscribers</p>
         </div>
                   <div className="flex items-center gap-2  font-medium text-gray-700">
            <span className="text-xl">
             <LuEye />
            </span>
            <p>19829376363 Views</p>
         </div>
        </div>
    </div>
  )
}

export default ChannelAbout