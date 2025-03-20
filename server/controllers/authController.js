const Manager = require("../models/manager");

const signup = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, age, password, email, accountName } = req.body;

  if (!firstName || !lastName || !age || !password || !email || !accountName) {
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
      return res.status(409).json({ msg: "already exists" });
    }

    const newManager = Manager({
      firstName: firstName,
      lastName: lastName,
      age: age,
      password: password,
      email: email,
      accountName: accountName,
    });

    //save to db
    newManager.save();
    res.status(201).json({
      msg: "Welcome " + firstName + " " + lastName + "!",
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
          msg:
            "Welcome " + foundUser.firstName + " " + foundUser.lastName + "!",
          managerEmail: foundUser.email,
        });
      } else {
        return res.status(400).json({
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
