import React, { useEffect } from "react";
import socket from "../../socket";
import styles from "./index.module.css";
import ChatLeftSide from "../../atoms/ChatLeftSide";
import SendMessageForm from "../../atoms/SendMessageForm";
import MessagesContent from "../../atoms/MessagesContent";

const Chat = () => {
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    socket.emit("connected", username);
    return () => socket.off();
  }, [username]);

  return (
    <div className={styles.container}>
      <ChatLeftSide />
      <div className={styles.form_container}>
        <MessagesContent />
        <SendMessageForm />
      </div>
    </div>
  );
};

export default Chat;
