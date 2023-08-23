import React, { useContext, useEffect, useState } from "react";
import testImgs from "./testImgArray";
import styles from "./UserPage.module.css";
import ContentOverlay from "./contentOverlay/ContentModal";
import SubmitContent from "./submitContent/SubmitContent";
import UpdateOverlay from "./UpdateOverlay";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth";

const UserPage = (props) => {
  const [showDetails, setShowDetails] = useState([]);
  const [showContentOverlay, setShowContentOverlay] = useState(false);
  const [submitContent, setSubmitContent] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [createdContent, setCreatedContent] = useState([]);
  const [likedContent, setLikedContent] = useState([]);
  const fetchData = useFetch();
  const auth = useContext(AuthContext);

  const getCreatedContent = async () => {
    const res = await fetchData(
      "/beer/getCreatedContent/" + props.user.user_id,
      undefined,
      undefined,
      auth.accessToken
    );

    if (res.ok) {
      setCreatedContent(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data: ", res.data);
    }
  };

  const getLikedContent = async () => {
    const res = await fetchData(
      "/beer/allFavourite/" + props.user.user_id,
      undefined,
      undefined,
      auth.accessToken
    );

    if (res.ok) {
      setLikedContent(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data: ", res.data);
    }
  };

  // const deleteContent = async (id) => {
  //   console.log("del button activate ");
  //   const res = await fetchData(
  //     "/beer/delContent/" + id,
  //     "DELETE",
  //     undefined,
  //     auth.accessToken
  //   );
  //   if (res.ok) {
  //     console.log("delete done2");
  //     getCreatedContent();
  //   } else {
  //     alert(JSON.stringify(res.data));
  //     console.log("res.data: ", res.data);
  //   }
  // };

  // const getIndividualContent = async (id) => {
  //   const res = await fetchData(
  //     "/beer/singleContent/" + id,
  //     "POST",
  //     undefined,
  //     auth.accessToken
  //   );
  //   }

  const deleteContent = async (id) => {
    console.log("del button activate ");
    const res = await fetchData(
      "/beer/delContent/" + id,
      "DELETE",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      console.log("delete done2");
      getCreatedContent();
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data: ", res.data);
    }

    const getIndividualContent = async (id) => {
      const res = await fetchData(
        "/beer/singleContent/" + id,
        "POST",
        undefined,
        auth.accessToken
      );

      if (res.ok) {
        setShowDetails(res.data);
        setShowContentOverlay(true);
      } else {
        alert(JSON.stringify(res.data));
        console.log("res.data:", res.data);
      }
    };

    useEffect(() => {
      if (props.showCreated) {
        getCreatedContent();
      } else {
        getLikedContent();
      }
    }, [props.showCreated]);

    // this is to pull the user's created content
    const createdContentBlocks = createdContent.map((content, index) => {
      return (
        <div key={index} className={styles.contentDisplay}>
          <div
            className={styles.contentImg}
            onClick={() => {
              getIndividualContent(content._id);
            }}
          >
            <img className={styles.imgDisplay} src={content.contentPhoto}></img>
          </div>
          <div className={styles.contentDetail}>
            <img
              className={styles.icon}
              src="/like.png"
              onClick={() => {
                getIndividualContent(content._id);
              }}
            ></img>
            <label className={styles.numLabel}>
              {content.likedUsersId.length}
            </label>
            <img
              className={styles.icon}
              src="/chat.png"
              onClick={() => {
                getIndividualContent(content._id);
              }}
            ></img>
            <label className={styles.numLabel}>{content.comments.length}</label>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                deleteContent(content._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });

    // this is to pull the user's liked content
    const likedContentBlocks = likedContent.map((content, index) => {
      return (
        <div
          key={index}
          className={styles.contentDisplay}
          onClick={() => {
            getIndividualContent(content._id);
          }}
        >
          <div className={styles.contentImg}>
            <img className={styles.imgDisplay} src={content.contentPhoto}></img>
          </div>
          <div className={styles.contentImgOverlay}>
            <p>{content.username}</p>
          </div>
          <div className={styles.contentDetail}>
            <img className={styles.icon} src="/like.png"></img>
            <label className={styles.numLabel}>
              {content.likedUsersId.length}
            </label>
            <div className={styles.divider}></div>
            <img className={styles.icon} src="/chat.png"></img>
            <label className={styles.numLabel}>{content.comments.length}</label>
          </div>
        </div>
      );
    });

    return (
      <>
        {showContentOverlay && (
          <ContentOverlay
            setShowContentOverlay={setShowContentOverlay}
            showDetails={showDetails}
          ></ContentOverlay>
        )}
        {submitContent && (
          <SubmitContent
            user={props.user}
            setUser={props.setUser}
            setSubmitContent={setSubmitContent}
          ></SubmitContent>
        )}
        {updateUser && (
          <UpdateOverlay
            setUpdateUser={setUpdateUser}
            user={props.user}
            setUser={props.setUser}
          ></UpdateOverlay>
        )}
        {/* this div just pulls user's profilepic and username */}
        <div className={styles.userInfo}>
          <img src={props.user.photo}></img>
          <p>{props.user.username}</p>
        </div>
        {/* this div are for the patch, edit user's info, and put, add content. */}
        <div className={styles.userBtn}>
          <button
            className={styles.btn}
            onClick={() => {
              setUpdateUser(true);
            }}
          >
            Edit Profile
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setSubmitContent(true);
            }}
          >
            Add Post
          </button>
        </div>
        {/* this div is to navigate between created content and liked content */}
        <div className={styles.tabs}>
          <button
            className={
              props.showCreated
                ? `${styles.tabBtn} ${styles.highlight}`
                : styles.tabBtn
            }
            onClick={() => {
              props.setShowCreated(true);
            }}
          >
            Created
          </button>
          <button
            className={
              props.showCreated
                ? styles.tabBtn
                : `${styles.tabBtn} ${styles.highlight}`
            }
            onClick={() => {
              props.setShowCreated(false);
              console.log("hi");
            }}
          >
            Favourites
          </button>
        </div>
        {/* this div is to display created content */}
        <div className={styles.displayContainer}>
          <div className={styles.display}>
            {props.showCreated ? createdContentBlocks : likedContentBlocks}
          </div>
        </div>
      </>
    );
  };
};

export default UserPage;
