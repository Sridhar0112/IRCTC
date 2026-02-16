import { BarChart3, Database, ShieldCheck, TrainFront } from 'lucide-react';

const items = [
  ['Overview', BarChart3],
  ['Train Ops', TrainFront],
  ['Bookings', Database],
  ['Role Control', ShieldCheck],
];

export default function AdminSidebar({ collapsed, toggle }) {
  return (
    <aside className={`rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 ${collapsed ? 'w-16' : 'w-56'}`}>
      <button onClick={toggle} className="mb-3 rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-700">{collapsed ? '>' : '<'}</button>
      <div className="space-y-2">
        {items.map(([label, Icon]) => (
          <button key={label} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
            <Icon size={16} /> {!collapsed && label}
          </button>
        ))}
      </div>
    </aside>
  );
}
