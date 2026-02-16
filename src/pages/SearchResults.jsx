import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShimmerSkeleton from '../components/ui/ShimmerSkeleton';
import { useAppStore } from '../store/useAppStore';
import Button from '../components/ui/Button';

export default function SearchResults() {
  const navigate = useNavigate();
  const trains = useAppStore((s) => s.trains);
  const query = useAppStore((s) => s.searchQuery);
  const selectTrain = useAppStore((s) => s.selectTrain);
  const [acOnly, setAcOnly] = useState(false);
  const [duration, setDuration] = useState('all');
  const [loading] = useState(false);

  const filtered = useMemo(() =>
    trains
      .filter((t) => (!acOnly || t.ac))
      .filter((t) => (duration === 'all' ? true : t.duration <= Number(duration))),
  [acOnly, duration, trains]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 p-3 dark:border-slate-700">
        <h2 className="mr-auto text-xl font-bold">{query.from || 'Source'} → {query.to || 'Destination'}</h2>
        <label className="text-sm"><input type="checkbox" checked={acOnly} onChange={(e) => setAcOnly(e.target.checked)} /> AC only</label>
        <select className="rounded-lg border px-2 py-1 text-sm dark:bg-slate-900" value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="all">Any Duration</option>
          <option value="1000">Under 16h</option>
          <option value="1600">Under 26h</option>
        </select>
      </div>

      {loading && <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <ShimmerSkeleton key={i} className="h-28" />)}</div>}

      {!loading && (
        <div className="grid gap-3">
          {filtered.map((t) => (
            <article key={t.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-glow dark:border-slate-700 dark:bg-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold">{t.name} <span className="text-xs text-slate-500">#{t.id}</span></h3>
                  <p className="text-sm text-slate-500">{t.from} → {t.to} • {Math.floor(t.duration / 60)}h {t.duration % 60}m</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{t.fare}</p>
                  {t.surge && <p className="text-xs text-rose-600">Surge pricing active</p>}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {Object.entries(t.classMix).map(([k, v]) => <span key={k} className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-700">{k.toUpperCase()} {v}%</span>)}
              </div>
              <Button className="mt-3" onClick={() => { selectTrain(t); navigate('/booking'); }}>Select & Continue</Button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
