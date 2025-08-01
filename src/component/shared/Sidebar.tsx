import { AiOutlineHistory, AiOutlineLike } from 'react-icons/ai';
import { BsCollectionPlay, BsQuestionCircle } from 'react-icons/bs';
import { FaRegFlag } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import {
  IoCalendarClearOutline,
  IoFlagOutline,
  IoSettingsOutline,
  IoTrendingUpSharp,
} from 'react-icons/io5';
import { LuFolder } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import SignInButton from '../ui/SignInButton';
import { useGetMySubscribesQuery } from '../../redux/features/channel-subscibe/channel-subscibe.api';
import SubscribeChannelSidebarCard from '../cards/SubscribeChannelSidebarcard';
import SubscribeChannelLoadingSidebarCard from '../cards/SubscribeChannelLoadingSidebarCard';
import useLoadingBounce from '../../hooks/useLoadingBounce';
import useCurrentUser from '../../hooks/useCurrentUser';
interface IProps {
  expand: boolean;
}
const Sidebar = ({ expand }: IProps) => {
  const baseicRoutes = [
    {
      title: 'Home',
      icon: GoHome,
      href: '',
    },
    {
      title: 'Trending',
      icon: IoTrendingUpSharp,
      href: '',
    },
    {
      title: 'Subscriptions',
      icon: BsCollectionPlay,
      href: '',
    },
    {
      title: 'Library',
      icon: LuFolder,
      href: '',
    },
    {
      title: 'History',
      icon: IoCalendarClearOutline,
      href: '',
    },
    {
      title: 'Watch Later',
      icon: AiOutlineHistory,
      href: '',
    },
    {
      title: 'Liked Videos',
      icon: AiOutlineLike,
      href: '',
    },
  ];
  const supportRoutes = [
    {
      title: 'Setting',
      icon: IoSettingsOutline,
      href: '',
    },
    {
      title: 'Report History',
      icon: IoFlagOutline,
      href: '',
    },
    {
      title: 'Help',
      icon: BsQuestionCircle,
      href: '',
    },
    {
      title: 'Send Feedback',
      icon: FaRegFlag,
      href: '',
    },
  ];

  const {data,isLoading:isMySubscribesLoading} = useGetMySubscribesQuery([
    {
      name:'limit',
      value:6
    },
    {
      name:'sortBy',
      value:'createdAt'
    },
     {
      name:'sortOrder',
      value:'desc'
    }
  ])
  
  const {isUserExist} = useCurrentUser()

  const subscribes =  data?.data
  const mySubscribesBouncedLoading = useLoadingBounce(isMySubscribesLoading,1000)


  return (
    <div className="h-full overflow-y-auto  w-full hide-scrollbar ">
      <div className="space-y-2 w-full p-3">
        {baseicRoutes.map(route => (
          <Link to="" key={route.title} className="block w-full">
            <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 hover:rounded-md w-full">
              <span className="text-2xl">
                <route.icon />
              </span>
              <p className=" font-secondary lg:hidden xl:block ">{route.title}</p>
            </button>
          </Link>
        ))}
      </div>
  {
    !isUserExist ?
        <div className="p-5  border-t border-b border-gray-400/20 lg:hidden xl:block">
        <p className="font-secondary text-gray-800">
          Signin to like videos,comments and subscribe.
        </p>
        <SignInButton />
      </div>
      :
      null
  }
   {
    isUserExist ?
       <div className="p-3 min-h-32 border-t border-b border-gray-400/20 lg:hidden xl:block">
        <h3 className="text-lg font-medium">Subscribed Channels</h3>
        <div className="mt-3 space-y-4">
        {
         mySubscribesBouncedLoading?
          Array.from({length:6}).map((_,index)=><SubscribeChannelLoadingSidebarCard key={index}/>)
         :
         subscribes?.length ?
          subscribes?.map(subscribe=>(
            <SubscribeChannelSidebarCard subscribe={subscribe} key={subscribe.id}/>
          ))
          :
          <p className='text-sm text-center mt-5'>You have no subscribes</p>
        
        }
        </div>
      </div>
      :
      null
   }
      <div className="p-3">
        <h3 className="text-lg font-medium lg:hidden xl:block">Support By ZynTube</h3>
        <div className="space-y-2 mt-3">
          {supportRoutes.map(route => (
            <Link to="" key={route.title} className="block w-full">
              <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 hover:rounded-md w-full">
                <span className="text-2xl">
                  <route.icon />
                </span>
                <p className=" font-secondary lg:hidden xl:block ">{route.title}</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
