import { useEffect, useState } from 'react';

type TScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<TScreenSize, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

function useScreenSize() {
  const [sizeType, setSizeType] = useState<TScreenSize>('2xl');
  const [size, setSize] = useState({ width: 0, height: 0 });

  const getSizeType = (width: number): TScreenSize => {
    if (width < breakpoints.sm) return 'sm';
    if (width < breakpoints.md) return 'md';
    if (width < breakpoints.lg) return 'lg';
    if (width < breakpoints.xl) return 'xl';
    return '2xl';
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

  return { size, sizeType };
}

export default useScreenSize;
