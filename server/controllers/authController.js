const Manager = require("../models/manager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, password, email, school } = req.body;

  if (!firstName || !lastName || !password || !email || !school) {
    res.status(400).json({
      errMsg: "An error occurred! - Missing payload data",
    });
  }

  //check for existing Manager
  try {
    const existManager = await Manager.findOne({
      email: email,
    });

    if (existManager) {
      return res.status(400).json({ signupMsg: "account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newManager = Manager({
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      email: email,
      school: school,
    });
    console.log(newManager);
    //save to db
    newManager.save();
    res.status(201).json({
      signupMsg: "account created",
      obj: newManager,
    });
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ errMsg: "missing payload data" });
  await Manager.findOne({
    email: email,
  }).then(async (foundManager) => {
    if (foundManager) {
      const isMatch = await bcrypt.compare(password, foundManager.password);
      if (isMatch) {
        // generate JWT
        const payload = {
          id: foundManager.id,
          email: foundManager.email,
        };
        const token = jwt.sign(payload, process.env.key, { expiresIn: "1hr" });
        return res.status(200).json({ token: token });
      } else {
        return res.status(400).json({
          redirect: false,
          errMsg: "incorrect password",
        });
      }
    } else {
      return res.status(400).json({
        errMsg: "Could not find account with that email",
      });
    }
  });
};

const verifyUser = async (req, res) => {
  // fetch jwt token
  //verify token
  //return user data info
  const authHeader = req.headers.authorization;
  const splitData = authHeader.split(" ");
  const token = splitData[1];
  console.log(token);
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.key, async (err, decoded) => {
    if (err) return res.sendStatus(403);
    res.sendStatus(200);
  });
};

module.exports = {
  signup,
  login,
  verifyUser,
};
