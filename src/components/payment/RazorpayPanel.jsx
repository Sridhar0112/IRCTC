import Button from '../ui/Button';

export default function RazorpayPanel({ onSelect }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
      <h4 className="font-semibold">Razorpay Gateway</h4>
      <p className="text-xs text-slate-500">UPI, card, netbanking and wallet support.</p>
      <Button className="mt-2" onClick={() => onSelect('razorpay')}>Use Razorpay</Button>
    </div>
  );
}
