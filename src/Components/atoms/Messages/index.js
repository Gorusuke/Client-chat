import React from "react";
import styles from "./index.module.css";

const Messages = ({ chatMessages, username }) => {
  return (
    <div
      className={
        chatMessages.user === username ? styles.message : styles.other_message
      }
    >
      {chatMessages.userr === "admin" ? (
        <div>
          <p>{chatMessages.message}</p>
        </div>
      ) : (
        <>
          <span></span>
          <div>
            {chatMessages.user !== username && (
              <b className={styles.user}>{chatMessages.user}</b>
            )}
            <div className={styles.text}>
              <p>{chatMessages.message}</p>
              <span>12:45pm</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
