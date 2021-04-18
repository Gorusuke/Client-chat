import React, { useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { signInWithGoogle, loginWithGithub } from "../../firebase/firebase";
import Axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" && password.trim() === "") {
      setErrorEmail(true);
      setErrorPassword(true);
      return;
    }

    if (email.trim() === "" && password.trim() !== "") {
      setErrorEmail(true);
      return;
    }

    if (email.trim() !== "" && password.trim() === "") {
      setErrorPassword(true);
      return;
    }
    // console.info(email);
    // console.info(password);
    // Mandar al chat
    Axios.post("http://localhost:4000/api/login", {
      email,
      password,
    }).then((result) => {
      const { data } = result;
      sessionStorage.setItem("token", data.token);
      window.location = "/";
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h3>Login with</h3>
        <div className={styles.redes_container}>
          <div className={styles.red_container} onClick={signInWithGoogle}>
            <img
              src="https://www.designpieces.com/wp-content/uploads/2015/09/Google_2015_logo.svg"
              alt="google"
            />
          </div>
          <div className={styles.red_container} onClick={loginWithGithub}>
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
              alt="github"
            />
          </div>
        </div>
        <h3>Or use your email</h3>
        <form onSubmit={onSubmit}>
          <div className={styles.email}>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errorEmail && (
            <p className={styles.error}>Este campo es obligatorio*</p>
          )}
          <div className={styles.password}>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorPassword && (
            <p className={styles.error}>Este campo es obligatorio*</p>
          )}
          <div className={styles.button_container}>
            <button>Login</button>
          </div>
        </form>
        <div className={styles.account}>
          <p>Don't have an Account?</p>
          <Link to={"/new-account"} className="enlace-cuenta">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
