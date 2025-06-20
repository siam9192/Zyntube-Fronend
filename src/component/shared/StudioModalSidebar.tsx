import { useEffect, useState } from 'react';
import StudioSidebar from './StudioSidebar';
import { SlMenu } from 'react-icons/sl';

function StudioModalSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'none' : '';
  }, [isOpen]);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`md:text-3xl text-2xl font-medium lg:hidden ${isOpen ? 'text-primary' : ''}`}
      >
        <SlMenu />
      </button>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="w-full transition-all duration-500 lg:hidden inset-0 bg-gray-950/40 h-screen fixed flex justify-center items-center z-40 "
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-10/12 bg-white min-h-52 rounded-lg p-5 text-center flex justify-center items-center flex-col gap-3 font-primary"
          >
            <StudioSidebar isExpand />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default StudioModalSidebar;
