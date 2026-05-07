import socket from "../socket/socket";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = username;

  // Check authentication and fetch user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch username from API
    async function fetchUser() {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.name);
        } else {
          // Invalid token
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, [navigate]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function fetchMessages() {
      const token = localStorage.getItem("token");
      if (!token) return; // Don't fetch if not authenticated

      socket.on("connect", () => {
        console.log("Connected:", socket.id);
      });

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/messages`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }

    fetchMessages();

    // Listen for new messages
    socket.on("receive_message", (data) => {
      setMessages((prevChats) => [...prevChats, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("new_message", {
      username: username,
      text: message,
    });

    setMessage("");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Get unique users from messages
  const uniqueUsers = [...new Set(messages.map((m) => m.username))];
  const chatUsers = [
    ...(currentUser ? [{ username: currentUser, isYou: true }] : []),
    ...uniqueUsers
      .filter((u) => u !== currentUser)
      .map((u) => ({ username: u, isYou: false })),
  ];

  // Format timestamp from message
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get avatar initials
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="chat-wrapper">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar - Users in Chat */}
      <aside className={`chat-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">In This Chat</span>
        </div>
        <div className="users-list">
          {chatUsers.map((user, index) => (
            <div key={index} className={`user-item ${user.isYou ? "you" : ""}`}>
              <div className={`user-avatar ${user.isYou ? "you" : ""}`}>
                {getInitials(user.username)}
              </div>
              <div className="user-info">
                <div className="user-name">
                  {user.username}
                  {user.isYou && <span className="you-indicator">You</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        {/* Chat Header */}
        <header className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">💬</div>
            <div className="chat-header-title">
              <span className="chat-header-name">Global Chat</span>
              <span className="chat-header-status">
                {chatUsers.length} members
              </span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              className="header-btn mobile-members-btn"
              onClick={() => setSidebarOpen(true)}
              title="View Members"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <span>Members</span>
            </button>
            <button
              className="header-btn"
              onClick={() => navigate("/")}
              title="Back to Home"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m5-11v11a1 1 0 001 1h5" />
              </svg>
              <span>Home</span>
            </button>
            <button
              className="header-btn"
              onClick={handleLogout}
              title="Sign Out"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Leave</span>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="messages-wrapper">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <div className="empty-title">No messages yet</div>
              <div className="empty-subtitle">
                Send a message to start the conversation
              </div>
            </div>
          ) : (
            messages.map((chat, index) => {
              const isOutgoing = chat.username === currentUser;
              const showSender =
                index === 0 || messages[index - 1]?.username !== chat.username;

              return (
                <div
                  key={index}
                  className={`message-group ${isOutgoing ? "outgoing" : "incoming"}`}
                >
                  {showSender && (
                    <div className="message-sender">
                      {isOutgoing ? "You" : chat.username}
                    </div>
                  )}
                  <div className="message-bubble">
                    {chat.text}
                    <div className="message-meta">
                      <span className="message-time">
                        {formatTime(chat.createdAt)}
                      </span>
                      {isOutgoing && <span className="message-check">✓</span>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-wrapper">
          <form className="input-container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="input-btn send-btn"
              disabled={!message.trim()}
              aria-label="Send message"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ width: "20px", height: "20px" }}
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Chat;
