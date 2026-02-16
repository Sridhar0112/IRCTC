import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const useTheme = () => {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return theme;
};
