# IRCTC Enterprise Frontend

Production-grade frontend scaffold for an IRCTC-like railway booking SaaS platform.

## Stack
- React 18 + Vite
- Tailwind CSS + Framer Motion
- Zustand state management
- Recharts analytics

## Enterprise Modules
- Parallax landing + smart train search
- Real-time seat stream simulation + booking session expiry
- 3-step payment UX (Razorpay + Stripe components)
- Payment receipt + invoice actions
- Admin control center (KPI, occupancy heatmap, search/sort/pagination/export)
- Notification center + snackbar
- Wallet, loyalty points, QR ticket placeholders, PNR checker
- PWA shell: install banner, offline banner, service worker, pull-to-refresh hook
- Security UX: timeout warning and push permission modal
- Route-based code splitting + Suspense fallbacks + Error boundary
- Health check page + config/logging wrappers

## Commands
```bash
npm install
npm run dev
npm run build
```

## Deploy
- `Dockerfile` for Nginx static hosting
- `k8s/frontend-deployment.yaml` for Kubernetes deployment/service
