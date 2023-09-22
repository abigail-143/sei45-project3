import React, { useContext, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Modal.module.css";

const RegisterOverlay = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const [uploadPic, setUploadPic] = useState(true);
  const [photo, setPhoto] = useState(
    "https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
  );
  const [displayPic, setDisplayPic] = useState(false);

  const usernameRef = useRef("");
  const pwdRef = useRef("");
  const fetchData = useFetch();

  // function to deal with the login button in modal
  const RegisterClick = async () => {
    const res = await fetchData("/landing/register", "PUT", {
      photo,
      username,
      password,
    });
    if (res.ok) {
      console.log(res);
      auth.setAccessToken(res.data.access);
      props.setShowWelcome(true);
      alert("User created!");
      navigate("/login");

      // const decode = jwtDecode(res.data.access);
    } else {
      console.log(res.data);
      setError1(res.data[0]);
      setError2(res.data[2]);
    }
  };

  //function to convert photo file into base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // convert file into base64 and standby for upload
  const handleFileUpload = async (e) => {
    setUploadPic(false);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setDisplayPic(true);
    setPhoto(base64);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.welcomeText}>Welcome to BTBT</div>
        <button
          className={styles.closeButton}
          onClick={() => {
            navigate("/");
          }}
        >
          <img className={styles.closeImg} src="close.png" />
        </button>
        <label className={styles.form} htmlFor="profile-pic">
          {uploadPic && (
            <img
              className={styles.profPhoto}
              src="https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
            />
          )}
          <input
            type="file"
            label="photo"
            id="profile-pic"
            className={styles.inputProfilePic}
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          ></input>
          {displayPic && <img className={styles.displayPic} src={photo} />}
        </label>
        <div className={styles.loginDetails2}>
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
          <button
            className={styles.loginBtn}
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
          setShowWelcome={props.setShowWelcome}
        ></RegisterOverlay>,
        document.querySelector("#auth-root")
      )}
    </>
  );
};

export default RegisterModal;
