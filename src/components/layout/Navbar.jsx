import { Bell, Globe2, Moon, Sun } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import Button from '../ui/Button';

const navItems = [
  ['/', 'Home'],
  ['/search', 'Search'],
  ['/booking', 'Booking'],
  ['/profile', 'Profile'],
  ['/admin', 'Admin'],
  ['/health', 'Health'],
];

export default function Navbar() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const toggleNotificationCenter = useAppStore((s) => s.toggleNotificationCenter);
  const locale = useAppStore((s) => s.config.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-black text-brand-700">IRCTC Enterprise</Link>
        <div className="hidden items-center gap-5 md:flex">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-semibold ${isActive ? 'text-brand-600' : 'text-slate-700 dark:text-slate-200'}`}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select value={locale} onChange={(e) => setLocale(e.target.value)} className="rounded-lg border bg-transparent px-2 py-1 text-xs">
            <option value="en">EN</option>
            <option value="hi">हिं</option>
          </select>
          <Button variant="ghost" className="px-2 py-2" onClick={toggleNotificationCenter} aria-label="Notifications">
            <Bell size={16} />
          </Button>
          <Button variant="ghost" className="px-2 py-2" aria-label="Language"><Globe2 size={16} /></Button>
          <Button variant="ghost" className="px-2 py-2" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</Button>
        </div>
      </nav>
    </header>
  );
}
