import React, { useRef, useContext } from "react";
import styles from "./UpdateOverlay.module.css";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth";

const UpdateOverlay = (props) => {
  const fetchData = useFetch();
  const nameRef = useRef(props.user.username);
  const imgRef = useRef(props.user.photo);
  const idRef = useRef(props.user.user_id);
  const auth = useContext(AuthContext);
  console.log("original user", props.user);
  // handle change in username
  const handleChange = async () => {
    const res = await fetchData("/beer/updateProfile", "PATCH", {
      id: props.user.user_id,
      username: nameRef.current.value,
    });

    if (res.ok) {
      props.setUser({
        username: nameRef.current.value,
        user_id: props.user.user_id,
        photo: props.user.photo,
      });
      console.log(props.user);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
    props.setUpdateUser(false);
  };
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
        <img className={styles.updateProfilePic} src={props.user.photo}></img>
        <input
          ref={nameRef}
          className={styles.updateUsername}
          placeholder={props.user.username}
          type="text"
          onChange={() => {
            console.log(nameRef.current.value);
          }}
        ></input>
        <button className={styles.updateBtn} onClick={handleChange}>
          update
        </button>
      </div>
    </div>
  );
};

export default UpdateOverlay;
