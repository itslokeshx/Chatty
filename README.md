# Chatty! 💬

A modern, real-time chat application built with Node.js, Express, and React. Experience seamless communication with socket-based messaging, user authentication, and an intuitive user interface.

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

## Features

✨ **Core Functionalities:**

- 🔐 **User Authentication** - Secure login and registration system
- 📱 **Real-time Messaging** - Instant message delivery using WebSocket
- 👥 **User Management** - View online users and connection status
- 🎨 **Modern UI** - Clean and responsive interface built with React
- ⚡ **Fast Performance** - Built with Vite for optimized builds
- 🔄 **State Management** - Efficient client-side state handling
- 🛡️ **Middleware Protection** - Authentication middleware for secured routes

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-time Communication:** Socket.io
- **Package Manager:** npm

### Frontend

- **Framework:** React 18+
- **Build Tool:** Vite
- **Language:** JavaScript (JSX)
- **Linting:** ESLint
- **Package Manager:** npm

### Architecture

- REST API for authentication
- WebSocket for real-time messaging
- Client-side state management

## Project Structure

```
Chatty/
├── backend/
│   ├── authState.js              # Authentication state management
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── controllers/
│   │   └── authoController.js    # Auth controller logic
│   ├── middleware/
│   │   └── authomiddleware.js    # Auth verification middleware
│   └── routes/
│       └── authoRoutes.js        # Auth routes
├── frontend/
│   ├── index.html                # Main HTML entry point
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # Linting rules
│   └── src/
│       ├── main.jsx              # React app entry point
│       ├── App.jsx               # Main App component
│       ├── index.css             # Global styles
│       ├── pages/
│       │   ├── Home.jsx          # Home page
│       │   ├── Login.jsx         # Login page
│       │   ├── Register.jsx      # Registration page
│       │   └── Chat.jsx          # Chat interface
│       └── socket/
│           └── socket.jsx        # Socket.io client configuration
├── package.json                  # Root package configuration
├── README.md                     # This file
└── LICENSE                       # Project license
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

## Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

**Note:** Update these values according to your environment and security requirements.

### Socket.io Configuration

The Socket.io client is configured in `frontend/src/socket/socket.jsx`. Ensure the server URL matches your backend configuration.

## Running the Application

### Development Mode

**Terminal 1 - Backend Server:**

```bash
cd backend
npm start
```

Expected output: Server running on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**

```bash
cd frontend
npm run dev
```

Expected output: Open `http://localhost:5173` (or shown in terminal)

### Production Build

**Frontend:**

```bash
cd frontend
npm run build
```

This generates an optimized build in the `dist/` directory.

## API Documentation

### Authentication Routes

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com"
  }
}
```

#### Verify Token

```http
GET /api/auth/verify
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "success": true,
  "user": {
    /* user data */
  }
}
```

## Frontend Components

### App Component (`App.jsx`)

Main application wrapper that handles:

- Route management
- Global state
- Theme configuration

### Pages

- **Home.jsx** - Landing page and user dashboard
- **Login.jsx** - User authentication form
- **Register.jsx** - New user registration form
- **Chat.jsx** - Main chat interface with message history

### Socket Integration (`socket/socket.jsx`)

Handles:

- Real-time message events
- User presence updates
- Connection status management

## Authentication Flow

```
1. User visits application
   ↓
2. Check if token exists in localStorage
   ↓
3. If no token → Show Login/Register pages
   ↓
4. If token exists → Verify with backend
   ↓
5. Token valid → Load Chat page
   ↓
6. Token invalid → Redirect to Login
   ↓
7. User sends message → Socket emits to server
   ↓
8. Server broadcasts to all connected clients
   ↓
9. Clients receive and update UI
```

## Development Guidelines

### Code Style

- Follow ESLint rules configured in `frontend/eslint.config.js`
- Use consistent naming conventions
- Write meaningful commit messages

### Folder Structure Best Practices

- Keep components in their respective folders
- Separate concerns (controllers, middleware, routes)
- Use descriptive file names

### Testing

Before pushing changes:

```bash
npm run lint    # Frontend linting
npm start       # Verify backend starts without errors
npm run dev     # Verify frontend runs without errors
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Socket Connection Issues

- Verify backend server is running
- Check Socket.io URL in `socket/socket.jsx`
- Ensure CORS is properly configured in backend

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Chatting!** 🚀

For questions or support, please open an issue on the GitHub repository.
