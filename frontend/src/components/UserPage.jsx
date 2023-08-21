import React, { useState } from "react";
import testImgs from "./testImgArray";
import styles from "./UserPage.module.css";
import ContentOverlay from "./contentOverlay/ContentModal";

const UserPage = () => {
  // this state will determine if display is showing created content or liked content. use the tabs buttons to toggle this state
  const [showCreated, setShowCreated] = useState(false);
  const [showContentOverlay, setShowContentOverlay] = useState(false);

  // this is to pull the user's created content
  const createdContentBlocks = testImgs.map((content, index) => {
    return (
      <div key={index} className={styles.contentDisplay}>
        <div className={styles.contentImg}>
          <img className={styles.imgDisplay} src={content.contentPhoto}></img>
        </div>
        <div className={styles.contentDetail}>
          <img className={styles.icon} src="../public/heart.png"></img>
          <label className={styles.numLabel}>{content.likeCount}</label>
          <img className={styles.icon} src="../public/comment.png"></img>
          <label className={styles.numLabel}>{content.comments.length}</label>
          <button className={styles.deleteBtn}>Delete</button>
        </div>
      </div>
    );
  });

  // this is to pull the user's liked content
  const likedContentBlocks = testImgs.map((content, index) => {
    return (
      <div key={index} className={styles.contentDisplay}>
        <div className={styles.contentImg}>
          <img className={styles.imgDisplay} src={content.contentPhoto}></img>
        </div>
        <div className={styles.contentImgOverlay}>
          <p>{content.username}</p>
        </div>
        <div className={styles.contentDetail}>
          <img className={styles.favIcon} src="../public/heart.png"></img>
          <label className={styles.favNumLabel}>{content.likeCount}</label>
          <div className={styles.divider}></div>
          <img className={styles.favIcon} src="../public/comment.png"></img>
          <label className={styles.favNumLabel}>
            {content.comments.length}
          </label>
        </div>
      </div>
    );
  });

  return (
    <>
      {showContentOverlay && <ContentOverlay></ContentOverlay>}
      {/* this div just pulls user's profilepic and username */}
      <div className={styles.userInfo}>
        <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"></img>
        <p>@username</p>
      </div>
      {/* this div are for the patch, edit user's info, and put, add content. */}
      <div className={styles.userBtn}>
        <button className={styles.btn}>Edit Profile</button>
        <button className={styles.btn}>Add Post</button>
      </div>
      {/* this div is to navigate between created content and liked content */}
      <div className={styles.tabs}>
        <button
          className={
            showCreated ? `${styles.tabBtn} ${styles.highlight}` : styles.tabBtn
          }
          onClick={() => {
            setShowCreated(true);
          }}
        >
          Created
        </button>
        <button
          className={
            showCreated ? styles.tabBtn : `${styles.tabBtn} ${styles.highlight}`
          }
          onClick={() => {
            setShowCreated(false);
          }}
        >
          Favourites
        </button>
      </div>
      {/* this div is to display created content */}
      <div className={styles.displayContainer}>
        <div className={styles.display}>
          {showCreated ? createdContentBlocks : likedContentBlocks}
        </div>
      </div>
    </>
  );
};

export default UserPage;
