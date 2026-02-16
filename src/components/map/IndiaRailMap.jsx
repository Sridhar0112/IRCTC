import { motion } from 'framer-motion';

export default function IndiaRailMap() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 font-semibold">Interactive India Rail Map</h3>
      <svg viewBox="0 0 500 320" className="w-full">
        <path d="M80,40 L140,50 L180,90 L210,140 L260,150 L310,190 L350,230 L300,260 L220,250 L170,210 L120,170 L70,120 Z" fill="rgba(8,145,178,0.12)" stroke="#0891b2" strokeWidth="2" />
        <path d="M120,90 L280,210" stroke="#0284c7" strokeWidth="3" strokeDasharray="6 5" />
        <path d="M150,60 L340,230" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
        <motion.circle cx="200" cy="150" r="7" fill="#ef4444" animate={{ cx: [120, 280], cy: [90, 210] }} transition={{ repeat: Infinity, duration: 5, ease: 'linear' }} />
      </svg>
    </div>
  );
}
