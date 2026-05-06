import socket from "../socket/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("receive_message", (data) => {
      setMessages((prevChats) => [...prevChats, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("new_message", {
      username: username,
      text: message,
    });

    setMessage("");
  }

  return (
    <div>
      <h1>Welcome to Chatty!</h1>
      <h1>Global chats!</h1>
      <div>
        {messages.map((chat, index) => {
          return (
            <>
              <p>{chat.username}</p>
              <p key={index}>{chat.text}</p>
            </>
          );
        })}
      </div>
      <form>
        <input
          type="text"
          placeholder="Enter your message!"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button type="submit" onClick={handleSubmit}>
          Send!
        </button>
      </form>
    </div>
  );
}
export default Chat;
