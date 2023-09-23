import React from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = (props) => {
  const navigate = useNavigate();
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
            className={styles.inputFPW}
            onChange={(e) => {
              props.setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.divFPW}>
          <label className={styles.labelFPW}>Confirm Password:</label>
          <input className={styles.inputFPW}></input>
        </div>
        <div className={styles.divFPW}>
          <button
            className={styles.buttonFPW}
            onClick={() => {
              navigate("/login");
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
