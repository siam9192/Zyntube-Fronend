import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import { FaRegUser } from 'react-icons/fa';
import { CiPlay1 } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import { AiOutlineUser } from 'react-icons/ai';

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routesSec1 = [
    {
      title: 'My Account',
      icon: AiOutlineUser,
      href: '',
    },
    {
      title: 'Studio',
      icon: CiPlay1,
      href: '',
    },
    {
      title: 'Setting',
      icon: IoSettingsOutline,
      href: '',
    },
  ];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const current = ref.current;
      if (!current || !isOpen) return;

      if (target.contains(current)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [isOpen]);
  return (
    <div ref={ref} className="relative">
      <img
        onClick={p => setIsOpen(!isOpen)}
        src="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj"
        alt=""
        className="size-10 rounded-full  outline-2 outline-offset-1 outline-primary"
      />
      <div
        className={`absolute   bg-white rounded-lg drop-shadow-2xl top-18 right-0  z-40 p-4 ${isOpen ? 'min-h-60 md:w-[400px] w-[250px]  ' : 'w-0 h-0 hidden'} duration-200 transition-all ease-in-out`}
      >
        <div className="flex md:flex-row flex-col items-center gap-2 py-3 md:text-start text-center ">
          <Avatar url="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj" />
          <div>
            <p className="text-xl ">Excited boy Gaming</p>
            <p className="text-gray-800">@excitedboy2</p>
            <p className="text-sm text-gray-800 ">siam@gmail.com</p>
          </div>
        </div>
        <div className="mt-3 border-t border-gray-600/10 space-y-2 w-full ">
          {routesSec1.map(route => (
            <Link to="" key={route.title} className="block w-full">
              <button className="flex items-center gap-3 p-2 hover:bg-gray-50 hover:rounded-md w-full">
                <span className="text-2xl">
                  <route.icon />
                </span>
                <p className=" font-secondary">{route.title}</p>
              </button>
            </Link>
          ))}
          <button className="flex items-center gap-3 p-2 hover:bg-gray-50 hover:rounded-md w-full">
            <span className="text-2xl">
              <VscSignOut />
            </span>
            <p className=" font-secondary">Signout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
