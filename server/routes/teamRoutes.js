const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.put("/add-member", teamController.addMember);
router.put("/create-team", teamController.createTeam);
router.get("/team-members", teamController.fetchTeamMembers);
router.get("/teams", teamController.fetchTeams);
router.delete("/remove-member", teamController.removeMember);
router.put("/edit-member", teamController.editMember);
module.exports = router;
