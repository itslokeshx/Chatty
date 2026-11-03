import socket from "../socket/socket";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home, LogOut, Send, MessageSquare } from "lucide-react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [cloudUsers, setCloudUsers] = useState([]);
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
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const response = await fetch(`${API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) return; // Don't fetch if not authenticated

      socket.on("connect", () => {
        console.log("Connected:", socket.id);
      });

      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const msgResponse = await fetch(`${API_URL}/messages`);
        const msgData = await msgResponse.json();
        setMessages(msgData);

        const usersResponse = await fetch(`${API_URL}/users`);
        const usersData = await usersResponse.json();
        setCloudUsers(usersData.map((u) => u.username));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();

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
      createdAt: new Date().toISOString(),
    });

    setMessage("");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Get users from cloud DB
  const chatUsers = [
    ...(currentUser ? [{ username: currentUser, isYou: true }] : []),
    ...cloudUsers
      .filter((u) => u !== currentUser)
      .map((u) => ({ username: u, isYou: false })),
  ];

  // Format timestamp from message
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
            <div className="chat-header-avatar">
              <MessageSquare size={20} />
            </div>
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
              <Users size={18} />
              <span>Members</span>
            </button>
            <button
              className="header-btn"
              onClick={() => navigate("/")}
              title="Back to Home"
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button
              className="header-btn"
              onClick={handleLogout}
              title="Sign Out"
            >
              <LogOut size={18} />
              <span>Leave</span>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="messages-wrapper">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <MessageSquare size={32} />
              </div>
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
                        {formatDateTime(chat.createdAt)}
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
              <Send size={20} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Chat;
