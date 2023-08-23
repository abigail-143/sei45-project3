require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/database/database");

connectDB();

const auth = require("./src/routers_hou/user");
const content = require("./src/router_cy/content");
const forYouPage = require("./src/routers-abi/forYouPage");
const comment = require("./src/router_cy/comment");
const search = require("./src/routers_hou/search");

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/landing", auth);
app.use("/search", search);
app.use("/beer", content);
app.use("/fyp", forYouPage);
app.use("/beer/comment", comment);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
