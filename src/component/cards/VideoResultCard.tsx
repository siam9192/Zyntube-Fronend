import { secondsToDurationShort, timeAgo } from '../../helpers';
import { IPublicVideo } from '../../types/video.type';
import VideoCardShortOptions from '../ui/VideoCardShortOptions';
interface IProps {
  video: IPublicVideo;
}
function VideoResultCard({ video }: IProps) {
  const { media, channel } = video;
  return (
    <div key={video.id} className="relative">
      <div className="flex gap-2 md:gap-5 ">
        <div className=" group w-[40%]    relative  h-fit">
          <img
            src={media.thumbnailUrl}
            alt=""
            className="rounded-lg object-cover w-full   md:h-[200px] lg:h-[280px]  group-hover:hidden"
          />
          <img
            src={`https://image.mux.com/${media.muxPlaybackId}/animated.gif`}
            alt=""
            className="rounded-lg object-cover  w-full  md:h-[200px] lg:h-[280px]  group-hover:block hidden"
          />
          <p className="p-1 rounded-sm text-sm scale-80 bg-primary text-white absolute bottom-2 right-1">
            {secondsToDurationShort(video.duration)}
          </p>
        </div>
        <div className=" w-[60%] md:pr-5 pr-3 ">
          <div className="grow">
            <p className=" md:text-lg line-clamp-2">{video.title}</p>
            <p className=" text-xs md:text-sm text-gray-600">
              1M views . {timeAgo(video.createdAt)}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mt-2 md:mt-5">
              <img
                className=" size-6 md:size-8 rounded-full"
                src={channel.profilePhotoUrl}
                alt=""
              />
              <p className=" text-xs md:text-sm text-gray-600">{channel.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1 right-0">
        <VideoCardShortOptions btnClassName="text-xl hover:text-primary" />
      </div>
    </div>
  );
}

export default VideoResultCard;
