# CHATTY 💬

A real-time messaging app built with React, Node.js, and Socket.io.

## What It Does ✨

- **Real-time messaging** — Send and receive messages instantly
- **Global chat room** — Everyone joins the same conversation
- **User authentication** — Secure login and registration with JWT
- **Message timestamps** — See when each message was sent
- **Mobile responsive** — Works on desktop and mobile devices

## Tech Stack 🧰

- **Frontend:** React 18, Vite, React Router
- **Backend:** Node.js, Express
- **Real-time:** Socket.io
- **Database:** MongoDB
- **Auth:** JWT (JSON Web Tokens)

## Quick Start 🚀

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

## Deployment 🌐

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

## API 🔌

```http
POST /login       { name, password } → { token, name }
POST /register    { name, password } → { message }
GET  /messages    → [ { username, text, createdAt } ]

WebSocket: new_message → receive_message
```

## Architecture 🧱

### System Design

```
┌─────────────┐         WebSocket          ┌─────────────┐
│   React     │ ◄────────────────────────► │   Node.js   │
│   Client    │        Socket.io           │   Server    │
└─────────────┘                            └─────────────┘
       │                                          │
       └──────────── REST API ────────────────────┘
              /login, /register, /messages
```

### Data Flow

**Authentication:**

```
User enters credentials
        │
        ▼
POST /login or /register
        │
        ▼
Validate credentials ──► Generate JWT token
        │
        ▼
Store token in localStorage
        │
        ▼
Redirect to /chat
```

**Messaging:**

```
User types message
        │
        ▼
Socket.emit("new_message")
        │
        ▼
Server receives ──► Save to MongoDB
        │
        ▼
Server broadcasts to all clients
        │
        ▼
Socket.on("receive_message") updates UI
```

## How It Works 🛠️

### Authentication Flow

1. **Registration**
   - User submits username and password
   - Password hashed with bcrypt (10 salt rounds)
   - User saved to MongoDB
   - Redirect to login

2. **Login**
   - Credentials validated against database
   - JWT token generated with 24h expiry
   - Token and username stored in localStorage
   - Protected routes accessible

3. **Session Management**
   - Token sent with each API request
   - Chat page checks for token on load
   - No token = redirect to login
   - Logout clears localStorage

### Real-Time Messaging

1. **Socket Connection**
   - Client connects on entering chat
   - Server assigns socket ID
   - Connection persists until page closes

2. **Sending Messages**
   - User submits message form
   - Client emits "new_message" event
   - Server receives and processes

3. **Broadcasting**
   - Server saves message to MongoDB
   - Server emits "receive_message" to all connected clients
   - All clients update message list automatically

### Database Schema

**Users Collection:**

```javascript
{
  username: String,    // unique, required
  password: String     // bcrypt hashed
}
```

**Messages Collection:**

```javascript
{
  username: String,    // sender name
  text: String,        // message content
  createdAt: Date      // auto-generated timestamp
}
```

## File Structure 🗂️

```
Chatty/
├── backend/
│   ├── server.js              # Express & Socket.io setup
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── authoController.js   # Login/register handlers
│   ├── middleware/
│   │   └── authomiddleware.js   # JWT verification
│   ├── models/
│   │   ├── users.js             # User schema
│   │   └── messages.js          # Message schema
│   └── routes/
│       └── authoRoutes.js       # API routes
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx        # Sign in form
│   │   │   ├── Register.jsx     # Sign up form
│   │   │   └── Chat.jsx         # Chat interface
│   │   ├── socket/
│   │   │   └── socket.jsx       # Socket.io client
│   │   ├── App.jsx              # Route configuration
│   │   └── index.css            # Styling
│   └── index.html
│
├── backend/.env.example
├── frontend/.env.example
└── README.md
```

## Environment Variables

### Backend (.env)

| Variable       | Description              | Required            |
| -------------- | ------------------------ | ------------------- |
| `PORT`         | Server port              | No (default: 8000)  |
| `JWT_SECRET`   | Secret for JWT signing   | Yes                 |
| `MONGODB_URI`  | MongoDB connection URL   | No (uses local)     |
| `FRONTEND_URL` | Frontend domain for CORS | No (for production) |

### Frontend (.env)

| Variable       | Description | Required |
| -------------- | ----------- | -------- |
| `VITE_API_URL` | Backend URL | Yes      |

## API Endpoints

### Authentication

**POST /register**

```
Request:  { name: "username", password: "password" }
Response: { message: "Account created!" }
Errors:   409 if username exists
```

**POST /login**

```
Request:  { name: "username", password: "password" }
Response: { token: "jwt_token", name: "username" }
Errors:   404 if user not found, 401 if wrong password
```

**GET /messages**

```
Response: [{ username, text, createdAt }]
Returns all chat messages, sorted by time
```

### WebSocket Events

| Event             | Direction       | Payload                         | Description            |
| ----------------- | --------------- | ------------------------------- | ---------------------- |
| `new_message`     | Client → Server | `{ username, text }`            | Send message           |
| `receive_message` | Server → Client | `{ username, text, createdAt }` | Receive message        |
| `connect`         | Both            | Socket ID                       | Connection established |
| `disconnect`      | Both            | -                               | Connection closed      |

## Security

- **Password Hashing:** bcrypt with 10 salt rounds
- **Authentication:** JWT tokens with secret key
- **CORS:** Configured for specific origins only
- **Input Validation:** Required fields checked on backend
- **No Plain Text:** Passwords never stored or transmitted in plain text

## Deployment Checklist

1. **Backend (Render/Railway)**
   - [ ] Set `JWT_SECRET` environment variable
   - [ ] Set `FRONTEND_URL` to your deployed frontend
   - [ ] Connect MongoDB (Atlas or local)
   - [ ] Deploy and note the backend URL

2. **Frontend (Vercel/Netlify)**
   - [ ] Set `VITE_API_URL` to your backend URL
   - [ ] Add `vercel.json` for route handling
   - [ ] Deploy frontend

3. **Verify**
   - [ ] Registration works
   - [ ] Login works
   - [ ] Messages send and receive in real-time
   - [ ] Mobile view works correctly

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/name`
5. Open Pull Request

## License

MIT
