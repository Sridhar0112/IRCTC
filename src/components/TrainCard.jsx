import { motion } from 'framer-motion';

export default function TrainCard({ train, onSelect }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-glow dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{train.name}</h3>
        <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700">{train.id}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{train.from} → {train.to}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <span>Dep: {train.departure}</span>
        <span>{train.duration}</span>
        <span>{train.ac ? 'AC' : 'Non-AC'}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <strong>₹{train.fare}</strong>
        <button onClick={() => onSelect(train)} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          Select Seats ({train.seatsLeft})
        </button>
      </div>
    </motion.article>
  );
}
