export default function BookingTimer({ seconds }) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const danger = seconds < 120;
  return <p className={`rounded-lg px-3 py-2 text-sm font-semibold ${danger ? 'bg-rose-100 text-rose-700' : 'bg-brand-50 text-brand-700'}`}>Session expires in {mm}:{ss}</p>;
}
