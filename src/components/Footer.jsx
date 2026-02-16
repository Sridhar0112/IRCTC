export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 py-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
      © {new Date().getFullYear()} IRCTC Next. Built for seamless travel planning.
    </footer>
  );
}
