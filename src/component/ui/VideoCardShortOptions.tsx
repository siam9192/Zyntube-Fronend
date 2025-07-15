import { useRef, useState } from 'react';
import { CiNoWaitingSign } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdOutlineWatchLater, MdReportGmailerrorred } from 'react-icons/md';
import { RiPlayList2Fill } from 'react-icons/ri';
import useOutsideClick from '../../hooks/useOutsideClick';

interface IProps {
  btnClassName?: string;
  top?: string;
}

const VideoCardShortOptions = ({ btnClassName }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuItems = {
    group1: [
      {
        title: 'Save to watch later',
        icon: MdOutlineWatchLater,
        displayStatus: true,
      },
      {
        title: 'Add playlist',
        icon: RiPlayList2Fill,
        displayStatus: true,
      },
      {
        title: 'Share this video',
        icon: IoShareSocialOutline,
        displayStatus: true,
      },
    ],
    group2: [
      {
        title: 'Iam not interested',
        icon: CiNoWaitingSign,
        displayStatus: true,
      },
      {
        title: 'Report this video',
        icon: MdReportGmailerrorred,
        displayStatus: true,
      },
    ],
  };

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(p => !p)}
        className={
          btnClassName || 'text-2xl  p-2 hover:bg-secondary hover:rounded-full hover:text-white'
        }
      >
        <HiDotsVertical />
      </button>
      <div
        className={`${isOpen ? 'visible translate-y-0 ' : 'invisible -translate-y-1 '} duration-100 absolute -right-10 ${top || 'top-12'}  w-52 min-h-40 p-3 bg-white shadow-lg rounded-lg text-sm  z-40`}
      >
        <ul className="text-black font-medium space-y-1">
          {Object.values(menuItems).map((group, index) => (
            <div key={index} className={index !== 0 ? 'border-t border-gray-200' : ''}>
              {group.map(item => (
                <button
                  key={item.title}
                  className="hover:text-primary  py-1 flex items-center gap-2"
                >
                  <span className="text-xl">
                    <item.icon />
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoCardShortOptions;
