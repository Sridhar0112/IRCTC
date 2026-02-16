import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const monthlyBookings = [
  { month: 'Jan', bookings: 120 },
  { month: 'Feb', bookings: 180 },
  { month: 'Mar', bookings: 240 },
  { month: 'Apr', bookings: 260 },
];

const classMix = [
  { name: 'AC', value: 62 },
  { name: 'Non-AC', value: 38 },
];

export default function Charts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-72 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
        <h4 className="mb-3 font-semibold">Monthly Bookings</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyBookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#0891b2" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-72 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
        <h4 className="mb-3 font-semibold">Class Preference</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={classMix} dataKey="value" nameKey="name" fill="#06b6d4" outerRadius={90} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
