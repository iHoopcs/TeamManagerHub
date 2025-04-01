import React from "react";
import "./memberAuth-styles.css";
export const MemberAuthComponent = (props) => {
  const { setUserIsManager, setUserIsTeamMember } = props;
  return (
    <div className="team-member-flexbox">
      {/* Login button */}
      <div className="team-member-flexbox-child-1">
        <button>Member Login</button>
        <button
          onClick={() => {
            setUserIsManager(true);
            setUserIsTeamMember(false);
          }}
        >
          Actually a manager?
        </button>
      </div>
      {/* Corresponding form */}
      <div className="team-member-flexbox-child-2">
        *TODO* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit,
        eveniet laudantium! Ratione, possimus. Enim consequatur perspiciatis
        quis dignissimos nihil odio ab. Autem eligendi nobis fugiat aspernatur
        eum atque adipisci. Dolorem.
      </div>
    </div>
  );
};
