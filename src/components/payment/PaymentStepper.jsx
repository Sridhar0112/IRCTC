const labels = ['initiated', 'processing', 'confirmed'];

export default function PaymentStepper({ status }) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-2">
      {labels.map((label, idx) => {
        const active = labels.indexOf(status) >= idx;
        return <div key={label} className={`rounded-lg px-2 py-2 text-center text-xs font-semibold ${active ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{label.toUpperCase()}</div>;
      })}
    </div>
  );
}
