import { useEffect } from 'react';
import { createSeatSocket } from '../services/socketService';
import { useAppStore } from '../store/useAppStore';

export const useRealtimeSeats = () => {
  const refreshSeatMapFromSocket = useAppStore((s) => s.refreshSeatMapFromSocket);

  useEffect(() => {
    const socket = createSeatSocket(() => refreshSeatMapFromSocket());
    return () => socket.close();
  }, [refreshSeatMapFromSocket]);
};
