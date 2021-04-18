import React, { useState } from "react";
import styles from "./index.module.css";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

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

  const { username, email, password, confirm } = newUser;

  const validarEmail = (e) => {
    if (e.target.value === "") {
      setErrorNewUser({
        ...errorNewUser,
        errorEmail: false,
      });
    }
  };

  const validarPassword = (e) => {
    if (e.target.value === "") {
      setErrorNewUser({
        ...errorNewUser,
        errorPassword: false,
      });
    }
  };

  const validarConfirm = (e) => {
    if (e.target.value === "") {
      setErrorNewUser({
        ...errorNewUser,
        errorConfirm: false,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !email.trim().length &&
      !password.trim().length &&
      !confirm.trim().length
    ) {
      setErrorNewUser({
        errorEmail: true,
        errorPassword: true,
        errorConfirm: true,
      });
      return;
    }

    if (email.trim() === "") {
      setErrorNewUser({
        ...errorNewUser,
        errorEmail: true,
      });
      // resetError();
      return;
    }

    if (password.trim() === "") {
      setErrorNewUser({
        ...errorNewUser,
        errorPassword: true,
      });
      // resetError();
      return;
    }

    if (confirm.trim() === "") {
      setErrorNewUser({
        ...errorNewUser,
        errorConfirm: true,
      });
      // resetError();
      return;
    }

    if (password !== confirm) {
      setEqual(true);
      setErrorNewUser({
        ...errorNewUser,
        errorConfirm: false,
      });
      // resetError();
      return;
    }

    // registrar en la base de datos
    Axios.post("http://localhost:4000/api/users", {
      username,
      email,
      password,
    });

    // redireccionar al login
    history.push("/login");
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
              onFocus={validarEmail}
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
              placeholder="New Password"
              value={newUser.password}
              onFocus={validarPassword}
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
              value={newUser.confirm}
              onFocus={validarConfirm}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  confirm: e.target.value,
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
