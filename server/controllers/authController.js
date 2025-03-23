const Manager = require("../models/manager");

const signup = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, age, password, email, school } = req.body;

  if (!firstName || !lastName || !age || !password || !email || !school) {
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

    const newManager = Manager({
      firstName: firstName,
      lastName: lastName,
      age: age,
      password: password,
      email: email,
      school: school,
    });

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
  Manager.findOne({
    email: email,
  }).then(async (foundUser) => {
    if (foundUser) {
      if (foundUser.password === password) {
        return res.status(200).json({
          redirect: true,
          managerEmail: foundUser.email,
        });
      } else {
        return res.status(200).json({
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

module.exports = {
  signup,
  login,
};
