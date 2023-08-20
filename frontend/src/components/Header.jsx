// 2 types of headers - one for register/login/welcome pages, one for user/explore/submit pages
// will use the showXXPage boolean indicators to toggle between the headers

import React from "react";
import styles from "./Header.module.css";

const Header = (props) => {
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
          <button className={styles.registerBtn}>Register</button>
          <button className={styles.loginBtn}>Login</button>
        </div>
      )}
      {!props.showWelcome && (
        <div className={styles.header}>
          <img
            src="https://picsum.photos/200"
            width="50"
            height="50"
            className={styles.appLogo}
            onClick={handleClickExplore}
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
            src="https://picsum.photos/200"
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
