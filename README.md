# CHATTY

A real-time messaging app built with React, Node.js, and Socket.io.

## What It Does

- **Real-time messaging** — Send and receive messages instantly
- **Global chat room** — Everyone joins the same conversation
- **User authentication** — Secure login and registration with JWT
- **Message timestamps** — See when each message was sent
- **Mobile responsive** — Works on desktop and mobile devices

## Tech Stack

- **Frontend:** React 18, Vite, React Router
- **Backend:** Node.js, Express
- **Real-time:** Socket.io
- **Database:** MongoDB
- **Auth:** JWT (JSON Web Tokens)

## Quick Start

```bash
# 1. Clone & Install
git clone https://github.com/yourusername/Chatty.git
cd Chatty

cd backend && npm install
cd ../frontend && npm install

# 2. Configure
# Create backend/.env: PORT=8000, JWT_SECRET=your_secret
# Create frontend/.env: VITE_API_URL=http://localhost:8000

# 3. Run
cd backend && npm start      # Terminal 1
cd frontend && npm run dev   # Terminal 2

# Visit http://localhost:5173
```

## Deployment

**Backend (Render/Railway):**
```
PORT=8000
JWT_SECRET=your_production_secret
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend (Vercel/Netlify):**
```
VITE_API_URL=https://your-backend.render.com
```

## API

```http
POST /login       { name, password } → { token, name }
POST /register    { name, password } → { message }
GET  /messages    → [ { username, text, createdAt } ]

WebSocket: new_message → receive_message
```

## File Structure

```
backend/          # Express + Socket.io server
  server.js       # Main entry
  controllers/    # Auth logic
  middleware/     # JWT verify
frontend/         # React app
  src/pages/      # Home, Login, Register, Chat
  socket/         # Socket.io client
```

## Contributing

1. Fork repo
2. Create branch: `git checkout -b feature/name`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/name`
5. Open Pull Request

## License

MIT
