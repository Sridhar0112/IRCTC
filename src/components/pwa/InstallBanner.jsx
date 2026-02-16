import { useAppStore } from '../../store/useAppStore';
import Button from '../ui/Button';

export default function InstallBanner() {
  const show = useAppStore((s) => s.security.installBanner);
  const close = useAppStore((s) => s.acknowledgeInstallBanner);
  if (!show) return null;

  return (
    <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between rounded-2xl bg-indigo-600 p-3 text-sm text-white">
      <span>Install IRCTC Enterprise app for faster bookings and offline access.</span>
      <Button variant="ghost" className="border-white/30 text-white" onClick={close}>Dismiss</Button>
    </div>
  );
}
