import React, { useContext, useState, useRef } from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth";
import useFetch from "../custom_hooks/useFetch";

const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const fetchData = useFetch();

  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const pwRef = useRef("");
  const confirmPWRef = useRef("");

  const HandleResetPassword = async () => {
    const res = await fetchData("/landing/reset", "POST", {
      username,
      password,
    });

    if (res.ok) {
      console.log(res);
      auth.setAccessToken(res.data.access);
      alert("Password successfully updated");
      navigate("/login");
    } else {
      console.log(res.data);
    }
  };

  const CheckPW = () => {
    if (confirmPWRef.current.value !== pwRef.current.value) {
      setMessage("Passwords don't match");
    } else {
      setMessage("Passwords match");
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalFPW}>
        <button
          className={styles.closeButton}
          onClick={() => {
            navigate("/");
          }}
        >
          <img className={styles.closeImg} src="close.png" />
        </button>
        <h2 className={styles.h2}>Reset Password</h2>
        <div className={styles.divFPW}>
          <label className={styles.labelFPW}>Username:</label>
          <input className={styles.inputFPW} value={props.username}></input>
        </div>
        <div className={styles.divFPW}>
          <label className={styles.labelFPW}>New Password:</label>
          <input
            ref={pwRef}
            className={styles.inputFPW}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.divFPW}>
          <label className={styles.labelFPW}>Confirm Password:</label>
          <input
            ref={confirmPWRef}
            className={styles.inputFPW}
            onChange={() => CheckPW()}
          ></input>
          <small
            className={`${styles.labelFPW} ${
              message.length == 15 ? styles.green : styles.red
            }`}
          >
            {message}
          </small>
        </div>
        <div className={styles.divFPW}>
          <button
            className={styles.buttonFPW}
            onClick={() => {
              HandleResetPassword();
              props.setResetPW(false);
              console.log("hi");
            }}
          >
            Set Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
