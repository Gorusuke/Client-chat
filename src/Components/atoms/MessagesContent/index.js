import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Messages from "../../atoms/Messages";
import socket from "../../socket";

const MessagesContent = () => {
  const [messages, setMessages] = useState([]);
  const [conection, setConection] = useState([]);
  const username = sessionStorage.getItem("username");
  const messageRef = useRef(null);

  const apiMessages = async () => {
    const url = "http://localhost:4000/api/messages";
    const response = await axios.get(url);
    setMessages(response.data);
  };

  useEffect(() => {
    apiMessages();
  }, []);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setConection(message);
    });
  }, []);

  return (
    <div>
      {messages.map((message, i) => (
        <Messages
          key={i}
          chatMessages={message}
          username={username}
          conection={conection}
        />
      ))}
      <div ref={messageRef}></div>
    </div>
  );
};

export default MessagesContent;
