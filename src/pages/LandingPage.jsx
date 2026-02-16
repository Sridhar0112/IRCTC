import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import IndiaRailMap from '../components/map/IndiaRailMap';
import { useAppStore } from '../store/useAppStore';

const offers = ['Weekend Saver 20% OFF', 'Student Pass Cashback', 'First AC Luxury Upgrade'];

export default function LandingPage() {
  const navigate = useNavigate();
  const trains = useAppStore((s) => s.trains);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);

  const suggestions = useMemo(() => trains.slice(0, 3).map((t) => `${t.from} → ${t.to}`), [trains]);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSearchQuery({ from: data.get('from'), to: data.get('to'), date: data.get('date') });
    navigate('/search');
  };

  return (
    <div className="space-y-8">
      <motion.section style={{ y }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-cyan-500 to-indigo-600 p-8 text-white shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_40%)]" />
        <div className="relative">
          <h1 className="text-4xl font-black md:text-5xl">Enterprise Railway Booking, Reimagined</h1>
          <p className="mt-2 max-w-2xl text-cyan-50">AI route suggestions, fare prediction, surge insight, live tracking and secure checkout.</p>
          <form onSubmit={submit} className="mt-6 grid gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur md:grid-cols-4">
            <Input id="from" label="Source" name="from" placeholder="Mumbai" required />
            <Input id="to" label="Destination" name="to" placeholder="Delhi" required />
            <Input id="date" label="Date" name="date" type="date" required />
            <Button className="mt-6">Search Trains</Button>
          </form>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-3">
        {offers.map((offer, idx) => (
          <motion.article key={offer} whileHover={{ y: -4 }} className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-lg backdrop-blur dark:bg-slate-800/70">
            <h3 className="font-semibold">{offer}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Auto-applied by smart promo engine.</p>
            <p className="mt-1 text-xs text-brand-700">Priority tier: P{idx + 1}</p>
          </motion.article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
        <h3 className="mb-2 text-lg font-semibold">AI Smart Route Suggestions</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {suggestions.map((route) => <span key={route} className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">{route}</span>)}
        </div>
      </section>

      <IndiaRailMap />
    </div>
  );
}
