import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const useSessionTimer = () => {
  const active = useAppStore((s) => s.bookingSession.active);
  const tick = useAppStore((s) => s.tickBookingSession);

  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  }, [active, tick]);
};
