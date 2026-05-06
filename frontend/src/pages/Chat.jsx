import socket from "../socket/socket";
import { useEffect, useState } from "react";
function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("receive_message", (data) => {
      setMessages((prevChats) => [...prevChats, data]);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("new_message", {
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
          return <p key={index}>{messages.text}</p>;
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
