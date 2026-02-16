import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Filter } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import useDebouncedValue from '../hooks/useDebouncedValue';
import TrainResultCard from '../components/TrainResultCard';

const PAGE_SIZE = 120;
const ROW_HEIGHT = 270;
const VIEWPORT_HEIGHT = 700;

export default function SearchResults() {
  const navigate = useNavigate();
  const trains = useAppStore((s) => s.trains);
  const query = useAppStore((s) => s.searchQuery);
  const selectTrain = useAppStore((s) => s.selectTrain);
  const getSearchMatches = useAppStore((s) => s.getSearchMatches);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [classType, setClassType] = useState('all');
  const [departEnd, setDepartEnd] = useState(1439);
  const [arrivalEnd, setArrivalEnd] = useState(1439);
  const [durationMax, setDurationMax] = useState(1800);
  const [fareMax, setFareMax] = useState(12000);
  const [sortBy, setSortBy] = useState('popularity');
  const [page, setPage] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  const debouncedSearch = useDebouncedValue(searchText, 260);

  const byRoute = useMemo(() => {
    const from = (query.from || '').trim().toLowerCase();
    const to = (query.to || '').trim().toLowerCase();
    if (!from && !to) return trains;
    return trains.filter((train) => {
      const fromMatch = from ? train.from.toLowerCase().includes(from) || train.fromStation.name.toLowerCase().includes(from) : true;
      const toMatch = to ? train.to.toLowerCase().includes(to) || train.toStation.name.toLowerCase().includes(to) : true;
      return fromMatch && toMatch;
    });
  }, [query.from, query.to, trains]);

  const textMatched = useMemo(() => {
    if (!debouncedSearch) return byRoute;
    const matches = getSearchMatches(debouncedSearch);
    const ids = new Set(matches.map((t) => t.id));
    return byRoute.filter((t) => ids.has(t.id));
  }, [byRoute, debouncedSearch, getSearchMatches]);

  const filtered = useMemo(() => {
    const next = textMatched
      .filter((train) => (classType === 'all' ? true : train.availableClasses.includes(classType)))
      .filter((train) => train.departureMinutes <= departEnd)
      .filter((train) => train.arrivalMinutes <= arrivalEnd)
      .filter((train) => train.duration <= durationMax)
      .filter((train) => train.fare <= fareMax);

    if (sortBy === 'price') next.sort((a, b) => a.fare - b.fare);
    if (sortBy === 'duration') next.sort((a, b) => a.duration - b.duration);
    if (sortBy === 'departure') next.sort((a, b) => a.departureMinutes - b.departureMinutes);
    if (sortBy === 'popularity') next.sort((a, b) => b.popularity - a.popularity);

    return next;
  }, [arrivalEnd, classType, departEnd, durationMax, fareMax, sortBy, textMatched]);

  const paged = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);

  const cheapestId = useMemo(() => filtered.reduce((best, t) => (best == null || t.fare < best.fare ? t : best), null)?.id, [filtered]);
  const fastestId = useMemo(() => filtered.reduce((best, t) => (best == null || t.duration < best.duration ? t : best), null)?.id, [filtered]);
  const popularId = filtered[0]?.id;

  const onSelect = useCallback((train) => {
    selectTrain(train);
    navigate('/booking');
  }, [navigate, selectTrain]);

  const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + 3;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - 1);
  const endIndex = Math.min(paged.length, startIndex + visibleCount);
  const visibleRows = paged.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-[#0b2d5c] via-[#0f3f88] to-[#dc7a09] p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold">{query.from || 'Source'} → {query.to || 'Destination'}</h2>
          <p className="text-sm">{filtered.length} matches across {trains.length}+ trains</p>
        </div>
        <p className="text-xs text-blue-100">South India optimization active for Chennai, Madurai, Coimbatore, Trichy, Salem, Erode, Tirunelveli, Bengaluru.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-3 dark:border-slate-700">
        <div className="flex flex-wrap gap-2">
          <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by train no/name/station" className="min-w-60 flex-1 rounded-xl border px-3 py-2 text-sm dark:bg-slate-900" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border px-3 py-2 text-sm dark:bg-slate-900">
            <option value="popularity">Sort: Popularity</option>
            <option value="price">Sort: Price</option>
            <option value="duration">Sort: Duration</option>
            <option value="departure">Sort: Departure</option>
          </select>
          <button onClick={() => setFiltersOpen((s) => !s)} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold"><Filter size={14} /> Filters <ChevronDown size={14} className={filtersOpen ? 'rotate-180 transition' : 'transition'} /></button>
        </div>

        {filtersOpen && (
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <label className="text-xs">Class
              <select value={classType} onChange={(e) => setClassType(e.target.value)} className="mt-1 w-full rounded-lg border px-2 py-2 dark:bg-slate-900">
                <option value="all">Any</option><option value="SL">Sleeper</option><option value="3A">3A</option><option value="2A">2A</option><option value="1A">1A</option><option value="CC">CC</option>
              </select>
            </label>
            <label className="text-xs">Departure max: {Math.floor(departEnd / 60)}h
              <input type="range" min="0" max="1439" value={departEnd} onChange={(e) => setDepartEnd(Number(e.target.value))} className="w-full" />
            </label>
            <label className="text-xs">Arrival max: {Math.floor(arrivalEnd / 60)}h
              <input type="range" min="0" max="1439" value={arrivalEnd} onChange={(e) => setArrivalEnd(Number(e.target.value))} className="w-full" />
            </label>
            <label className="text-xs">Duration ≤ {Math.round(durationMax / 60)}h
              <input type="range" min="120" max="2200" value={durationMax} onChange={(e) => setDurationMax(Number(e.target.value))} className="w-full" />
            </label>
            <label className="text-xs">Price cap ₹{fareMax}
              <input type="range" min="300" max="12000" step="50" value={fareMax} onChange={(e) => setFareMax(Number(e.target.value))} className="w-full" />
            </label>
            <div className="text-xs">
              <p className="font-semibold">Route Heat</p>
              <p className="mt-1 text-slate-500">High demand routes are tagged based on simulated occupancy, weekend multiplier and festival load.</p>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-auto rounded-2xl border border-slate-200" style={{ height: VIEWPORT_HEIGHT }} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
        <div style={{ height: paged.length * ROW_HEIGHT, position: 'relative' }}>
          <div style={{ transform: `translateY(${startIndex * ROW_HEIGHT}px)` }}>
            {visibleRows.map((train) => {
              const tags = [];
              if (train.id === cheapestId) tags.push('Best Value');
              if (train.id === fastestId) tags.push('Fastest');
              if (train.id === popularId) tags.push('High Demand');
              return <TrainResultCard key={train.id} train={train} onSelect={onSelect} tags={tags} />;
            })}
          </div>
        </div>
      </div>

      {paged.length < filtered.length && (
        <div className="flex justify-center">
          <button onClick={() => setPage((p) => p + 1)} className="rounded-xl bg-[#0f3f88] px-4 py-2 text-sm font-semibold text-white">Load more (page {page + 1})</button>
        </div>
      )}
    </div>
  );
}
