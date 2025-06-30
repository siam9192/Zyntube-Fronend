import React from 'react';

interface IProps {
  uploadPercentage: number;
  isError?: boolean;
  isSuccess?: boolean;
  onclose: () => void;
  oncancel?: () => void;
}

function VideoUploadProgressModal({ uploadPercentage, isError, isSuccess, onclose }: IProps) {
  const dasharray = 2 * Math.PI * 70;

  return (
    <div className="w-full transition-all duration-500  inset-0 bg-gray-950/40 h-screen fixed flex justify-center items-center z-40 ">
      <div
        onClick={e => e.stopPropagation()}
        className=" w-[90%] lg:w-1/2 xl:w-1/4 bg-white min-h-[50vh] max-h-[90vh]   rounded-lg p-5 flex justify-center items-center flex-col "
      >
        {isSuccess || isError ? (
          isSuccess ? (
            <div>
              <img src="/upload-success.webp" alt="" />
              <p className="text-xl font-medium text-black text-center font-primary">
                Video has been successfully uploaded
              </p>
              <p className="text-sm text-center mt-2 text-gray-700">
                Your video is currently being processed. Our system is working to complete it
                successfully. Thank you for your patience while we ensure everything is handled
                properly and efficiently for you.
              </p>
              <div className="mt-5 text-center">
                <button
                  onClick={onclose}
                  className="px-6 py-3 bg-secondary hover:bg-purple-900 text-white rounded-md"
                >
                  Okay, go for it
                </button>
              </div>
            </div>
          ) : (
            <div>
              <img src="/upload-failed.webp" alt="" className="w-10/12 mx-auto" />
              <p className="text-xl font-medium text-red-500 text-center font-primary">
                Video upload failed!
              </p>
              <p className="text-sm text-center mt-2 text-gray-700">
                Your video upload has failed. Our system detected an issue during the process.
                Please review your file and try uploading again. We’re here to help if the problem
                persists.
              </p>
              <div className="mt-5 text-center">
                <button
                  onClick={onclose}
                  className="px-6 py-3 bg-secondary hover:bg-purple-900 text-white rounded-md"
                >
                  Okay,go it
                </button>
              </div>
            </div>
          )
        ) : (
          <div>
            <div className="relative w-fit h-fit video__progress__circle__container">
              <svg
                width="200"
                height="200"
                viewBox="0 0 160 160"
                className="video__progress__circle"
              >
                <circle r="70" cx="80" cy="80" fill="transparent"></circle>
                <circle
                  r="70"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  stroke-dasharray={`${dasharray}px`}
                  stroke-dashoffset={`${dasharray - (dasharray * uploadPercentage) / 100}px`}
                ></circle>
              </svg>
              <p className="absolute  left-1/2 top-1/2 mr-5 text-2xl font-semibold text-secondary font-primary progress__percentage">
                {uploadPercentage}%
              </p>
            </div>

            <p className="mt-2 text-center  ">Video is uploading...</p>
            <div className="mt-5 text-center ">
              {/* {
            uploadPercentage < 100 ?
            <button onClick={onclose} className='px-6 py-2  bg-red-600 text-white rounded-md '>Cancel</button>
            :
            null 
           } */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoUploadProgressModal;
