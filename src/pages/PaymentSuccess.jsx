import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import Button from '../components/ui/Button';

export default function PaymentSuccess() {
  const payment = useAppStore((s) => s.payment);

  return (
    <section className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 dark:bg-emerald-950/30">
      <h2 className="text-3xl font-bold text-emerald-700">Payment Confirmed</h2>
      <p className="mt-2 text-sm">Transaction ID: {payment.transactionId || 'txn_pending'}</p>
      <p className="text-sm">Method: {payment.method.toUpperCase()}</p>
      <p className="text-sm">Timestamp: {payment.timestamp || new Date().toISOString()}</p>
      <div className="mt-4 flex gap-2">
        <Button variant="secondary">Download Invoice PDF</Button>
        <Link to="/receipt"><Button variant="ghost">View Receipt</Button></Link>
      </div>
    </section>
  );
}
