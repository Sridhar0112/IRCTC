import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function NotificationSnackbar() {
  const notifications = useAppStore((s) => s.notifications);
  const popNotification = useAppStore((s) => s.popNotification);

  useEffect(() => {
    if (!notifications.length) return undefined;
    const id = setTimeout(popNotification, 2800);
    return () => clearTimeout(id);
  }, [notifications, popNotification]);

  const notice = notifications[0];

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-20 right-4 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl"
        >
          {notice.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
