import { QrCode } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAppStore } from '../store/useAppStore';

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const bookings = useAppStore((s) => s.bookings);
  const cancelBooking = useAppStore((s) => s.cancelBooking);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-xl font-bold">Profile & Wallet</h2>
        <p>{user.name}</p>
        <p className="text-sm text-slate-500">{user.email}</p>
        <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">Wallet Balance: ₹{user.wallet}</p>
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">Loyalty Points: {user.loyaltyPoints}</p>
        <div>
          <h4 className="mb-1 text-sm font-semibold">Frequent Routes</h4>
          <div className="flex flex-wrap gap-1">{user.frequentRoutes.map((r) => <span key={r} className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-700">{r}</span>)}</div>
        </div>
        <div>
          <h4 className="mb-1 text-sm font-semibold">Saved Passengers</h4>
          {user.savedPassengers.map((p) => <p key={p.id} className="text-xs">{p.name} ({p.age})</p>)}
        </div>
      </section>

      <section className="space-y-3 lg:col-span-2">
        <h3 className="text-xl font-semibold">Booking History + QR Ticket</h3>
        {bookings.map((b) => (
          <article key={b.pnr} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <div>
              <p className="font-semibold">{b.trainName}</p>
              <p className="text-xs text-slate-500">PNR: {b.pnr} • TXN: {b.txnId}</p>
              <div className="mt-2 flex items-center gap-2 text-xs"><QrCode size={14} /> Ticket QR ready</div>
            </div>
            <p className="text-sm">{b.status}</p>
            <div className="flex gap-2">
              <Button variant="ghost">Download PDF</Button>
              <Button variant="danger" onClick={() => cancelBooking(b.pnr)}>Cancel</Button>
            </div>
          </article>
        ))}

        <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="font-semibold">PNR Status Checker</h4>
          <div className="mt-2 flex gap-2"><input className="rounded-lg border px-3 py-2 text-sm dark:bg-slate-900" placeholder="Enter PNR" /><Button>Check</Button></div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="font-semibold">Device Login History</h4>
          {user.deviceHistory.map((d) => <p key={d.id} className="mt-1 text-xs">{d.device} • {new Date(d.at).toLocaleString()} • {d.ip}</p>)}
        </section>
      </section>
    </div>
  );
}
