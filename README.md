# XENORA Backend (Auth API)

Node.js + Express + MongoDB backend. Currently implements **user
signup/login/logout** with hashed passwords and JWT auth (stored in an
httpOnly cookie). Order/reservation DB storage, admin panel, and payments
are not built yet — this is the first layer.

## 1. Local setup

```bash
cd xenora-backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — get a free cluster at https://www.mongodb.com/cloud/atlas
  (Free tier "M0" is enough). Create a database user, whitelist your IP
  (or `0.0.0.0/0` for testing), and copy the connection string.
- `JWT_SECRET` — any long random string (e.g. run `openssl rand -base64 48`).
- `CLIENT_URL` — where your frontend is served from (e.g.
  `http://127.0.0.1:5500` if using VS Code Live Server).

Run it:

```bash
npm run dev
```

Server starts on `http://localhost:5000`. Test it:

```bash
curl http://localhost:5000/api/health
```

## 2. Connect the frontend

In `Xenora script.js`, the constant `API_BASE` points to
`http://localhost:5000/api` for local testing. When you deploy the
backend, change this to your live backend URL, e.g.:

```js
const API_BASE = "https://your-backend.onrender.com/api";
```

## 3. API endpoints (so far)

| Method | Route              | Body                                  | Notes                      |
|--------|--------------------|----------------------------------------|-----------------------------|
| POST   | /api/auth/signup   | name, email, phone?, password          | Creates account, logs in   |
| POST   | /api/auth/login    | email, password                        | Rate-limited (10/15min)    |
| POST   | /api/auth/logout   | —                                       | Clears auth cookie          |
| GET    | /api/auth/me       | — (needs auth cookie/token)            | Returns current user       |

All responses are JSON: `{ success, message, user?, token? }`.

## 4. Deploying (free options)

- **Backend**: [Render](https://render.com) or [Railway](https://railway.app)
  — connect your GitHub repo, set the same env vars from `.env`, deploy.
- **Database**: MongoDB Atlas free tier (already set up above).
- **Frontend**: can stay static — host on Netlify, Vercel, or GitHub Pages.
  Just make sure `API_BASE` in script.js points to your deployed backend,
  and `CLIENT_URL` in the backend's env points back to your deployed
  frontend (needed for CORS + cookies to work).

## 5. What's next (not built yet)

- Order model + routes (save orders to MongoDB instead of localStorage,
  so history works across devices)
- Reservation model + routes (same idea)
- Admin dashboard (view/manage all orders & reservations)
- Payment gateway integration (Razorpay)

Ask for any of these next and they'll follow the same pattern as auth
(model → controller → routes → frontend fetch calls).
