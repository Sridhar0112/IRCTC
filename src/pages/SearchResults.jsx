import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainCard from '../components/TrainCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useAppStore } from '../store/useAppStore';

export default function SearchResults() {
  const navigate = useNavigate();
  const trains = useAppStore((s) => s.trains);
  const query = useAppStore((s) => s.searchQuery);
  const selectTrain = useAppStore((s) => s.selectTrain);
  const [acOnly, setAcOnly] = useState(false);
  const [loading] = useState(false);

  const filtered = useMemo(() => trains.filter((t) => (!acOnly || t.ac)), [acOnly, trains]);

  const onSelect = (train) => {
    selectTrain(train);
    navigate('/booking');
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Trains for {query.from || 'Your Route'} → {query.to || 'Destination'}</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={acOnly} onChange={(e) => setAcOnly(e.target.checked)} /> AC only</label>
      </div>
      {loading ? <LoadingSkeleton rows={4} /> : <div className="grid gap-4 md:grid-cols-2">{filtered.map((train) => <TrainCard key={train.id} train={train} onSelect={onSelect} />)}</div>}
    </div>
  );
}
