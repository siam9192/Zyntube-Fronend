import { useEffect, useState } from 'react';

function useBounce(text: string, delay = 1000) {
  const [result, setResult] = useState(text);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setResult(text);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text]);
  return result;
}

export default useBounce;
