import React, { useState, useRef } from "react";
import styles from "./contentOverlayModal.module.css";
import Comment from "./Comment";
import "./content.css";
import testComments from "../testingComments";
// import useFetch from "./"

const ContentModal = (props) => {
  // const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  //   const fetchData = useFetch();
  const commentRef = useRef();

  // const comment = [
  //   {
  //     _id: "64df9b5e287c74940aaac930",
  //     comment: "This is first comment",
  //     userId: "64df980bc83eb09196523532",
  //     contentId: "64df9822c83eb09196523536",
  //   },
  // ];
  const numComment = comment.length;

  //should get user detail from the start and useContext send to here
  // const getUser = async () => {
  //   // const decoded = userCtx.accessToken;
  //   const res = await fetchData("/getUser", "POST");
  //   if (res.ok) {
  //     setUser(res.data);
  //   } else {
  //     alert(JSON.stringify(res.data));
  //     console.log(res.data);
  //   }
  // };

  const singleContent = async () => {
    const res = await fetchData("/beer/singleContent", "POST", {
      userId: req.body.id,
    });
    if (res.ok) {
      setContent(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getComment = async (id) => {
    const res = await fetchData("/beer/comment/getAllComment" + id);
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

  const allContentComments = testComments.map((comment, index) => {
    return (
      <div key={index}>
        <span className="commentUser">@{comment.username}</span>{" "}
        {comment.comment}
      </div>
    );
  });

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
        <img
          className="contentPhoto"
          src="https://images.unsplash.com/photo-1595545524289-0360e9152081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVlciUyMGNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        ></img>
        <div className="contentDetails">
          <div className="userInfo">
            <img
              className="userProfilePhoto"
              src="https://images.unsplash.com/photo-1595545524289-0360e9152081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVlciUyMGNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            ></img>
            <p className="userName">@username</p>
          </div>
          <div className="contentInfo">
            <p className="drinkName">drink</p>
            <p className="shopName">shop</p>
            <p className="review">
              this is a review this is a review this is a review this is a
              review this is a review this is a review this is a review this is
              a review this is a review this is a review
            </p>
            <small className="tags">#tag #tag #tag</small>
          </div>
          <div className="commentsContainer">
            <div className="commentsCount">{testComments.length} Comments</div>
            <div className="comments">
            {allContentComments}
            </div>
          </div>
          <div className="addComments">
            <img
              className="userCommentPic"
              src="https://images.unsplash.com/photo-1595545524289-0360e9152081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVlciUyMGNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            ></img>
            <input className="newComment" placeholder="add a comment"></input>
            <img className="heartIcon" src="/heart.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
