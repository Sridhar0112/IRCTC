import { TicketPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingBookingButton() {
  return (
    <Link
      to="/booking"
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-105 md:bottom-6"
    >
      <TicketPlus size={16} /> Quick Book
    </Link>
  );
}
