export default function OfflineBanner({ offline }) {
  if (!offline) return null;
  return <div className="sticky top-14 z-30 bg-amber-500 px-4 py-2 text-center text-xs font-semibold text-white">Offline mode: showing cached train data.</div>;
}
