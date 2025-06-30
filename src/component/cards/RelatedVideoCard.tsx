import React from 'react';
import { IWatchVideo } from '../../types/video.type';
import { BsDot } from 'react-icons/bs';
import VideoCardShortOptions from '../ui/VideoCardShortOptions';
import { formatNumber, secondsToDurationShort, timeAgo } from '../../helpers';
import { Link } from 'react-router-dom';
interface IProps {
  video: IWatchVideo;
}
function RelatedVideoCard({ video }: IProps) {
  const { channel, state, media } = video;
  let title = video.title;
  title = title.length > 50 ? title.slice(0, 50) + '...' : title;
  let channelName = channel.name;
  channelName = channelName.length > 20 ? channelName.slice(0, 20) + '..' : channelName;

  const watchPath = `/watch/${video.id}`;

  return (
    <div className="relative group">
      <Link to={watchPath}>
        <div className="flex md:flex-row flex-col gap-4 ">
          <div className="lg:w-[40%] md:size-52 w-full md:h-full relative">
            <img
              src={media.thumbnailUrl}
              className="rounded-md  h-52 lg:h-20 xl:h-full  w-full   object-cover group-hover:hidden"
            />
            <img
              src={`https://image.mux.com/${media.muxPlaybackId}/animated.gif?end=10&fps=15`}
              alt=""
              className=" rounded-md h-52 lg:h-20 xl:h-full  w-full  object-cover hidden group-hover:block  "
            />

            <p className="p-1 rounded-sm text-sm scale-80 bg-primary text-white absolute bottom-2 right-1">
              {secondsToDurationShort(video.duration)}
            </p>
          </div>
          <div className="w-[60%]">
            <h4 className="text-black font-semibold text-[0.9rem]">{title}</h4>
            <div className="xl:mt-4 lg:mt-2 font-primary">
              <p className="text-sm text-gray-700">{channelName}</p>
              <p className="text-gray-700 text-xs mt-0.5">
                <span>{formatNumber(state.viewsCount)} views</span>{' '}
                <span>
                  <BsDot className="inline" />
                </span>{' '}
                <span>{timeAgo(video.createdAt)}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
      <VideoCardShortOptions btnClassName="absolute right-0 bottom-0  p-2 hover:bg-secondary hover:rounded-full hover:text-white" />
    </div>
  );
}

export default RelatedVideoCard;
