import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth";
import jwtDecode from "jwt-decode";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Modal.module.css";

const LoginOverlay = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("user1");
  const [password, setPassword] = useState("password1");
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
      console.log(res.data);
      auth.setAccessToken(res.data.access);
      props.setShowWelcome(false);
      props.setUser(res.data.payload);
      navigate("/explore")
      // test this
      // const decode = jwtDecode(res.data.access);
    } else {
      console.log(res.data);
      if (Array.isArray(res.data) && res.data.length >= 2) {
        setError1(res.data[0]);
        setError2(res.data[2]);
      } else {
        setError2(res.data);
      }
    }
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => {
            navigate("/")
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
              onChange={(e) => {
                setUsername(e.target.value);
                setError1("");
                setError2("");
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError1("");
                setError2("");
              }}
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
          setShowWelcome={props.setShowWelcome}
          setUser={props.setUser}
        ></LoginOverlay>,
        document.querySelector("#auth-root")
      )}
    </>
  );
};

export default LoginModal;
