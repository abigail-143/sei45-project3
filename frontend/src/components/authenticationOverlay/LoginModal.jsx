import React, { useContext, useState, useRef } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../context/auth";
import jwtDecode from "jwt-decode";
import fetchData from "../custom_hooks/useFetch";
import styles from "./Modal.module.css";

const LoginOverlay = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = useRef("");
  const pwdRef = useRef("");

  // function to deal with the login button in modal
  const loginClick = async (props) => {
    const res = await fetchData("/landing/login", "POST", {
      username,
      password,
    });
    if (res.ok) {
      auth.setAccessToken(res.data.access);
      const decode = jwtDecode(res.data.access);
    } else {
      alert(res.data);
    }
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.profPic}>BTBT</div>
        <div className={styles.welcomeText}>Welcome to BTBT</div>
        <div className={styles.loginDetails}>
          <div>
            <div>Username:</div>
            <input
              ref={usernameRef}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <br />
          <div>
            <div>Password:</div>
            <input
              ref={pwdRef}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <br />
          <br />
          <button onClick={loginClick}>Log In</button>
        </div>
      </div>
    </div>
  );
};

const LoginModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <LoginOverlay></LoginOverlay>,
        document.querySelector("#auth-root")
      )}
    </>
  );
};

export default LoginModal;
