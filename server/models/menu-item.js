const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
