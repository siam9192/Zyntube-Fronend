import { createContext, useContext, useEffect, useRef, useState } from 'react';
import VideoPlayer from '../component/sections/watch/VideoPlayer';
import VideoDetails from '../component/sections/watch/VideoDetails';
import VideoComments from '../component/sections/home/VideoComments';
import { useLocation, useParams } from 'react-router-dom';
import RelatedVideos from '../component/sections/watch/RelatedVideos';
import { IWatchVideo } from '../types/video.type';
import { useGetWatchVideoQuery } from '../redux/features/video/video.api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useLoadingBounce from '../hooks/useLoadingBounce';
import { EVideoReactionType } from '../types/video-reaction.type';
import useScreenSize, { EScreenSizeType } from '../component/hooks/useScreenSize';
import WatchPageTabs from '../component/sections/watch/WatchPageTabs';

type TVideoState = {
  isSubscriber: boolean;
  reactionType: EVideoReactionType | null;
  isSaved: boolean;
  isWatchLater: boolean;
  likesCount: number;
  dislikesCount: number;
  viewsCount: number;
  subscribersCount: number;
};
type TWatchContextValue = {
  video: IWatchVideo;
  isLoading: boolean;
  videoState: TVideoState;
  setVideoState: React.Dispatch<React.SetStateAction<TVideoState>>;
};

export const WatchContext = createContext<TWatchContextValue | null>(null);

const WatchPage = () => {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { screenSizeType } = useScreenSize();
  useEffect(() => {
    const current = ref.current;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname]);

  const { data, isLoading } = useGetWatchVideoQuery(id as string);
  const video = data?.data;
  const bounceLoading = useLoadingBounce(isLoading, 1000);

  const [videoState, setVideoState] = useState<TVideoState>({
    isSubscriber: false,
    reactionType: null,
    isSaved: false,
    isWatchLater: false,
    likesCount: 0,
    dislikesCount: 0,
    viewsCount: 0,
    subscribersCount: 0,
  });

  useEffect(() => {
    if (!isLoading && video) {
      const state = video.state;
      setVideoState({
        isSubscriber: video.isSubscriber,
        reactionType: video.reactionType,
        isSaved: false,
        isWatchLater: false,
        likesCount: state.likesCount,
        dislikesCount: state.dislikesCount,
        viewsCount: 0,
        subscribersCount: video.channel.subscribersCount,
      });
    }
  }, [isLoading]);

  if (bounceLoading)
    return (
      <div className=" h-[90vh]  lg:h-full flex justify-center items-center">
        <DotLottieReact
          src="/src/assets/animations/Animation - 1751293872462.lottie"
          className="lg:w-1/2"
          loop
          autoplay
        />
      </div>
    );

  if (!video) {
    throw new Error('Video not exist');
  }

  const value = {
    video,
    isLoading,
    videoState,
    setVideoState,
  };

  const isSmallScreenSize = [EScreenSizeType.SM, EScreenSizeType.MD].includes(screenSizeType);

  return (
    <WatchContext.Provider value={value}>
      <div ref={ref} className="lg:grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <VideoPlayer />
          <VideoDetails />
          {!isSmallScreenSize ? <VideoComments /> : null}
        </div>

        {!isSmallScreenSize ? <RelatedVideos id={id as string} /> : null}

        {isSmallScreenSize ? <WatchPageTabs /> : null}
      </div>
    </WatchContext.Provider>
  );
};

export default WatchPage;

export function useWatchContext() {
  const context = useContext(WatchContext);
  if (!context) throw new Error(' useContext must be used within a WatchContext.Provider');
  return context;
}
