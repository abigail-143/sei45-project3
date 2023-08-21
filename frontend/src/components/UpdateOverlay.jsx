import React from "react";

const UpdateOverlay = (props) => {
  return (
    <div className="backdrop">
      <div className="updateModal">
        <img
          className="close"
          src="/close.png"
          onClick={() => {
            props.setUpdateUser(false);
          }}
        ></img>
        <img className="updateProfilePic" src={props.userInfo.profilePic}></img>
        <input
          className="updateUsername"
          placeholder={props.userInfo.username}
        ></input>
        <button className="updateBtn">update</button>
      </div>
    </div>
  );
};

export default UpdateOverlay;
