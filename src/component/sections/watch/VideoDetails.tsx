import { useState } from 'react';
import { PiShareFat, PiThumbsDownDuotone, PiThumbsUpDuotone } from 'react-icons/pi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useWatchContext } from '../../../pages/WatchPage';
import ToggleSubscribe from '../../ui/ToggleSubscribe';
import { formatNumber } from '../../../helpers';
import { EVideoReactionType } from '../../../types/video-reaction.type';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { switchVideoReaction } from '../../../services/video-reaction.service';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '../../../utils/constant';

const VideoDetails = () => {
  const { video, setVideoState, videoState } = useWatchContext();
  const { channel, state } = video;
  const [isViewFull, setIsViewFull] = useState(false);
  const { isUserExist } = useCurrentUser();
  const reactionType = videoState.reactionType;

  let description = video.description;
  description = description?.replace(/#(\w+)/g, '<a href="#" class="tag">#$1</a>');
  description = description?.replace(
    /(https?:\/\/[^\s]+)/g,
    url => `<a class="description__url" href="${url}" target="_blank">${url}</a>`,
  );

  async function handelSwitchReaction(type: EVideoReactionType) {
    if (!isUserExist) {
      return;
    }

    const prevType = videoState.reactionType; // previous reaction (LIKE, DISLIKE, or null)
    const updateType = prevType === type ? null : type; // toggle logic

    let likes = videoState.likesCount;
    let dislikes = videoState.dislikesCount;

    if (prevType === EVideoReactionType.LIKE) {
      likes -= 1;
    }
    if (prevType === EVideoReactionType.DISLIKE) {
      dislikes -= 1;
    }

    if (updateType === EVideoReactionType.LIKE) {
      likes += 1;
    }
    if (updateType === EVideoReactionType.DISLIKE) {
      dislikes += 1;
    }
    setVideoState(state => ({
      ...state,
      reactionType: updateType,
      likesCount: likes,
      dislikesCount: dislikes,
    }));

    try {
      const response = await switchVideoReaction({ videoId: video.id, type: updateType });
      if (!response.success) {
        throw new Error();
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
      setVideoState(state => ({
        ...state,
        reactionType: prevType,
      }));
    }
  }

  async function handelToggleSubscribe(st: boolean) {
    console.log(st);
    let subscribersCount = videoState.subscribersCount;
    if (st) {
      subscribersCount += 1;
    } else {
      subscribersCount -= 1;
    }
    setVideoState(p => ({ ...p, isSubscriber: st, subscribersCount: subscribersCount }));
  }

  return (
    <div className="py-5">
      <h1 className="lg:text-2xl md:text-xl font-medium text-black">{video.title}</h1>
      <div className="mt-3">
        <div className="flex  md:flex-row flex-col justify-between md:items-center md:gap-0 gap-4">
          <div className="flex items-center gap-4 ">
            <img
              src={channel.profilePhotoUrl}
              alt=""
              className=" md:size-12 size-10 rounded-full object-cover outline-primary outline-2 outline-offset-1"
            />
            <div>
              <p className="md:text-xl text-[.9rem] text-black font-medium">
                {channel.name}
                {/* <span>
                  <BsPatchCheckFill className="inline" size={18} color="" />
                </span> */}
              </p>

              <p className="text-sm text-gray-800">
                {formatNumber(videoState.subscribersCount)} Subscribers
              </p>
            </div>
            <ToggleSubscribe
              onToggle={handelToggleSubscribe}
              subscribed={videoState.isSubscriber}
              channelId={channel.id}
            />
          </div>
          <div className="flex items-center   justify-end    gap-4 flex-wrap ">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 py-1 ">
              <button
                onClick={() => handelSwitchReaction(EVideoReactionType.LIKE)}
                className={`px-4  space-x-2 ${reactionType === EVideoReactionType.LIKE ? 'text-primary' : ''}`}
              >
                <span className="text-2xl">
                  <PiThumbsUpDuotone className="inline" />
                </span>
                <span>{formatNumber(videoState.likesCount)}</span>
              </button>
              <button
                onClick={() => handelSwitchReaction(EVideoReactionType.DISLIKE)}
                className={`border-l border-gray-600/20  px-4  space-x-2 ${reactionType === EVideoReactionType.DISLIKE ? 'text-primary' : ''}`}
              >
                <span className="text-2xl">
                  <PiThumbsDownDuotone className="inline" />
                </span>
                <span>{formatNumber(videoState.dislikesCount)}</span>
              </button>
            </div>

            <button className="px-4  space-x-2  rounded-full bg-gray-100 py-1  ">
              <span className="text-2xl">
                <PiShareFat className="inline" />
              </span>
              <span className="md:inline hidden">Share This</span>
            </button>

            <button className="p-2  text-2xl  rounded-full bg-gray-100 py-1  md:float-none  float-right ">
              <BiDotsHorizontalRounded className="inline" />
            </button>
          </div>
        </div>
        <div
          onClick={() => setIsViewFull(!isViewFull)}
          className="mt-7 p-5 bg-gray-100 rounded-md  hover:cursor-default "
        >
          <p className="text-[1rem] text-black font-medium  mb-2">
            <span>{state.viewsCount.toLocaleString()} Views </span>
            <span>{new Date(video.createdAt).toDateString()}</span>
          </p>
          {description && (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className={`text-[0.9rem] text-gray-900 leading-[1.8rem] whitespace-pre-line ${!isViewFull ? ' line-clamp-5' : ''} `}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
