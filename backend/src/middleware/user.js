const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      // this will be useful for the `like content` and `like comments`
      req.user_id = decoded.user_id;
      // may be useful for the for you page if we want to render a `Hi ${username}!` kind of stuff
      req.username = decoded.username;
      next();
    } catch (error) {
      return res.status(401).json({ status: error, msg: "unauthorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden" });
  }
};

module.exports = { auth };
