import  { ChangeEvent, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import { AiOutlineReload } from 'react-icons/ai';
import { GoUpload } from 'react-icons/go';
import ConfirmModal from '../modal/ConfirmModal';
import ImageCropper from './ImageCropper';
import { EVideoPrivacy } from '../../types/video.type';
import { capitalize } from '../../helpers';
import VideoUploadProgressModal from './VideoUploadProgressModal';
import { postVideo } from '../../services/video.service';
interface IProps {
  children: ReactNode;
}

const privacies = Object.values(EVideoPrivacy);

function UploadVideoModal(props: IProps) {
  // Refs
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUploading,setIsUploading] = useState(false)
  // File state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailInitFile, setThumbnailInitFile] = useState<File | null>(null);

  //   Fields state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(privacies[0]);

  //Constant values
  const VIDEO_MAX_SIZE_MB = 50;
  const THUMBNAIL_MAX_SIZE_MB = 5;
  const MAX_LENGTH = {
    title: 100,
    description: 5000,
  };

  //  Mutable values
  const tLength = title.length;
  const dLength = description.length;

  const canUpload =
    tLength <= MAX_LENGTH.title && dLength <= MAX_LENGTH.description && videoFile && thumbnailFile;

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

  useEffect(() => {
    const interval = setInterval(() => {
      // setUploadPercentage(prev => {
      //   if (prev >= 100) {
      //     clearInterval(interval); // stop when done
      //     return 100;
      //   }
      //   return prev + 10;
      // });
    }, 2000);

    return () => clearInterval(interval); // cleanup
  }, []);

  // Handel cropped image on save
  const onCropThumbnailSave = (url: string, file: File) => {
    setThumbnailFile(file);
    setThumbnailInitFile(null);
  };

  const handelUpload = async () => {
    if (!canUpload) return;
    setIsError(false);
   
    const payload: Record<string, string> = {
      title,
      privacy,
    };
    if (description) {
      payload.description = description;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('body', JSON.stringify(payload));

    try {
      setIsUploading(true)
      const response = await postVideo(formData, percentage => setUploadPercentage(percentage));
      if (!response.success) {
        throw new Error();
      }
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }

    finally {
      setIsUploading(false)
    }
  };


  const handelCloseModal  =  ()=>{
    setIsOpen(false)
    setIsUploading(false)
    setIsError(false)
    setIsSuccess(false)
    setTitle('')
    setDescription('')
    setThumbnailFile(null)
    setVideoFile(null)
  }
  return (
    <>
      <div onClick={() => setIsOpen(true)} className="size-fit">
        {props.children}
      </div>
      {isOpen ? (
        <div className="w-full transition-all duration-500  inset-0 bg-gray-950/40 h-screen fixed flex justify-center items-center z-40 ">
          <div
            onClick={e => e.stopPropagation()}
            className=" w-[90%] lg:w-1/2 bg-white min-h-[60vh] max-h-[90vh]  overflow-y-auto  rounded-lg p-5  "
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
                        className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
            {thumbnailFile ? (
              <div className="mt-5">
                <img
                  src={URL.createObjectURL(thumbnailFile)}
                  alt=""
                  className=" outline-2 outline-primary outline-offset-2 bg-white w-full"
                />
                <div className="mt-2 text-center">
                  <button
                    onClick={() => openInput(thumbnailInputRef)}
                    className="p-2 bg-gray-300 text-xl  rounded-md"
                  >
                    <AiOutlineReload />
                  </button>
                </div>
                <input
                  id="thumbnail-dropzone-file"
                  ref={thumbnailInputRef}
                  onChange={e => handelFileInputChange(e, 'thumbnail')}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            ) : (
              <div className="mt-5">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="thumbnail-dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
              </div>
            )}
            <div className="mt-5 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="cn" className="font-medium text-lg block">
                    Title*
                  </label>
                  <p>
                    <span className={`${tLength > 100 ? 'text-red-500' : ''}`}>{tLength}</span>/
                    <span>{MAX_LENGTH.title}</span>
                  </p>
                </div>
                <input
                  id="cn"
                  type="text"
                  onChange={e => setTitle(e.target.value.trim())}
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
                    <span>{MAX_LENGTH.description}</span>
                  </p>
                </div>
                <textarea
                  id="ab"
                  onChange={e => setDescription(e.target.value.trim())}
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
                  {privacies.map((privacy, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        value={privacy}
                        defaultChecked={idx === 0}
                        name="disabled-radio"
                        className="size-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                        onChange={e => e.target.checked && setPrivacy(privacy)}
                      />
                      <label
                        htmlFor="disabled-radio-2"
                        className="ms-2 font-medium text-gray-900 dark:text-gray-500"
                      >
                        {capitalize(privacy)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end items-center gap-2">
              <ConfirmModal onconfirm={handelCloseModal}>
                <button className="px-6 py-2 border-secondary border-2 rounded-lg bg-gray-50">
                  Cancel
                </button>
              </ConfirmModal>
              <button
                disabled={!canUpload}
                onClick={handelUpload}
                className="flex items-center gap-1 px-6 py-2 bg-primary disabled:bg-gray-200 disabled:text-gray-600   text-white rounded-lg"
              >
                <span className="text-2xl ">
                  <GoUpload />
                </span>
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {thumbnailInitFile && (
        <ImageCropper
          onSave={onCropThumbnailSave}
          image={thumbnailInitFile}
          cropperProps={{
            style: {
              width: '100%',
              height: '100%',
              background: 'transparent',
            },

            aspectRatio: 16 / 9,
            guides: false,
            viewMode: 1,
            background: false,
            autoCropArea: 1,
            cropBoxResizable: false,
            cropBoxMovable: true,
            minCropBoxWidth: 100,
            minCropBoxHeight: 100,
          }}
        />
      )}
   {
   (  (isUploading || isError || isSuccess) && isOpen) ?
       <VideoUploadProgressModal
        onclose={handelCloseModal}
        uploadPercentage={uploadPercentage}
        isError={isError}
        isSuccess={isSuccess}
      />
      :
      null
   }
    </>
  );
}

export default UploadVideoModal;
