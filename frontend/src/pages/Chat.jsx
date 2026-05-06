import socket from "../socket/socket";
import { useEffect } from "react";
function Chat() {
  const chats = [
    { text: "hi bruh!" },
    { text: "Yooo!" },
    { text: " How are you!" },
    { text: "How its going there mate!!" },
  ];
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, []);

  return (
    <div>
      <h1>Welcome to Chatty!</h1>
      <h1>Global chats!</h1>
      <div>
        {chats.map((chat) => {
          return <p>{chat.text}</p>;
        })}
      </div>
      <form>
        <input type="text" placeholder="Enter your message!" />

        <button type="submit">Send!</button>
      </form>
    </div>
  );
}
export default Chat;
