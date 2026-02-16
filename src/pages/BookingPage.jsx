import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import PaymentModal from '../components/PaymentModal';
import { useAppStore } from '../store/useAppStore';

export default function BookingPage() {
  const navigate = useNavigate();
  const train = useAppStore((s) => s.selectedTrain);
  const selectedSeats = useAppStore((s) => s.selectedSeats);
  const toggleSeat = useAppStore((s) => s.toggleSeat);
  const payment = useAppStore((s) => s.payment);
  const setPaymentMethod = useAppStore((s) => s.setPaymentMethod);
  const addBooking = useAppStore((s) => s.addBooking);
  const pushNotification = useAppStore((s) => s.pushNotification);
  const [open, setOpen] = useState(false);

  if (!train) return <p className="rounded-xl bg-amber-100 p-4">Select a train first from search results.</p>;

  const pay = () => {
    const pnr = `${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
    addBooking({ pnr, trainName: train.name, status: 'Confirmed', amount: train.fare, date: new Date().toISOString().slice(0, 10) });
    pushNotification({ message: `Booking confirmed! PNR: ${pnr}` });
    setOpen(false);
    navigate('/payment-success');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold">Book {train.name}</h2>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
          {Array.from({ length: 24 }).map((_, i) => {
            const seatNo = i + 1;
            const selected = selectedSeats.includes(seatNo);
            return <button key={seatNo} onClick={() => toggleSeat(seatNo)} className={`rounded-lg border p-2 text-sm ${selected ? 'bg-brand-600 text-white' : ''}`}>S{seatNo}</button>;
          })}
        </div>
        <BookingForm />
      </div>
      <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-lg font-semibold">Fare Summary</h3>
        <p className="mt-2 text-sm">Seats: {selectedSeats.length || 1}</p>
        <p className="text-sm">Method: {payment.method.toUpperCase()}</p>
        <p className="mt-3 text-xl font-bold">₹{train.fare * (selectedSeats.length || 1)}</p>
        <button onClick={() => setOpen(true)} className="mt-4 w-full rounded-xl bg-brand-600 px-4 py-2 font-medium text-white">Continue to Payment</button>
      </aside>
      <PaymentModal open={open} onClose={() => setOpen(false)} onPay={pay} method={payment.method} setMethod={setPaymentMethod} />
    </div>
  );
}
