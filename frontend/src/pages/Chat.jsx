import socket from "../socket/socket";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const currentUser = username;

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
      
      socket.on("connect", () => {
        console.log("Connected:", socket.id);
      });
      
      try {
        const response = await fetch("http://localhost:8000/messages");
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
    localStorage.removeItem("username");
    navigate("/login");
  }

  // Get unique users from messages
  const uniqueUsers = [...new Set(messages.map(m => m.username))];
  const chatUsers = [
    ...(currentUser ? [{ username: currentUser, isYou: true }] : []),
    ...uniqueUsers
      .filter(u => u !== currentUser)
      .map(u => ({ username: u, isYou: false }))
  ];

  // Format timestamp from message
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get avatar initials
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="chat-wrapper">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar - Users in Chat */}
      <aside className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">In This Chat</span>
        </div>
        <div className="users-list">
          {chatUsers.map((user, index) => (
            <div key={index} className="user-item">
              <div className={`user-avatar ${user.isYou ? 'you' : ''}`}>
                {getInitials(user.username)}
              </div>
              <div className="user-info">
                <div className="user-name">
                  {user.username} {user.isYou && "(You)"}
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
              <span className="chat-header-status">{chatUsers.length} members</span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="header-btn" onClick={() => navigate("/")} title="Home">
              ←
            </button>
            <button className="header-btn" onClick={handleLogout} title="Logout">
              ⎋
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="messages-wrapper">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <div className="empty-title">No messages yet</div>
              <div className="empty-subtitle">Send a message to start the conversation</div>
            </div>
          ) : (
            messages.map((chat, index) => {
              const isOutgoing = chat.username === currentUser;
              const showSender = index === 0 || messages[index - 1]?.username !== chat.username;
              
              return (
                <div 
                  key={index} 
                  className={`message-group ${isOutgoing ? 'outgoing' : 'incoming'}`}
                >
                  {!isOutgoing && showSender && (
                    <div className="message-sender">{chat.username}</div>
                  )}
                  <div className="message-bubble">
                    {chat.text}
                    <div className="message-meta">
                      <span className="message-time">{formatTime(chat.createdAt)}</span>
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
              placeholder="iMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button 
              type="submit" 
              className="input-btn send-btn"
              disabled={!message.trim()}
            >
              ↑
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Chat;
