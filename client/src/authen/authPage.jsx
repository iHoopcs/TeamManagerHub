import React, { useState } from "react";
import "./auth-styles.css";
import { ManagerAuthComponent } from "./manager-auth/managerAuth";
import { MemberAuthComponent } from "./member-auth/memberAuth";

export const AuthPage = () => {
  //control manager vs member display
  const [userIsManager, setUserIsManager] = useState(false);
  const [userIsTeamMember, setUserIsTeamMember] = useState(false);

  return (
    <>
      <div className="flex-container">
        {/* Display corresponding auth components */}
        {
          // User = Manager
          userIsManager ? (
            <ManagerAuthComponent
              setUserIsManager={setUserIsManager}
              setUserIsTeamMember={setUserIsTeamMember}
            />
          ) : userIsTeamMember ? (
            //User = member
            <MemberAuthComponent
              setUserIsManager={setUserIsManager}
              setUserIsTeamMember={setUserIsTeamMember}
            />
          ) : (
            <>
              <h2>Please select your role?</h2>
              <div className="flex-item-1">
                <button onClick={() => setUserIsManager(true)}>Manager</button>
              </div>
              <div className="flex-item-2">
                <button onClick={() => setUserIsTeamMember(true)}>
                  Team Member
                </button>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};
