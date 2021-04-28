import React, { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import styles from "./index.module.css";
import Messages from "../../atoms/Messages";
import ChatLeftSide from "../../atoms/ChatLeftSide";
import SendMessageForm from "../../atoms/SendMessageForm";
import axios from "axios";
// import { useHistory } from "react-router-dom";
// import useUser from "../../hooks/useUser";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const username = sessionStorage.getItem("username");
  const messageRef = useRef(null);

  useEffect(() => {
    socket.on("new message", (data) => {
      setMessages(data);
    });
  }, []);

  useEffect(() => {
    socket.emit("connected", username);

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [username]);

  // useEffect(() => {
  //   socket.on("user", (Usuario) => {
  //     setNewUser(Usuario);
  //   });
  // });

  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages([...messages, message]);
  //   });

  //   return () => {
  //     socket.off();
  //   };
  // }, [messages]);

  // console.info(username);

  useEffect(() => {
    const apiMessages = async () => {
      const url = "http://localhost:4000/api/messages";
      const response = await axios.get(url);
      setMessages(response.data);
    };
    apiMessages();
  });

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [setMessages]);

  return (
    <div className={styles.container}>
      <ChatLeftSide users={users} newUser={newUser} />
      <div className={styles.form_container}>
        <div>
          {messages.map((message, i) => (
            <Messages key={i} chatMessages={message} username={username} />
          ))}
          <div ref={messageRef}></div>
        </div>
        <SendMessageForm />
      </div>
    </div>
  );
};

export default Chat;
