import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import { IoCopyOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import ImageCropper from '../../component/ui/ImageCropper';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import ConfirmModal from '../../component/modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { uploadImageToCloudinary } from '../../helpers';
import { updateCurrentUser } from 'firebase/auth';
import { updateProfile } from '../../services/user.service';
import { IUpdateProfilePayload } from '../../types/user.type';
const CustomizeChannelPage = () => {
  const { user, isLoading, refetch } = useCurrentUser();

  if (isLoading)
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="loader-spinner-primary"></div>
      </div>
    );

  const channel = user!.app.channel;
  const origin = window.location.origin;
  const channelUrl = `${origin}/channel/${channel?.uniqueName}`;
  const coverPhotoRef = useRef<HTMLInputElement>(null);
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const [inputCoverPhoto, setInputCoverPhoto] = useState<File | null>(null);
  const [inputProfilePhoto, setInputProfilePhoto] = useState<File | null>(null);
  const [croppedCoverPhoto, setCroppedCoverPhoto] = useState<File | null>(null);
  const [croppedProfilePhoto, setCroppedProfilePhoto] = useState<File | null>(null);
  const [channelName, setChannelName] = useState(channel?.name || '');
  const [channelUniqueName, setChannelUniqueName] = useState('');
  const [channelAbout, setChannelAbout] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      setIsChanged(true);
    } else {
      hasMounted.current = true;
    }
  }, [channelName, channelUniqueName, channelAbout, croppedCoverPhoto, croppedProfilePhoto]);

  // Values length
  const cnLength = isChanged ? channelName.length : channel?.name?.length;
  const cnuLength = isChanged ? channelUniqueName.length : channel?.uniqueName?.length;
  const caLength = isChanged ? channelAbout.length : channel?.about?.length;

  console.log(channelUniqueName);
  // Copy channel url
  const copyChannelUrl = () => {
    navigator.clipboard.writeText(channelUrl);
    toast.success('Copied to clipboard');
  };

  // Open file input
  const openInput = (ref: RefObject<HTMLInputElement | null>) => {
    const current = ref.current;
    if (!current) return;
    current.click();
  };

  // Handel image input base on input name
  const handelImageInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
    name: 'cover' | 'profile',
  ) => {
    try {
      const files = event.target.files;
      if (!files?.length) return;
      const file = files[0];
      coverPhotoRef.current!.value = '';
      profilePhotoRef.current!.value = '';
      const res = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const { naturalWidth: width, naturalHeight: height } = img;
          resolve({ width, height });
        };
        img.onerror = () => {
          reject('There was some problem with the image.');
        };
        img.src = URL.createObjectURL(file);
      });

      const width = (res as any).width;
      const height = (res as any).height;

      if (name === 'cover') {
        const MIN_WIDTH = 500;
        const MIN_HEIGHT = 100;
        const MAX_SIZE_MB = 6;
        if (width < MIN_WIDTH || height < MIN_HEIGHT) {
          throw new Error(`Cover photo must be at least ${MIN_WIDTH}x${MIN_HEIGHT} pixels.`);
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          throw new Error(`Cover photo must be under ${MAX_SIZE_MB} MB.`);
        }

        setInputCoverPhoto(file);
      } else {
        const MIN_WIDTH = 100;
        const MIN_HEIGHT = 100;
        const MAX_SIZE_MB = 6;
        if (width < MIN_WIDTH || height < MIN_HEIGHT) {
          throw new Error(`Cover photo must be at least ${MIN_WIDTH}x${MIN_HEIGHT} pixels.`);
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          throw new Error(`Cover photo must be under ${MAX_SIZE_MB} MB.`);
        }

        setInputProfilePhoto(file);
      }
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
  };

  // Handel cropped image on save
  const onCropImageSave = (file: File, name: 'cover' | 'profile') => {
    if (name === 'cover') {
      setCroppedCoverPhoto(file);
      setInputCoverPhoto(null);
    } else {
      setCroppedProfilePhoto(file);
      setInputProfilePhoto(null);
    }
  };

  // Remove current update photo (profilePhoto,coverPhoto)
  const removePhoto = (name: 'profile' | 'cover') => {
    if (name === 'profile') {
      setCroppedProfilePhoto(null);
    } else {
      setCroppedCoverPhoto(null);
    }
  };

  const navigate = useNavigate();
  const handelCancel = () => {
    navigate('/studio');
  };

  // Update change
  async function handelSave() {
    if (!isChanged) return;
    setIsSaving(true);
    setErrorMessage('');
    try {
      const payload: IUpdateProfilePayload = {};

      if (channelName) {
        payload.channelName = channelName;
      }
      if (channelUniqueName) {
        payload.channelUniqueName = channelUniqueName;
      }
      if (channelAbout) {
        payload.channelAbout = channelAbout;
      }

      if (croppedCoverPhoto) {
        const url = await uploadImageToCloudinary(croppedCoverPhoto);
        payload.channelProfileCoverPhotoUrl = url;
      }

      if (croppedProfilePhoto) {
        const url = await uploadImageToCloudinary(croppedProfilePhoto);
        payload.channelProfilePhotoUrl = url;
      }

      const response = await updateProfile(payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success('Profile updated successfully');
      refetch();
      navigate('/studio');
    } catch (error: any) {
      const message = error.message || DEFAULT_ERROR_MESSAGE;
      toast.error(message, {
        position: 'top-right',
      });
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <h1 className="md:text-3xl text-2xl text-black font-semibold font-primary">
        Channel Customization
      </h1>
      <div className="mt-5 flex justify-end items-center gap-2 md:pr-5">
        <ConfirmModal onconfirm={handelCancel}>
          <button className="px-7 font-medium rounded-md py-2 bg-gray-100 hover:bg-gray-200 text-black">
            Cancel
          </button>
        </ConfirmModal>
        <button
          disabled={!isChanged || isSaving}
          onClick={handelSave}
          className="px-7 font-medium rounded-md py-2 disabled:bg-gray-100 disabled:text-black bg-primary hover:bg-secondary text-white "
        >
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
            src={
              croppedCoverPhoto
                ? URL.createObjectURL(croppedCoverPhoto)
                : channel?.profileCoverPhotoUrl || '/banner-placeholder.jpg'
            }
            alt=""
            className="mt-2 md:h-60 h-32 outline-2 outline-primary outline-offset-2"
          />
          <input
            type="file"
            ref={coverPhotoRef}
            onChange={e => handelImageInputChange(e, 'cover')}
            accept="image/*"
            className="hidden"
          />
          <p className="w-10/12 mt-2 text-gray-800 text-sm">
            To view images well on all devices, use images with a resolution of 2048 x 1152 pixels
            and a size of 6 MB or less.
          </p>
          <div className="mt-3  space-x-2">
            <button
              onClick={() => openInput(coverPhotoRef)}
              className="px-6 py-2 bg-primary text-white rounded-md"
            >
              Change
            </button>

            <button
              disabled={!croppedCoverPhoto}
              onClick={() => removePhoto('cover')}
              className="px-6 py-2 bg-gray-100 text-black rounded-md"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="mt-7">
          <h3 className="text-xl font-semibold text-black  font-primary">Profile Picture</h3>
          <p className="text-sm text-gray-800 mt-1">
            Your profile picture will also appear wherever your channel name appears on YouTube, for
            example, next to your videos or comments.
          </p>
          <div className="mt-3 md:w-[400px]  h-40 bg-gray-100 flex justify-center items-center ">
            <img
              src={
                croppedProfilePhoto
                  ? URL.createObjectURL(croppedProfilePhoto)
                  : channel?.profilePhotoUrl
              }
              alt=""
              className="size-28 outline-2 outline-primary outline-offset-2 bg-white"
            />
          </div>
          <input
            type="file"
            ref={profilePhotoRef}
            onChange={e => handelImageInputChange(e, 'profile')}
            accept="image/*"
            className="hidden"
          />
          <p className="w-10/12 mt-2 text-gray-800 text-sm">
            We recommend that you use images with a resolution of 98 x 98 pixels and a size of 4MB
            or less. Use PNG or GIF (not animated) files. Make sure you are uploading your images in
            accordance with the YouTube Community Guidelines.
          </p>
          <div className="mt-3  space-x-2">
            <button
              onClick={() => openInput(profilePhotoRef)}
              className="px-6 py-2 bg-primary text-white rounded-md"
            >
              Change
            </button>

            <button
              disabled={!croppedProfilePhoto}
              onClick={() => removePhoto('profile')}
              className="px-6 py-2 bg-gray-100 text-black rounded-md"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between lg:w-1/3 md:w-1/2 w-10/12">
            <label htmlFor="cn" className="font-medium text-lg block">
              Channel Name
            </label>
            <p>
              <span className={`${cnLength > 20 ? 'text-red-500' : ''}`}>{cnLength}</span>/
              <span>20</span>
            </p>
          </div>
          <p className="text-sm text-gray-800 w-10/12">
            Keep your channel name descriptive of who you are and what kind of content you're
            creating. Changes to your name and photo will only be visible on YouTube, not on any
            other Google services. You can change your name twice within 14 days.
          </p>
          <input
            type="text"
            placeholder="Channel name"
            defaultValue={channel?.name}
            onChange={e => setChannelName(e.target.value)}
            className="lg:w-1/3 md:w-1/2 w-10/12  py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between lg:w-1/3 md:w-1/2 w-10/12">
            <label htmlFor="cn" className="font-medium text-lg block">
              Channel Unique Name
            </label>
            <p>
              <span className={`${cnuLength > 20 ? 'text-red-500' : ''}`}>{cnuLength}</span>/
              <span>20</span>
            </p>
          </div>
          <p className="text-sm text-gray-800 w-10/12">
            Choose your unique handle by adding letters and numbers. You can change the channel
            handle and revert to the previous one within 14 days. Handles can be changed twice every
            14 days.
          </p>
          <div></div>
          <div className="lg:w-1/3 md:w-1/2 w-10/12 py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal flex items-center gap-1">
            <span className="text-gray-600">@</span>
            <input
              type="text"
              placeholder="Unique name here.."
              onChange={e => setChannelUniqueName(e.target.value.toLowerCase())}
              defaultValue={channel?.uniqueName.substring(1)}
              className="w-full border-none outline-none lowercase"
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between lg:w-1/2 md:w-10/12 ">
            <label htmlFor="ab" className="font-medium text-lg block">
              About
            </label>
            <p>
              <span className={`${caLength > 2000 ? 'text-red-500' : ''}`}>{caLength}</span>/
              <span>2000</span>
            </p>
          </div>

          <textarea
            id="ab"
            placeholder="About your channel"
            defaultValue={channel?.about}
            onChange={e => setChannelAbout(e.target.value)}
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
          <div className="bg-gray-100 border-1 border-gray-700/20 rounded-lg flex items-center justify-between lg:w-1/3 md:w-1/2 w-10/12">
            <div className=" w-[80%] py-3 px-2  overflow-hidden">
              <p className="">{channelUrl}</p>
            </div>
            <button onClick={copyChannelUrl} className="text-2xl">
              <IoCopyOutline />
            </button>
          </div>
        </div>
      </div>

      {/* Croppers */}
      {inputProfilePhoto && (
        <div className="avatar__cropper">
          <ImageCropper
            image={inputProfilePhoto}
            onSave={(url, file) => onCropImageSave(file, 'profile')}
            cropperProps={{
              style: {
                width: '100%',
                height: '100%',
              },

              aspectRatio: 1,
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
        </div>
      )}
      {inputCoverPhoto && (
        <div>
          <ImageCropper
            image={inputCoverPhoto}
            onSave={(url, file) => onCropImageSave(file, 'cover')}
            cropperProps={{
              style: {
                width: '100%',
                height: '100%',
                background: 'transparent',
              },

              aspectRatio: 16 / 4,
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
        </div>
      )}
    </div>
  );
};

export default CustomizeChannelPage;
