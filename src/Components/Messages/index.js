import React from "react";
import styles from "./index.module.css";

const Messages = ({ mess }) => {
  return (
    <div className={styles.message}>
      <span></span>
      <div className={styles.text}>
        <p>{mess.message}</p>
        <span>12:45pm</span>
      </div>
    </div>
  );
};

export default Messages;
