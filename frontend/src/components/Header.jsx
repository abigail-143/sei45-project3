// 2 types of headers - one for register/login/welcome pages, one for user/explore/submit pages
// will use the showXXPage boolean indicators to toggle between the headers

import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./Header.module.css";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth";

const Header = (props) => {
  const searchRef = useRef("");
  const searchResultRef = useRef([]);
  const fetchData = useFetch();
  const auth = useContext(AuthContext);

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

  const handleSearch = async () => {
    const res = await fetchData("/search/search", "POST", {
      searchString: searchRef.current.value,
    });
    console.log(res);
    if (res.ok) {
      searchResultRef.current = res.data;
      props.setContentData(searchResultRef.current);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <>
      {props.showWelcome && (
        <div className={styles.header}>
          <img
            src="/beer.png"
            width="50"
            height="50"
            className={styles.appLogo}
          ></img>
          <div className={styles.appName}>
            <p>
              <span>Better Time, Beer Time</span>
            </p>
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
            src="/beer.png"
            width="50"
            height="50"
            className={styles.appLogo}
            onClick={() => {
              handleClickExplore();
            }}
          ></img>
          <div className={styles.appName} onClick={handleClickExplore}>
            <p>
              <span>Better Time, Beer Time</span>
            </p>
          </div>
          {/* here */}
          <input
            id={"searchBar"}
            className={styles.searchBar}
            placeholder="hello"
            type="text"
            ref={searchRef}
            onChange={(e) => {
              searchRef.current.value = e.target.value;
              console.log(searchRef.current.value);
              document
                .getElementById("searchBar")
                .addEventListener("keypress", (event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                    console.log("enter");
                  }
                });
            }}
            // {...document
            //   .getElementById("searchBar")
            //   .addEventListener("keypress", (event) => {
            //     if (event.key === "Enter") {
            //       handleSearch();
            //       console.log("enter");
            //     }
            //   })}
          ></input>
          <img
            src="/heart.png"
            width="40"
            height="40"
            className={styles.likesIcon}
            onClick={() => {
              handleClickUser();
              props.setShowCreated(false);
            }}
          ></img>
          <img
            src={props.user.photo}
            width="40"
            height="40"
            className={styles.profilePic}
            onClick={() => {
              handleClickUser();
              props.setShowCreated(true);
            }}
          ></img>
        </div>
      )}
    </>
  );
};

export default Header;
