import React, { useState } from "react";
import "./auth-styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const nav = useNavigate();
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  //login payload
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErr, setLoginErr] = useState(null);

  //signup payload
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [age, setAge] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [school, setSchool] = useState("");
  const [existsMsg, setExistsMsg] = useState(null);
  const [createMsg, setCreatedMsg] = useState(null);

  const clickLoginBtn = () => {
    setLoginVisible(true);
    setSignupVisible(false);
  };

  const clickSignupBtn = () => {
    setSignupVisible(true);
    setLoginVisible(false);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const payload = {
      firstName: fName,
      lastName: lName,
      age: age,
      password: createPassword,
      email: createEmail,
      school: school,
    };
    try {
      axios
        .post("http://localhost:8080/api/auth/signup", payload)
        .then((res) => {
          console.log(res.data);
          if (res.data.signupMsg === "account already exists") {
            setExistsMsg(res.data.signupMsg);
          } else {
            setCreatedMsg(res.data.signupMsg);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const payload = {
      email: loginEmail,
      password: loginPassword,
    };
    try {
      axios
        .post("http://localhost:8080/api/auth/login", payload)
        .then((res) => {
          console.log("res", res);
          if (res.data.redirect === false) {
            setLoginErr(res.data.errMsg);
          } else {
            nav("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex-container">
        <div className="flex-item-1">
          <button onClick={clickLoginBtn}>Login</button>
          {loginVisible === true ? (
            <>
              <form className="form-flexbox" onSubmit={handleSignIn}>
                <label>Email</label>
                <input
                  type="text"
                  required
                  placeholder="joeburrow@uncfsu.edu"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter your account password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button type="submit">Sign in</button>
                {loginErr !== null ? (
                  <h3 className="login-err">*{loginErr}*</h3>
                ) : (
                  ""
                )}
              </form>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex-item-2">
          <button onClick={clickSignupBtn}>Signup</button>
          {signupVisible === true ? (
            <>
              <form className="form-grid" onSubmit={handleCreateAccount}>
                <div className="grid-item">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Joe"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </div>

                <div className="grid-item">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Burrow"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>

                <div className="grid-item">
                  <label>Age</label>
                  <input
                    type="number"
                    required
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="grid-item">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Create password"
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                  />
                </div>

                <div className="grid-item">
                  <label>Email</label>
                  <input
                    type="text"
                    required
                    placeholder="joeburrow@uncfsu.edu"
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                  />
                </div>

                <div className="grid-item">
                  <label className="grid-item">School / University</label>
                  <input
                    type="text"
                    required
                    placeholder="School University"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  />
                </div>

                <div className="grid-item">
                  <button type="submit">Create Account</button>
                </div>

                <div className="grid-item">
                  {existsMsg !== null ? (
                    <h4 className="exists-msg">*{existsMsg}*</h4>
                  ) : (
                    ""
                  )}
                  {createMsg !== null ? (
                    <h3 className="created-msg">*{createMsg}*</h3>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
