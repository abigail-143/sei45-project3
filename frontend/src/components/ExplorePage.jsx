import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import testImgs from "./testImgArray";
import styles from "./ExplorePage.module.css";
import useFetch from "./custom_hooks/useFetch";

const ExplorePage = () => {
  const [hide, setHide] = useState(true);
  const [contentData, setContentData] = useState([]);
  const [hover, setHover] = useState(false);
  const fetchData = useFetch();
  const tags = "#beer #scotchale #pilsner #draft #carlsberg";

  const hashtags = tags.split(" ");
  const hashtagItems = hashtags.map((hashtag, index) => {
    return (
      <li key={index} className={styles.quickFilterItem}>
        <a href="/">{hashtag}</a>
      </li>
    );
  });

  const handleMouseOver = () => {
    setHover(true);
  };

  const getData = async () => {
    const res = await fetchData("/fyp/all-contents");
    if (res.ok) {
      setContentData(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data", res.data);
    }
  };

  // fetch collection, and return contentBlock
  // update with the state that the data is fetched and stored in
  const contentBlocks = contentData.map((content, index) => {
    return (
      <figure
        key={index}
        onClick={() => {
          console.log("hi");
        }}
      >
        <div className={styles.imgDisplay}>
          <img src={content.contentPhoto}></img>
        </div>
        <div
          className={styles.detailDisplay}
          onClick={() => {
            setHide(false);
          }}
        >
          <a
            href="https://www.google.com"
            target="_blank"
            className={styles.usernameLink}
          >
            {content.username}
          </a>

          <img
            className={styles.likeBtn}
            src={hide ? "../public/heart.png" : "../public/comment.png"}
          ></img>
        </div>
      </figure>
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
          <div className="contentBlock">
            <div className={hover ? "contentHover" : "content"}>
              <img
                src={`${"https://images.unsplash.com/photo-1600111765736-9c59f7afe9e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVlciUyMGNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}`}
                className="contentImg"
              ></img>
            </div>
            <div className={hover ? "overlay" : "overlayHover"}>
              <a className="src">@username</a>
              <img
                src="/heart.png"
                className="heartImg"
                onClick={() => {
                  console.log("hi");
                }}
              ></img>
            </div>
          </div>
        </Masonry>
      </section>
    </>
  );
};

export default ExplorePage;
