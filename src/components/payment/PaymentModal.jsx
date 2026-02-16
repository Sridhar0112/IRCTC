import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
  const setPaymentQueuePosition = useAppStore((s) => s.setPaymentQueuePosition);
  const [isWorking, setWorking] = useState(false);

  useEffect(() => {
    if (!open) return;
    const queue = Math.floor(Math.random() * 35) + 1;
    setPaymentQueuePosition(queue);
  }, [open, setPaymentQueuePosition]);

  const processPayment = () => {
    setWorking(true);
    setStatus('processing');
    let queue = payment.queuePosition ?? 12;

    const queueTimer = setInterval(() => {
      queue -= 1;
      setPaymentQueuePosition(Math.max(0, queue));
      if (queue <= 0) {
        clearInterval(queueTimer);
        const success = Math.random() > 0.12;
        if (success) {
          completePayment(payment.method);
          onSuccess();
        } else {
          setStatus('failed');
          onFailure();
        }
        setWorking(false);
        onClose();
      }
    }, 120);
  };

  return (
    <Modal open={open} onClose={onClose} title="Complete Payment">
      <PaymentStepper status={payment.status} />
      <div className="grid gap-3 md:grid-cols-2">
        <RazorpayPanel onSelect={setMethod} />
        <StripePanel onSelect={setMethod} />
      </div>
      <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs text-orange-700">
        <p className="font-semibold">Payment Queue</p>
        <p>High traffic window. Queue position: {payment.queuePosition ?? '--'}</p>
        {isWorking && (
          <motion.div className="mt-2 h-1.5 rounded-full bg-orange-200" initial={false}>
            <motion.div className="h-full rounded-full bg-orange-500" animate={{ width: `${Math.min(100, ((36 - (payment.queuePosition || 0)) / 36) * 100)}%` }} />
          </motion.div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">Current: {payment.method.toUpperCase()}</p>
        <Button onClick={processPayment}>{isWorking ? 'Processing Queue...' : 'Pay Now'}</Button>
      </div>
    </Modal>
  );
}
