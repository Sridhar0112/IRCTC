import { create } from 'zustand';

const now = new Date();
const demoTrains = [
  { id: '12951', name: 'Rajdhani Express', from: 'Mumbai', to: 'Delhi', departure: '06:00', duration: 880, ac: true, seatsLeft: 23, fare: 1850, occupancy: 82, surge: true, classMix: { sleeper: 22, ac3: 41, ac2: 28, ac1: 9 } },
  { id: '12002', name: 'Shatabdi Express', from: 'New Delhi', to: 'Bhopal', departure: '07:25', duration: 490, ac: true, seatsLeft: 12, fare: 1420, occupancy: 90, surge: false, classMix: { cc: 44, ec: 56 } },
  { id: '11077', name: 'Jhelum Express', from: 'Pune', to: 'Jammu', departure: '17:20', duration: 2100, ac: false, seatsLeft: 41, fare: 960, occupancy: 68, surge: false, classMix: { sleeper: 60, ac3: 27, ac2: 13 } },
  { id: '22691', name: 'Bengaluru Rajdhani', from: 'Bengaluru', to: 'Hazrat Nizamuddin', departure: '20:00', duration: 1980, ac: true, seatsLeft: 8, fare: 2140, occupancy: 94, surge: true, classMix: { ac3: 46, ac2: 36, ac1: 18 } },
];

const seats = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  coach: `B${Math.floor(i / 8) + 1}`,
  status: Math.random() > 0.22 ? 'available' : 'booked',
}));

export const useAppStore = create((set, get) => ({
  config: { locale: 'en', currency: 'INR' },
  theme: localStorage.getItem('theme') || 'light',
  role: 'admin',
  user: {
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+91 99999 88888',
    loyalty: 'Gold',
    loyaltyPoints: 1890,
    wallet: 4520,
    frequentRoutes: ['Mumbai-Delhi', 'Delhi-Bhopal'],
    savedPassengers: [
      { id: 'p1', name: 'Aarav Sharma', age: 31, gender: 'Male' },
      { id: 'p2', name: 'Mira Sharma', age: 29, gender: 'Female' },
    ],
    deviceHistory: [
      { id: 1, device: 'Chrome on MacOS', at: now.toISOString(), ip: '103.21.98.4' },
      { id: 2, device: 'Safari on iPhone', at: new Date(now - 86400000).toISOString(), ip: '103.21.98.4' },
    ],
  },
  trains: demoTrains,
  searchQuery: { from: '', to: '', date: '' },
  seatMap: seats,
  selectedTrain: null,
  selectedSeats: [],
  bookingSession: { expiresIn: 600, active: false },
  bookings: [
    { pnr: '8451023456', trainName: 'Rajdhani Express', status: 'Confirmed', amount: 1850, date: '2026-01-14', txnId: 'txn_990112', method: 'Razorpay' },
    { pnr: '8451099230', trainName: 'Shatabdi Express', status: 'Cancelled', amount: 1420, date: '2025-12-20', txnId: 'txn_882153', method: 'Stripe' },
  ],
  bookingFeed: ['Seat update stream connected.'],
  notifications: [],
  notificationCenterOpen: false,
  payment: { method: 'razorpay', promoCode: '', amount: 0, status: 'initiated', transactionId: '', timestamp: '' },
  security: { warningOpen: false, countdown: 90, suspicious: false, pushPermissionPrompt: true, installBanner: true },
  ui: { mobileMenu: false, paymentModal: false, sessionModal: false },
  setRole: (role) => set({ role }),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    set({ theme: next });
  },
  setLocale: (locale) => set((s) => ({ config: { ...s.config, locale } })),
  setCurrency: (currency) => set((s) => ({ config: { ...s.config, currency } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectTrain: (train) =>
    set({
      selectedTrain: train,
      selectedSeats: [],
      bookingSession: { expiresIn: 600, active: true },
      payment: { ...get().payment, amount: train?.fare || 0 },
    }),
  toggleSeat: (seatNo) =>
    set((state) => {
      const seat = state.seatMap.find((s) => s.id === seatNo);
      if (!seat || seat.status === 'booked') return state;
      const exists = state.selectedSeats.includes(seatNo);
      const optimistic = exists ? state.selectedSeats.filter((seatId) => seatId !== seatNo) : [...state.selectedSeats, seatNo];
      return { selectedSeats: optimistic };
    }),
  markSeatStatus: (seatNo, status) =>
    set((state) => ({
      seatMap: state.seatMap.map((seat) => (seat.id === seatNo ? { ...seat, status } : seat)),
    })),
  tickBookingSession: () =>
    set((state) => {
      if (!state.bookingSession.active) return state;
      const next = state.bookingSession.expiresIn - 1;
      if (next <= 0) {
        return {
          bookingSession: { expiresIn: 0, active: false },
          selectedSeats: [],
          notifications: [...state.notifications, { id: Date.now(), type: 'warning', message: 'Booking session expired. Seats auto-released.' }],
        };
      }
      return { bookingSession: { ...state.bookingSession, expiresIn: next } };
    }),
  refreshSeatMapFromSocket: () =>
    set((state) => {
      const seatToFlip = Math.floor(Math.random() * state.seatMap.length) + 1;
      const updated = state.seatMap.map((seat) =>
        seat.id === seatToFlip ? { ...seat, status: seat.status === 'available' ? 'held' : 'available' } : seat,
      );
      return {
        seatMap: updated,
        bookingFeed: [`Seat ${seatToFlip} updated in real-time`, ...state.bookingFeed].slice(0, 20),
      };
    }),
  updatePromo: (promoCode) => set((state) => ({ payment: { ...state.payment, promoCode } })),
  setPaymentMethod: (method) => set((state) => ({ payment: { ...state.payment, method } })),
  setPaymentStatus: (status) => set((state) => ({ payment: { ...state.payment, status } })),
  completePayment: (method) =>
    set((state) => ({
      payment: {
        ...state.payment,
        method,
        status: 'confirmed',
        transactionId: `txn_${Math.floor(Math.random() * 999999)}`,
        timestamp: new Date().toISOString(),
      },
    })),
  pushNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, { id: Date.now(), ...notification }] })),
  popNotification: () => set((state) => ({ notifications: state.notifications.slice(1) })),
  toggleNotificationCenter: () => set((state) => ({ notificationCenterOpen: !state.notificationCenterOpen })),
  addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
  cancelBooking: (pnr) =>
    set((state) => ({ bookings: state.bookings.map((b) => (b.pnr === pnr ? { ...b, status: 'Cancelled' } : b)) })),
  setSecurityWarning: (open) => set((state) => ({ security: { ...state.security, warningOpen: open } })),
  tickSecurityCountdown: () =>
    set((state) => ({ security: { ...state.security, countdown: Math.max(0, state.security.countdown - 1) } })),
  acknowledgeInstallBanner: () => set((state) => ({ security: { ...state.security, installBanner: false } })),
  dismissPushPrompt: () => set((state) => ({ security: { ...state.security, pushPermissionPrompt: false } })),
}));
