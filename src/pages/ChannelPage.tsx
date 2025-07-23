import { useParams } from 'react-router-dom';
import { BsDot} from 'react-icons/bs';
import { useEffect,  useState } from 'react';
import ChannelVideos from '../component/sections/channel/ChannelVideos';
import ChannelHome from '../component/sections/channel/ChannelHome';
import ChannelPlayList from '../component/sections/channel/ChannelPlayList';
import { useGetPublicChannelQuery } from '../redux/features/channel/channel.api';
import { formatNumber } from '../helpers';
import ToggleSubscribe from '../component/ui/ToggleSubscribe';
import ChannelAbout from '../component/sections/channel/ChannelAbout';

const ChannelPage = () => {
  const { username } = useParams();
  const tabs = ['Home', 'Videos', 'Playlist','About'];
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscriberCount] = useState(0);
  const { data, isLoading, error } = useGetPublicChannelQuery(username!);

  const channel = data?.data;

  useEffect(() => {
    if (channel) {
      setIsSubscribed(channel.isSubscribed);
      setSubscriberCount(channel.subscribersCount);
    }
  }, [channel]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (error || !channel) {
    return <p>Something went wrong</p>;
  }

  const onToggleSubscribe = (st: boolean) => {
    if (st) setSubscriberCount(p => p + 1);
    else setSubscriberCount(p => p - 1);
  };

  return (
    <div>
      <div>
        <img
          src={
            channel.profileCoverPhotoUrl ||
            'https://img.freepik.com/free-vector/abstract-colorful-shapes-background_361591-2848.jpg'
          }
          alt=""
          className="rounded-lg object-cover w-full max-h-72"
        />
      </div>
      <div className="mt-10 flex md:flex-row flex-col lg:items-center gap-1 md:gap-3">
        <img src={channel.profilePhotoUrl} className=" size-32 lg:size-40 rounded-full" />
        <div>
          <h1 className="text-3xl font-semibold  font-primary">{channel.name}</h1>
          <div className="mt-3 space-y-2">
            <p className="flex items-center gap-1">
              <span className="text-black font-medium">{channel.uniqueName}</span>{' '}
              <span className="text-gray-700">
                <BsDot className="inline " />
              </span>
              <span className="text-gray-800">{formatNumber(subscribersCount)} Subscribers</span>{' '}
              <span className="text-gray-700">
                <BsDot className="inline " />
              </span>
              <span className="text-gray-800">{channel._count.videos} Videos</span>
            </p>
            {channel.about ? (
              <p className=" line-clamp-1 w-10/12 text-gray-800">{channel.about}</p>
            ) : (
              <p className="text-secondary">
                "Hey everyone! Enjoy the content — like, subscribe, and share it with your friends
                😊😊"
              </p>
            )}

            <ToggleSubscribe
              channelId={channel.id}
              subscribed={channel.isSubscribed}
              onToggle={onToggleSubscribe}
            />
          </div>
        </div>
      </div>

      {channel._count.videos > 0 ? (
        // Tab container c
        <div>
          {/* Tabs */}
          <div
            className={`mt-10 border-b border-gray-700/20  channel__tab  active${activeTabIdx + 1}`}
          >
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
          <div className="py-5 md:py-10 min-h-[40vh]">
            {activeTabIdx === 0 ? (
              <ChannelHome />
            ) : activeTabIdx === 1 ? (
              <ChannelVideos channelId={channel.id}/>
            ) : activeTabIdx === 2 ? (
              <ChannelPlayList />
            ) : <ChannelAbout channel={channel}/>}
          </div>
        </div>
      ) : (
        //  Channel is empty message
        <div className=' min-h-[60vh] flex flex-col justify-center items-center'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/dog-recording-with-video-camera-illustration-download-in-svg-png-gif-file-formats--no-available-not-found-empty-search-query-state-featuring-an-adorable-theme-pack-user-interface-illustrations-11614300.png" alt="" />
          <p className=' font-primary text-2xl  md:text-3xl font-semibold text-center mt-4 text-gray-600'>This channel have no contents</p>
        </div>

      )}
    </div>
  );
};

export default ChannelPage;
