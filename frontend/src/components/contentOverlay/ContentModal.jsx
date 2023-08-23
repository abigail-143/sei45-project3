import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "./contentOverlayModal.module.css";
import Comment from "./Comment";
import "./content.css";
import testComments from "../testingComments";
import AuthContext from "../context/auth";
import useFetch from "../custom_hooks/useFetch";

const ContentModal = (props) => {
  const [comment, setComment] = useState([]);
  const fetchData = useFetch();
  const commentRef = useRef();
  const auth = useContext(AuthContext);
  const data = props.showDetails;

  const getComments = async () => {
    const res = await fetchData(
      "/beer/getParticularComment/" + data.content._id,
      "POST",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      setComment(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addComment = async (e) => {
    if (e.key === "Enter") {
      const res = await fetchData("/beer/comment/newComment/", "PUT", {
        comment: commentRef.current.vlue,
        contentId: props.id,
      });
      if (res.ok) {
        getComment();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    }
  };

  const allContentComments = comment.map((comment, index) => {
    return (
      <div key={index}>
        <span className="commentUser">@{comment.username}</span>{" "}
        {comment.comment}
      </div>
    );
  });

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="backdrop">
      <div
        className="backBtn"
        onClick={() => {
          props.setShowContentOverlay(false);
        }}
      >
        <img src="/left-chevron.png"></img>
        <p>For You</p>
      </div>
      <div className="contentModal">
        <img className="contentPhoto" src={data.content.contentPhoto}></img>
        <div className="contentDetails">
          <div className="userInfo">
            <img
              className="userProfilePhoto"
              src={data.user.profilePhoto}
            ></img>
            <p className="userName">@{data.user.username}</p>
          </div>
          <div className="contentInfo">
            <p className="drinkName">{data.content.drinkName}</p>
            <p className="shopName">{data.content.shopName}</p>
            <p className="review">{data.content.contentReview}</p>
            <small className="tags">{data.content.contentTag}</small>
          </div>
          <div className="commentsContainer">
            <div className="commentsCount">{comment.length} Comments</div>
            <div className="comments">{allContentComments}</div>
          </div>
          <div className="addComments">
            <img className="userCommentPic" src={data.user.profilePhoto}></img>
            <input className="newComment" placeholder="add a comment"></input>
            <img className="heartIcon" src="/heart.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
