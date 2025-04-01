import React, { useState } from "react";
import "./managerAuth-styles.css";
export const ManagerAuthComponent = () => {
  //login vs signup display control
  const [returningManager, setReturningManager] = useState(false);
  const [newManager, setNewManager] = useState(false);

  //register payload

  //login payload
  const [managerLoginEmail, setManagerLoginEmail] = useState("");
  const [managerLoginPassword, setManagerLoginPassword] = useState("");
  const handleManagerLogin = async () => {
    //create form payload
    //send to server
    //receive response
    //redirect
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
          <form className="form-flexbox" onSubmit={handleManagerLogin}>
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
          <h1>Register creds...</h1>
        ) : null}
      </div>
    </div>
  );
};
