export default function Input({ label, id, ...props }) {
  return (
    <label className="grid gap-1 text-sm" htmlFor={id}>
      <span className="font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <input
        id={id}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-brand-300 placeholder:text-slate-400 focus:ring dark:border-slate-700 dark:bg-slate-900"
        {...props}
      />
    </label>
  );
}
