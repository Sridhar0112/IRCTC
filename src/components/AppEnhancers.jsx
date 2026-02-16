import { useCallback } from 'react';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { useAppStore } from '../store/useAppStore';
import InstallBanner from './pwa/InstallBanner';
import OfflineBanner from './pwa/OfflineBanner';

export default function AppEnhancers() {
  const offline = useOfflineStatus();
  const pushNotification = useAppStore((s) => s.pushNotification);

  const refresh = useCallback(() => {
    pushNotification({ message: 'Refreshing train cache...' });
    window.location.reload();
  }, [pushNotification]);

  usePullToRefresh(refresh);

  return (
    <>
      <OfflineBanner offline={offline} />
      <InstallBanner />
    </>
  );
}
