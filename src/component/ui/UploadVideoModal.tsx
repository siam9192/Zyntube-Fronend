import React, { ChangeEvent, ReactNode, RefObject, useRef, useState } from 'react';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import { AiOutlineReload } from 'react-icons/ai';
import { GoUpload } from 'react-icons/go';
import ConfirmModal from '../modal/ConfirmModal';
import ImageCropper from './ImageCropper';
interface IProps {
  children: ReactNode;
}
function UploadVideoModal(props: IProps) {
  const [isOpen, setIsOpen] = useState(true);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailInitFile, setThumbnailInitFile] = useState<File | null>(null);
  //   Fields state
  const VIDEO_MAX_SIZE_MB = 50;
  const THUMBNAIL_MAX_SIZE_MB = 5;

  // Open file input
  const openInput = (ref: RefObject<HTMLInputElement | null>) => {
    const current = ref.current;
    if (!current) return;
    current.click();
  };
  const handelFileInputChange = (e: ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files?.length) {
        throw new Error('Invalid input');
      }
      const file = files[0];
      if (type === 'video') {
        const max = VIDEO_MAX_SIZE_MB * 1024 * 1024;
        if (max < file.size) {
          throw new Error(
            `Video file is too large. Maximum allowed size is ${VIDEO_MAX_SIZE_MB} MB.`,
          );
        }
        setVideoFile(file);
      } else {
        const max = THUMBNAIL_MAX_SIZE_MB * 1024 * 1024;
        if (max < file.size) {
          throw new Error(
            `Image file is too large. Maximum allowed size is ${THUMBNAIL_MAX_SIZE_MB} MB.`,
          );
        }
        setThumbnailInitFile(file);
      }
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      const current = videoInputRef.current!;
      current.value = '';
    }
  };

  const handelFileDrop = (ev: React.DragEvent<HTMLLabelElement>, type: 'video' | 'thumbnail') => {
    ev.preventDefault();
    setIsDragging(false);
    try {
      const files = ev.dataTransfer?.files;
      if (!files?.length) {
        throw new Error('Invalid input');
      }
      const file = files[0];
      if (type === 'video') {
        const max = VIDEO_MAX_SIZE_MB * 1024 * 1024;
        if (max < file.size) {
          throw new Error(
            `Video file is too large. Maximum allowed size is ${VIDEO_MAX_SIZE_MB} MB.`,
          );
        }
        setVideoFile(file);
      } else {
        const max = THUMBNAIL_MAX_SIZE_MB * 1024 * 1024;
        if (max < file.size) {
          throw new Error(
            `Image file is too large. Maximum allowed size is ${THUMBNAIL_MAX_SIZE_MB} MB.`,
          );
        }
        setThumbnailInitFile(file);
      }
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  // Handel cropped image on save
  const onCropThumbnailSave = (url:string,file: File, ) => {
    setThumbnailFile(file)
    setThumbnailInitFile(null)
  };



  const tLength = 0;
  const dLength = 0;
  return (
    <>
      <div onClick={() => setIsOpen(true)} className="size-fit">
        {props.children}
      </div>
      {isOpen ? (
        <div className="w-full transition-all duration-500  inset-0 bg-gray-950/40 h-screen fixed flex justify-center items-center z-40 ">
          <div
            onClick={e => e.stopPropagation()}
            className="w-1/2 bg-white min-h-[60vh] max-h-[90vh] overflow-y-auto overflow-y-auto  rounded-lg p-5  "
          >
            <h1 className="text-2xl font-medium  font-primary">Upload your Video</h1>
            <div className="mt-5">
              <div>
                {videoFile ? (
                  // Preview video
                  <div>
                    <video
                      controls
                      src={URL.createObjectURL(videoFile)}
                      className=" mx-auto"
                    ></video>
                    <div className="mt-2 text-center">
                      <button
                        onClick={() => openInput(videoInputRef)}
                        className="p-2 bg-gray-300 text-xl  rounded-md"
                      >
                        <AiOutlineReload />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Video input placeholder
                  <div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        onDrop={e => handelFileDrop(e, 'video')}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Video files only (Max: {VIDEO_MAX_SIZE_MB}MB)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          ref={videoInputRef}
                          onChange={e => handelFileInputChange(e, 'video')}
                          type="file"
                          accept="video/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-gray-800">
                      You can upload videos with a maximum size limit of {VIDEO_MAX_SIZE_MB} MB.
                      Please ensure your file does not exceed this limit to complete the upload
                      successfully without any issues.
                    </p>
                  </div>
                )}
              </div>
            </div>


         {/*Thumbnail input placeholder */}
          {
            thumbnailFile ?
            (<div className='mt-5'>
                <img src={URL.createObjectURL(thumbnailFile)} alt="" className=' outline-2 outline-primary outline-offset-2 bg-white' />
                     <input
                    id="thumbnail-dropzone-file"
                    ref={thumbnailInputRef}
                    onChange={e => handelFileInputChange(e, 'thumbnail')}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
            </div>)
            :
           (    <div className="mt-5">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail-dropzone-file"
                  onDrop={e => handelFileDrop(e, 'thumbnail')}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Thumbnail files only (Max: {VIDEO_MAX_SIZE_MB}MB)
                    </p>
                  </div>
                  <input
                    id="thumbnail-dropzone-file"
                    ref={videoInputRef}
                    onChange={e => handelFileInputChange(e, 'thumbnail')}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-2 text-gray-800">
                You can upload Thumbnail with a maximum size limit of {THUMBNAIL_MAX_SIZE_MB} MB.
                Please ensure your file does not exceed this limit to complete the upload
                successfully without any issues.
              </p>
            </div>)
          }
            <div className="mt-5 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="cn" className="font-medium text-lg block">
                    Title*
                  </label>
                  <p>
                    <span className={`${tLength > 20 ? 'text-red-500' : ''}`}>{tLength}</span>/
                    <span>20</span>
                  </p>
                </div>
                <input
                  id="cn"
                  type="text"
                  className=" w-full  py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between  ">
                  <label htmlFor="ab" className="font-medium text-lg block">
                    Description
                  </label>
                  <p>
                    <span className={`${dLength > 2000 ? 'text-red-500' : ''}`}>{dLength}</span>/
                    <span>2000</span>
                  </p>
                </div>
                <textarea
                  id="ab"
                  placeholder="About your channel"
                  className="   w-full h-60 resize-none py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary  "
                />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div>
                <label htmlFor="cn" className="font-medium text-lg block">
                  Privacy*
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value=""
                      name="disabled-radio"
                      className="size-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 "
                    />
                    <label
                      htmlFor="disabled-radio-2"
                      className="ms-2  font-medium text-gray-900 dark:text-gray-500"
                    >
                      Public
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value=""
                      name="disabled-radio"
                      className="size-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 "
                    />
                    <label
                      htmlFor="disabled-radio-2"
                      className="ms-2 font-medium text-gray-900 dark:text-gray-500"
                    >
                      Private
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end items-center gap-2">
              <ConfirmModal onconfirm={() => setIsOpen(false)}>
                <button className="px-6 py-2 border-secondary border-2 rounded-lg bg-gray-50">
                  Cancel
                </button>
              </ConfirmModal>
              <button className="flex items-center gap-1 px-6 py-2 bg-primary   text-white rounded-lg">
                <span className="text-2xl ">
                  <GoUpload />
                </span>
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
   {
    thumbnailInitFile && <ImageCropper  onSave={onCropThumbnailSave}  image={thumbnailInitFile}    cropperProps={{
              style: {
                width: '100%',
                height: '100%',
                background: 'transparent',
              },

              aspectRatio: 16/9,
              guides: false,
              viewMode: 1,
              background: false,
              autoCropArea: 1,
              cropBoxResizable: false,
              cropBoxMovable: true,
              minCropBoxWidth: 100,
              minCropBoxHeight: 100,
            }}/>
   }
    </>
  );
}

export default UploadVideoModal;
