import { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#1d4ed8', '#0ea5e9', '#fb923c', '#e11d48', '#14b8a6'];

const corridorSlots = ['05-08', '08-11', '11-14', '14-17', '17-20', '20-23'];

export default function Charts({ trains = [] }) {
  const southTrains = useMemo(() => trains.filter((t) => t.southIndiaRoute), [trains]);

  const revenueSeries = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, idx) => {
      const sample = southTrains.slice(idx * 10, idx * 10 + 55);
      const revenue = sample.reduce((sum, train) => sum + train.fare * (train.totalCapacity - train.seatsLeft), 0) / 100000;
      return { month, revenue: Number(revenue.toFixed(1)) || 6.2, bookings: sample.length * 2 + 70 };
    });
  }, [southTrains]);

  const chennaiPie = useMemo(() => {
    const fromChennai = southTrains.filter((t) => t.fromStation.city === 'Chennai');
    const bucket = {};
    fromChennai.forEach((train) => {
      bucket[train.toStation.city] = (bucket[train.toStation.city] || 0) + 1;
    });
    return Object.entries(bucket).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6);
  }, [southTrains]);

  const classDistribution = useMemo(() => {
    const tally = {};
    southTrains.forEach((train) => {
      Object.keys(train.classAvailability).forEach((cls) => {
        tally[cls] = (tally[cls] || 0) + 1;
      });
    });
    return Object.entries(tally).map(([name, bookings]) => ({ name, bookings })).sort((a, b) => b.bookings - a.bookings);
  }, [southTrains]);

  const topRoutes = useMemo(() => {
    const routes = {};
    southTrains.forEach((train) => {
      const key = `${train.fromStation.city} → ${train.toStation.city}`;
      routes[key] = (routes[key] || 0) + train.popularity;
    });
    return Object.entries(routes).map(([route, score]) => ({ route, score })).sort((a, b) => b.score - a.score).slice(0, 10);
  }, [southTrains]);

  const corridorHeatmap = useMemo(() => {
    const corridor = southTrains.filter((t) => {
      const from = t.fromStation.city;
      const to = t.toStation.city;
      return (from === 'Chennai' && to === 'Madurai') || (from === 'Madurai' && to === 'Chennai');
    });

    return corridorSlots.map((slot) => {
      const [from, to] = slot.split('-').map(Number);
      const trainsInSlot = corridor.filter((t) => {
        const hour = Math.floor(t.departureMinutes / 60);
        return hour >= from && hour < to;
      });
      const avg = trainsInSlot.length ? Math.round(trainsInSlot.reduce((sum, t) => sum + t.occupancy, 0) / trainsInSlot.length) : 0;
      return { slot, occupancy: avg };
    });
  }, [southTrains]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-72 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="mb-3 font-semibold">South India Revenue Trend (₹ Lakhs)</h4>
          <ResponsiveContainer>
            <AreaChart data={revenueSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#1d4ed8" fill="#93c5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="mb-3 font-semibold">Chennai Route Dominance</h4>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chennaiPie} dataKey="value" nameKey="name" outerRadius={90} label>
                {chennaiPie.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-72 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="mb-3 font-semibold">Train Class Booking Distribution</h4>
          <ResponsiveContainer>
            <BarChart data={classDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="mb-3 font-semibold">Chennai ↔ Madurai Occupancy Heatmap</h4>
          <div className="grid grid-cols-3 gap-2">
            {corridorHeatmap.map((slot) => (
              <div key={slot.slot} className="rounded-lg border border-slate-200 p-2 text-center dark:border-slate-700">
                <p className="text-xs text-slate-500">{slot.slot}</p>
                <p className="text-lg font-bold" style={{ color: slot.occupancy > 80 ? '#dc2626' : slot.occupancy > 65 ? '#f59e0b' : '#16a34a' }}>{slot.occupancy}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
        <h4 className="mb-3 font-semibold">Top 10 Busiest South Routes</h4>
        <div className="space-y-2 text-sm">
          {topRoutes.map((row, idx) => (
            <div key={row.route} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900">
              <span>{idx + 1}. {row.route}</span>
              <strong>{row.score}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
