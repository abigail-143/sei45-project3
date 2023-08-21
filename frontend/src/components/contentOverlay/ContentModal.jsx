import React, { useState, useRef } from "react";
import styles from "./contentOverlayModal.module.css";
import Comment from "./Comment";
import "./content.css";
// import useFetch from "./"

const ContentModal = (props) => {
  // const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  //   const fetchData = useFetch();
  const commentRef = useRef();

  // const content = {
  //   __id: "64df9822c83eb09196523536",
  //   contentPhoto: "photo",
  //   drinkName: "mojito",
  //   shopName: "timbre",
  //   contentReview:
  //     "Check their website for Live band performances. They have different groups and theme(music genre/style) and locations. They have dressing code, so ensure not to wear slippers nor shorts. Love their pizzas🤤 Environment is good. I love the night view while having dinner at peace and some entertainment from their mini live bands. ",
  //   contentTag: "#timbre",
  //   comments: Array(1),
  //   userId: "64df980bc83eb09196523532",
  // };

  // const user = {
  //   _id: "64df980bc83eb09196523532",
  //   username: "yChun",
  //   hashPWD: "123456",
  //   profilePhoto: "userPhoto",
  // };

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
    const res = await fetchData("/beer/getParticularComment/" + id);
    if (res.ok) {
      setComment(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addComment = async (e, id) => {
    if (e.key === "Enter") {
      const res = await fetchData("/beer/comment/newComment/" + id, "PUT", {
        comment: commentRef.current.vlue,
      });
      if (res.ok) {
        getComment();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    }
  };

  return (
    <>
      <div className={styles.backdrop}>
        <img src="../picture/Arrow 1.jpg" className={styles.arrow} onClick={()=>{props.setShowContentOverlay(false)}}/>
        <div className={styles.modal}>
          <div className="row">
            <div className="col-md-5">
              {/* get the correct data for content photo */}
              <div className={styles.contentPhoto}>{props.contentPhoto}</div>
            </div>
            <div className="col-md-7">
              <div className="container">
                <div className="row">
                  <div className="col-md-2">
                    {/* get the correct data for profile photo */}
                    <p id="profilePhoto">{props.profilePhoto}</p>
                  </div>
                  <div className={`col-md-8 ${styles.username}`}>
                    {props.username}
                  </div>
                </div>
              </div>
              <div className="row">
                <p className="drinkName">{props.drinkName}</p>
                <p className="shopName">{props.shopName}</p>
                <p id="contentReview" className="col-md-11">
                  {props.contentReview}
                </p>
                <p className="contentTag">{props.contentTag}</p>
              </div>
              <div className="row">
                <p className="comment">{numComment} Comments</p>
                {comment.map((item) => {
                  return (
                    <Comment
                      key={item._id}
                      id={item._id}
                      comment={item.comment}
                      getComment={getComment}
                    ></Comment>
                  );
                })}
              </div>
              <br />
              <div className="row">
                <div className="col-md-4" id="photo">
                  {props.profilePhoto}
                </div>
                <input
                  type="text"
                  className="col-md-7"
                  id="addComment"
                  ref={commentRef}
                  placeholder="comment"
                  onKeyDown={addComment}
                ></input>
                <img src="../picture/Favorite.jpg" className={styles.heart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentModal;
