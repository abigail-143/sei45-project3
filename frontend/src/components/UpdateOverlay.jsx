import React from "react";
import styles from "./UpdateOverlay.module.css";

const UpdateOverlay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.updateModal}>
        <img
          className={styles.close}
          src="/close.png"
          onClick={() => {
            props.setUpdateUser(false);
          }}
        ></img>
        <img
          className={styles.updateProfilePic}
          src={props.userInfo.photo}
        ></img>
        <input
          className={styles.updateUsername}
          placeholder={props.userInfo.username}
        ></input>
        <button className={styles.updateBtn}>update</button>
      </div>
    </div>
  );
};

export default UpdateOverlay;
