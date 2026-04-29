# Sheen – Client (Frontend)

React + Vite + Tailwind CSS frontend for the Sheen Salon booking platform.

---

## Tech Stack

* React 19
* Vite 8
* React Router v7
* Tailwind CSS 4
* Axios

---

## Setup

### 1. Go to client folder

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

### 4. Run development server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

### 5. Build for production

```bash
npm run build
```

Output folder:

```
dist/
```

---

## Important Files / Structure

| Path                | Description                            |
| ------------------- | -------------------------------------- |
| `src/App.jsx`       | Main routing                           |
| `src/pages/`        | Pages (Home, Services, Booking, Admin) |
| `src/components/`   | Reusable UI components                 |
| `src/api.js`        | Axios instance with API base URL       |
| `public/_redirects` | Netlify routing fix                    |
| `vite.config.js`    | Vite configuration                     |

---

## Netlify Deployment

| Setting           | Value           |
| ----------------- | --------------- |
| Base directory    | `client`        |
| Build command     | `npm run build` |
| Publish directory | `client/dist`   |
| Env variable      | `VITE_API_URL`  |

### React Router Fix

Create:

```txt
public/_redirects
```

Add:

```
/*    /index.html    200
```

---

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview build
npm run lint      # lint code
```

---

## Common Issues

**CORS Error**
→ Add frontend URL in backend `ALLOWED_ORIGINS`

**Blank page after build**
→ Check `VITE_API_URL` and rebuild

**404 on refresh**
→ Add `_redirects` file

**API not connecting**
→ Verify backend URL is correct and deployed

---

## Customization

* Change theme in `tailwind.config.js`
* Update fonts in `index.html`
* Modify API URL via `.env`

---

## License

ISC
