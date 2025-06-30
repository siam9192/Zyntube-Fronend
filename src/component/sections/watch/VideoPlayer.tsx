import MuxPlayer from '@mux/mux-player-react';
import { useWatchContext } from '../../../pages/WatchPage';
const exampleUrl =
  'https://res.cloudinary.com/ddlfpv4gl/video/upload/v1724179397/images/j1i7ghnfjd4m5gl01smi.mp4';
const VideoPlayer = () => {
  const { video } = useWatchContext();
  const { media } = video;
  return <MuxPlayer playbackId={media.muxPlaybackId} accentColor="rgb(255, 11, 85)" />;
};

export default VideoPlayer;
