import React, { useRef, useState, useContext } from "react";
import styles from "./submitContent.module.css";
import "./SubmitContent.css";
import useFetch from "../custom_hooks/useFetch.jsx";
import AuthContext from "../context/auth"; // add this

const SubmitContent = (props) => {
  const [image, setImage] = useState("");
  const drinkNameRef = useRef();
  const shopNameRef = useRef();
  const reviewRef = useRef();
  const contentTagRef = useRef();
  const [uploadPhoto, setUploadPhoto] = useState(true);
  const [displayPhoto, setDisplayPhoto] = useState(false);
  const fetchData = useFetch();
  const auth = useContext(AuthContext); // add this

  const publishNewPost = async () => {
    const res = await fetchData(
      "/beer/putNewContent",
      "PUT",
      {
        contentPhoto: image,
        drinkName: drinkNameRef.current.value,
        shopName: shopNameRef.current.value,
        contentReview: reviewRef.current.value,
        contentTag: contentTagRef.current.value,
      },
      auth.accessToken // add these
    );
    if (res.ok) {
      props.setUser(res.data);
      props.setSubmitContent(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  // function to upload photo
  // const createPost = async (newImage) => {
  //   const res = await fetch("http://localhost:5002/upload", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newImage),
  //   });
  // };

  //function to convert photo file into base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // convert file into base64 and standby for upload
  const handleFileUpload = async (e) => {
    setUploadPhoto(false);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setDisplayPhoto(true);
    setImage(base64);
  };

  // upload to data based and keep at state
  const handleSubmit = (e) => {
    e.preventDefault();
    publishNewPost(image);
    console.log(image);
  };

  return (
    <div className="backdrop1">
      <div className="backBtn1" onClick={() => props.setSubmitContent(false)}>
        <img src="/arrow.png" />
        <p>For You</p>
      </div>
      <div className="contentModal1">
        <div className="column1">
          <label className="form" htmlFor="file-upload">
            {uploadPhoto && (
              <img
                className="uploadPhoto"
                src="../picture/upload-image-icon (1).png"
              />
            )}

            <input
              type="file"
              label="Image"
              id="file-upload"
              className="inputPhoto"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            ></input>
            {displayPhoto && <img className="displayPhoto" src={image} />}
          </label>
        </div>
        <div className="column2">
          <div className="inputDetails">
            <div className="font">Drink</div>
            <input
              type="text"
              ref={drinkNameRef}
              className="inputBox"
              placeholder="Name of the drink"
            ></input>
            <div className="font">Bar</div>
            <input
              type="text"
              ref={shopNameRef}
              className="inputBox"
              placeholder="Name of the bar"
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
            ></textarea>
            <br />
            <div className="font">Tags</div>
            <input
              type="text"
              ref={contentTagRef}
              className="inputBox"
              placeholder="Start with #hashing"
            ></input>
            <button type="button" className="button" onClick={publishNewPost}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitContent;
