const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.post("/add-member", teamController.addMember);
router.put("/create-team", teamController.createTeam);
router.post("/team-members", teamController.fetchTeamMembers);
router.post("/teams", teamController.fetchTeams);
router.delete("/remove-member", teamController.removeMember);
router.put("/edit-member", teamController.editMember);
module.exports = router;
