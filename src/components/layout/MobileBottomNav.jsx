import { Home, Search, Ticket, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  ['/', Home, 'Home'],
  ['/search', Search, 'Search'],
  ['/booking', Ticket, 'Book'],
  ['/profile', User, 'Me'],
];

export default function MobileBottomNav() {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur md:hidden dark:border-slate-700 dark:bg-slate-900/90">
      <div className="grid grid-cols-4">
        {items.map(([path, Icon, label]) => (
          <NavLink key={path} to={path} className="flex flex-col items-center gap-1 py-2 text-xs">
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
