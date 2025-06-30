import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineReload } from 'react-icons/ai';
import { toast } from 'sonner';

import { useGetMyVideoByIdQuery } from '../../redux/features/video/video.api';
import { EVideoPrivacy } from '../../types/video.type';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import ImageCropper from '../../component/ui/ImageCropper';
import ConfirmModal from '../../component/modal/ConfirmModal';
import { updateVideo } from '../../services/video.service';

// Constants
const THUMBNAIL_MAX_SIZE_MB = 5;
const MAX_LENGTH = {
  title: 100,
  description: 5000,
};
const PRIVACY_OPTIONS = [
  {
    title: 'Public (anyone can watch this video)',
    value: EVideoPrivacy.PUBLIC,
  },
  {
    title: 'Private (only you can watch this video)',
    value: EVideoPrivacy.PRIVATE,
  },
];

function EditVideoPage() {
  const { id } = useParams();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Thumbnail
  const [thumbnailInitFile, setThumbnailInitFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Fetch video data
  const { data, isLoading, isError } = useGetMyVideoByIdQuery(id as string);
  const video = data?.data;

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');
  const [privacy, setPrivacy] = useState<EVideoPrivacy>(PRIVACY_OPTIONS[0].value);

  // State to track changes
  const [isChanged, setIsChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // Load video data on fetch
  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description || '');
      setPrivacy(video.setting.privacy || PRIVACY_OPTIONS[0].value);
    }
  }, [video]);

  // Track changes after initial load
  useEffect(() => {
    if (!isFirstRender) {
      setIsFirstRender(true);
    } else {
      setIsChanged(true);
    }
  }, [title, description, privacy]);

  // Open file picker
  const openInput = (ref: RefObject<HTMLInputElement | null>) => {
    ref.current?.click();
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = THUMBNAIL_MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`Maximum thumbnail size is ${THUMBNAIL_MAX_SIZE_MB} MB.`);
    } else {
      setThumbnailInitFile(file);
    }

    // Reset input value
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  const navigate = useNavigate();
  // After cropping, set the cropped thumbnail
  const handleCroppedSave = (url: string, file: File) => {
    setThumbnailFile(file);
    setThumbnailInitFile(null);
    setIsChanged(true);
  };

  // Helpers
  const titleLength = title.length;
  const descriptionLength = description.length;
  const canSave =
    isChanged && titleLength <= MAX_LENGTH.title && descriptionLength <= MAX_LENGTH.description;

  // UI: Loading/Error
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong..</p>;
  async function handelUpdate() {
    setIsUpdating(true);
    try {
      const formData = new FormData();

      // Optional thumbnail
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }

      // Ensure nullable fields handled explicitly
      const bodyPayload = {
        title,
        description: description?.trim() || null, // Normalize to null if empty string
        privacy,
      };

      formData.append('body', JSON.stringify(bodyPayload));

      const response = await updateVideo(formData, id as string);

      if (!response.success) {
        throw new Error(response.message || DEFAULT_ERROR_MESSAGE);
      }

      toast.success('Video updated successfully');
      navigate('/studio');
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div>
      <h1 className="md:text-3xl text-2xl font-semibold font-primary text-black">Publish Video</h1>

      {/* Save/Cancel Buttons */}
      <div className="mt-5 flex justify-end gap-2 md:pr-5">
        <button className="px-7 py-2 rounded-md bg-gray-100 hover:bg-gray-200 font-medium text-black">
          Cancel
        </button>
        <ConfirmModal onconfirm={handelUpdate}>
          <button
            disabled={!canSave || isUpdating}
            className="flex items-center gap-1 px-6 py-2 rounded-lg bg-primary text-white disabled:bg-gray-200 disabled:text-gray-600"
          >
            Save
          </button>
        </ConfirmModal>
      </div>

      {/* Form Section */}
      <div className="py-10 xl:w-10/12">
        {/* Thumbnail Section */}
        <div className="w-fit">
          <label className="block mb-2 text-lg font-medium">Video Thumbnail</label>

          <div className="size-fit">
            <img
              src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : video?.media.thumbnailUrl}
              alt="Video thumbnail"
              className="h-72 outline-2 outline-offset-2"
            />
            <input
              type="file"
              ref={thumbnailInputRef}
              className="hidden"
              onChange={handleThumbnailChange}
            />
            <button
              onClick={() => openInput(thumbnailInputRef)}
              className="mt-3 p-2 bg-gray-300 text-xl rounded-md"
            >
              <AiOutlineReload />
            </button>
          </div>

          <p className="mt-3 text-gray-900">
            You can upload a thumbnail up to {THUMBNAIL_MAX_SIZE_MB} MB. Please ensure it does not
            exceed the limit.
          </p>
        </div>

        {/* Title Input */}
        <div className="mt-10 space-y-5">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium">Title</label>
              <p>
                <span className={titleLength > MAX_LENGTH.title ? 'text-red-500' : ''}>
                  {titleLength}
                </span>
                /{MAX_LENGTH.title}
              </p>
            </div>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Video title here..."
              className="w-full py-3 px-2 text-lg font-medium border-2 border-gray-700/20 rounded-lg outline-secondary placeholder:font-normal"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium">Description</label>
              <p>
                <span className={descriptionLength > MAX_LENGTH.description ? 'text-red-500' : ''}>
                  {descriptionLength}
                </span>
                /{MAX_LENGTH.description}
              </p>
            </div>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Video description here..."
              className="w-full py-3 px-2 min-h-72 max-h-80 text-lg font-medium border-2 border-gray-700/20 rounded-lg outline-secondary placeholder:font-normal"
            />
          </div>

          {/* Privacy Select */}
          <div className="space-y-1">
            <label className="text-lg font-medium block">Privacy</label>
            <select
              value={privacy}
              onChange={e => setPrivacy(e.target.value as EVideoPrivacy)}
              className="py-3 px-2 w-full md:w-1/2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary"
            >
              {PRIVACY_OPTIONS.map(p => (
                <option key={p.value} value={p.value}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cropper Modal */}
      {thumbnailInitFile && (
        <ImageCropper
          onSave={handleCroppedSave}
          image={thumbnailInitFile}
          cropperProps={{
            style: { width: '100%', height: '100%', background: 'transparent' },
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
    </div>
  );
}

export default EditVideoPage;
