export default function OccupancyHeatmap({ trains }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
      <h4 className="mb-3 font-semibold">Train Occupancy Heatmap</h4>
      <div className="space-y-2">
        {trains.map((t) => (
          <div key={t.id}>
            <div className="mb-1 flex justify-between text-xs"><span>{t.name}</span><span>{t.occupancy}%</span></div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-rose-500" style={{ width: `${t.occupancy}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
