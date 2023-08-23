const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  // const testToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIzIiwidXNlcl9pZCI6IjY0ZGVlN2Q3ZTcxMzUyN2FlZThjNzViZSIsImlhdCI6MTY5MjU5OTg0OSwiZXhwIjoxNjk1MTkxODQ5LCJqdGkiOiI4OTRiNWZiOC1mZjFlLTRhMmUtYWQ5Ny0wZTc4NWM2NmU2YzcifQ.e9HR6dHnMYBLt0haspdH1sM2EzP2KKfEkZLti2_CYyo";
  const token = req.headers["authorization"].replace("Bearer ", "");
  // const token = testToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      // this will be useful for the `like content` and `like comments`
      req.user_id = decoded.user_id;
      // may be useful for the for you page if we want to render a `Hi ${username}!` kind of stuff
      req.username = decoded.username;
      req.profilePhoto = decoded.profilePhoto;
      req.likedContent = decoded.likedContent;
      next();
    } catch (error) {
      return res.status(401).json({ status: error, msg: "unauthorised error(1)" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden error(1)" });
  }
};

module.exports = { auth };
