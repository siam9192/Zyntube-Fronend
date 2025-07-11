import React, { Ref, RefObject, useEffect } from 'react';

function useOutsideClick(ref: RefObject<HTMLElement | null>, onOutsideClick: () => void) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;

      if (ref.current && !ref.current.contains(target)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

export default useOutsideClick;
