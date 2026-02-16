import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function NotificationCenter() {
  const open = useAppStore((s) => s.notificationCenterOpen);
  const notifications = useAppStore((s) => s.notifications);
  const toggle = useAppStore((s) => s.toggleNotificationCenter);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 320 }}
          animate={{ x: 0 }}
          exit={{ x: 320 }}
          className="fixed right-0 top-16 z-50 h-[80vh] w-80 border-l border-slate-200 bg-white/95 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold">Notification Center</h3>
            <button onClick={toggle} className="text-xs">Close</button>
          </div>
          <div className="space-y-2 overflow-y-auto">
            {notifications.length ? notifications.map((n) => (
              <div key={n.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">{n.message}</div>
            )) : <p className="text-sm text-slate-500">No notifications yet.</p>}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
