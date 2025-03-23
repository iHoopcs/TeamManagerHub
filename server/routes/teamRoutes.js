const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.put("/add-member", teamController.addMember);
router.put("/create-team", teamController.createTeam);
module.exports = router;
