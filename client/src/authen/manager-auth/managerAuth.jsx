import React, { useState } from "react";
import "./managerAuth-styles.css";
export const ManagerAuthComponent = () => {
  //login vs signup display control
  const [returningManager, setReturningManager] = useState(false);
  const [newManager, setNewManager] = useState(false);

  //register payload

  //login payload

  const handleManagerLogin = async () => {
    //display login form & hide register form
    setReturningManager(true);
    setNewManager(false);
  };

  const handleManagerRegister = async () => {
    //display register form & hide login form
    setNewManager(true);
    setReturningManager(false);
  };

  return (
    <div className="manager-flexbox">
      {/* auth buttons side by side */}
      <div className="manager-flexbox-child-1">
        <div className="child-flexbox-item-1">
          <button onClick={handleManagerLogin} disabled={returningManager}>
            Manager Login
          </button>
        </div>

        <div className="child-flexbox-item-2">
          <button onClick={handleManagerRegister} disabled={newManager}>
            Manager Register
          </button>
        </div>
      </div>
      {/* display corresponding form underneath */}
      <div className="manager-flexbox-child-2">
        {returningManager ? (
          <h1>Login creds...</h1>
        ) : newManager ? (
          <h1>Register creds...</h1>
        ) : null}
      </div>
    </div>
  );
};
