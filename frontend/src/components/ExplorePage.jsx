import React from "react";
import Masonry from "react-responsive-masonry";
import testImgs from "./testImgArray";

const ExplorePage = () => {
  const hashtags = "#beer #scotchale #pilsner";
  // fetch collection, and return exploreBlock

  const contentBlocks = testImgs.map((content, index) => {
    return (
      <figure>
        <div className="imgDiv">
          <img key={index} src={content.contentPhoto}></img>
        </div>
        <div className="detailDiv">
          <p>{content.contentReview}</p>
        </div>
      </figure>
    );
  });
  return (
    <>
      <div className="quickFilter"></div>
      <section className="explore">
        <Masonry columnsCount={4} gutter="10px">
          {contentBlocks}
        </Masonry>
      </section>
    </>
  );
};

export default ExplorePage;
