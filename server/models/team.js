const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sport: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    yearStart: {
      type: String,
      required: true,
    },
    yearEnd: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
