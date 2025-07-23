import { Link } from 'react-router-dom'
import { IMyChannelSubscribe } from '../../types/channel-subscribe.type'
interface IProps {
  subscribe:IMyChannelSubscribe
}
function SubscribeChannelSidebarCard({subscribe}:IProps) {
  const {channel} =  subscribe
  return (
          <Link to="">
              <div
                className="flex items-center gap-2 hover:bg-gray-100 hover:rounded-md p-2 "
              >
                <img
                  src={channel.profilePhotoUrl}
                  alt=""
                  className="size-10 rounded-full outline-2 outline-offset-1 outline-primary"
                />
                <p className="font-medium line-clamp-1">{channel.name}</p>
              </div>
            </Link>
  )
}

export default SubscribeChannelSidebarCard