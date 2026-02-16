import { useMemo, useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import KPIWidgets from '../components/admin/KPIWidgets';
import OccupancyHeatmap from '../components/admin/OccupancyHeatmap';
import AdminTable from '../components/AdminTable';
import Charts from '../components/Charts';
import { useAppStore } from '../store/useAppStore';

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const trains = useAppStore((s) => s.trains);
  const bookings = useAppStore((s) => s.bookings);
  const [dateRange, setDateRange] = useState({ start: '2026-01-01', end: '2026-12-31' });

  const southFocusedTrains = useMemo(() => trains.filter((t) => t.southIndiaRoute), [trains]);

  return (
    <div className="flex gap-4">
      <AdminSidebar collapsed={collapsed} toggle={() => setCollapsed((s) => !s)} />
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-3xl font-black">Admin Control Center</h2>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border px-2 py-2 text-sm dark:bg-slate-900">
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <input type="date" value={dateRange.start} onChange={(e) => setDateRange((s) => ({ ...s, start: e.target.value }))} className="rounded-lg border px-2 py-2 dark:bg-slate-900" />
          <input type="date" value={dateRange.end} onChange={(e) => setDateRange((s) => ({ ...s, end: e.target.value }))} className="rounded-lg border px-2 py-2 dark:bg-slate-900" />
          <span className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">Range: {dateRange.start} → {dateRange.end}</span>
        </div>
        <KPIWidgets bookings={bookings} trains={southFocusedTrains} />
        <Charts trains={southFocusedTrains} />
        <OccupancyHeatmap trains={southFocusedTrains} />
        <AdminTable bookings={bookings} />
      </div>
    </div>
  );
}
