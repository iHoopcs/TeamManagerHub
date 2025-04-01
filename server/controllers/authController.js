const Manager = require("../models/manager");
const bcrypt = require("bcrypt");

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
      return res.status(200).json({ signupMsg: "account already exists" });
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
    // newManager.save();
    res.status(201).json({
      signupMsg: "account created",
      obj: newManager,
    });
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

const login = async (req, res, next) => {
};

module.exports = {
  signup,
  login,
};
