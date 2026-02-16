export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 py-8 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
      © {new Date().getFullYear()} IRCTC Enterprise SaaS Suite • SOC2-ready UX scaffolding
    </footer>
  );
}
