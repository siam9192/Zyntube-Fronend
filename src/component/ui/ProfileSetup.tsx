import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import ImageCropper from './ImageCropper';
import useBounce from '../hooks/useBounce';
import { checkChannelExistence } from '../../services/channel.service';
import { ISetupProfilePayload } from '../../types/user.type';
import { uploadImageToCloudinary } from '../../helpers';
import { setupProfile } from '../../services/user.service';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import useCurrentUser from '../../hooks/useCurrentUser';

function ProfileSetup() {
  const { user } = useCurrentUser();

  // Show this modal when user profile is not completely set upped
  if (!user || user.app.setupStatus === true) return null;

  const [step, setStep] = useState(0);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [croppedAvatarImage, setCroppedAvatarImage] = useState<File | null>(null);
  const avatarImageInputRef = useRef<HTMLInputElement>(null);
  const [avatarErrorMessage, setAvatarErrorMessage] = useState('');
  const [channelName, setChannelName] = useState('');
  const [channelUniqueName, setChannelUniqueName] = useState('');
  const [isUnique, setIsUnique] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSetupLoading, setIsSetupLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { refetch } = useCurrentUser();
  const bouncedUniqueName = useBounce(channelUniqueName);

  useEffect(() => {
    async function handle() {
      setIsChecking(true);
      try {
        if (!bouncedUniqueName) {
          return setIsUnique(false);
        }

        const res = await checkChannelExistence('@' + bouncedUniqueName);

        if (!res.success) {
          throw new Error(res.message);
        }
        setIsUnique(!res.data.exist);
      } catch (error) {}
      setIsChecking(false);
    }
    handle();
  }, [bouncedUniqueName]);

  const handelSaveCroppedAvatarImage = (url: string, file: File) => {
    setCroppedAvatarImage(file);
    setAvatarImage(null);
  };

  const handelChangeAvatarImageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return setAvatarErrorMessage('Something went wrong');
    }

    const getImageSize = (file: File): Promise<{ width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
          URL.revokeObjectURL(objectUrl);
        };

        img.onerror = reject;
        img.src = objectUrl;
      });
    };

    const file = files[0];
    try {
      const size = await getImageSize(file);
      console.log(size);
      if (size.width < 100 || size.height < 100) {
        return setAvatarErrorMessage('Minimum image size 100x100 required');
      } else {
        setAvatarImage(file);
      }
    } catch (error) {
      setAvatarErrorMessage('Something went wrong');
    }
  };

  const handlePrev = () => {
    if (step === 0) return;
    setStep(p => p - 1);
  };

  const handelSetup = async () => {
    if (!croppedAvatarImage) return;
    setErrorMessage('');
    setIsSetupLoading(true);
    try {
      const profilePhotoUrl = await uploadImageToCloudinary(croppedAvatarImage);
      const payload: ISetupProfilePayload = {
        channelName,
        channelUniqueName: channelUniqueName,
        channelProfilePhotoUrl: profilePhotoUrl,
      };

      const setupRes = await setupProfile(payload);
      if (!setupRes.success) {
        throw new Error();
      }
      setStep(p => p + 1);
    } catch (error: any) {
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
    }
    setIsSetupLoading(false);
  };
  const cnLength = channelName.length;
  const cnuLength = channelUniqueName.length;
  const isNextButtonDisabled =
    step === 1
      ? !channelName || !channelUniqueName || !isUnique || cnLength > 20 || cnuLength > 20
        ? true
        : false
      : step === 2
        ? !croppedAvatarImage || isSetupLoading
          ? true
          : false
        : false;

  return (
    <>
      <div className=" fixed inset-0 w-full h-full bg-gray-900/60  backdrop-blur-sm  flex justify-center items-center z-50">
        <div className=" w-10/12 lg:w-1/2 bg-white p-3 md:p-10 min-h-72 rounded-md h-[80vh] overflow-y-auto overflow-x-hidden flex flex-col ">
          <h1 className=" text-2xl md:text-3xl font-semibold  font-primary">Setup Profile</h1>
          <div className="grow">
            {step == 0 ? (
              <div className="animate__arrive__right__left">
                <div>
                  <img
                    src="https://img.freepik.com/free-vector/website-setup-concept-landing-page_52683-26995.jpg"
                    alt=""
                    className="mx-auto lg:w-1/2"
                  />
                  <p className="mt-3 text-center w-full md:w-10/12 text-gray-900 mx-auto text-sm md:text-[1rem]">
                    To fully engage with the platform and enjoy all its features—such as liking
                    videos, posting comments, and uploading your own content—please complete your
                    profile. Setting up your profile helps personalize your experience, build your
                    presence in the community, and is required to continue participating in these
                    activities without restrictions.
                  </p>
                </div>
              </div>
            ) : step === 1 ? (
              // Set names(Channel,unique)
              <div>
                <div className="mt-5 space-y-4 animate__arrive__right__left">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="cn" className="font-medium text-lg block">
                        Channel Name
                      </label>
                      <p>
                        <span className={`${cnLength > 20 ? 'text-red-500' : ''}`}>{cnLength}</span>
                        /<span>20</span>
                      </p>
                    </div>
                    <input
                      id="cn"
                      type="text"
                      defaultValue={channelName}
                      onChange={e => setChannelName(e.target.value)}
                      className=" w-full  py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
                    />
                    <p className="text-sm text-gray-800">
                      Keep your channel name descriptive of who you are and what kind of content
                      you're creating. Changes to your name and photo will only be visible on
                      YouTube, not on any other Google services. You can change your name twice
                      within 14 days.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="cn" className="font-medium text-lg block">
                        Channel Unique Name
                      </label>
                      <p>
                        <span className={`${cnuLength > 20 ? 'text-red-500' : ''}`}>
                          {cnuLength}
                        </span>
                        /<span>20</span>
                      </p>
                    </div>
                    <input
                      id="cun"
                      type="text"
                      defaultValue={channelUniqueName}
                      onChange={e => setChannelUniqueName(e.target.value)}
                      className=" w-full  py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal  lowercase"
                    />
                    {bouncedUniqueName && !isChecking && !isUnique ? (
                      <p className="text-sm text-red-600">This name is already in use</p>
                    ) : (
                      false
                    )}
                    <p className="text-sm text-gray-800">
                      Choose your unique handle by adding letters and numbers. You can change the
                      channel handle and revert to the previous one within 14 days. Handles can be
                      changed twice every 14 days.
                    </p>
                  </div>
                </div>
              </div>
            ) : step === 2 ? (
              <div>
                <div className="mt-5  animate__arrive__right__left">
                  <div className="relative size-fit mx-auto">
                    <img
                      src={
                        croppedAvatarImage ? URL.createObjectURL(croppedAvatarImage) : '/avatar.png'
                      }
                      alt=""
                      className=" size-52 md:size-72 mx-auto rounded-full outline-2 outline-offset-2 outline-primary"
                    />
                    <input
                      type="file"
                      onChange={handelChangeAvatarImageInput}
                      ref={avatarImageInputRef}
                      className="hidden"
                    />
                    <button
                      onClick={() => avatarImageInputRef.current?.click()}
                      className="p-3 rounded-full bg-secondary text-white text-xl absolute bottom-10 right-3 "
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {avatarErrorMessage && (
                    <p className="text-red-500 text-center mt-1">{avatarErrorMessage}</p>
                  )}
                  <p className="text-center mt-3 ">
                    You can change your profile picture you also can skip it
                  </p>
                </div>
              </div>
            ) : (
              <div className="animate__arrive__right__left">
                <img
                  src="https://cdni.iconscout.com/illustration/free/thumb/free-success-illustration-download-in-svg-png-gif-file-formats--businessman-business-achievement-goal-vibrant-illustrations-pack-seo-web-1768777.png?f=webp"
                  alt=""
                  className="mx-auto"
                />
                <p className="mt-2 text-center text-xl font-medium">
                  Profile has been setup successfully!
                </p>
              </div>
            )}
          </div>

          {step === 0 ? (
            <div className="  flex  justify-end items-center mt-5">
              <div className="space-x-2">
                <button
                  onClickCapture={() => setStep(p => p + 1)}
                  disabled={isNextButtonDisabled}
                  onClick={() => setStep(p => p + 1)}
                  className="px-6 py-2 bg-primary disabled:bg-gray-200 text-white rounded-full"
                >
                  Let's Go
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="  flex justify-between items-center mt-5">
              <button onClick={handlePrev} className="font-medium disabled:text-gray-100">
                Prev
              </button>
              <div className="space-x-2">
                <button
                  onClick={() => setStep(p => p + 1)}
                  disabled={isNextButtonDisabled}
                  className="px-6 py-2 bg-primary disabled:bg-gray-200 text-white rounded-full"
                >
                  Next
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="  flex justify-between items-center mt-5">
              <button onClick={handlePrev} className="font-medium disabled:text-gray-100">
                Prev
              </button>
              <div className="space-x-2">
                <button
                  onClick={handelSetup}
                  disabled={isNextButtonDisabled}
                  className="px-6 py-2 bg-primary disabled:bg-gray-200 text-white rounded-full"
                >
                  Complete
                </button>
              </div>
            </div>
          ) : step === 3 ? (
            <div className="space-x-2 text-end">
              <button
                onClick={refetch}
                className="px-6 py-2 bg-primary disabled:bg-gray-200 text-white rounded-full"
              >
                Ok
              </button>
            </div>
          ) : null}
          {/* Tabs  */}
          <div className="mt-2 flex items-center gap-2 justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className={`size-3 ${index <= step ? 'bg-secondary' : 'bg-transparent border-2 border-primary'} rounded-full `}
              ></div>
            ))}
          </div>
          {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}
        </div>
      </div>

      {avatarImage && (
        <div className="avatar__cropper">
          <ImageCropper
            image={avatarImage}
            onSave={handelSaveCroppedAvatarImage}
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
    </>
  );
}

export default ProfileSetup;
