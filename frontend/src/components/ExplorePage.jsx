import React, { useState } from "react";
import Masonry from "react-responsive-masonry";
import testImgs from "./testImgArray";
import styles from "./ExplorePage.module.css";

const ExplorePage = () => {
  const [hide, setHide] = useState(true);
  const tags = "#beer #scotchale #pilsner #draft #carlsberg";

  const hashtags = tags.split(" ");
  const hashtagItems = hashtags.map((hashtag, index) => {
    return (
      <li key={index} className={styles.quickFilterItem}>
        <a href="/">{hashtag}</a>
      </li>
    );
  });

  // fetch collection, and return contentBlock
  const contentBlocks = testImgs.map((content, index) => {
    return (
      <figure key={index}>
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
            src={hide ? "/heart.png" : "/comment.png"}
          ></img>
        </div>
      </figure>
    ); // need to hid the detailDiv, only show on hover and also make the position relative to the imgDiv
  });
  return (
    <>
      <div className={styles.quickFilter}>
        <ul className={styles.quickFilterBar}>{hashtagItems}</ul>
      </div>
      <section className={styles.explore}>
        <Masonry columnsCount={4} gutter="10px">
          {contentBlocks}
        </Masonry>
      </section>
    </>
  );
};

export default ExplorePage;
