import AdminTable from '../components/AdminTable';
import Charts from '../components/Charts';
import { useAppStore } from '../store/useAppStore';

export default function AdminDashboard() {
  const trains = useAppStore((s) => s.trains);
  const bookings = useAppStore((s) => s.bookings);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-brand-600 p-4 text-white"><p>Total Trains</p><strong className="text-2xl">{trains.length}</strong></div>
        <div className="rounded-2xl bg-emerald-600 p-4 text-white"><p>Total Bookings</p><strong className="text-2xl">{bookings.length}</strong></div>
        <div className="rounded-2xl bg-indigo-600 p-4 text-white"><p>Revenue</p><strong className="text-2xl">₹{bookings.reduce((a,b) => a + b.amount, 0)}</strong></div>
      </div>
      <AdminTable trains={trains} />
      <Charts />
    </div>
  );
}
