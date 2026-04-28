# sheen — Salon Booking App

Full-stack salon booking application with glassmorphism UI.

## Stack
- **Client** — React 19, Vite, Tailwind CSS v4, React Router v7
- **Server** — Node.js, Express 5, MongoDB (Mongoose), Helmet, CORS

---

## Quick Start

### 1. Server setup

```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### 2. Client setup

```bash
cd client
npm install
cp .env.example .env   # fill in your values
npm run dev
```

Open http://localhost:5173

---

## Environment Variables

### `server/.env`

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `ADMIN_TOKEN` | Secret token for admin API access |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins |
| `PORT` | Server port (default: 5000) |

### `client/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |
| `VITE_ADMIN_TOKEN` | Must match `ADMIN_TOKEN` on the server |

---

## Deployment

### Client (Vercel / Netlify)
```bash
cd client
npm run build   # outputs to client/dist/
```
Set env vars in your hosting dashboard. For Vercel, add a `vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Server (Railway / Render / VPS)
```bash
cd server
npm install --omit=dev
npm start
```
Set `MONGO_URI`, `ADMIN_TOKEN`, `ALLOWED_ORIGINS`, and `PORT` in your host's environment settings.

---

## Admin Panel

Visit `/admin` in the browser. Enter the token matching `VITE_ADMIN_TOKEN` / `ADMIN_TOKEN`.

The admin panel lets you manage **services**, **stylists**, and **bookings**.
