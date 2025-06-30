import { useEffect, useState } from 'react';

function useLoadingBounce(isLoading: boolean, delay: number = 300): boolean {
  const [delayedLoading, setDelayedLoading] = useState(isLoading);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      setDelayedLoading(true);
    } else {
      timer = setTimeout(() => {
        setDelayedLoading(false);
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return delayedLoading;
}

export default useLoadingBounce;
