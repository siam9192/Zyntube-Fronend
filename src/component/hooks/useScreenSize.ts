import { useEffect, useState } from 'react';

export enum EScreenSizeType {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = '2xl',
}

type TScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<TScreenSize, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

function useScreenSize() {
  const [sizeType, setSizeType] = useState<EScreenSizeType>(EScreenSizeType.XXL);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const getSizeType = (width: number): EScreenSizeType => {
    if (width >= breakpoints['2xl']) return EScreenSizeType.XXL;
    if (width >= breakpoints.xl) return EScreenSizeType.XL;
    if (width >= breakpoints.lg) return EScreenSizeType.LG;
    if (width >= breakpoints.md) return EScreenSizeType.MD;
    return EScreenSizeType.SM;
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newSizeType = getSizeType(width);
      setSize({ width, height });
      setSizeType(newSizeType);
    };

    // Initialize on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenSize: size, screenSizeType: sizeType };
}

export default useScreenSize;
