import { create } from 'zustand';

const demoTrains = [
  { id: '12951', name: 'Rajdhani Express', from: 'Mumbai', to: 'Delhi', departure: '06:00', duration: '14h 40m', ac: true, seatsLeft: 23, fare: 1850 },
  { id: '12002', name: 'Shatabdi Express', from: 'New Delhi', to: 'Bhopal', departure: '07:25', duration: '8h 10m', ac: true, seatsLeft: 12, fare: 1420 },
  { id: '11077', name: 'Jhelum Express', from: 'Pune', to: 'Jammu', departure: '17:20', duration: '35h', ac: false, seatsLeft: 41, fare: 960 },
  { id: '22691', name: 'Bengaluru Rajdhani', from: 'Bengaluru', to: 'Hazrat Nizamuddin', departure: '20:00', duration: '33h', ac: true, seatsLeft: 8, fare: 2140 },
];

export const useAppStore = create((set, get) => ({
  theme: 'light',
  user: { name: 'Aarav Sharma', email: 'aarav@example.com', phone: '+91 99999 88888', loyalty: 'Gold' },
  trains: demoTrains,
  searchQuery: { from: '', to: '', date: '' },
  selectedTrain: null,
  selectedSeats: [],
  bookings: [
    { pnr: '8451023456', trainName: 'Rajdhani Express', status: 'Confirmed', amount: 1850, date: '2026-01-14' },
    { pnr: '8451099230', trainName: 'Shatabdi Express', status: 'Cancelled', amount: 1420, date: '2025-12-20' },
  ],
  notifications: [],
  payment: { method: 'razorpay', promoCode: '', amount: 0, status: 'idle' },
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectTrain: (train) => set({ selectedTrain: train, selectedSeats: [], payment: { ...get().payment, amount: train?.fare || 0 } }),
  toggleSeat: (seatNo) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.includes(seatNo)
        ? state.selectedSeats.filter((seat) => seat !== seatNo)
        : [...state.selectedSeats, seatNo],
    })),
  updatePromo: (promoCode) => set((state) => ({ payment: { ...state.payment, promoCode } })),
  setPaymentMethod: (method) => set((state) => ({ payment: { ...state.payment, method } })),
  pushNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, { id: Date.now(), ...notification }] })),
  popNotification: () => set((state) => ({ notifications: state.notifications.slice(1) })),
  addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
  cancelBooking: (pnr) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.pnr === pnr ? { ...b, status: 'Cancelled' } : b)),
    })),
}));
