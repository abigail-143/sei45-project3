import React, { useEffect, useState, useContext } from "react";
import Masonry from "@mui/lab/Masonry";

import testImgs from "./testImgArray";
import styles from "./ExplorePage.module.css";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth"; // add this
import ContentOverlay from "./contentOverlay/ContentModal";

const ExplorePage = () => {
  const [contentData, setContentData] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [showContentOverlay, setShowContentOverlay] = useState(false);
  const fetchData = useFetch();
  const auth = useContext(AuthContext); // add this

  const tags = "#beer #scotchale #pilsner #draft #carlsberg";
  const hashtags = tags.split(" ");
  const hashtagItems = hashtags.map((hashtag, index) => {
    return (
      <li key={index} className={styles.quickFilterItem}>
        <a href="/">{hashtag}</a>
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
      setContentData(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data", res.data);
    }
  };

  const getIndividualContent = async (id) => {
    const res = await fetchData(
      "beer/singleContent",
      "POST",
      { userId: id },
      auth.accessToken
    );

    if (res.ok) {
      setShowDetails(res.data);
      setShowContentOverlay(true);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data:", res.data);
    }
  };

  // fetch collection, and return contentBlock
  // update with the state that the data is fetched and stored in
  const contentBlocks = contentData.map((content, index) => {
    return (
      // need to add on click to showoverlay
      <div key={index} id={content._id} className={styles.contentBlock}>
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
      {showContentOverlay && (
        <ContentOverlay
          setShowContentOverlay={setShowContentOverlay}
        ></ContentOverlay>
      )}
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
