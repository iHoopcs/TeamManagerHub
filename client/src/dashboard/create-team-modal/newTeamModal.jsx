import React, { useState } from "react";
import axios from "axios";
import "./newTeamModal-styles.css";

export const NewTeamModal = (props) => {
  const { isOpen, closeModal, setTeams } = props;

  const [teamName, setTeamName] = useState("");
  const [teamSport, setTeamSport] = useState("");
  const [teamSportGender, setTeamSportGender] = useState("");
  const [yearStart, setYearStart] = useState(null);

  const createTeam = async (e) => {
    e.preventDefault();
    const storedEmail = JSON.parse(sessionStorage.getItem("managerEmail"));
    const storedSchool = JSON.parse(sessionStorage.getItem("managerSchool"));

    //new team payload
    const payload = {
      name: teamName,
      sport: teamSport,
      gender: teamSportGender,
      yearStart: yearStart,
      yearEnd: Number(yearStart) + 1,
    };

    //send to server
    try {
      const response = await axios.post(
        "http://localhost:8080/api/create-team",
        {
          email: storedEmail,
          team: payload,
          school: storedSchool,
        }
      );

      console.log(response);

      //update manager's teams - re render
      setTeams(response.data.updatedTeams);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="team-modal-background">
          <div className="team-modal-content">
            <form className="team-form-container">
              <div className="team-form-header">
                <h2>Enter new team information</h2>
                <button onClick={closeModal}>X</button>
              </div>
              <hr></hr>
              <div className="team-form-item">
                <label>Team Nickname:</label>
                <input
                  type="text"
                  required
                  placeholder="Broncos"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              <div className="team-form-item">
                <label>Sport:</label>
                <label>
                  <input
                    required
                    type="radio"
                    name="sport"
                    value="Basketball"
                    onChange={(e) => setTeamSport(e.target.value)}
                  />
                  Basketball
                </label>
                <label>
                  <input
                    required
                    type="radio"
                    name="sport"
                    value="Football"
                    onChange={(e) => setTeamSport(e.target.value)}
                  />
                  Football
                </label>
                <label>
                  <input
                    required
                    type="radio"
                    name="sport"
                    value="Volleyball"
                    onChange={(e) => setTeamSport(e.target.value)}
                  />
                  Volleyball
                </label>
                <label>
                  <input
                    required
                    type="radio"
                    name="sport"
                    value="Baseball"
                    onChange={(e) => setTeamSport(e.target.value)}
                  />
                  Baseball
                </label>
                <label>
                  <input
                    required
                    type="radio"
                    name="sport"
                    value="Soccer"
                    onChange={(e) => setTeamSport(e.target.value)}
                  />
                  Soccer
                </label>
              </div>

              <div className="team-form-item">
                <label>Sport Gender:</label>
                <label>
                  <input
                    required
                    type="radio"
                    name="gender"
                    value="Mens"
                    onChange={(e) => setTeamSportGender(e.target.value)}
                  />
                  Mens
                </label>
                <label>
                  <input
                    required
                    type="radio"
                    name="gender"
                    value="Womens"
                    onChange={(e) => setTeamSportGender(e.target.value)}
                  />
                  Womens
                </label>
              </div>

              <div className="team-form-item">
                <label>Season Year Start:</label>
                <input
                  type="number"
                  required
                  value={yearStart}
                  onChange={(e) => setYearStart(e.target.value)}
                />
              </div>

              <button onClick={createTeam}>Create Team</button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
