import { motion } from 'framer-motion';
import { useMemo } from 'react';

const seatStyles = {
  available: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  held: 'bg-amber-100 text-amber-700 border-amber-300',
  booked: 'bg-rose-100 text-rose-700 border-rose-300 cursor-not-allowed',
  selected: 'bg-brand-600 text-white border-brand-700',
};

export default function SeatMap2D({ seatMap, selectedSeats, onToggleSeat }) {
  const grouped = useMemo(() => {
    const acc = {};
    seatMap.forEach((seat) => {
      if (!acc[seat.coach]) acc[seat.coach] = [];
      acc[seat.coach].push(seat);
    });
    return acc;
  }, [seatMap]);

  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([coach, seats]) => (
        <section key={coach} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-700">
          <h4 className="mb-2 text-sm font-bold">Coach {coach}</h4>
          <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
            {seats.map((seat) => {
              const selected = selectedSeats.includes(seat.id);
              const cls = selected ? seatStyles.selected : seatStyles[seat.status];
              return (
                <motion.button
                  layout
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  key={seat.id}
                  onClick={() => onToggleSeat(seat.id)}
                  disabled={seat.status === 'booked'}
                  className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${cls}`}
                >
                  S{seat.id}
                </motion.button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
