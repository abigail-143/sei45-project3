import React, { useState } from "react";
import testImgs from "./testImgArray";

const UserPage = () => {
  // this state will determine if display is showing created content or liked content. use the tabs buttons to toggle this state
  const [showCreated, setShowCreated] = useState(false);

  // this is to pull the user's created content
  const createdContentBlocks = testImgs.map((content, index) => {
    return (
      <div key={index} className="contentDisplay">
        <div className="contentImg">
          <img className="imgDisplay" src={content.contentPhoto}></img>
        </div>
        <div className="contentDetail">
          <img className="icon" src="../public/heart.png"></img>
          <label className="numLabel">{content.likeCount}</label>
          <img className="icon" src="../public/comment.png"></img>
          <label className="numLabel">{content.comments.length}</label>
          <button className="deleteBtn">Delete</button>
        </div>
      </div>
    );
  });

  // this is to pull the user's liked content
  const likedContentBlocks = testImgs.map((content, index) => {
    return (
      <div key={index} className="contentDisplay">
        <div className="contentImg">
          <img className="imgDisplay" src={content.contentPhoto}></img>
        </div>
        <div className="contentImgOverlay">
          <p>{content.username}</p>
        </div>
        <div className="contentDetail">
          <img className="favIcon" src="../public/heart.png"></img>
          <label className="favNumLabel">{content.likeCount}</label>
          <div className="divider"></div>
          <img className="favIcon" src="../public/comment.png"></img>
          <label className="favNumLabel">{content.comments.length}</label>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* this div just pulls user's profilepic and username */}
      <div className="userInfo">
        <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"></img>
        <p>@username</p>
      </div>
      {/* this div are for the patch, edit user's info, and put, add content. */}
      <div className="userBtn">
        <button className="btn">Edit Profile</button>
        <button className="btn">Add Post</button>
      </div>
      {/* this div is to navigate between created content and liked content */}
      <div className="tabs">
        <button
          className={showCreated ? "tabBtn highlight" : "tabBtn"}
          onClick={() => {
            setShowCreated(true);
          }}
        >
          Created
        </button>
        <button
          className={showCreated ? "tabBtn" : "tabBtn highlight"}
          onClick={() => {
            setShowCreated(false);
          }}
        >
          Favourites
        </button>
      </div>
      {/* this div is to display created content */}
      <div className="displayContainer">
        <div className="display">
          {showCreated ? createdContentBlocks : likedContentBlocks}
        </div>
      </div>
    </>
  );
};

export default UserPage;
