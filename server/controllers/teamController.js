const Member = require("../models/member");
const Team = require("../models/team");
const Manager = require("../models/manager");

//add member to existing team
const addMember = async (req, res) => {
  //access manager team array by unique email
  const { email, member } = req.body;
  if (!email || !member) {
    return res.status(400).json({ msg: "missing payload data" });
  }
  try {
    const foundManager = await Manager.findOne({ email: email });
    if (!foundManager) {
      res.status(400).json({ msg: "error occurred accessing account data" });
    } else {
      //check that teams array !empty
      if (foundManager.teams.length !== 0) {
        //fetch new member data from req
        const newMember = Member({
          firstName: member.firstName,
          lastName: member.lastName,
          role: member.role,
          jerseyNumber: member.jerseyNumber,
          phoneNumber: member.phoneNumber,
          sport: member.sport,
          sportGender: member.sportGender,
          teamCode: member.teamCode,
        });
        //check that member doesn't already exist in team

        //find corresponding team to newMember
        for (let i = 0; i < foundManager.teams.length; i++) {
          if (
            foundManager.teams[i].sport === newMember.sport &&
            foundManager.teams[i].gender === newMember.sportGender &&
            foundManager.teams[i].code === newMember.teamCode
          ) {
            //add member to team
            foundManager.teams[i].members.push(newMember);
            foundManager.markModified("teams"); //notify db that array has been updated to db
            console.log(foundManager.teams[i]);

            //send updated [] to re render
            res.status(201).json({
              msg: "*member added*",
              updatedMembers: foundManager.teams[i].members,
            });

            //save changes to manager account
            await foundManager.save();
            break;
          }
        }
      } else {
        res.status(200).json({ msg: "*no teams available to alter*" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//fetch all members for selected team
const fetchTeamMembers = async (req, res) => {
  const { email, payload } = req.body;

  //parse payload
  const parsed = payload.split(" ");
  selectedTeamCode = parsed[0];
  selectedTeamSportGender = parsed[1];
  selectedTeamSport = parsed[2];

  if (
    !email ||
    !selectedTeamCode ||
    !selectedTeamSportGender ||
    !selectedTeamSport
  ) {
    res.status(400).json({ msg: "missing payload data" });
  }

  try {
    //access manager
    const foundManager = await Manager.findOne({ email: email });

    //fetch corresponding team
    let foundTeam = {};
    for (let i = 0; i < foundManager.teams.length; i++) {
      if (
        foundManager.teams[i].code === selectedTeamCode &&
        foundManager.teams[i].gender === selectedTeamSportGender &&
        foundManager.teams[i].sport === selectedTeamSport
      ) {
        foundTeam = foundManager.teams[i];
      }
    }

    //return members
    res.status(200).json({
      msg: "members fetched",
      members: foundTeam.members,
    });
  } catch (err) {
    console.log(err);
  }
};

//fetch all teams for Manager account
const fetchTeams = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ msg: "missing payload data" });
  }
  try {
    //access manager account
    const foundManager = await Manager.findOne({ email: email });
    const teams = [];

    //retrieve each team
    for (let i = 0; i < foundManager.teams.length; i++) {
      teams.push(foundManager.teams[i]);
    }
    res.status(200).json({
      msg: "*teams fetched*",
      teams: teams,
    });
  } catch (err) {
    console.log(err);
  }
};

const removeMember = async (req, res) => {};

const editMember = async (req, res) => {};

//create empty new team
const createTeam = async (req, res) => {
  const { email, team } = req.body;
  //check that received payload isn't empty
  if (!email || !team) {
    res.status(400).json({ msg: "missing payload data" });
  }

  try {
    //access manager account
    const foundManager = await Manager.findOne({ email: email });
    if (!foundManager) {
      res.status(400).json({ msg: "error accessing manager account data" });
    } else {
      //create new team w/ payload data
      const newTeam = Team({
        name: team.name,
        sport: team.sport,
        gender: team.gender,
        yearStart: team.yearStart,
        yearEnd: team.yearEnd,
        size: team.size,
        code: team.code,
      });

      //push new team to manager's teams arrays
      foundManager.teams.push(newTeam);

      //update manager's account
      foundManager.save();

      res.status(201).json({ msg: "new team created" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addMember,
  createTeam,
  fetchTeamMembers,
  fetchTeams,
  removeMember,
  editMember,
};
