const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      unique: true,
    },
    hoursOpen: {
      type: String,
      required: true,
    },
    hoursClose: {
      type: String,
      required: true,
    },
    menu: {
      type: Array,
      required: true,
    },
  },

  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
