import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import IndiaRailMap from '../components/map/IndiaRailMap';
import { useAppStore } from '../store/useAppStore';

const offers = ['Weekend Saver 20% OFF', 'Student Pass Cashback', 'Temple Corridor Special'];

export default function LandingPage() {
  const navigate = useNavigate();
  const trains = useAppStore((s) => s.trains);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);

  const suggestions = useMemo(() => trains.filter((t) => t.southIndiaRoute).slice(0, 6).map((t) => `${t.from} → ${t.to}`), [trains]);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSearchQuery({ from: data.get('from'), to: data.get('to'), date: data.get('date') });
    navigate('/search');
  };

  return (
    <div className="space-y-8">
      <motion.section style={{ y }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#092a5a] via-[#0f3f88] to-[#d97706] p-8 text-white shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_42%)]" />
        <div className="relative">
          <h1 className="text-4xl font-black md:text-5xl">IRCTC South India High-Capacity Booking</h1>
          <p className="mt-2 max-w-2xl text-blue-100">Optimized for 500+ trains, realtime demand simulation, and corridor intelligence for Tamil Nadu + Karnataka routes.</p>
          <form onSubmit={submit} className="mt-6 grid gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur md:grid-cols-4">
            <Input id="from" label="Source" name="from" placeholder="Chennai" required />
            <Input id="to" label="Destination" name="to" placeholder="Madurai" required />
            <Input id="date" label="Date" name="date" type="date" required />
            <Button className="mt-6">Search Trains</Button>
          </form>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-3">
        {offers.map((offer, idx) => (
          <motion.article key={offer} whileHover={{ y: -4 }} className="rounded-2xl border border-orange-200 bg-gradient-to-r from-white to-orange-50 p-4 shadow-lg dark:from-slate-800 dark:to-slate-800/70">
            <h3 className="font-semibold">{offer}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Auto-applied by smart fare engine.</p>
            <p className="mt-1 text-xs text-orange-700">South Badge: S{idx + 1}</p>
          </motion.article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
        <h3 className="mb-2 text-lg font-semibold">South India Priority Routes</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {suggestions.map((route) => <span key={route} className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{route}</span>)}
        </div>
      </section>

      <IndiaRailMap />
    </div>
  );
}
