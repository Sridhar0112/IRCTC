import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
  return (
    <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center dark:bg-emerald-950/40">
      <h2 className="text-3xl font-bold text-emerald-700">Payment Successful 🎉</h2>
      <p className="mt-2">Your train booking is confirmed and notification has been sent.</p>
      <Link to="/profile" className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-white">Go to Profile</Link>
    </div>
  );
}
