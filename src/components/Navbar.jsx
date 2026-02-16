import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, TrainFront } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Navbar() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-700 dark:text-brand-500">
          <TrainFront /> IRCTC Next
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {['/search', '/booking', '/profile', '/admin'].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `font-medium transition hover:text-brand-600 ${isActive ? 'text-brand-600' : 'text-slate-700 dark:text-slate-200'}`
              }
            >
              {path.replace('/', '') || 'home'}
            </NavLink>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className="rounded-full border border-slate-300 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </header>
  );
}
