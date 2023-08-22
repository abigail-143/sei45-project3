import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../context/auth";
import jwtDecode from "jwt-decode";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Modal.module.css";

const LoginOverlay = (props) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const fetchData = useFetch();

  // function to deal with the login button in modal
  const loginClick = async () => {
    const res = await fetchData("/landing/login", "POST", {
      username,
      password,
    });
    if (res.ok) {
      console.log(res);
      auth.setAccessToken(res.data.access);
      props.setShowLogin(false);
      props.setShowWelcome(false);
      props.setShowExplorePage(true);

      // test this
      const decode = jwtDecode(res.data.access);
    } else {
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
            props.setShowLogin(false);
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
              loginClick();
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <LoginOverlay
          setShowLogin={props.setShowLogin}
          setShowExplorePage={props.setShowExplorePage}
          setShowWelcome={props.setShowWelcome}
        ></LoginOverlay>,
        document.querySelector("#auth-root")
      )}
    </>
  );
};

export default LoginModal;
