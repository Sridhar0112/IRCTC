export default function KPIWidgets({ bookings, trains }) {
  const revenue = bookings.reduce((sum, b) => sum + b.amount, 0);
  const occupancy = Math.round(trains.reduce((sum, t) => sum + t.occupancy, 0) / trains.length);
  const data = [
    ['Revenue', `₹${revenue}`],
    ['Bookings', bookings.length],
    ['Occupancy %', `${occupancy}%`],
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {data.map(([label, value]) => (
        <article key={label} className="rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 p-4 text-white shadow-glow">
          <p className="text-sm text-white/80">{label}</p>
          <strong className="text-2xl">{value}</strong>
        </article>
      ))}
    </div>
  );
}
