import React from 'react';
import { BsCameraVideo } from 'react-icons/bs';
import { GoBell } from 'react-icons/go';
import { TfiLayoutGrid2 } from 'react-icons/tfi';
import VoiceSearchButton from './VoiceSearchButton';
import ProfileDropDown from './ProfileDropDown';
import AuthFormModal from './AuthFormModal';
import { PiSignInFill } from 'react-icons/pi';
import { AiOutlineUser } from 'react-icons/ai';

const HeaderUtils = () => {
  return (
    <div className="flex items-center md:gap-6 gap-3">
      <div className="md:block hidden">
        <VoiceSearchButton />
      </div>
      <button className="text-3xl text-black">
        <BsCameraVideo />
      </button>
      <button className="text-2xl text-black md:block hidden">
        <TfiLayoutGrid2 />
      </button>
      <button className="text-3xl text-black">
        <GoBell />
      </button>
      {0 ? (
        <ProfileDropDown />
      ) : (
        <AuthFormModal>
          <button className="text-3xl">
            <AiOutlineUser />
          </button>
        </AuthFormModal>
      )}
    </div>
  );
};

export default HeaderUtils;
