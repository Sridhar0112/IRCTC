import { useEffect, useRef } from 'react';

export const usePullToRefresh = (onRefresh) => {
  const startY = useRef(0);

  useEffect(() => {
    const touchStart = (e) => {
      startY.current = e.touches[0].clientY;
    };
    const touchMove = (e) => {
      const delta = e.touches[0].clientY - startY.current;
      if (window.scrollY === 0 && delta > 90) onRefresh();
    };
    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchmove', touchMove, { passive: true });
    return () => {
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchmove', touchMove);
    };
  }, [onRefresh]);
};
