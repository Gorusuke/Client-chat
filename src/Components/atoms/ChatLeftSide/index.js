import React, { useCallback, useEffect, useState } from "react";
import { SignOut } from "../../firebase/firebase";
import Users from "../Users";
import styles from "./index.module.css";

const ChatLeftSide = ({ users, newUser }) => {
  // const user = JSON.parse(sessionStorage.getItem("token"));
  // const { username, avatar } = user;
  // const [isFalse, setIsFalse] = useState(false);
  // const [showUsers, setShowUsers] = useState(false);

  // useEffect(() => {
  //   setIsFalse(true);
  //   setTimeout(() => {
  //     setIsFalse(false);
  //   }, 3000);
  // }, [newUser.text]);

  // console.info(users.reverse()[0]);
  // console.info(users);
  // console.info(newUser);

  // const mouseEnter = useCallback(() => setShowUsers(true), [setShowUsers]);
  // const mouseLeave = useCallback(() => setShowUsers(false), [setShowUsers]);

  const CerrarSesion = () => {
    // console.info("Click..!!");
    sessionStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <div className={styles.chat_container}>
      <div className={styles.user_container}>
        <div className={styles.avatar}>
          {/* <img src={avatar} alt={username} /> */}
        </div>
        {/* <h6>Hello, {`${username.split(" ")[0]} ${username.split(" ")[1]}`}</h6> */}
        {/* <button onClick={() => SignOut()}>Sign Out</button> */}
        <button onClick={CerrarSesion}>Sign Out</button>
      </div>
      <div className={styles.information_container}>
        <h6>You're Online!</h6>
        <p /*onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}*/>
          {/* {users.length} user(s) online now */}
        </p>
        {/* {showUsers && <Users users={users} />} */}
        {/* <div className={isFalse ? styles.notifications2 : styles.notifications}> */}
        <h6>Notifications</h6>
        {/* {newUser.text && ( */}
        <p>
          {/* <span>{newUser.text}</span> Has joined the chat, say hello! */}
        </p>
        {/* )} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ChatLeftSide;
