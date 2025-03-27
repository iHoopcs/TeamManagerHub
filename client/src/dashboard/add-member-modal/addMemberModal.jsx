import React, { useState } from "react";
import axios from "axios";
import "./addMemberModal-styles.css";

export const AddMemberModal = (props) => {
  const { isOpen, closeModal, setMembers } = props;

  //new member payload
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [role, setRole] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleAddMember = async (e) => {
    const storedSport = JSON.parse(sessionStorage.getItem("sport"));
    const storedGender = JSON.parse(sessionStorage.getItem("gender"));
    const storedCode = JSON.parse(sessionStorage.getItem("code"));
    const storedEmail = JSON.parse(sessionStorage.getItem("managerEmail"));
    e.preventDefault();

    const newMember = {
      firstName: fName,
      lastName: lName,
      role: role,
      jerseyNumber: jerseyNumber,
      phoneNumber: phone,
      sport: storedSport,
      sportGender: storedGender,
      teamCode: storedCode,
    };

    console.log(newMember);

    //send to /api/add-member
    try {
      const response = await axios.post(
        "http://localhost:8080/api/add-member",
        {
          email: storedEmail,
          member: newMember,
        }
      );

      console.log(response);

      //clear modal data
      setFName("");
      setLName("");
      setRole("");
      setJerseyNumber(null);
      setPhone(null);

      //update members - re render
      setMembers(response.data.updatedMembers);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="member-modal-background">
          <div className="member-modal-content">
            <form className="member-form-container">
              <div className="member-form-header">
                <h2>Enter new member information</h2>
                <button onClick={closeModal}>X</button>
              </div>
              <hr></hr>
              <div className="member-form-item">
                <label>First Name:</label>
                <input
                  type="text"
                  required
                  placeholder="Joe"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>

              <div className="member-form-item">
                <label>Last Name:</label>
                <input
                  type="text"
                  required
                  placeholder="Smith"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>

              <div className="member-form-item">
                <label>Role:</label>
                <select onChange={(e) => setRole(e.target.value)}>
                  <option selected disabled>
                    Select the Member Role
                  </option>
                  <option value="Player">Player</option>
                  <option value="Coach">Coach</option>
                </select>
              </div>

              <div className="member-form-item">
                <label>Jersey Number:</label>
                <input
                  type="number"
                  required
                  value={jerseyNumber}
                  onChange={(e) => setJerseyNumber(e.target.value)}
                />
              </div>

              <div className="member-form-item">
                <label>Phone Number:</label>
                <input
                  type="number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button onClick={handleAddMember}>Add Member</button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
