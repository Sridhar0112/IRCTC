import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAppStore } from '../../store/useAppStore';

export default function SessionWarningModal() {
  const warningOpen = useAppStore((s) => s.security.warningOpen);
  const countdown = useAppStore((s) => s.security.countdown);
  const setSecurityWarning = useAppStore((s) => s.setSecurityWarning);

  return (
    <Modal open={warningOpen} onClose={() => setSecurityWarning(false)} title="Session Timeout Warning">
      <p className="text-sm text-slate-600 dark:text-slate-300">You will be logged out in {countdown}s due to inactivity.</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={() => setSecurityWarning(false)}>Stay Logged In</Button>
      </div>
    </Modal>
  );
}
