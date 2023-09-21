// 2 types of headers - one for register/login/welcome pages, one for user/explore/submit pages

import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth";

const Header = (props) => {
  const navigate = useNavigate();
  const searchRef = useRef("");
  const searchResultRef = useRef([]);
  const fetchData = useFetch();
  const auth = useContext(AuthContext);

  const getData = async () => {
    const res = await fetchData(
      "/fyp/all-contents",
      undefined,
      undefined,
      auth.accessToken // add these
    );
    if (res.ok) {
      props.setContentData(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data", res.data);
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
              navigate("/register");
              console.log("register clicked");
            }}
          >
            Register
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => {
              navigate("/login");
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
              navigate("/explore")
            }}
          ></img>
          <div
            className={styles.appName}
            onClick={() => {
              navigate("/explore");
            }}
          >
            <p>
              <span>Better Time, Beer Time</span>
            </p>
          </div>
          {/* here */}
          <input
            id={"searchBar"}
            className={styles.searchBar}
            placeholder="Search content"
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
              if (searchRef.current.value.length === 0) {
                getData();
              }
            }}
          ></input>
          <img
            src="/heart.png"
            width="40"
            height="40"
            className={styles.likesIcon}
            onClick={() => {
              // handleClickUser();
              navigate("/user")
              props.setShowCreated(false);
            }}
          ></img>
          <img
            src={props.user.photo}
            width="40"
            height="40"
            className={styles.profilePic}
            onClick={() => {
              // handleClickUser();
              navigate("/user");
              props.setShowCreated(true);
            }}
          ></img>
        </div>
      )}
    </>
  );
};

export default Header;
