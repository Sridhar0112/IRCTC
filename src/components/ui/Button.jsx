import { memo } from 'react';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900',
  ghost: 'border border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};

function Button({ children, className = '', variant = 'primary', ...props }) {
  return (
    <button
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);
