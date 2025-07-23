import VideoLoadingCard from '../../cards/VideoLoadingCard';
const ChannelHome = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-primary text-black font-semibold">Featured Videos</h1>
        <div className="mt-5">
          <div className="grid lg:grid-cols-4 gap-5">
            {Array.from({ length: 7 }).map((video, index) => (
              <VideoLoadingCard key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-primary text-black font-semibold">Popular Videos</h1>
        <div className="mt-5">
          <div className="grid lg:grid-cols-4 gap-5">
            {Array.from({ length: 10 }).map((video, index) => (
              <VideoLoadingCard key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="my-8">
        <h1 className="text-2xl font-primary text-black font-semibold">Latest Upload</h1>
        <div className="mt-5">
          <div className="grid lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((video, index) => (
              <VideoLoadingCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelHome;
