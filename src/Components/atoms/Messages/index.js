import React from "react";
import useTime from "../../hooks/useTime";
import styles from "./index.module.css";

const Messages = ({ chatMessages, username }) => {
  const time = useTime(chatMessages.date);

  return (
    <div
      className={
        chatMessages.user === username
          ? styles.message
          : // : conection.user === "admin"
            // ? styles.admin
            styles.other_message
      }
    >
      {/* {conection.user === "admin" ? (
        <div>
          <p>{conection.text}</p>
        </div>
      ) : ( */}
      <>
        <span></span>
        <div>
          {chatMessages.user !== username && (
            <b className={styles.user}>{chatMessages.user}</b>
          )}
          <div className={styles.text}>
            <p>{chatMessages.message}</p>
            <span>
              <b>{time}</b>
            </span>
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Messages;
