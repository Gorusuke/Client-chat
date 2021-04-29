import React, { useEffect, useState } from "react";
import socket from "../../socket";
import styles from "./index.module.css";
import ChatLeftSide from "../../atoms/ChatLeftSide";
import SendMessageForm from "../../atoms/SendMessageForm";
import MessagesContent from "../../atoms/MessagesContent";
// import { useHistory } from "react-router-dom";
// import useUser from "../../hooks/useUser";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [conection, setConection] = useState([]);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    socket.emit("connected", username);

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [username]);

  useEffect(() => {
    socket.emit("users", ({ users }) => {
      setNewUser(users);
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setConection(message);
    });

    return () => {
      socket.off();
    };
  }, []);

  // useEffect(() => {
  //   socket.emit("disconnect", ({ users }) => {
  //     setNewUser(users);
  //   });

  //   return () => {
  //     socket.off();
  //   };
  // }, []);

  console.info(conection);

  return (
    <div className={styles.container}>
      <ChatLeftSide users={users} newUser={newUser} />
      <div className={styles.form_container}>
        <MessagesContent conection={conection} />
        <SendMessageForm />
      </div>
    </div>
  );
};

export default Chat;
