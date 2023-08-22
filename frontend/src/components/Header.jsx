// 2 types of headers - one for register/login/welcome pages, one for user/explore/submit pages
// will use the showXXPage boolean indicators to toggle between the headers

import React, { useContext, useEffect, useState } from "react";
import styles from "./Header.module.css";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth";
import { PopoverPaper } from "@mui/material";

const Header = (props) => {
  const fetchData = useFetch();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState([]);

  const handleClickExplore = () => {
    if (props.showUserPage) {
      props.setShowUserPage(false);
      props.setShowExplorePage(true);
      console.log("handleClickExplore");
    }
  };

  const handleClickUser = () => {
    if (props.showExplorePage) {
      props.setShowExplorePage(false);
      props.setShowUserPage(true);
      console.log("handleClickUser");
    }
  };

  const getUser = async () => {
    console.log(1);
    const res = await fetchData(
      "/beer/getUser",
      "POST",
      undefined,
      auth.accessToken
    );

    if (res.ok) {
      setUser(res.data.data);
      console.log(user);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data:", res.data);
    }
  };

  useEffect(() => {
    if (!props.showWelcome) {
      getUser();
    }
  }, []);

  return (
    <>
      {props.showWelcome && (
        <div className={styles.header}>
          <img
            src="https://picsum.photos/200"
            width="50"
            height="50"
            className={styles.appLogo}
          ></img>
          <div className={styles.appName}>
            <p>Better Time, Beer Time</p>
          </div>
          <button
            className={styles.registerBtn}
            onClick={() => {
              props.setShowRegister(true);
              console.log("register clicked");
            }}
          >
            Register
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => {
              props.setShowLogin(true);
              console.log("login clicked");
            }}
          >
            Login
          </button>
        </div>
      )}
      {!props.showWelcome && (
        <div className={styles.header}>
          <img
            src="https://picsum.photos/200"
            width="50"
            height="50"
            className={styles.appLogo}
            onClick={() => {
              console.log("hi");
              handleClickExplore();
              console.log("bye");
            }}
          ></img>
          <div className={styles.appName} onClick={handleClickExplore}>
            <p>Better Time, Beer Time</p>
          </div>
          <input className={styles.searchBar} placeholder="hello"></input>
          <img
            src="/heart.png"
            width="40"
            height="40"
            className={styles.likesIcon}
          ></img>
          <img
            src={user.profilePhoto}
            width="40"
            height="40"
            className={styles.profilePic}
            onClick={handleClickUser}
          ></img>
        </div>
      )}
    </>
  );
};

export default Header;
