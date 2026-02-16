import Button from '../components/ui/Button';
import { useAppStore } from '../store/useAppStore';

export default function PaymentReceipt() {
  const payment = useAppStore((s) => s.payment);
  const selectedTrain = useAppStore((s) => s.selectedTrain);

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-2xl font-bold">Payment Receipt</h2>
      <div className="mt-3 space-y-2 text-sm">
        <p>Train: {selectedTrain?.name || 'N/A'}</p>
        <p>Gateway: {payment.method.toUpperCase()}</p>
        <p>Transaction ID: {payment.transactionId}</p>
        <p>Paid At: {payment.timestamp}</p>
        <p>Amount: ₹{payment.amount}</p>
      </div>
      <Button className="mt-4">Download PDF</Button>
    </section>
  );
}
