import { BsDot } from 'react-icons/bs';
import VideoCardShortOptions from '../ui/VideoCardShortOptions';
import { Link } from 'react-router-dom';
import { IVideo } from '../../types/video.type';
import { secondsToDurationShort, timeAgo } from '../../helpers';
interface IProps {
  video: IVideo;
}
const VideoCard = ({ video }: IProps) => {
  const { media, channel } = video;
  const watchPath = `/watch/${video.id}`;
  return (
    <div className="bg-white relative group">
      <Link to={watchPath}>
        <div className="relative">
          <img
            src={media.thumbnailUrl}
            alt=""
            className="h-52 w-full rounded-lg group-hover:hidden block"
          />
          <img
            src={`https://image.mux.com/${media.muxPlaybackId}/animated.gif?width=320&end=10&fps=15&height=320`}
            alt=""
            className="h-52 w-full rounded-lg hidden group-hover:block group-hover:rounded-none duration-100"
          />

          <p className="p-1 rounded-sm text-sm scale-80 bg-primary text-white absolute bottom-2 right-1">
            {secondsToDurationShort(video.duration)}
          </p>
        </div>
      </Link>
      <Link to={watchPath}>
        <div className="mt-3 px-2 flex gap-2">
          <img src={channel.profilePhotoUrl} alt="" className="size-10 rounded-full" />
          <div>
            <h3 className=" font-medium  text-gray-900">{video.title}</h3>
            <div className="mt-2">
              <Link to="/">
                <p className="text-gray-800">{channel.name}</p>
              </Link>
              <p className="text-gray-800 text-sm">
                <span>4.3M views</span>{' '}
                <span>
                  <BsDot className="inline" />
                </span>{' '}
                <span>{timeAgo(video.createdAt)}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
      <VideoCardShortOptions btnClassName = {"absolute right-0 bottom-2 text-xl p-2 hover:bg-secondary hover:rounded-full hover:text-white"} />
    </div>
  );
};

export default VideoCard;
