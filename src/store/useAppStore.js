import { create } from 'zustand';
import { createTrainDataset } from '../data/trainDataset';

const now = new Date();
const allTrains = createTrainDataset(640);

const initialTrain = allTrains[0];
const buildSeatMap = (train = initialTrain) => {
  const coaches = Object.entries(train.classAvailability).flatMap(([cls, meta]) => {
    const coachCount = Math.max(1, Math.round(meta.capacity / 24));
    return Array.from({ length: coachCount }, (_, idx) => ({ cls, coach: `${cls}${idx + 1}` }));
  });

  return Array.from({ length: 72 }, (_, i) => {
    const coachObj = coaches[i % coaches.length] || { cls: 'SL', coach: 'SL1' };
    const chance = Math.random();
    let status = 'available';
    if (chance > 0.84) status = 'booked';
    else if (chance > 0.74) status = 'held';
    return { id: i + 1, coach: coachObj.coach, classType: coachObj.cls, status };
  });
};

const demandCache = new Map();

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
    frequentRoutes: ['Chennai-Madurai', 'Chennai-Bangalore'],
    savedPassengers: [
      { id: 'p1', name: 'Aarav Sharma', age: 31, gender: 'Male' },
      { id: 'p2', name: 'Mira Sharma', age: 29, gender: 'Female' },
    ],
    deviceHistory: [
      { id: 1, device: 'Chrome on MacOS', at: now.toISOString(), ip: '103.21.98.4' },
      { id: 2, device: 'Safari on iPhone', at: new Date(now - 86400000).toISOString(), ip: '103.21.98.4' },
    ],
  },
  trains: allTrains,
  indexedTrains: allTrains.map((train) => ({ id: train.id, key: train.searchIndex })),
  searchQuery: { from: 'Chennai', to: 'Madurai', date: '' },
  seatMap: buildSeatMap(initialTrain),
  selectedTrain: null,
  selectedSeats: [],
  bookingSession: { expiresIn: 300, active: false, heldAt: null },
  bookings: [
    { pnr: '8451023456', trainName: 'Kaveri Superfast', status: 'Confirmed', amount: 1850, date: '2026-01-14', txnId: 'txn_990112', method: 'Razorpay' },
    { pnr: '8451099230', trainName: 'Pothigai Express', status: 'Cancelled', amount: 1420, date: '2025-12-20', txnId: 'txn_882153', method: 'Stripe' },
  ],
  bookingFeed: ['Realtime seat engine online.'],
  notifications: [],
  notificationCenterOpen: false,
  payment: { method: 'razorpay', promoCode: '', amount: 0, status: 'initiated', transactionId: '', timestamp: '', queuePosition: null },
  security: { warningOpen: false, countdown: 90, suspicious: false, pushPermissionPrompt: true, installBanner: true },
  ui: { mobileMenu: false, paymentModal: false, sessionModal: false },
  cachedSearches: {},
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
  getSearchMatches: (needle = '') => {
    const normalized = needle.trim().toLowerCase();
    if (!normalized) return get().trains;
    if (demandCache.has(normalized)) return demandCache.get(normalized);

    const idSet = new Set(
      get()
        .indexedTrains
        .filter((entry) => entry.key.includes(normalized))
        .map((entry) => entry.id),
    );

    const hits = get().trains.filter((train) => idSet.has(train.id));
    demandCache.set(normalized, hits);
    return hits;
  },
  selectTrain: (train) =>
    set({
      selectedTrain: train,
      selectedSeats: [],
      seatMap: buildSeatMap(train),
      bookingSession: { expiresIn: 300, active: true, heldAt: Date.now() },
      payment: { ...get().payment, amount: train?.dynamicFare || train?.fare || 0, queuePosition: null },
    }),
  toggleSeat: (seatNo) =>
    set((state) => {
      const seat = state.seatMap.find((s) => s.id === seatNo);
      if (!seat || seat.status === 'booked') return state;
      const exists = state.selectedSeats.includes(seatNo);
      const optimistic = exists ? state.selectedSeats.filter((seatId) => seatId !== seatNo) : [...state.selectedSeats, seatNo];
      return {
        selectedSeats: optimistic,
        seatMap: state.seatMap.map((s) => (s.id === seatNo ? { ...s, status: exists ? 'available' : 'held' } : s)),
      };
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
          bookingSession: { expiresIn: 0, active: false, heldAt: null },
          selectedSeats: [],
          seatMap: state.seatMap.map((seat) => (seat.status === 'held' ? { ...seat, status: 'available' } : seat)),
          notifications: [...state.notifications, { id: Date.now(), type: 'warning', message: 'Booking session expired. Seats auto-released.' }],
        };
      }
      return { bookingSession: { ...state.bookingSession, expiresIn: next } };
    }),
  refreshSeatMapFromSocket: () =>
    set((state) => {
      const seatToFlip = Math.floor(Math.random() * state.seatMap.length) + 1;
      const updated = state.seatMap.map((seat) => {
        if (seat.id !== seatToFlip || state.selectedSeats.includes(seat.id)) return seat;
        return { ...seat, status: seat.status === 'available' ? 'booked' : 'available' };
      });
      const train = state.selectedTrain;
      return {
        seatMap: updated,
        selectedTrain: train
          ? {
              ...train,
              seatsLeft: Math.max(0, train.seatsLeft - (Math.random() > 0.52 ? 1 : 0)),
              surgeMultiplier: Math.min(2.45, Number((train.surgeMultiplier + (Math.random() > 0.82 ? 0.01 : 0)).toFixed(2))),
            }
          : train,
        bookingFeed: [`Seat ${seatToFlip} changed due to high traffic`, ...state.bookingFeed].slice(0, 20),
      };
    }),
  updatePromo: (promoCode) => set((state) => ({ payment: { ...state.payment, promoCode } })),
  setPaymentMethod: (method) => set((state) => ({ payment: { ...state.payment, method } })),
  setPaymentStatus: (status) => set((state) => ({ payment: { ...state.payment, status } })),
  setPaymentQueuePosition: (queuePosition) => set((state) => ({ payment: { ...state.payment, queuePosition } })),
  completePayment: (method) =>
    set((state) => ({
      payment: {
        ...state.payment,
        method,
        status: 'confirmed',
        transactionId: `txn_${Math.floor(Math.random() * 999999)}`,
        timestamp: new Date().toISOString(),
        queuePosition: null,
      },
      bookingSession: { expiresIn: 0, active: false, heldAt: null },
      seatMap: state.seatMap.map((seat) => (state.selectedSeats.includes(seat.id) ? { ...seat, status: 'booked' } : seat)),
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
