import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAppStore } from '../../store/useAppStore';

export default function PushPermissionModal() {
  const open = useAppStore((s) => s.security.pushPermissionPrompt);
  const dismiss = useAppStore((s) => s.dismissPushPrompt);

  return (
    <Modal open={open} onClose={dismiss} title="Enable Push Notifications">
      <p className="text-sm">Get live booking alerts, platform changes, and payment updates.</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={dismiss}>Not Now</Button>
        <Button onClick={dismiss}>Allow</Button>
      </div>
    </Modal>
  );
}
