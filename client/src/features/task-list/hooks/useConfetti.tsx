import { useState, useEffect } from 'react';

const useConfetti = (
  shouldTrigger: boolean,
  duration: number = 60000
): boolean => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (shouldTrigger) {
      setShowConfetti(true);
      timerId = setTimeout(() => {
        setShowConfetti(false);
      }, duration);
    } else {
      setShowConfetti(false);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [shouldTrigger, duration]);

  return showConfetti;
};

export default useConfetti;
