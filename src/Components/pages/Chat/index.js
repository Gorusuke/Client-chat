import React, { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import styles from "./index.module.css";
import Messages from "../../atoms/Messages";
import ChatLeftSide from "../../atoms/ChatLeftSide";
import SendMessageForm from "../../atoms/SendMessageForm";
// import { useHistory } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const usernameToken = sessionStorage.getItem("username");
  const messageRef = useRef(null);
  let username = usernameToken;

  useEffect(() => {
    socket.emit("connected", username);
    socket.emit("newUser", username, (callback) => {
      setUsers(callback.users);
    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [username]);

  useEffect(() => {
    socket.on("user", (Usuario) => {
      setNewUser(Usuario);
    });
  });

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  });

  // useEffect(() => {
  //   socket.emit("connected", username);
  //   socket.emit("newUser", username, (callback) => {
  //     setUsers(callback.users);
  //   });

  //   return () => {
  //     // socket.emit("disconnect");
  //     socket.off();
  //   };
  // }, [username]);

  console.info(username);

  return (
    <div className={styles.container}>
      <ChatLeftSide users={users} newUser={newUser} />
      <div className={styles.form_container}>
        <div>
          {messages.map((message, i) => (
            <Messages key={i} mess={message} username={username} />
          ))}
          <div ref={messageRef}></div>
        </div>
        <SendMessageForm />
      </div>
    </div>
  );
};

export default Chat;
