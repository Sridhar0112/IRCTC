import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', revenue: 12.1, bookings: 120 },
  { month: 'Feb', revenue: 14.8, bookings: 180 },
  { month: 'Mar', revenue: 19.2, bookings: 240 },
  { month: 'Apr', revenue: 22.6, bookings: 260 },
  { month: 'May', revenue: 21.4, bookings: 245 },
];

const farePrediction = [
  { day: 'D-5', fare: 1200, dynamic: 1280 },
  { day: 'D-4', fare: 1290, dynamic: 1340 },
  { day: 'D-3', fare: 1320, dynamic: 1470 },
  { day: 'D-2', fare: 1480, dynamic: 1690 },
  { day: 'D-1', fare: 1650, dynamic: 1940 },
];

export default function Charts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-72 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
        <h4 className="mb-3 font-semibold">Monthly Revenue (in Lakhs)</h4>
        <ResponsiveContainer>
          <ComposedChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            <Area type="monotone" dataKey="revenue" fill="#06b6d4" stroke="#0891b2" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="h-72 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
        <h4 className="mb-3 font-semibold">Fare Prediction & Dynamic Pricing</h4>
        <ResponsiveContainer>
          <AreaChart data={farePrediction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="fare" stackId="1" stroke="#14b8a6" fill="#14b8a6" />
            <Area type="monotone" dataKey="dynamic" stackId="2" stroke="#f97316" fill="#fb923c" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
