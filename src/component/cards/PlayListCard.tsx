import React from 'react';
import { RiPlayList2Fill } from 'react-icons/ri';
function PlayListCard() {
  return (
    <div className="relative playlist__card h-fit">
      <div className="relative cover">
        <img
          src="https://i.ytimg.com/vi/GSq133Zke2E/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB31sxDJEpUheQ-uWdO0DuOluKsog"
          alt=""
          className="w-full rounded-lg"
        />
        <div className="absolute right-1 bottom-1 bg-gray-900/80 text-white px-2 py-1  rounded-md flex items-center gap-2 scale-90">
          <span className="">
            <RiPlayList2Fill />
          </span>
          <p className="text-sm ">2 Video</p>
        </div>
      </div>
      <p className="md:text-[1rem] text-sm mt-1 font-primary font-medium line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, aspernatur.
      </p>
      <p className="text-sm mt-1 text-gray-800 font-primary">View full playlist</p>
    </div>
  );
}

export default PlayListCard;
