export default function BookingForm() {
  return (
    <form className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:grid-cols-2">
      <input className="rounded-lg border p-2 dark:bg-slate-900" placeholder="Passenger Full Name" />
      <input className="rounded-lg border p-2 dark:bg-slate-900" placeholder="Age" type="number" />
      <select className="rounded-lg border p-2 dark:bg-slate-900">
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input className="rounded-lg border p-2 dark:bg-slate-900" placeholder="ID Proof Number" />
    </form>
  );
}
