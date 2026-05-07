# CHATTY

<p align="center">
  <b>Simple. Fast. Connected.</b>
</p>

<p align="center">
  A clean, modern real-time messaging platform built with React, Node.js, and Socket.io.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-Real--time-black?logo=socket.io" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" />
</p>

---

## Features

**Core Messaging**
- ⚡ **Real-time Chat** — Instant message delivery with Socket.io
- � **Global Room** — Chat with everyone in one shared space
- � **Timestamps** — Every message shows exact send time
- � **Responsive Design** — Works seamlessly on all devices

**Clean Interface**
- 🎨 **macOS Aesthetic** — Light, clean, native-app feel
- � **iMessage-style Bubbles** — Blue (you) / Gray (others)
- 👥 **Active Users Sidebar** — See who's in the chat
- ✨ **Smooth Animations** — Polished transitions throughout

**Authentication**
- 🔐 **Secure Login** — JWT-based session management
- 🔒 **Password Toggle** — Show/hide password with eye icon
- ⚠️ **Smart Errors** — Specific feedback for wrong credentials
- 📝 **Easy Registration** — Simple account creation flow

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router |
| **Backend** | Node.js, Express |
| **Real-time** | Socket.io |
| **Database** | MongoDB |
| **Auth** | JWT (JSON Web Tokens) |
| **Styling** | CSS3 with CSS Variables |

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/Chatty.git
cd Chatty

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment

**Backend** — Create `backend/.env`:
```env
PORT=8000
JWT_SECRET=your_random_secret_key
```

**Frontend** — Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

### 3. Run the App

```bash
# Terminal 1 — Backend
cd backend
npm start

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173`

---

## Deployment

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `8000` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `MONGODB_URI` | MongoDB connection string | Local DB |
| `FRONTEND_URL` | Frontend domain for CORS | - |
| `VITE_API_URL` | Backend URL for frontend | `http://localhost:8000` |

### Production Setup

**Backend (e.g., Railway, Render, Heroku):**
```bash
# Set environment variables in dashboard
PORT=8000
JWT_SECRET=your_production_secret
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend (e.g., Vercel, Netlify):**
```bash
# Build command
npm run build

# Environment variable
VITE_API_URL=https://your-backend.render.com
```

---

## API Reference

### POST /login
Authenticate and receive JWT token.

```json
{
  "name": "username",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "name": "username"
}
```

### POST /register
Create new account.

```json
{
  "name": "username",
  "password": "password"
}
```

### WebSocket Events

| Direction | Event | Data |
|-----------|-------|------|
| Client → Server | `new_message` | `{ username, text }` |
| Server → Client | `receive_message` | `{ username, text, createdAt }` |

---

## Project Structure

```
Chatty/
├── backend/
│   ├── server.js              # Express & Socket.io server
│   ├── controllers/
│   │   └── authoController.js # Auth logic
│   ├── middleware/
│   │   └── authomiddleware.js # JWT verification
│   └── routes/
│       └── authoRoutes.js     # API routes
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Login.jsx      # Sign in
│   │   │   ├── Register.jsx   # Sign up
│   │   │   └── Chat.jsx       # Chat interface
│   │   ├── socket/
│   │   │   └── socket.jsx     # Socket.io client
│   │   └── index.css          # Styling
│   └── index.html
│
└── README.md
```

---

## Screenshots

### Landing Page
```
        💬
      CHATTY
Simple messaging for everyone
Connect instantly with people worldwide

 ⚡ Real-time  👥 Global  � Secure

   [1] → [2] → [3]
  Sign up  Join  Connect

   [   Open Chat   ]
      Sign Out

  Free forever • No ads
```

### Chat Interface
```
┌──────────────────────────────┐
│  💬 Global Chat    Home Leave │
├──────────┬───────────────────┤
│ In This  │                   │
│ Chat     │   You             │
│          │ ┌─────────────┐   │
│ ⬤ John   │ │ Hello!     2:30│  │
│          │ └─────────────┘   │
│ ⬤ You    │                   │
│  (You)   │     ┌───────────┐ │
│          │     │ Hey! 2:31│✓│ │
│          │     └───────────┘ │
│          │                   │
│          │ [iMessage      ]➤ │
└──────────┴───────────────────┘
```

---

## Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](LICENSE) file.

<p align="center">
  <sub>Built with care for seamless communication</sub>
</p>
