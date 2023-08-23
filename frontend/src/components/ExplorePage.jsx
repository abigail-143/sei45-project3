import React, { useEffect, useState, useContext, useRef } from "react";
import Masonry from "@mui/lab/Masonry";

import testImgs from "./testImgArray";
import styles from "./ExplorePage.module.css";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth"; // add this

const ExplorePage = (props) => {
  const fetchData = useFetch();
  const auth = useContext(AuthContext); // add this
  const searchRef = useRef("");
  const searchResult = useRef("");

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

  const tags = "#beer #scotchale #pilsner #draft #carlsberg #stout #paleale";
  const hashtags = tags.split(" ");
  const hashtagItems = hashtags.map((hashtag, index) => {
    return (
      <li key={index} className={styles.quickFilterItem}>
        <a href="/" ref={searchRef}>
          {hashtag}
        </a>
      </li>
    );
  });

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

  // fetch collection, and return contentBlock
  // update with the state that the data is fetched and stored in
  const contentBlocks = props.contentData.map((content, index) => {
    return (
      <div key={index} className={styles.contentBlock}>
        <div className={styles.content}>
          <img src={content.contentPhoto} className={styles.contentImg}></img>
        </div>
        <div className={styles.overlayHover}>
          <a className={styles.username}>@{content.username}</a>
          <img
            src="/heart.png"
            className={styles.heartImg}
            onClick={() => {
              console.log("hi");
            }}
          ></img>
        </div>
      </div>
    ); // need to hid the detailDiv, only show on hover and also make the position relative to the imgDiv
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.quickFilter}>
        <ul className={styles.quickFilterBar}>{hashtagItems}</ul>
      </div>
      <section className={styles.explore}>
        <Masonry columns={4} spacing={2} sx={{ margin: 0 }}>
          {contentBlocks}
          {contentBlocks}
          {contentBlocks}
          {contentBlocks}
        </Masonry>
      </section>
    </>
  );
};

export default ExplorePage;
