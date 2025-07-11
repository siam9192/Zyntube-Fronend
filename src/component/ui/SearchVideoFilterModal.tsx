import React, { useState } from 'react';
import { IoFilterOutline } from 'react-icons/io5';

function SearchVideoFilterModal() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(p => !p);
  }

  return (
    <>
      <button onClick={toggleModal} className="flex items-center font-primary gap-2 ">
        <span className="text-2xl ">
          <IoFilterOutline />
        </span>
        <span className="font-medium">Filter videos</span>
      </button>
      <div
        onClick={toggleModal}
        className={`fixed z-[100] w-screen ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
      >
        <div
          onClick={e_ => e_.stopPropagation()}
          className={`absolute w-1/3 max-w-2xl h-60 rounded-lg bg-white p-6 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${isOpen ? 'opacity-100 duration-300' : 'scale-110 opacity-0 duration-150'}`}
        >
          <div>
            <label htmlFor="">Sort by</label>
            <input type="text" className="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchVideoFilterModal;
