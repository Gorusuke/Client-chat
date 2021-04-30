import React, { useEffect, useRef } from "react";
import useTime from "../../hooks/useTime";
import styles from "./index.module.css";

const Messages = ({ chatMessages, username }) => {
  const messageRef = useRef(null);
  const time = useTime(chatMessages.date);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [time]);

  return (
    <>
      <div
        className={
          chatMessages.user === username ? styles.message : styles.other_message
        }
      >
        <span></span>
        <div>
          {chatMessages.user !== username && (
            <b className={styles.user}>{chatMessages.user}</b>
          )}
          <div className={styles.text}>
            <p>{chatMessages.message}</p>
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div ref={messageRef}></div>
    </>
  );
};

export default Messages;
