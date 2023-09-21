import React, { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../context/auth";
import useFetch from "../custom_hooks/useFetch";
import styles from "./ContentModal.module.css";

const ContentModal = (props) => {
  const [comment, setComment] = useState([]);
  const [remove, setRemove] = useState(true);
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

  const addComment = async (id) => {
    const res = await fetchData(
      "/beer/comment/newComment/" + id,
      "PUT",
      {
        comment: commentRef.current.value,
      },
      auth.accessToken
    );
    if (res.ok) {
      getComments();
      commentRef.current.value = "";
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const delComment = async (id) => {
    const res = await fetchData(
      "/beer/comment/deleteComment/" + id,
      "DELETE",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      setRemove(!remove);
      console.log(remove);
      console.log("comment deleted");
      getComments();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  //================================================
  const allContentComments = comment.map((comment, index) => {
    const enabledButton =
      comment.userId === props.user.user_id ||
      props.showDetails.content.userId === props.user.user_id;
    return (
      <div className={styles.oneComment}>
        <div key={index} className={styles.oneCommentWords}>
          <span className={styles.commentUser}>@{comment.username}</span>{" "}
          {comment.comment}
        </div>
        <button
          className={styles.delBtn}
          disabled={!enabledButton}
          onClick={() => {
            delComment(comment._id);
          }}
        >
          delete
        </button>
      </div>
    );
  });

  useEffect(() => {
    getComments();
  }, [remove]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.contentModal}>
        <img
          className={styles.closeBtn}
          src="/close.png"
          onClick={() => {
            props.setShowContentOverlay(false);
          }}
        ></img>
        <img
          className={styles.contentPhoto}
          src={data.content.contentPhoto}
        ></img>
        <div className={styles.contentDetails}>
          <div className={styles.userInfo}>
            <img
              className={styles.userProfilePhoto}
              src={props.createrPhoto} // change to content
            ></img>
            <p className={styles.userName}>@{data.content.username}</p>
          </div>
          <div className={styles.contentInfo}>
            <p className={styles.drinkName}>{data.content.drinkName}</p>
            <p className={styles.shopName}>{data.content.shopName}</p>
            <p className={styles.review}>{data.content.contentReview}</p>
            <small className={styles.tags}>{data.content.contentTag}</small>
          </div>
          <div className={styles.commentsContainer}>
            <div className={styles.commentsCount}>
              {comment.length} Comments
            </div>
            <div className={styles.comments}>{allContentComments}</div>
          </div>
          <div className={styles.addComments}>
            <img className={styles.userCommentPic} src={props.user.photo}></img>
            <input
              className={styles.newComment}
              placeholder="add a comment"
              ref={commentRef}
              type="text"
            ></input>

            <img
              className={styles.heartIcon}
              src="/login.png"
              onClick={() => {
                // console.log(props.showDetails.content._id);
                addComment(props.showDetails.content._id);
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
