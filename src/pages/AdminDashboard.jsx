import { useState } from 'react';
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
        <div className="flex flex-wrap gap-2 text-sm"><input type="date" className="rounded-lg border px-2 py-2 dark:bg-slate-900" /><input type="date" className="rounded-lg border px-2 py-2 dark:bg-slate-900" /></div>
        <KPIWidgets bookings={bookings} trains={trains} />
        <Charts />
        <OccupancyHeatmap trains={trains} />
        <AdminTable bookings={bookings} />
      </div>
    </div>
  );
}
