//controllers for user registration and login
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// for backend testing purpose
const seedUsers = async (req, res) => {
  try {
    await UserModel.deleteMany();
    await UserModel.create(
      {
        username: "user1",
        hashPWD: await bcrypt.hash("password1", 12),
        profilePhoto: "string1",
      },
      {
        username: "user2",
        hashPWD: await bcrypt.hash("password2", 12),
        profilePhoto: "string2",
      },
      {
        username: "user3",
        hashPWD: await bcrypt.hash("password3", 12),
        profilePhoto: "string3",
      }
    );
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

// registeration controller
const register = async (req, res) => {
  try {
    // checking for repeated username

    const repeatedUser = await UserModel.findOne({
      username: req.body.username,
    });
    if (repeatedUser) {
      return res
        .status(400)
        .json({ status: "error", msg: "username alr taken" });
    }

    // hash passsword for storage
    const hashPWD = await bcrypt.hash(req.body.password, 12);

    // stored data
    await UserModel.create({
      username: req.body.username,
      hashPWD,
    });

    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    // confirming user exists
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", msg: "unauthorised login" });
    }

    const result = await bcrypt.compare(req.body.password, user.hashPWD);

    // verrifying user login details
    if (result) {
      const payload = {
        username: user.username,
      };

      const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "30d",
        jwtid: uuidv4(),
      });

      res.json({ access });
    } else {
      // if entered password is wrong
      console.log("result = ", result);
      return res.status(401).json({ status: "error", msg: "wrong password" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", msg: "invalid login details 'catch(error)'" });
  }
};

module.exports = { register, login, seedUsers };
