import React from "react";
import Masonry from "react-responsive-masonry";
import testImgs from "./testImgArray";

const ExplorePage = () => {
  const tags = "#beer #scotchale #pilsner #draft #carlsberg";

  const hashtags = tags.split(" ");
  const hashtagItems = hashtags.map((hashtag, index) => {
    return (
      <li key={index} className="quickFilterItem">
        <a href="/">{hashtag}</a>
      </li>
    );
  });

  // fetch collection, and return contentBlock
  const contentBlocks = testImgs.map((content, index) => {
    return (
      <figure key={index}>
        <div className="imgDisplay">
          <img src={content.contentPhoto}></img>
        </div>
        <div className="detailDisplay">
          <a href="/" target="_blank" className="usernameLink">
            {content.username}
          </a>
          <img className="likeBtn" src="../public/heart.png"></img>
        </div>
      </figure>
    ); // need to hid the detailDiv, only show on hover and also make the position relative to the imgDiv
  });
  return (
    <>
      <div className="quickFilter">
        <ul className="quickFilterBar">{hashtagItems}</ul>
      </div>
      <section className="explore">
        <Masonry columnsCount={4} gutter="10px">
          {contentBlocks}
        </Masonry>
      </section>
    </>
  );
};

export default ExplorePage;
