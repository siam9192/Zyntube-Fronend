function VideoResultLoadingCard() {
  return (
    <div className="flex gap-5">
      <div className=" bg-gray-300 animate-pulse w-[40%] h-[100px] md:h-[200px] lg:h-[250px]  rounded-lg"></div>
      <div className="w-[60%]">
        <div className="  bg-gray-300 animate-pulse  h-6 md:h-8 rounded-md"></div>
        <div className="w-[80%] mt-2  bg-gray-300 animate-pulse  h-4 md:h-5 rounded-md"></div>
        <div className="mt-5 flex items-center gap-2">
          <div className=" size-8 md:size-10  bg-gray-300 animate-pulse rounded-full"></div>
          <div className=" grow">
            <div className=" w-1/3 bg-gray-300 animate-pulse  h-2 md:h-3 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoResultLoadingCard;
