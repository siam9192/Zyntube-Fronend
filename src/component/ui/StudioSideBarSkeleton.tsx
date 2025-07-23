function StudioSideBarSkeleton() {
  return (
    <div className="py-3 px-2 border-r h-full border-r-gray-700/10">
      <div className="space-y-2">
        <p className="text-center font-medium mt-2">Your profile</p>
        <div className="animate-pulse bg-gray-300  lg:size-20 xl:size-32 rounded-full mx-auto"></div>
        <p className="text-gray-800 text-center text-xl animate-pulse bg-gray-300 h-3 mx-auto w-10/12  rounded-md"></p>
      </div>
      <div className="space-y-2 w-full p-3 border-t border-gray-700/10 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="animate-pulse bg-gray-300 h-12 rounded-lg " key={index}></div>
        ))}
      </div>
      <div className="space-y-2 w-full p-3 border-t border-gray-700/10 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="animate-pulse bg-gray-300 h-12 rounded-lg " key={index}></div>
        ))}
      </div>
    </div>
  );
}

export default StudioSideBarSkeleton;
