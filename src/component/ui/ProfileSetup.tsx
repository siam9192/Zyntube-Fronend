import { ChangeEvent, useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import ImageCropper from './ImageCropper';

function ProfileSetup() {
  const [step, setStep] = useState(0);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [croppedAvatarImage, setCroppedAvatarImage] = useState<string | null>();
  const avatarImageInputRef = useRef<HTMLInputElement>(null);
  const [avatarErrorMessage, setAvatarErrorMessage] = useState('');
  const [channelName, setChannelName] = useState('');
  const [channelUniqueName, setChannelUniqueName] = useState('');
  const [isUnique, ] = useState(true);
  const handelSaveCroppedAvatarImage = (url: string) => {
    setCroppedAvatarImage(url);
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

  const isNextButtonDisabled =
    step === 1
      ? !channelName || !channelUniqueName || !isUnique
        ? true
        : false
      : step === 2
        ? !croppedAvatarImage
          ? true
          : false
        : false;

  return (
    <>
      <div className=" fixed inset-0 w-full h-full bg-gray-900/60  backdrop-blur-sm  flex justify-center items-center z-50">
        <div className=" w-10/12 lg:w-1/2 bg-white p-3 md:p-10 min-h-72 rounded-md h-[70vh] overflow-y-auto flex flex-col ">
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
                    <label htmlFor="" className="font-medium text-lg block">
                      Channel Name
                    </label>
                    <input
                      type="text"
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
                    <label htmlFor="" className="font-medium text-lg block">
                      Channel Unique Name
                    </label>
                    <input
                      type="text"
                      onChange={e => setChannelUniqueName(e.target.value)}
                      className=" w-full  py-3 px-2 border-2 border-gray-700/20 rounded-lg text-lg outline-secondary font-medium placeholder:font-normal "
                    />
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
                      src={croppedAvatarImage || '/avatar.png'}
                      alt=""
                      className=" size-52 md:size-72 mx-auto rounded-full"
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
                  onClick={() => setStep(p => p + 1)}
                  disabled={isNextButtonDisabled}
                  className="px-6 py-2 bg-primary disabled:bg-gray-200 text-white rounded-full"
                >
                  Next
                </button>
              </div>
            </div>
          ) : step === 3 ? (
            <div className="space-x-2 text-end">
              <button className="px-6 py-2 bg-primary disabled:bg-gray-200 text-white rounded-full">
                Done
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
              cropBoxMovable: false,
            }}
          />
        </div>
      )}
    </>
  );
}

export default ProfileSetup;
