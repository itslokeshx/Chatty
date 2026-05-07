# CHATTY ⚔️💬

**The Ultimate Global Messaging Experience**

A premium dark-themed real-time chat application built with Node.js, Express, and React. Featuring a Clash of Clans-inspired aesthetic with gold accents, WhatsApp-style messaging layout, and seamless real-time communication.

![Chatty Preview](https://via.placeholder.com/800x400/0d1117/ffd700?text=CHATTY+Premium+Dark+UI)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Authentication Flow](#authentication-flow)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - JWT-based login and registration system
- ⚡ **Real-time Messaging** - Instant message delivery via Socket.io
- 👥 **Online Users Sidebar** - View all active users with status indicators
- � **Premium Dark Theme** - Clash of Clans-inspired gold & dark aesthetic
- 📱 **WhatsApp-Style Layout** - Your messages on right (green), others on left (gray)
- 🔄 **Auto-scroll** - Automatically scrolls to latest messages
- 🛡️ **Protected Routes** - Authentication middleware for secured access

### Premium UI/UX
- 🎨 **Dark Premium Design** - Deep dark theme (#0d1117) with gold accents (#ffd700)
- ✨ **Animated Elements** - Smooth message animations and hover effects
- 📐 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎯 **Intuitive Navigation** - Clean landing page with guest access option
- 💎 **Glass-morphism Effects** - Modern elevated cards with subtle shadows

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Socket.io** | Real-time WebSocket communication |
| **JWT** | Authentication tokens |

### Frontend
| Technology | Purpose |
|-------------|---------|
| **React 18** | UI library with hooks |
| **Vite** | Fast build tool & dev server |
| **React Router** | Client-side navigation |
| **CSS3** | Premium dark theme styling |

### Architecture
```
┌─────────────┐      WebSocket       ┌─────────────┐
│   React     │ ◄──────────────────► │   Node.js   │
│   Client    │      Socket.io       │   Server    │
└─────────────┘                      └─────────────┘
       │                                    │
       └────────── REST API ────────────────┘
              (Auth: /login, /register)
```

## 📁 Project Structure

```
Chatty/
├── backend/
│   ├── authState.js              # Authentication state management
│   ├── server.js                 # Express server & Socket.io setup
│   ├── package.json              # Backend dependencies
│   ├── controllers/
│   │   └── authoController.js    # Auth controller (login/register)
│   ├── middleware/
│   │   └── authomiddleware.js    # JWT verification middleware
│   └── routes/
│       └── authoRoutes.js        # Authentication routes
│
├── frontend/
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint rules
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Route configuration
│       ├── index.css             # 🎨 Premium dark theme styles
│       ├── pages/
│       │   ├── Home.jsx          # 🏠 Landing page (premium dark)
│       │   ├── Login.jsx         # 🔐 Login form (gold accent)
│       │   ├── Register.jsx      # 📝 Registration form
│       │   └── Chat.jsx          # 💬 Chat interface (WhatsApp-style)
│       └── socket/
│           └── socket.jsx        # Socket.io client
│
├── package.json                  # Root configuration
├── README.md                     # This file
└── LICENSE                       # MIT License
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Chatty.git
cd Chatty
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
```

> 🔐 **Security Note:** Use a strong, random JWT secret in production!

### Frontend Configuration

The Socket.io connection is configured in `frontend/src/socket/socket.jsx`:

```javascript
const socket = io("http://localhost:8000"); // Match your backend port
```

### Theme Customization

Edit CSS variables in `frontend/src/index.css`:

```css
:root {
  --bg-primary: #0d1117;        /* Main background */
  --gold-primary: #ffd700;       /* Accent color */
  --msg-outgoing: #1d4d3e;       /* Your message bubble */
  --msg-incoming: #21262d;       /* Others' message bubble */
}
```

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Backend Server
```bash
cd backend
npm install   # First time only
npm start
```
✅ Server running at `http://localhost:5000`

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm install   # First time only
npm run dev
```
✅ Open `http://localhost:5173` in your browser

### Production Build

```bash
cd frontend
npm run build
```

Output generated in `frontend/dist/` directory.

## 🎨 UI Screenshots

### Landing Page
Premium dark landing with gold accents, floating animation on logo.

### Login / Register
Glass-morphism cards with gold gradient buttons.

### Chat Interface
```
┌────────────────────────────────────────────────────┐
│  CHATTY      │  💬 Global Chat          🏠  🚪     │
│  3 online    │                                    │
├──────────────┼────────────────────────────────────┤
│              │                                    │
│  ┌───┐       │  John                              │
│  │You│       │  ┌──────────────────┐             │
│  └───┘       │  │ Hello everyone!  │  ← Others    │
│    (You)     │  └──────────────────┘    (left)    │
│              │                                    │
│  ┌───┐       │           ┌──────────────┐        │
│  │ J │       │           │ Hey! 👋      │  ← You   │
│  └───┘       │           └──────────────┘  (right)│
│   John       │                                    │
│              │                                    │
│  ┌───┐       │  [Type a message...      ] [➤]    │
│  │ M │       │                                    │
│  └───┘       │                                    │
│   Mike       │                                    │
└──────────────┴────────────────────────────────────┘
```

### Production Build

**Frontend:**

```bash
cd frontend
npm run build
```

This generates an optimized build in the `dist/` directory.

## 📡 API Documentation

### Authentication Endpoints

#### 🔐 Login
```http
POST http://localhost:8000/login
Content-Type: application/json

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

#### 📝 Register
```http
POST http://localhost:8000/register
Content-Type: application/json

{
  "name": "username",
  "password": "password"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

### WebSocket Events

#### Client → Server
| Event | Payload | Description |
|-------|---------|-------------|
| `new_message` | `{ username, text }` | Send a new message |

#### Server → Client
| Event | Payload | Description |
|-------|---------|-------------|
| `receive_message` | `{ username, text }` | Receive new message |
| `online_users` | `Array<user>` | Online users update |

## 🧩 Frontend Components

### App.jsx
Router configuration with protected routes:
- `/` - Landing page
- `/login` - Authentication
- `/register` - Account creation  
- `/chat` - Main chat interface (protected)

### Home.jsx 🏠
Premium dark landing page featuring:
- Animated floating logo
- Gold gradient accents
- Guest access option
- Responsive action buttons

### Login.jsx / Register.jsx 🔐
Authentication forms with:
- Glass-morphism card design
- Gold gradient CTA buttons
- Client-side validation
- Error handling with visual feedback
- Loading states

### Chat.jsx 💬
WhatsApp-style messaging interface:
- **Sidebar:** Online users list with avatars
- **Header:** Global chat status & navigation
- **Messages:** 
  - Your messages → Right side (green gradient)
  - Others' messages → Left side (dark gray)
- **Input:** Modern message composer
- **Auto-scroll:** Smooth scroll to latest message
- **Responsive:** Collapsible sidebar on mobile

## 🔐 Authentication Flow

```
User visits CHATTY
       ↓
Check localStorage for JWT token
       ↓
┌────────────────┴────────────────┐
│                                 │
NO TOKEN                    TOKEN EXISTS
│                                 │
▼                                 ▼
Show Login/              Verify with backend
Register pages                  │
       │                        │
       │                  Valid    Invalid
       │                   │         │
       │                   ▼         ▼
       │               Load Chat  Redirect
       │                Interface   to Login
       │                   │
       └───────────────────┘
              ↓
     User sends message
              ↓
     Socket.io emits to server
              ↓
     Server broadcasts to ALL clients
              ↓
     Real-time UI update ✨
```

## 💻 Development Guidelines

### Code Standards
- ✅ Follow ESLint rules (`frontend/eslint.config.js`)
- ✅ Use semantic HTML and ARIA labels
- ✅ Mobile-first responsive design
- ✅ Maintain contrast ratios for accessibility

### CSS Architecture
```css
/* BEM-like naming convention */
.block { }
.block__element { }
.block--modifier { }

/* Example */
.chat-wrapper { }
.message-bubble { }
.message-bubble--outgoing { }
```

### Git Workflow
```bash
# Before committing
npm run lint        # Check code style
npm run build       # Verify production build

# Commit message format
type(scope): description

# Examples
feat(ui): add gold shimmer animation
fix(chat): resolve scroll-to-bottom bug
docs(readme): update API endpoints
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

#### Module Not Found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### Socket Connection Failed
- ✅ Verify backend is running (`npm start` in backend/)
- ✅ Check port in `socket/socket.jsx` matches backend
- ✅ Ensure CORS is enabled in backend server

#### Messages Not Sending
- ✅ Check browser console for errors
- ✅ Verify JWT token is valid (not expired)
- ✅ Ensure Socket.io connection established

### Browser Support
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Chrome | 90+ | ✅ Fully Supported |

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create feature branch: `git checkout -b feature/amazing-feature`
3. 💾 Commit changes: `git commit -m 'feat: add amazing feature'`
4. 📤 Push to branch: `git push origin feature/amazing-feature`
5. 🔃 Open a Pull Request

### Contribution Ideas
- [ ] Emoji picker for messages
- [ ] Message reactions
- [ ] Typing indicators
- [ ] Message search
- [ ] Dark/light theme toggle
- [ ] Push notifications
- [ ] Private messaging (DMs)

## 📜 License

This project is licensed under the MIT License - see [LICENSE](LICENSE)

---

<div align="center">

**Made with ⚔️ and 💛**

[Live Demo](http://localhost:5173) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>
