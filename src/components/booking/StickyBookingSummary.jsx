import Button from '../ui/Button';

export default function StickyBookingSummary({ train, selectedSeats, amount, method, onContinue }) {
  return (
    <aside className="sticky top-24 rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/85">
      <h3 className="text-lg font-bold">Booking Summary</h3>
      <p className="text-sm text-slate-500">{train.name}</p>
      <div className="mt-3 space-y-2 text-sm">
        <p>Seats: {selectedSeats.length || 1}</p>
        <p>Payment: {method.toUpperCase()}</p>
        <p className="font-bold text-brand-700">Total: ₹{amount}</p>
      </div>
      <Button className="mt-4 w-full" onClick={onContinue}>Proceed to Payment</Button>
    </aside>
  );
}
