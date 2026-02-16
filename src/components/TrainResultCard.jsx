import { memo } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const demandStyles = {
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
};

function availabilityBar(available, capacity) {
  const pct = capacity ? Math.round((available / capacity) * 100) : 0;
  return { width: `${pct}%`, pct };
}

function TrainResultCard({ train, style, onSelect, tags = [] }) {
  return (
    <div style={style} className="px-1 py-1">
      <motion.article whileHover={{ y: -2 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-glow dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{train.name} <span className="text-xs text-slate-500">#{train.number}</span></h3>
            <p className="text-sm text-slate-500">{train.fromStation.name} → {train.toStation.name}</p>
            <p className="text-xs text-slate-500">{train.departure} → {train.arrival}{train.arrivalDayOffset ? ' (+1)' : ''} • {Math.floor(train.duration / 60)}h {train.duration % 60}m • {train.distance} km</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-brand-700 dark:text-brand-400">₹{train.fare}</p>
            <p className="text-xs text-slate-500">from {train.availableClasses.join(', ')}</p>
            {train.surge && <p className="text-xs font-semibold text-orange-600">Surge x{train.surgeMultiplier}</p>}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          {train.southIndiaRoute && <span className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-700">South Corridor</span>}
          <span className={`rounded-full px-2 py-1 ${demandStyles[train.routeDemand]}`}>{train.routeDemand} Demand</span>
          {train.overnight && <span className="rounded-full bg-slate-900 px-2 py-1 text-white">Overnight</span>}
          {tags.map((tag) => <span key={tag} className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">{tag}</span>)}
          {train.festivalRush && <span className="rounded-full bg-fuchsia-100 px-2 py-1 text-fuchsia-700">Festival Rush</span>}
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {Object.entries(train.classAvailability).slice(0, 3).map(([classType, availability]) => {
            const bar = availabilityBar(availability.available, availability.capacity);
            return (
              <div key={classType} className="rounded-xl border border-slate-200 p-2 text-xs dark:border-slate-700">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold">{classType}</span>
                  <span>{availability.available}/{availability.capacity}</span>
                </div>
                <div className="h-1.5 rounded bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded bg-gradient-to-r from-brand-600 to-orange-500" style={{ width: bar.width }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-slate-500">Runs: {train.runningDays.join(', ')}</p>
          <Button onClick={() => onSelect(train)}>Book Seats ({train.seatsLeft})</Button>
        </div>
      </motion.article>
    </div>
  );
}

export default memo(TrainResultCard);
