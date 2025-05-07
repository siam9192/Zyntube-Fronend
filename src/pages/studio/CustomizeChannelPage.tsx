import React from 'react';

const CustomizeChannelPage = () => {
  return (
    <div>
      <h1 className="md:text-3xl text-2xl text-black font-semibold font-primary">
        Channel Customization
      </h1>
      <div className="mt-5 flex justify-end items-center gap-2 md:pr-5">
        <button className="px-7 font-medium rounded-md py-2 bg-gray-100 hover:bg-gray-200 text-black">
          Cancel
        </button>
        <button className="px-7 font-medium rounded-md py-2 bg-primary hover:bg-secondary text-white">
          Save
        </button>
      </div>
      <div className="mt-8">
        <div>
          <h3 className="text-xl font-semibold text-black  font-primary">Banner</h3>
          <p className="text-sm text-gray-800 mt-1">
            This image will appear across the top of your channel.
          </p>
          <img
            src="https://www.guardianoffshore.com.au/wp-content/uploads/2015/03/banner-placeholder.jpg"
            alt=""
            className="mt-2 md:h-60 h-32"
          />
          <p className="w-10/12 mt-2 text-gray-800 text-sm">
            To view images well on all devices, use images with a resolution of 2048 x 1152 pixels
            and a size of 6 MB or less.
          </p>
          <div className="mt-3  space-x-2">
            <button className="px-6 py-2 bg-primary text-white rounded-md">Change</button>
            <button className="px-6 py-2 bg-gray-100 text-black rounded-md">Remove</button>
          </div>
        </div>
        <div className="mt-7">
          <h3 className="text-xl font-semibold text-black  font-primary">Profile Picture</h3>
          <p className="text-sm text-gray-800 mt-1">
            Your profile picture will also appear wherever your channel name appears on YouTube, for
            example, next to your videos or comments.
          </p>
          <div className="mt-3 md:w-[400px]  h-40 bg-gray-100 flex justify-center items-center">
            <img
              src="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj"
              alt=""
              className="size-28"
            />
          </div>
          <p className="w-10/12 mt-2 text-gray-800 text-sm">
            We recommend that you use images with a resolution of 98 x 98 pixels and a size of 4MB
            or less. Use PNG or GIF (not animated) files. Make sure you are uploading your images in
            accordance with the YouTube Community Guidelines.
          </p>
          <div className="mt-3  space-x-2">
            <button className="px-6 py-2 bg-primary text-white rounded-md">Change</button>
            <button className="px-6 py-2 bg-gray-100 text-black rounded-md">Remove</button>
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-4">
        <div className="space-y-1">
          <label htmlFor="" className="font-medium text-lg">
            Name
          </label>
          <p className="text-sm text-gray-800 w-10/12">
            Keep your channel name descriptive of who you are and what kind of content you're
            creating. Changes to your name and photo will only be visible on YouTube, not on any
            other Google services. You can change your name twice within 14 days.
          </p>
          <input
            type="text"
            placeholder="Channel name"
            className="lg:w-1/3 md:w-1/2 w-10/12  py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="" className="font-medium text-lg">
            Unique name
          </label>
          <p className="text-sm text-gray-800 w-10/12">
            Choose your unique handle by adding letters and numbers. You can change the channel
            handle and revert to the previous one within 14 days. Handles can be changed twice every
            14 days.
          </p>
          <input
            type="text"
            placeholder="Unique name here.."
            className="lg:w-1/3 md:w-1/2 w-10/12 py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="" className="font-medium text-lg">
            About
          </label>
          <p className="text-sm text-gray-800 w-10/12">
            Keep your channel name descriptive of who you are and what kind of content you're
            creating. Changes to your name and photo will only be visible on YouTube, not on any
            other Google services. You can change your name twice within 14 days.
          </p>
          <textarea
            placeholder="About your channel"
            className="  lg:w-1/2 md:w-10/12 w-full h-60 resize-none py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary  "
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="" className="font-medium text-lg">
            Channel url
          </label>
          <p className="text-sm text-gray-800 w-10/12">
            This is the standard web address for your channel. It contains your channel's unique ID,
            which consists of numbers and letters at the end of the URL.
          </p>
          <div className="lg:w-1/3 md:w-1/2 w-10/12 py-3 px-2 bg-gray-100 border-1 border-gray-700/20 rounded-lg">
            <p className=" wrap-break-word">
              https://www.youtube.com/channel/UC4MduIQquz72Xd_98VNhzcQ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeChannelPage;
