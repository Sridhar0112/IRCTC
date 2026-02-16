import { useAppStore } from '../store/useAppStore';

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const bookings = useAppStore((s) => s.bookings);
  const cancelBooking = useAppStore((s) => s.cancelBooking);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-xl font-bold">Profile</h2>
        <p className="mt-2">{user.name}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
        <p className="text-sm">{user.phone}</p>
        <span className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{user.loyalty} Member</span>
      </section>
      <section className="lg:col-span-2 space-y-3">
        <h3 className="text-xl font-semibold">Booking History</h3>
        {bookings.map((b) => (
          <article key={b.pnr} className="flex flex-wrap items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <div>
              <p className="font-semibold">{b.trainName}</p>
              <p className="text-sm">PNR: {b.pnr}</p>
            </div>
            <p>{b.status}</p>
            <button onClick={() => cancelBooking(b.pnr)} className="rounded-lg border px-3 py-1 text-sm">Cancel Ticket</button>
          </article>
        ))}
      </section>
    </div>
  );
}
