import React from "react";
import { SignOut } from "../../firebase/firebase";
import styles from "./index.module.css";

const ChatLeftSide = ({ users, newUser }) => {
  const user = JSON.parse(sessionStorage.getItem("token"));
  const { username, avatar } = user;

  return (
    <div className={styles.chat_container}>
      <div className={styles.user_container}>
        <div className={styles.avatar}>
          <img src={avatar} alt={username} />
        </div>
        <h6>
          {/* {messages[0].text} */}
          Hello, {`${username.split(" ")[0]}`}
        </h6>
        <button onClick={() => SignOut()}>Sign Out</button>
      </div>
      <div className={styles.information_container}>
        <h6>You're Online!</h6>
        <p>{users.length} user(s) online now</p>
        <div
          className={
            newUser.text ? styles.notifications2 : styles.notifications
          }
        >
          <h6>Notifications</h6>
          {newUser.text && (
            <p>
              <span>{newUser.text}</span> Has joined the chat, say hello!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSide;
