import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function GlobalErrorPage() {
  return (
    <section className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:bg-rose-950/30">
      <h1 className="text-3xl font-bold text-rose-700">Something went wrong</h1>
      <p className="mt-2 text-sm">Our system captured the error and logged telemetry.</p>
      <Link to="/"><Button className="mt-4">Back to Home</Button></Link>
    </section>
  );
}
