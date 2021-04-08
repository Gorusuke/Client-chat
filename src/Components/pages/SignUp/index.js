import React, { useState } from "react";
import styles from "./index.module.css";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [equal, setEqual] = useState(false);
  const [errorNewUser, setErrorNewUser] = useState({
    errorEmail: false,
    errorPassword: false,
    errorConfirm: false,
  });
  const history = useHistory();

  const { email, password, confirm } = newUser;

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      email.trim() === "" &&
      password.trim() === "" &&
      confirm.trim() === ""
    ) {
      setErrorNewUser({
        errorEmail: true,
        errorPassword: true,
        errorConfirm: true,
      });
      return;
    }

    if (
      email.trim() !== "" &&
      password.trim() === "" &&
      confirm.trim() === ""
    ) {
      setErrorNewUser({
        ...errorNewUser,
        errorPassword: true,
        errorConfirm: true,
      });
      return;
    }

    if (
      email.trim() === "" &&
      password.trim() !== "" &&
      confirm.trim() === ""
    ) {
      setErrorNewUser({
        ...errorNewUser,
        errorEmail: true,
        errorConfirm: true,
      });
      return;
    }

    if (password !== confirm) {
      setEqual(true);
      return;
    }

    // if (email.trim() === "" && password.trim() !== "") {
    //   setErrorEmail(true);
    //   return;
    // }

    // if (email.trim() !== "" && password.trim() === "") {
    //   setErrorPassword(true);
    //   return;
    // }
    console.info(newUser.username);
    console.info(newUser.email);
    console.info(newUser.password);
    console.info(newUser.passwordAgain);
    // regstrar en el chat

    // redireccionar al login
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h3>Create Account</h3>
        <form onSubmit={onSubmit}>
          <div className={styles.email}>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.email}>
            <input
              type="email"
              placeholder="Your Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />
          </div>
          {errorNewUser.errorEmail && (
            <p className={styles.error}>Este campo es obligatorio*</p>
          )}
          <div className={styles.password}>
            <input
              type="password"
              placeholder="Your Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  password: e.target.value,
                })
              }
            />
          </div>
          {errorNewUser.errorPassword && (
            <p className={styles.error}>Este campo es obligatorio*</p>
          )}
          <div className={styles.password}>
            <input
              type="password"
              placeholder="Rewrite Your Password"
              value={newUser.passwordAgain}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  passwordAgain: e.target.value,
                })
              }
            />
          </div>
          {errorNewUser.errorConfirm && (
            <p className={styles.error}>Este campo es obligatorio*</p>
          )}
          {equal && <p className={styles.error}>The password must be equal</p>}
          <div className={styles.button_container}>
            <button>Register</button>
          </div>
        </form>
        <div className={styles.account}>
          <p>Already have the account?</p>
          <Link to={"/login"} className="enlace-cuenta">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
