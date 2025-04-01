import React, { useState } from "react";
import "./managerAuth-styles.css";
import axios from "axios";
export const ManagerAuthComponent = () => {
  //login vs signup display control
  const [returningManager, setReturningManager] = useState(false);
  const [newManager, setNewManager] = useState(false);

  //register payload
  const [managerFirstName, setManagerFirstName] = useState("");
  const [managerLastName, setManagerLastName] = useState("");
  const [password, setPassword] = useState("");
  const [managerRegisterEmail, setManagerRegisterEmail] = useState("");
  const [school, setSchool] = useState("");
  const handleRegisterManager = async (e) => {
    e.preventDefault();
    //construct register payload
    const payload = {
      firstName: managerFirstName,
      lastName: managerLastName,
      password: password,
      email: managerRegisterEmail,
      school: school,
    };
    //send to server
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        payload
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    //redirect to login
  };

  //login payload
  const [managerLoginEmail, setManagerLoginEmail] = useState("");
  const [managerLoginPassword, setManagerLoginPassword] = useState("");
  const handleLoginManager = async (e) => {
    e.preventDefault();
    //construct login payload
    const payload = {
      email: managerLoginEmail,
      password: managerLoginPassword,
    };
    //send to server
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        payload
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    //redirect to dashboard
  };

  return (
    <div className="manager-flexbox">
      {/* auth buttons side by side */}
      <div className="manager-flexbox-child-1">
        <div className="child-flexbox-item-1">
          <button
            onClick={() => {
              setReturningManager(true);
              setNewManager(false);
            }}
            disabled={returningManager}
          >
            Manager Login
          </button>
        </div>

        <div className="child-flexbox-item-2">
          <button
            onClick={() => {
              setNewManager(true);
              setReturningManager(false);
            }}
            disabled={newManager}
          >
            Manager Register
          </button>
        </div>
      </div>
      {/* display corresponding form underneath */}
      <div className="manager-flexbox-child-2">
        {returningManager ? (
          // Sign In form
          <form className="form-flexbox" onSubmit={handleLoginManager}>
            <div className="flexbox-item">
              <label>Email</label>
              <input
                type="email"
                required
                placeholder="Enter your account school email"
                value={managerLoginEmail}
                onChange={(e) => setManagerLoginEmail(e.target.value)}
              />
            </div>

            <div className="flexbox-item">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="Enter your account password"
                value={managerLoginPassword}
                onChange={(e) => setManagerLoginPassword(e.target.value)}
              />
            </div>

            <div className="flexbox-item">
              <button type="submit">Sign in</button>
            </div>
          </form>
        ) : newManager ? (
          <form className="form-flexbox" onSubmit={handleRegisterManager}>
            <div className="flexbox-item">
              <label>First Name:</label>
              <input
                type="text"
                required
                placeholder="Enter your first name"
                value={managerFirstName}
                onChange={(e) => setManagerFirstName(e.target.value)}
              />
            </div>

            <div className="flexbox-item">
              <label>Last Name:</label>
              <input
                type="text"
                required
                placeholder="Enter your last name"
                value={managerLastName}
                onChange={(e) => setManagerLastName(e.target.value)}
              />
            </div>

            <div className="flexbox-item">
              <label>Password:</label>
              <input
                type="password"
                required
                placeholder="Create your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flexbox-item">
              <label>School Email:</label>
              <input
                type="text"
                required
                placeholder="Enter your school email"
                value={managerRegisterEmail}
                onChange={(e) => setManagerRegisterEmail(e.target.value)}
              />
            </div>

            <div className="flexbox-item">
              <label>University:</label>
              <input
                type="text"
                required
                placeholder="Enter your school / university"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>

            <div className="flexbox-item">
              <button type="submit">Register</button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};
