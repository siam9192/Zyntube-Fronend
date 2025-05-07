import { BsCollectionPlay } from 'react-icons/bs';
import Container from '../../component/container/Container';
import { GoBookmark } from 'react-icons/go';
import { LuHistory, LuSquarePlay } from 'react-icons/lu';
import { BiLike, BiSolidPlaylist } from 'react-icons/bi';
import { PiFilmSlateDuotone } from 'react-icons/pi';

export const AccountPage = () => {
  const routes = [
    {
      title: 'Subscriptions',
      total: 50,
      icon: BsCollectionPlay,
      path: '/history',
    },
    {
      title: 'My Videos',
      total: 23,
      icon: LuSquarePlay, // optional icon (could be component if using something like Lucide or FontAwesome)
      path: '/my-videos',
    },
    {
      title: 'My Playlists',
      total: 23,
      icon: BiSolidPlaylist,
      path: '/my-playlists',
    },
    {
      title: 'Watch Later',
      total: 10,
      icon: PiFilmSlateDuotone,
      path: '/watch-later',
    },
    {
      title: 'Liked Videos',
      total: 15,
      icon: BiLike,
      path: '/liked-videos',
    },

    {
      title: 'History',
      total: 50,
      icon: LuHistory,
      path: '/history',
    },
  ];

  return (
    <Container>
      <div className="py-6 px-2">
        <h1 className="text-3xl font-medium font-primary">My Account</h1>
        <div className="md:mt-10 mt-8">
          <div className="flex md:flex-row flex-col  md:gap-7 gap-4">
            <img
              src="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj"
              alt=""
              className="md:size-40 size-32 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold">Excited boy Gaming</h2>
              <p className=" font-medium text-black">{(334566).toLocaleString()} Subscribers</p>

              <p className="md:mt-2 mt-1 font-medium text-gray-800">@yeugek33</p>
              <p className="font-medium text-gray-800">siamhasan252@gmail.com</p>

              <div className="md:mt-3 mt-2 flex items-center  gap-2">
                <button className="px-8  py-2 font-medium  border-2  border-gray-700/20 rounded-full   hover:bg-primary hover:border-none">
                  Visit My Channel
                </button>
                <button className="px-8  py-2 font-medium  border-2  border-gray-700/20 rounded-full   hover:bg-primary hover:border-none md:inline hidden">
                  Go Home
                </button>
                <button className="px-6  py-2 font-medium  border-2 bg-red-500  text-white rounded-full ">
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold font-primary">My Contents</h2>
            <div className="mt-5 grid lg:grid-cols-3 grid-cols-2  md:gap-8 gap-5">
              {routes.map(route => (
                <div
                  key={route.title}
                  className="flex flex-col justify-center items-center p-5 border-2 border-gray-800/20 rounded-lg relative hover:bg-gray-100  hover:border-secondary"
                >
                  <span className="md:text-[100px] text-[80px]">
                    <route.icon />
                  </span>
                  <p className="font-medium text-center mt-2 ">{route.title}</p>
                  <div className="size-8 flex justify-center items-center text-sm rounded-full bg-primary text-white absolute top-2 right-2">
                    {route.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold font-primary">
              Help <span className="text-primary">&</span> Supports
            </h2>
            <div className="mt-5 grid lg:grid-cols-3 grid-cols-2  md:gap-8 gap-5">
              {routes.map(route => (
                <div
                  key={route.title}
                  className="flex flex-col justify-center items-center p-5 border-2 border-gray-800/20 rounded-lg relative hover:bg-gray-100  hover:border-secondary"
                >
                  <span className="md:text-[100px] text-[80px]">
                    <BsCollectionPlay />
                  </span>
                  <p className="font-medium text-center mt-2 ">{route.title}</p>
                  <div className="size-8 flex justify-center items-center text-sm rounded-full bg-primary text-white absolute top-2 right-2">
                    {route.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
