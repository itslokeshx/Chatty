import socket from "../socket/socket";
import { useEffect, useState } from "react";
function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, []);

  function handleSubmit() {}

  return (
    <div>
      <h1>Welcome to Chatty!</h1>
      <h1>Global chats!</h1>
      <div>
        {chats.map((chat, index) => {
          return <p key={index}>{chat.text}</p>;
        })}
      </div>
      <form>
        <input
          type="text"
          placeholder="Enter your message!"
          value={message}
          onChange={(e) => {
            e.target.value;
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
