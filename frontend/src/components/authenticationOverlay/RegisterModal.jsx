import React, { useContext, useState, useRef } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../context/auth";
import jwtDecode from "jwt-decode";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Modal.module.css";

const RegisterOverlay = (props) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const usernameRef = useRef("");
  const pwdRef = useRef("");
  const fetchData = useFetch();

  // function to deal with the login button in modal
  const RegisterClick = async () => {
    const res = await fetchData("/landing/register", "PUT", {
      username,
      password,
    });
    if (res.ok) {
      console.log(res);
      auth.setAccessToken(res.data.access);
      props.setShowRegister(false);
      props.setShowWelcome(true);
      props.setShowLogin(true);
      alert("User created!");

      // const decode = jwtDecode(res.data.access);
    } else {
      console.log(res.data);
      setError1(res.data[0]);
      setError2(res.data[2]);
    }
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => {
            props.setShowRegister(false);
          }}
        >
          <img src="../../picture/Dell.jpg" />
        </button>
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
            {error1 ? (
              <p style={{ color: "red", margin: "0" }}>{error1}</p>
            ) : (
              <div style={{ height: "36px", margin: "0" }}></div>
            )}
          </div>
          <div>
            <div>Password:</div>
            <input
              ref={pwdRef}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {error2 ? (
              <p style={{ color: "red", margin: "0" }}>{error2}</p>
            ) : (
              <div style={{ height: "36px", margin: "0" }}></div>
            )}
          </div>

          <br />
          <button
            onClick={() => {
              RegisterClick();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const RegisterModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <RegisterOverlay
          setShowRegister={props.setShowRegister}
          setShowExplorePage={props.setShowExplorePage}
          setShowWelcome={props.setShowWelcome}
          setShowLogin={props.setShowLogin}
        ></RegisterOverlay>,
        document.querySelector("#auth-root")
      )}
    </>
  );
};

export default RegisterModal;
