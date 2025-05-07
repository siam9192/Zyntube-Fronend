import React from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { SlPicture } from 'react-icons/sl';

function PublishVideoPage() {
  return (
    <div>
      <h1 className="md:text-3xl text-2xl text-black font-semibold font-primary">Publish Video</h1>

      <div className="mt-5 flex justify-end items-center gap-2 md:pr-5">
        <button className="px-7 font-medium rounded-md py-2 bg-gray-100 hover:bg-gray-200 text-black">
          Cancel
        </button>
        <button className="px-7 font-medium rounded-md py-2 bg-primary hover:bg-secondary text-white">
          Publish
        </button>
      </div>

      <div className="py-10 grid lg:grid-cols-2 gap-5 ">
        <div className=" space-y-5">
          <div className="space-y-1 ">
            <div className="flex justify-between items-center">
              <label htmlFor="" className="font-medium text-lg block">
                Title
              </label>
              <p className=" font-medium text-gray-800">
                <span>10</span>/30
              </p>
            </div>
            <input
              type="text"
              placeholder="Video title here.."
              className=" w-full py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
            />
          </div>
          <div className="space-y-1 ">
            <div className="flex justify-between items-center">
              <label htmlFor="" className="font-medium text-lg block">
                Description
              </label>
              <p className=" font-medium text-gray-800">
                <span>10</span>/2000
              </p>
            </div>
            <textarea
              placeholder="Video description here.."
              className=" w-full py-3 px-2 border-2 border-gray-700/20 min-h-52 max-h-80 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
            />
          </div>

          <div className="space-y-1 ">
            <label htmlFor="" className="font-medium text-lg block">
              Privacy
            </label>
            <select className=" py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal  w-full md:w-1/2 lg::w-1/3">
              <option value="">Public</option>
              <option value="">Private</option>
            </select>
          </div>

          <div className="space-y-3 ">
            <p className="text-lg font-medium">Who can watch this?</p>
            <div className="flex items-center gap-1">
              <input type="radio" name="age" className=" accent-primary size-5" />
              <label htmlFor="" className=" block">
                For kids only
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input type="radio" name="age" className=" accent-primary size-5" />
              <label htmlFor="" className=" block">
                Only for adult viewers (18+)
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input type="radio" name="age" className=" accent-primary size-5" />
              <label htmlFor="" className=" block">
                Anyone can watch this
              </label>
            </div>
          </div>
          <div></div>
        </div>

        <div className="lg:p-5">
          <div>
            {/* <img src="https://www.biblecenterchurch.com/wp-content/uploads/2018/10/video-placeholder.png" alt="" className='rounded-md h-60' /> */}
            <video
              src="https://res.cloudinary.com/ddlfpv4gl/video/upload/v1724179397/images/j1i7ghnfjd4m5gl01smi.mp4"
              className="h-80 "
              controls
            ></video>
            <div className="mt-2">
              <p>Duration: 2 Hours 3 Minutes 3 Seconds</p>
              <p>Size: 670MB</p>
              <p className="">
                Status: <span className="text-green-600">Uploaded</span>
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="" className="font-medium text-lg block mb-2">
              Video Thumbnail
            </label>
            <img src="/src/assets/placeholder.svg" alt="" className="h-72" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishVideoPage;
