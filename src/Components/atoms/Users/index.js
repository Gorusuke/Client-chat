import React from "react";
import styles from "./index.module.css";

const Users = ({ users }) => {
  return (
    <div className={styles.users_container}>
      {users.map((user, i) => (
        <p key={i}>
          <b>•</b> @{user.username.split(" ")[0]} {user.username.split(" ")[1]}
        </p>
      ))}
    </div>
  );
};

export default Users;
