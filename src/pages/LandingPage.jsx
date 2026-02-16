import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSearchQuery({ from: data.get('from'), to: data.get('to'), date: data.get('date') });
    navigate('/search');
  };

  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-600 p-8 text-white shadow-glow">
        <h1 className="text-4xl font-black md:text-5xl">Book Smarter Journeys with IRCTC Next</h1>
        <p className="mt-2 max-w-2xl text-brand-50">Discover trains, lock seats, apply offers, and pay securely in seconds.</p>
        <form onSubmit={submit} className="mt-6 grid gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur md:grid-cols-4">
          <input name="from" required placeholder="From" className="rounded-lg p-2 text-slate-900" />
          <input name="to" required placeholder="To" className="rounded-lg p-2 text-slate-900" />
          <input name="date" required type="date" className="rounded-lg p-2 text-slate-900" />
          <button className="rounded-lg bg-white px-4 py-2 font-semibold text-brand-700">Search Trains</button>
        </form>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-3">
        {['Weekend Saver 20% OFF', 'Student Pass Cashback', 'First AC Luxury Upgrade'].map((offer) => (
          <div key={offer} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold">{offer}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Limited seats. Valid till this Sunday.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
