import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';

interface IProps {
  btnClassName?: string;
}

const VideoCardShortOptions = ({ btnClassName }: IProps) => {
  return (
    <button className={btnClassName || 'text-2xl'}>
      <HiDotsVertical />
    </button>
  );
};

export default VideoCardShortOptions;
