import Button from '../ui/Button';

export default function StripePanel({ onSelect }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
      <h4 className="font-semibold">Stripe Checkout</h4>
      <p className="text-xs text-slate-500">International cards + enterprise-grade security.</p>
      <Button className="mt-2" onClick={() => onSelect('stripe')}>Use Stripe</Button>
    </div>
  );
}
