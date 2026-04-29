Here's the `server/README.md` file – copy and paste this into `server/README.md`:

```markdown
# Sheen – Server (Backend)

Node.js + Express + MongoDB backend for the Sheen Salon booking platform.

---

## Tech Stack

- Node.js (≥18)
- Express 5
- MongoDB + Mongoose
- Helmet (security headers)
- CORS
- dotenv

---

## Setup

1. **Navigate to the server folder**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/sheen
   ADMIN_TOKEN=your-strong-secret-token
   ALLOWED_ORIGINS=http://localhost:5173,https://sheensalon.netlify.app
   ```

4. **Start the server**:
   - Development (with auto‑restart): `npm run dev`
   - Production: `npm start`

5. The API will be available at `http://localhost:5000`. Test with:
   ```bash
   curl http://localhost:5000/health
   ```

---

## API Endpoints

### Public Routes (no authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/services` | Get all services |
| GET    | `/api/services/:id` | Get a single service |
| GET    | `/api/stylists` | Get all stylists (populated with services) |
| POST   | `/api/bookings` | Create a new booking (with availability check) |
| POST   | `/api/admin/verify` | Verify admin token – returns `{ valid: true/false }` |

### Admin Routes (require `admin-token` header)

All routes under `/api/admin/` require a valid `admin-token` in the request headers.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/admin/services` | Get all services |
| POST   | `/api/admin/services` | Create a service |
| PUT    | `/api/admin/services/:id` | Update a service |
| DELETE | `/api/admin/services/:id` | Delete a service |
| GET    | `/api/admin/stylists` | Get all stylists (populated) |
| POST   | `/api/admin/stylists` | Create a stylist |
| PUT    | `/api/admin/stylists/:id` | Update a stylist |
| DELETE | `/api/admin/stylists/:id` | Delete a stylist |
| GET    | `/api/admin/bookings` | Get all bookings (populated) |
| PATCH  | `/api/admin/bookings/:id` | Update booking status (pending/confirmed/cancelled) |

---

## Database Schema

### Service
```js
{
  name: String,
  duration: Number,      // minutes
  price: Number,
  description: String,
  image: String          // URL
}
```

### Stylist
```js
{
  name: String,
  bio: String,
  image: String,
  services: [ObjectId]   // references Service
}
```

### Booking
```js
{
  customerName: String,
  phone: String,
  email: String,
  service: ObjectId,     // references Service
  stylist: ObjectId,     // references Stylist
  date: String,          // YYYY-MM-DD
  timeSlot: String,      // e.g. "10:00 AM"
  status: String         // pending | confirmed | cancelled
}
```

---

## Deployment on Render

1. Push your code to GitHub (with the `server/` folder at the root level of the repository, or set the **Root Directory** accordingly).
2. On [Render](https://render.com), create a **New Web Service**.
3. Connect your GitHub repository.
4. Configure:
   | Setting | Value |
   |---------|-------|
   | **Name** | `sheen-api` (or any unique name) |
   | **Root Directory** | `server` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
5. Add environment variables (same as your `.env` file) in the Render dashboard.
6. Click **Create Web Service**.
7. After deployment, your API will be live at `https://sheen-api.onrender.com`.

### Important: Update CORS after frontend deploy
Once your frontend is deployed (e.g., on Netlify), set the `ALLOWED_ORIGINS` environment variable on Render to include your frontend URL, then redeploy.

---

## Security Features

- **Helmet** sets secure HTTP headers.
- **CORS** restricts access to domains in `ALLOWED_ORIGINS`.
- **Admin token** is stored only on the server; the client sends the user‑provided token to `/verify` and then uses it in the `admin-token` header.
- **Input validation** on booking (email format, phone format, date/time format, time slot validation).
- **Availability check** prevents double‑booking for the same stylist, date, and time slot (excluding cancelled bookings).
- **Environment variables** keep secrets out of the codebase.

---

## Available Scripts

- `npm start` – run the server in production mode
- `npm run dev` – run the server with nodemon (auto‑restart on changes)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **MongoDB connection error** | Check your `MONGO_URI` and IP whitelist in Atlas. |
| **CORS error** | Ensure `ALLOWED_ORIGINS` includes your frontend URL (no trailing slash). |
| **Admin login fails** | Verify that `ADMIN_TOKEN` is set correctly on the server and that the client sends the exact token. |
| **Booking conflict false positive** | Check that the `status` field is not `cancelled` for existing bookings. |
| **Server won't start** | Make sure all required environment variables are set. |

---

## License

ISC
```

Save this as `server/README.md` and commit it to your repository. It will be visible on GitHub alongside your server code.
