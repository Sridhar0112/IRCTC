import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeatMap2D from '../components/booking/SeatMap2D';
import StickyBookingSummary from '../components/booking/StickyBookingSummary';
import BookingTimer from '../components/booking/BookingTimer';
import PaymentModal from '../components/payment/PaymentModal';
import Input from '../components/ui/Input';
import { useRealtimeSeats } from '../hooks/useRealtimeSeats';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { useAppStore } from '../store/useAppStore';

export default function BookingPage() {
  useRealtimeSeats();
  useSessionTimer();

  const navigate = useNavigate();
  const train = useAppStore((s) => s.selectedTrain);
  const seatMap = useAppStore((s) => s.seatMap);
  const selectedSeats = useAppStore((s) => s.selectedSeats);
  const toggleSeat = useAppStore((s) => s.toggleSeat);
  const payment = useAppStore((s) => s.payment);
  const bookingSession = useAppStore((s) => s.bookingSession);
  const addBooking = useAppStore((s) => s.addBooking);
  const pushNotification = useAppStore((s) => s.pushNotification);
  const [open, setOpen] = useState(false);

  if (!train) return <p className="rounded-xl bg-amber-100 p-4">Select a train first from search results.</p>;

  const total = (train.dynamicFare || train.fare) * (selectedSeats.length || 1);

  const handleSuccess = () => {
    const pnr = `${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
    addBooking({ pnr, trainName: train.name, status: 'Confirmed', amount: total, date: new Date().toISOString().slice(0, 10), txnId: payment.transactionId || 'pending', method: payment.method });
    pushNotification({ message: `Booking confirmed. PNR ${pnr}` });
    navigate('/payment-success');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold">{train.name} Booking</h2>
            <p className="text-xs text-slate-500">Live availability updates enabled • Surge x{train.surgeMultiplier}</p>
          </div>
          <BookingTimer seconds={bookingSession.expiresIn} />
        </div>

        <SeatMap2D seatMap={seatMap} selectedSeats={selectedSeats} onToggleSeat={toggleSeat} />

        <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h3 className="mb-3 text-lg font-semibold">Passenger Details</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Input id="name" label="Full Name" placeholder="Passenger Name" />
            <Input id="age" label="Age" type="number" placeholder="30" />
            <Input id="idProof" label="ID Proof" placeholder="Aadhaar / Passport" />
            <Input id="promo" label="Promo Code" placeholder="IRCTC20" />
          </div>
        </section>
      </div>

      <StickyBookingSummary train={train} selectedSeats={selectedSeats} amount={total} method={payment.method} onContinue={() => setOpen(true)} />

      <PaymentModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
        onFailure={() => navigate('/payment-failure')}
      />
    </div>
  );
}
