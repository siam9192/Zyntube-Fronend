import { BsDot } from 'react-icons/bs';
import VideoCardShortOptions from '../ui/VideoCardShortOptions';
import { Link } from 'react-router-dom';
import { IPublicVideo } from '../../types/video.type';
import { formatNumber, secondsToDurationShort, timeAgo } from '../../helpers';

interface IProps {
  video:IPublicVideo
}
const ChannelVideoCard = ({video}:IProps) => {
  const {channel,media} = video
  return (
    <div className="bg-white relative group w-full">
      <Link to="/watch">
          <div className="relative">
          <img
            src={media.thumbnailUrl}
            alt=""
            className="h-52  w-full rounded-lg group-hover:hidden block"
          />
          <img
            src={`https://image.mux.com/${media.muxPlaybackId}/animated.gif?width=320&end=10&fps=15&height=320`}
            alt=""
            className="h-52  w-full rounded-lg hidden group-hover:block group-hover:rounded-none duration-100"
          />

          <p className="p-1 rounded-sm text-sm scale-80 bg-primary text-white absolute bottom-2 right-1">
            {secondsToDurationShort(video.duration)}
          </p>
        </div>
      </Link>
      <Link to="/watch">
        <div className="mt-3 px-2 ">
               <h3 className=" font-medium  text-gray-900">{video.title}</h3>
              <div className="mt-2">
              <Link to="/">
                <p className="text-gray-800">{channel.name}</p>
              </Link>
              <p className="text-gray-800 text-sm">
                <span>{formatNumber(video.state.viewsCount)} views</span>{' '}
                <span>
                  <BsDot className="inline" />
                </span>{' '}
                <span>{timeAgo(video.createdAt)}</span>
              </p>
            </div>
        </div>
      </Link>
      <div className="absolute right-0 bottom-2 ">
        <VideoCardShortOptions />
      </div>
    </div>
  );
};

export default ChannelVideoCard;
