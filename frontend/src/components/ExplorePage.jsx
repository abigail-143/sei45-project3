import React, { useEffect, useState, useContext, useRef } from "react";
import Masonry from "@mui/lab/Masonry";
import styles from "./ExplorePage.module.css";
import useFetch from "./custom_hooks/useFetch";
import AuthContext from "./context/auth"; // add this
import ContentOverlay from "./contentOverlay/ContentModal";

const ExplorePage = (props) => {
  const [createrPhoto, setCreaterPhoto] = useState("");
  const [showDetails, setShowDetails] = useState([]);
  const [showContentOverlay, setShowContentOverlay] = useState(false);

  const fetchData = useFetch();
  const auth = useContext(AuthContext); // add this
  const [search, setSearch] = useState("");
  const searchResultRef = useRef("");

  const handleSearch = async () => {
    const res = await fetchData("/search/search", "POST", {
      searchString: search,
    });
    console.log("handleSearch called");
    console.log(res);
    if (res.ok) {
      searchResultRef.current = res.data;
      props.setContentData(searchResultRef.current);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const tags = "#beer #scotchale #pilsner #draft #carlsberg #stout #paleale";
  const hashtags = tags.split(" ");
  const hashtagItems = hashtags.map((hashtag, index) => {
    return (
      <li key={index} className={styles.quickFilterItem}>
        <button
          onClick={() => {
            setSearch(hashtag);
          }}
        >
          {hashtag}
        </button>
      </li>
    );
  });

  const getData = async () => {
    const res = await fetchData(
      "/fyp/all-contents",
      undefined,
      undefined,
      auth.accessToken // add these
    );
    if (res.ok) {
      props.setContentData(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data", res.data);
    }
  };

  const getIndividualContent = async (id) => {
    const res = await fetchData(
      "/beer/singleContent/" + id,
      "POST",
      undefined,
      auth.accessToken
    );

    if (res.ok) {
      setCreaterPhoto(res.data.user.profilePhoto);
      setShowDetails(res.data);
      setShowContentOverlay(true);
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data:", res.data);
    }
  };

  const handleLikeClick = async (id) => {
    const res = await fetchData(
      "/beer/addFavourite/" + id,
      "PATCH",
      undefined,
      auth.accessToken
    );

    if (res.ok) {
      console.log("content liked");
    } else {
      alert(JSON.stringify(res.data));
      console.log("res.data: ", res.data);
    }
    setShowContentOverlay(false);
  };

  // fetch collection, and return contentBlock
  // update with the state that the data is fetched and stored in
  const contentBlocks = props.contentData.map((content, index) => {
    return (
      // need to add on click to showoverlay
      <div
        key={index}
        id={content._id}
        className={styles.contentBlock}
        onClick={() => {
          getIndividualContent(content._id);
        }}
      >
        <div className={styles.content}>
          <img src={content.contentPhoto} className={styles.contentImg}></img>
        </div>
        <div className={styles.overlayHover}>
          <a className={styles.username}>@{content.username}</a>
          <img
            src="/heart.png"
            className={styles.heartImg}
            onClick={(e) => {
              e.stopPropagation(); // this stops the contentOverlay from showing (stops bubbling)
              handleLikeClick(content._id);
            }}
          ></img>
        </div>
      </div>
    ); // need to hid the detailDiv, only show on hover and also make the position relative to the imgDiv
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (search.length != 0) {
      handleSearch();
    }
    searchResultRef.current = "";
  }, [search]);

  return (
    <>
      {showContentOverlay && (
        <ContentOverlay
          setShowContentOverlay={setShowContentOverlay}
          showDetails={showDetails}
          createrPhoto={createrPhoto}
          user={props.user}
        ></ContentOverlay>
      )}
      <div className={styles.quickFilter}>
        <ul className={styles.quickFilterBar}>{hashtagItems}</ul>
      </div>
      <section className={styles.explore}>
        <Masonry columns={4} spacing={2} sx={{ margin: 0 }}>
          {contentBlocks}
        </Masonry>
      </section>
    </>
  );
};

export default ExplorePage;
