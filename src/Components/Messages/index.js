import React from "react";
import styles from "./index.module.css";

const Messages = ({ mess, username }) => {
  const nameUser = username.split(" ")[0];

  return (
    <div
      className={username === mess.user ? styles.message : styles.other_message}
    >
      <span></span>
      <div className={styles.text}>
        <p>{mess.text}</p>
        <span>12:45pm</span>
      </div>
    </div>
  );
};

export default Messages;
