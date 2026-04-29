# ✨ Sheen – Salon Booking Platform

**Sheen** is a full-stack web application that allows customers to book salon services online. It features a modern glass-morphic UI, real-time availability checking, and a secure admin panel.

🔗 **Live Demo** – [https://sheensalon.netlify.app](https://sheensalon.netlify.app)
🔗 **API Backend** – [https://sheen-api.onrender.com](https://sheen-api.onrender.com)

---

## Features

### For Customers

* Browse services with images, descriptions, prices & durations
* View stylists and their offered services
* Book a service with date/time selection (real-time conflict prevention)
* Receive instant feedback on successful/cancelled bookings

### For Administrators

* Secure login using an admin token (server-side verification)
* Full CRUD for **services**
* Full CRUD for **stylists** (assign multiple services to each)
* Manage all **bookings** (update status: pending / confirmed / cancelled)
* All admin endpoints are protected via token header

### Technical Highlights

* **Backend:** Node.js + Express, MongoDB (Mongoose), static token auth
* **Frontend:** React 19, React Router v7, Vite, Tailwind CSS 4
* **UI/UX:** Glass morphism, responsive design, custom fonts (Cormorant Garamond + DM Sans)
* **Security:** CORS whitelist, Helmet, rate limiting (optional), environment variables for secrets
* **Deployment:** Backend on Render, Frontend on Netlify, MongoDB Atlas

---

## Project Structure

```bash
sheen/
├── client/          # React frontend (Vite + Tailwind)
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Node.js backend (Express + Mongoose)
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
└── README.md
```

---

## Environment Variables

### Client (`client/.env`)

| Variable       | Description                                         |
| -------------- | --------------------------------------------------- |
| `VITE_API_URL` | Backend API URL (e.g., `https://api.sheen.com/api`) |

### Server (`server/.env`)

| Variable          | Description                                        |
| ----------------- | -------------------------------------------------- |
| `MONGO_URI`       | MongoDB Atlas connection string (database `sheen`) |
| `ADMIN_TOKEN`     | Strong secret for admin authentication             |
| `ALLOWED_ORIGINS` | Comma-separated frontend domains                   |
| `PORT`            | Port for the server (default 5000)                 |

> **Never commit `.env` files.** They are ignored via `.gitignore`.

---

## Local Development

### Backend

```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev            # runs on http://localhost:5000
```

### Frontend

```bash
cd client
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:5000/api
npm run dev            # runs on http://localhost:5173
```

---

## Deployment

* **Frontend:** Build (`npm run build`) → deploy `dist/` folder to Netlify / Vercel / Cloudflare Pages
* **Backend:** Push `server/` folder to Render / Railway / Fly.io – configure environment variables
* **Database:** MongoDB Atlas (free tier M0) – name the database `sheen`

Detailed deployment steps are available in the author’s guide.

---

## License

ISC – free to use and modify for personal or commercial projects with appropriate credit.

---

## Author

Developed by Anshuman Kharbade
GitHub: [https://github.com/anshumankharbade](https://github.com/anshumankharbade)

---

## Acknowledgements

* Pexels for placeholder images
* Fonts: Cormorant Garamond & DM Sans
