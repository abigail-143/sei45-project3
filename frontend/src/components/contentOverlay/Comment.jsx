import React from "react";
import styles from "./contentOverlayModal.module.css";
import "./content.css";

const Comment = (props) => {
  const deleteComment = async () => {
    const res = await fetchData(
      "/beer/deleteComment/" + id,
      "DELETE",
      undefined
    );

    if (res.ok) {
      props.getComment();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">{props.comment}</div>
        <img
          src="../picture/cancel-circular-button.svg"
          className={styles.cancel}
          onClick={deleteComment}
        />
      </div>
    </div>
  );
};

export default Comment;
