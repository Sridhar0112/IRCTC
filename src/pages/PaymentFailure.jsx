import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function PaymentFailure() {
  return (
    <section className="rounded-2xl border border-rose-300 bg-rose-50 p-8 dark:bg-rose-950/30">
      <h2 className="text-3xl font-bold text-rose-700">Payment Failed</h2>
      <p className="mt-2">Retry payment or switch gateway.</p>
      <div className="mt-4 flex gap-2">
        <Link to="/booking"><Button>Retry Payment</Button></Link>
      </div>
    </section>
  );
}
