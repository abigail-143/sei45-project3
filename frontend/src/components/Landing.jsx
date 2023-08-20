import React from "react";
import Masonry from "react-responsive-masonry";
import testImgs from "./testImgArray";
import styles from "./Landing.module.css";

const Landing = (props) => {
  // fetch collection, and return contentBlock
  const contentBlocks = testImgs.map((content, index) => {
    return (
      <figure key={index}>
        <div className={styles.imgDisplay}>
          <img src={content.contentPhoto}></img>
        </div>
        <div className={styles.detailDisplay}></div>
      </figure>
    );
  });
  const addSpace = (contentBlock, space) => {
    return (
      <>
        <div style={{ height: `${space}px` }}></div>
        {contentBlock}
      </>
    );
  };
  const contentBlock1 = addSpace(
    [contentBlocks[0], contentBlocks[1], contentBlocks[2]],
    50
  );
  const contentBlock2 = addSpace(
    [contentBlocks[3], contentBlocks[4], contentBlocks[5]],
    200
  );
  const contentBlock3 = addSpace(
    [contentBlocks[6], contentBlocks[7], contentBlocks[8]],
    200
  );
  const contentBlock4 = addSpace(
    [contentBlocks[9], contentBlocks[10], contentBlocks[11]],
    200
  );
  const contentBlock5 = addSpace(
    [contentBlocks[12], contentBlocks[13], contentBlocks[14]],
    50
  );
  return (
    <>
      <div className={styles.titleParent}>
        <div className={styles.title} style={{ textAlign: "center" }}>
          Find your next
          <br />
          <span className={styles.appName}>Better Time, Beer Time</span>
        </div>
      </div>
      <section className={styles.explore}>
        <Masonry columnsCount={5} gutter="10px" alignItems="center">
          {contentBlock1}
          {contentBlock2}
          {contentBlock3}
          {contentBlock4}
          {contentBlock5}
        </Masonry>
      </section>
    </>
  );
};

export default Landing;
