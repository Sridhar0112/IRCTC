import { motion } from 'framer-motion';

export default function PaymentModal({ open, onClose, onPay, method, setMethod }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/50 p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-slate-800">
        <h3 className="mb-3 text-xl font-semibold">Choose Payment Method</h3>
        <div className="mb-4 grid gap-2">
          {['razorpay', 'stripe'].map((m) => (
            <button key={m} onClick={() => setMethod(m)} className={`rounded-xl border px-4 py-2 text-left ${method === m ? 'border-brand-600 bg-brand-50 dark:bg-slate-700' : 'border-slate-300'}`}>
              {m.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">Cancel</button>
          <button onClick={onPay} className="rounded-lg bg-brand-600 px-4 py-2 text-white">Proceed</button>
        </div>
      </motion.div>
    </div>
  );
}
