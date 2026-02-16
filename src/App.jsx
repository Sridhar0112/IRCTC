import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import NotificationSnackbar from './components/NotificationSnackbar';
import NotificationCenter from './components/NotificationCenter';
import FloatingBookingButton from './components/FloatingBookingButton';
import MobileBottomNav from './components/layout/MobileBottomNav';
import ShimmerSkeleton from './components/ui/ShimmerSkeleton';
import AppEnhancers from './components/AppEnhancers';
import SessionWarningModal from './components/security/SessionWarningModal';
import PushPermissionModal from './components/security/PushPermissionModal';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentFailure = lazy(() => import('./pages/PaymentFailure'));
const PaymentReceipt = lazy(() => import('./pages/PaymentReceipt'));
const HealthCheckPage = lazy(() => import('./pages/system/HealthCheckPage'));
const GlobalErrorPage = lazy(() => import('./pages/system/GlobalErrorPage'));

function AnimatedRoute({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <AppEnhancers />
      <main className="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-6">
        <Suspense fallback={<div className="space-y-3"><ShimmerSkeleton className="h-48" /><ShimmerSkeleton className="h-32" /></div>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedRoute><LandingPage /></AnimatedRoute>} />
              <Route path="/search" element={<AnimatedRoute><SearchResults /></AnimatedRoute>} />
              <Route path="/booking" element={<AnimatedRoute><BookingPage /></AnimatedRoute>} />
              <Route path="/profile" element={<AnimatedRoute><ProfilePage /></AnimatedRoute>} />
              <Route path="/admin" element={<AnimatedRoute><AdminDashboard /></AnimatedRoute>} />
              <Route path="/payment-success" element={<AnimatedRoute><PaymentSuccess /></AnimatedRoute>} />
              <Route path="/payment-failure" element={<AnimatedRoute><PaymentFailure /></AnimatedRoute>} />
              <Route path="/receipt" element={<AnimatedRoute><PaymentReceipt /></AnimatedRoute>} />
              <Route path="/health" element={<AnimatedRoute><HealthCheckPage /></AnimatedRoute>} />
              <Route path="*" element={<AnimatedRoute><GlobalErrorPage /></AnimatedRoute>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <NotificationSnackbar />
      <NotificationCenter />
      <FloatingBookingButton />
      <SessionWarningModal />
      <PushPermissionModal />
      <MobileBottomNav />
    </div>
  );
}
