import { useMemo, useState } from 'react';
import Button from './ui/Button';

export default function AdminTable({ bookings }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = bookings.filter((b) => b.trainName.toLowerCase().includes(query.toLowerCase()) || b.pnr.includes(query));
    return list.sort((a, b) => sortBy === 'amount' ? b.amount - a.amount : b.date.localeCompare(a.date));
  }, [bookings, query, sortBy]);

  const perPage = 5;
  const pages = Math.ceil(filtered.length / perPage) || 1;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const exportCsv = () => {
    const header = 'PNR,Train,Status,Amount,Date\n';
    const rows = filtered.map((b) => `${b.pnr},${b.trainName},${b.status},${b.amount},${b.date}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
      <div className="flex flex-wrap items-center gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search PNR / train" className="rounded-lg border px-3 py-2 text-sm dark:bg-slate-900" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border px-2 py-2 text-sm dark:bg-slate-900">
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
        <Button variant="ghost" onClick={exportCsv}>Export CSV</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="text-left"><th>PNR</th><th>Train</th><th>Status</th><th>Amount</th><th>Date</th></tr></thead>
          <tbody>
            {paged.map((row) => <tr key={row.pnr} className="border-t border-slate-200 dark:border-slate-700"><td>{row.pnr}</td><td>{row.trainName}</td><td>{row.status}</td><td>₹{row.amount}</td><td>{row.date}</td></tr>)}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span>Page {page} / {pages}</span>
        <div className="space-x-2">
          <Button variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
          <Button variant="ghost" onClick={() => setPage((p) => Math.min(pages, p + 1))}>Next</Button>
        </div>
      </div>
    </section>
  );
}
