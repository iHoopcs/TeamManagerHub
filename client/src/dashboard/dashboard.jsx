import React, { useState, useEffect } from "react";
import "./dashboard-styles.css";
import axios from "axios";
import { NewTeamModal } from "./create-team-modal/newTeamModal";
import { StartOrderModal } from "./start-order-modal/startOrderModal";
import { AddMemberModal } from "./add-member-modal/addMemberModal";
export const Dashboard = () => {
  const [managerName, setManagerName] = useState("");
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [membersIsEmpty, setMembersIsEmpty] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false); //add member modal
  const [buttonControlsVisible, setButtonControlsVisible] = useState(false);
  const [newTeamModalVisible, setNewTeamModalVisible] = useState(false);
  const [startOrderDisabled, setStartOrderButtonDisabled] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);

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
          //store for add member modal access
          sessionStorage.setItem(
            "sport",
            JSON.stringify(response.data.members[0].sport)
          );
          sessionStorage.setItem(
            "gender",
            JSON.stringify(response.data.members[0].sportGender)
          );
          sessionStorage.setItem(
            "code",
            JSON.stringify(response.data.members[0].teamCode)
          );

          //display add member & start order button when members fetched
          setButtonControlsVisible(true);
          setStartOrderButtonDisabled(false);
          setMembers(response.data.members);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //start order modal
  const openStartOrderModal = () => {
    setOrderModalVisible(true);
  };

  //add member modal
  const openModal = () => {
    setModalIsVisible(true);
  };

  const closeModal = () => {
    setModalIsVisible(false);
    setNewTeamModalVisible(false);
    setOrderModalVisible(false);
  };

  useEffect(() => {
    fetchTeams();
    fetchManagerName();
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
                  team.code + " " + team.gender + " " + team.sport;
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
            <NewTeamModal
              isOpen={newTeamModalVisible}
              closeModal={closeModal}
              setTeams={setTeams}
            />
            {
              //display control buttons if team.members.length != 0
              buttonControlsVisible ? (
                <>
                  <button onClick={openModal}>Add Team Member</button>
                  <button
                    disabled={startOrderDisabled}
                    onClick={openStartOrderModal}
                  >
                    Start Order
                  </button>
                  <StartOrderModal
                    isOpen={orderModalVisible}
                    closeModal={closeModal}
                  />
                </>
              ) : null
            }

            {/* Add Member Modal */}
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
