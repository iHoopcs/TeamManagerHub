const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    school: {
      type: String,
      required: true,
    },
    teams: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;
