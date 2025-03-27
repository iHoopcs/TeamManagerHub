import React, { useState, useEffect } from "react";
import "./dashboard-styles.css";
import axios from "axios";
import { NewTeamModal } from "./create-team-modal/newTeamModal";
import { StartOrderModal } from "./start-order-modal/startOrderModal";
import { AddMemberModal } from "./add-member-modal/addMemberModal";
import { useLocation } from "react-router-dom";
export const Dashboard = (props) => {
  //fetch from App.js to also control in orderPage.js
  const { openOrderModal, orderModalVisible, closeOrderModal } = props;
  const location = useLocation();

  const [managerName, setManagerName] = useState("");
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [membersIsEmpty, setMembersIsEmpty] = useState(false);
  const [modalIsVisible, setMemberModalVisible] = useState(false); //add member modal
  const [buttonControlsVisible, setButtonControlsVisible] = useState(false);
  const [newTeamModalVisible, setNewTeamModalVisible] = useState(false);
  const [startOrderDisabled, setStartOrderButtonDisabled] = useState(false);

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

  const fetchManagerName = () => {
    setManagerName(JSON.parse(sessionStorage.getItem("managerName")));
  };

  const handleDropdown = async (e) => {
    console.log(e.target.value);

    if (e.target.value === "newTeam") {
      setNewTeamModalVisible(true);
      setButtonControlsVisible(false);
      return;
    } else {
      //display team members
      const storedEmail = JSON.parse(sessionStorage.getItem("managerEmail"));
      //request team corresponding team members - based on team sport, gender, code
      try {
        const response = await axios.post(
          "http://localhost:8080/api/team-members",
          { email: storedEmail, payload: e.target.value }
        );
        console.log(response);
        if (response.data.members.length === 0) {
          //team members = empty
          setMembersIsEmpty(true);
          setButtonControlsVisible(true); //display add member button
          setStartOrderButtonDisabled(true);

          //parse dropdrown title
          const parsed = e.target.value.split(" ");
          //store values for add member modal
          sessionStorage.setItem("code", JSON.stringify(parsed[0]));
          sessionStorage.setItem("gender", JSON.stringify(parsed[1]));
          sessionStorage.setItem("sport", JSON.stringify(parsed[2]));
        } else {
          setMembersIsEmpty(false);
          //display add member & start order button when members fetched
          setButtonControlsVisible(true);
          setStartOrderButtonDisabled(false);
          setMembers(response.data.members);
        }
        //parse to store team details
        let parsed = e.target.value.split(" ");
        sessionStorage.setItem(
          "team",
          JSON.stringify({
            yearStart: parsed[0],
            yearEnd: parsed[1],
            code: parsed[2],
            gender: parsed[3],
            sport: parsed[4],
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  //add member modal controls
  const openMemberModal = () => {
    setMemberModalVisible(true);
  };
  const closeModal = () => {
    setMemberModalVisible(false);
    setNewTeamModalVisible(false);
  };

  useEffect(() => {
    fetchTeams();
    fetchManagerName();

    //control order modal render - re render when redirect from orderPage
    if (
      location.state &&
      location.state.openOrderModal &&
      orderModalVisible === false
    ) {
      openOrderModal();
    }
  }, []);

  return (
    <>
      <div className="dashboard-grid">
        <div className="header">
          <div className="header-item">
            <button>TeamManagerHub</button>
          </div>
          <div className="header-item">
            <button>Profile</button>
          </div>
        </div>
        <div className="sidebar"></div>
        <div className="main-content">
          <h2>Welcome {managerName}!</h2>
          <div className="team-tools-flexbox">
            {/* Dropdown menu */}
            <select className="team-dropdown" onChange={handleDropdown}>
              <option selected disabled>
                Select Team Roster to View
              </option>
              {teams.map((team, key) => {
                //format for server manipulation
                let optionValue =
                  team.yearStart +
                  " " +
                  team.yearEnd +
                  " " +
                  team.code +
                  " " +
                  team.gender +
                  " " +
                  team.sport;
                return (
                  <>
                    <option key={key} value={optionValue}>
                      {team.yearStart} - {team.yearEnd} {team.code} {team.name}{" "}
                      {team.gender} {team.sport}
                    </option>
                  </>
                );
              })}
              <option value="newTeam">Create New Team</option>
            </select>
            {
              //display control buttons if team.members.length != 0
              buttonControlsVisible ? (
                <>
                  <button onClick={openMemberModal}>Add Team Member</button>
                  <button
                    disabled={startOrderDisabled}
                    onClick={openOrderModal}
                  >
                    Start Order
                  </button>
                </>
              ) : null
            }
            <NewTeamModal
              isOpen={newTeamModalVisible}
              closeModal={closeModal}
              setTeams={setTeams}
            />
            <StartOrderModal
              isOpen={orderModalVisible}
              closeOrderModal={closeOrderModal}
            />
            <AddMemberModal
              isOpen={modalIsVisible}
              closeModal={closeModal}
              setMembers={setMembers}
            />
          </div>

          {/* Display team members for respective team onclick team */}
          <div className="members-container-flexbox">
            {membersIsEmpty ? (
              <h3>There are no members on this team yet</h3>
            ) : (
              members.map((mem) => {
                return (
                  <>
                    <div className="member-flexbox">
                      <h3>{mem.firstName}</h3>
                      <h3>{mem.lastName}</h3>
                      <h3># {mem.jerseyNumber}</h3>
                      <h3>{mem.phoneNumber}</h3>
                      <h3>{mem.role}</h3>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
