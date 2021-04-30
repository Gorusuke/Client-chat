import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Messages from "../../atoms/Messages";

const MessagesContent = () => {
  const [messages, setMessages] = useState([]);
  const username = sessionStorage.getItem("username");
  const messageRef = useRef(null);

  const apiMessages = async () => {
    const url = "http://localhost:4000/api/messages";
    const response = await axios.get(url);
    setMessages(response.data);
  };

  useEffect(() => {
    apiMessages();
  }, [messages]);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div>
      {messages.map((message, i) => (
        <Messages key={i} chatMessages={message} username={username} />
      ))}
      <div ref={messageRef}></div>
    </div>
  );
};

export default MessagesContent;
