import React from 'react';
import { IoMicOutline } from 'react-icons/io5';

const VoiceSearchButton = () => {
  return (
    <button className="p-2 rounded-full bg-primary hover:bg-secondary text-white text-2xl">
      <IoMicOutline />
    </button>
  );
};

export default VoiceSearchButton;
