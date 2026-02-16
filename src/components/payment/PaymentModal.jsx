import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import RazorpayPanel from './RazorpayPanel';
import StripePanel from './StripePanel';
import PaymentStepper from './PaymentStepper';
import { useAppStore } from '../../store/useAppStore';

export default function PaymentModal({ open, onClose, onSuccess, onFailure }) {
  const payment = useAppStore((s) => s.payment);
  const setMethod = useAppStore((s) => s.setPaymentMethod);
  const setStatus = useAppStore((s) => s.setPaymentStatus);
  const completePayment = useAppStore((s) => s.completePayment);
  const [isWorking, setWorking] = useState(false);

  const processPayment = () => {
    setWorking(true);
    setStatus('processing');
    setTimeout(() => {
      const success = Math.random() > 0.15;
      if (success) {
        completePayment(payment.method);
        onSuccess();
      } else {
        setStatus('failed');
        onFailure();
      }
      setWorking(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title="Complete Payment">
      <PaymentStepper status={payment.status} />
      <div className="grid gap-3 md:grid-cols-2">
        <RazorpayPanel onSelect={setMethod} />
        <StripePanel onSelect={setMethod} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">Current: {payment.method.toUpperCase()}</p>
        <Button onClick={processPayment}>{isWorking ? 'Processing...' : 'Pay Now'}</Button>
      </div>
    </Modal>
  );
}
