import React, { useRef, useState } from "react";
import styles from "./submitContent.module.css";
import "./SubmitContent.css";

const SubmitContent = () => {
  const [post, setPost] = useState();
  const drinkNameRef = useRef();
  const shopNameRef = useRef();
  const reviewRef = useRef();
  const contentTagRef = useRef();
  //   const fetchData = useFetch();

  //should get user detail from the start and useContext send to here
  // const getUser = async () => {
  //   const decoded = userCtx.accessToken;
  //   const res = await fetchData("/beer/getuser", "POST", {
  //     username: decoded.username,
  //   });
  //   if (res.ok) {
  //     setUser(res.data);
  //   } else {
  //     alert(JSON.stringify(res.data));
  //     console.log(res.data);
  //   }
  // };

  const publishNewPost = async () => {
    const res = await fetchData("/putNewContent/" + user.userId, "PUT", {
      drinkName: drinkNameRef.current.value,
      shopName: shopNameRef.current.value,
      contentReview: reviewRef.current.value,
      contentTag: contentTagRef.current.value,
    });
    if (res.ok) {
      setUser(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const uploadImage = async () => {
    const res = await fetchData;
  };
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div className="row">
            <div className="col-md-5">
              <div className={styles.photo}>displayPhoto</div>
            </div>
            <div className="col-md-7">
              <div className="container">
                <br />
                <br />
                <br />
                <div className="font">Drink</div>
                <input
                  type="text"
                  ref={drinkNameRef}
                  className="inputBox"
                  placeholder="Name of the drink"
                  onChange
                ></input>
                <br />
                <div className="font">Bar</div>
                <input
                  type="text"
                  ref={shopNameRef}
                  className="inputBox"
                  placeholder="Name of the bar"
                  onChange
                ></input>
                <br />
                <div className="font">Review</div>
                <textarea
                  type="text"
                  ref={reviewRef}
                  className="textBox"
                  name="Review"
                  rows="5"
                  placeholder="Leave a review"
                  onChange
                ></textarea>
                <br />
                <div className="font">Tgs</div>
                <input
                  type="text"
                  ref={contentTagRef}
                  className="inputBox"
                  placeholder="Start with #hashing"
                  onChange
                ></input>
                <br />
                <br />
                <button type="button" className="button" onClick={publishNewPost}>
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitContent;
