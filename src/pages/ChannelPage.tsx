import { useParams } from 'react-router-dom';
import Avatar from '../component/ui/Avatar';
import { BsDot, BsPatchCheckFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import ChannelVideos from '../component/sections/channel/ChannelVideos';
import ChannelHome from '../component/sections/channel/ChannelHome';
import ChannelPlayList from '../component/sections/channel/ChannelPlayList';

const ChannelPage = () => {
  const { username } = useParams();
  const tabs = ['Home', 'Videos', 'Playlist'];

  const [activeTabIdx, setActiveTabIdx] = useState(0);

  return (
    <div>
      <div>
        <img
          src="https://yt3.googleusercontent.com/db50V23Lm0x3VOvJDfIXYtCkrJdaw22a2zagCPRgPSa3NWQK9auGDb8uhtjTOgFsmF4LODFDTw=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          alt=""
          className="rounded-lg"
        />
      </div>
      <div className="mt-10 flex items-center gap-3">
        <Avatar
          url="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj"
          className="size-40 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-semibold  font-primary">
            Excited Boy Gaming{' '}
            <span className="text-2xl">
              <BsPatchCheckFill className="inline" color="" />
            </span>
          </h1>
          <div className="mt-3 space-y-2">
            <p className="flex items-center gap-1">
              <span className="text-black font-medium">@excitedboy783</span>{' '}
              <span className="text-gray-700">
                <BsDot className="inline " />
              </span>
              <span className="text-gray-800">12K Subscribers</span>{' '}
              <span className="text-gray-700">
                <BsDot className="inline " />
              </span>
              <span className="text-gray-800">120 Videos</span>
            </p>
            <p className=" line-clamp-1 w-10/12 text-gray-800">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illum dignissimos,
              quam quidem dolorum consequuntur suscipit pariatur harum beatae tempore!
            </p>

            <button className="px-8 py-2 bg-black  text-white rounded-full">Subscribe</button>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className={`mt-10 border-b border-gray-700/20  channel__tab  active${activeTabIdx + 1}`}>
        {tabs.map((tab, index) => (
          <button
            onClick={() => setActiveTabIdx(index)}
            key={tab}
            className={`px-4 py-2  font-medium font-primary`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active tab visible here.. */}
      <div className="py-10 min-h-[40vh]">
        {activeTabIdx === 0 ? (
          <ChannelHome />
        ) : activeTabIdx === 1 ? (
          <ChannelVideos />
        ) : activeTabIdx === 2 ? (
          <ChannelPlayList />
        ) : null}
      </div>
    </div>
  );
};

export default ChannelPage;
