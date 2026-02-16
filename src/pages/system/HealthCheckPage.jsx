import { appConfig } from '../../services/config';

export default function HealthCheckPage() {
  return (
    <section className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
      <h2 className="text-2xl font-bold">Frontend Health Check</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        <li>Status: OK</li>
        <li>Environment: {appConfig.envName}</li>
        <li>Build Version: {appConfig.buildVersion}</li>
        <li>API Base URL: {appConfig.apiBaseUrl}</li>
      </ul>
    </section>
  );
}
