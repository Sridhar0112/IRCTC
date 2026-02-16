import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function NotificationSnackbar() {
  const notifications = useAppStore((s) => s.notifications);
  const popNotification = useAppStore((s) => s.popNotification);

  if (!notifications.length) return null;
  const notice = notifications[0];

  setTimeout(popNotification, 2600);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed bottom-4 right-4 z-50 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-xl"
      >
        <p className="text-sm">{notice.message}</p>
      </motion.div>
    </AnimatePresence>
  );
}
