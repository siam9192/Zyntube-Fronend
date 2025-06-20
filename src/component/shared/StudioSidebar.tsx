import Avatar from '../ui/Avatar';
import { IoExitOutline, IoVideocamOutline } from 'react-icons/io5';
import { SiGoogleanalytics } from 'react-icons/si';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiCustomize } from 'react-icons/bi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useAppSelector } from '../../redux/hook';

interface IProps {
  isExpand?: boolean;
}
function StudioSidebar({ isExpand }: IProps) {
  const routes = [
    {
      title: 'Content',
      icon: IoVideocamOutline,
      href: '/studio',
    },
    {
      title: 'Customization',
      icon: BiCustomize,
      href: '/studio/customize-channel',
    },
    {
      title: 'My Subscribers',
      icon: HiOutlineUserGroup,
      href: '/studio/subscribers',
    },
    {
      title: 'Channel Analysis',
      icon: SiGoogleanalytics,
      href: '/studio/channel-analysis',
    },
  ];

  const { pathname } = useLocation();

  const { user } = useCurrentUser();

  const channel = user!.app.channel;

  return (
    <div className="py-3 px-2 lg:border-r h-full border-r-gray-700/10 w-full lg:w-fit ">
      <div>
        <Avatar
          url={channel.profilePhotoUrl}
          className={`outline-2 outline-primary outline-offset-1 ${isExpand ? 'lg:size-24 xl:size-32 size-20' : 'size-10'} rounded-full mx-auto`}
        />
        {isExpand ? (
          <>
            <p className="text-center font-medium mt-2">Your profile</p>
            <p className="text-gray-800 text-center text-lg md:text-xl">{channel.name}</p>
          </>
        ) : null}
      </div>
      <div className="space-y-2 w-full p-2 md:p-3 border-t border-gray-700/10 mt-4">
        {routes.map(route => (
          <Link to={route.href} key={route.title} className="block w-full">
            <button
              className={`flex lg:justify-center xl:justify-start  items-center gap-3 p-4 rounded-md  xl:px-2 xl:py-3 hover:bg-gray-50 ${pathname === route.href ? 'bg-gray-100 ' : ''} xl:hover:rounded-md lg:mx-auto xl:w-full  w-full`}
            >
              <span className="text-2xl">
                <route.icon />
              </span>
              {isExpand ? (
                <p className=" font-secondary lg:hidden xl:block ">{route.title}</p>
              ) : null}
            </button>
          </Link>
        ))}
      </div>
      <div className="space-y-2 w-full md:p-2 p-3 border-t border-gray-700/10 mt-4">
        <button className="flex lg:justify-center xl:justify-start  items-center gap-3 px-2 py-3 hover:bg-gray-50 hover:rounded-md w-full">
          {' '}
          <span className="text-2xl">
            <IoExitOutline />
          </span>
          {isExpand ? <p className=" font-secondary lg:hidden xl:block ">Exit Studio</p> : null}
        </button>
      </div>
    </div>
  );
}

export default StudioSidebar;
