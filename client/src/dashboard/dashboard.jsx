import React, { useState, useEffect } from "react";
import "./dashboard-styles.css";
import axios from "axios";

export const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchTeams = async (req, res) => {
    const storedEmail = JSON.parse(sessionStorage.getItem("managerEmail"));
    try {
      const response = await axios.post("http://localhost:8080/api/teams", {
        email: storedEmail,
      });
      console.log(response);
      setTeams(response.data.teams);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropdown = async (e) => {
    const storedEmail = JSON.parse(sessionStorage.getItem("managerEmail"));

    //request team corresponding team members - based on team sport, gender, code
    try {
      const response = await axios.post(
        "http://localhost:8080/api/team-members",
        { email: storedEmail, payload: e.target.value }
      );
      console.log(response);
      setMembers(response.data.members);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <>
      <div className="dashboard-grid">
        <div className="header">
          <div className="header-item">
            <button>TeamManagerHub</button>
          </div>
          <div className="header-item">
            <button>Teams</button>
            <button>Order</button>
          </div>
          <div className="header-item">
            <button>Profile</button>
          </div>
        </div>
        <div className="sidebar"></div>
        <div className="main-content">
          <div className="content-item">
            <h3>Welcome!</h3>
            <div className="team-tools-flexbox">
              {/* Dropdown menu */}
              <select className="team-dropdown" onChange={handleDropdown}>
                <option>Select Team Roster to View</option>
                {teams.map((team, key) => {
                  //format for server manipulation
                  let optionValue =
                    team.code + " " + team.gender + " " + team.sport;
                  return (
                    <>
                      <option key={key} value={optionValue}>
                        {team.code} {team.name} {team.gender} {team.sport}
                      </option>
                    </>
                  );
                })}
                <option value="createNewTeam">Create New Team</option>
              </select>
              {/* TODO: onclick - display popup */}
              <button>Add Team Member</button>
            </div>

            {/* Display team members for respective team onclick team */}
            <div className="members-container-flexbox">
              {members.map((mem) => {
                return (
                  <>
                    <div className="member-flexbox">
                      <h3>{mem.firstName}</h3>
                      <h3>{mem.lastName}</h3>
                      <h3># {mem.jerseyNumber}</h3>
                      <h3>Age: {mem.age}</h3>
                      <h3>{mem.phoneNumber}</h3>
                      <h3>{mem.role}</h3>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
