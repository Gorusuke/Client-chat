import React from "react";
import styles from "./index.module.css";

const Messages = ({ mess, username }) => {
  const nameUser = username.split(" ")[0];

  return (
    <div
      className={
        nameUser === mess.user
          ? styles.message
          : mess.user === "admin"
          ? styles.admin
          : styles.other_message
      }
    >
      {mess.user === "admin" ? (
        <div className={styles.admin}>
          <p>{mess.text}</p>
        </div>
      ) : (
        <>
          <span></span>
          <div>
            {nameUser !== mess.user && (
              <b className={styles.user}>{mess.user.split(" ")[0]}</b>
            )}
            <div className={styles.text}>
              <p>{mess.text}</p>
              <span>12:45pm</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
