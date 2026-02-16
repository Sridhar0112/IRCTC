import { Link } from 'react-router-dom';

export default function PaymentFailure() {
  return (
    <div className="rounded-2xl border border-rose-300 bg-rose-50 p-8 text-center dark:bg-rose-950/40">
      <h2 className="text-3xl font-bold text-rose-700">Payment Failed</h2>
      <p className="mt-2">Something went wrong while processing payment. Please retry.</p>
      <Link to="/booking" className="mt-4 inline-block rounded-lg bg-rose-600 px-4 py-2 text-white">Retry Payment</Link>
    </div>
  );
}
