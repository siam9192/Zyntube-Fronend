const VideoLoadingCard = () => {
  return (
    <div className=" animate-pulse">
      <div className="bg-gray-300 h-52 w-full rounded-md mb-3"></div>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoLoadingCard;
