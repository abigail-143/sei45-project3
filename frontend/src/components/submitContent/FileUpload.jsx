import React, { useRef, useState } from "react";
import useUpload from "../custom_hooks/upload";
import "./SubmitContent.css";

const FileUpload = (props) => {
  const [files, setFiles] = useState();
  const [uploaded, setUploaded] = useState(true);
  const inputRef = useRef(null);
  const uploadImg = useUpload();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    const res = await uploadImg(selectedFile);
    console.log(e);

    if (res.ok) {
      console.log("uploaded");
      props.setImage(res.data.data.url);
      console.log(res.data.data.url);
      setUploaded(true);
      setFiles(selectedFile);
    }
  };

  if (files)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          border: "3px dashed rgb(117, 112, 112)",
          padding: "20px",
        }}
      >
        <img src={props.image} />
        <p style={{ textAlign: "center" }}>{files.name}</p>
        <div>
          <button onClick={() => setFiles(null)}>Cancel</button>
        </div>
      </div>
    );

  return (
    <>
      {!files && (
        <div className="form" onDragOver={handleDragOver} onDrop={handleDrop}>
          <h2>Drag & drop your image here</h2>
          <h2 style={{ color: "black" }}>OR</h2>
          <input
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files && e.target.files[0];
              if (selectedFile) {
                setFiles(selectedFile);
              }
            }}
            hidden
            ref={inputRef}
          />
          <button
            style={{
              padding: "12px",
              fontSize: "medium",
              backgroundColor: "#a4907c",
              border: "none",
              borderRadius: "10px",
              color: "white",
            }}
            onClick={() => inputRef.current?.click()}
          >
            Choose from folder
          </button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
