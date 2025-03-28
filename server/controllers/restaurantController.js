const Restaurant = require("../models/restaurant");
const MenuItem = require("../models/menu-item");

const createRestaurant = async (req, res) => {
  //fetch payload data
  const { payload } = req.body;

  //check if already exists
  const foundRestaurant = await Restaurant.findOne({
    restaurantName: payload.restName,
  });
  if (foundRestaurant) {
    return res.status(200).json({ msg: "restaurant already exists" });
  }
  //apply to new restaurant object
  const newRestaurant = Restaurant({
    restaurantName: payload.restName,
    hoursOpen: payload.hoursOpen,
    hoursClose: payload.hoursClose,
  });
  //save
  newRestaurant.save();

  return res.status(201).json({ msg: "restaurant created" });
};

const addMenuItem = async (req, res) => {
  //fetch payload data
  const { restaurantName, payload } = req.body;

  //find corresponding restaurant
  const foundRestaurant = await Restaurant.findOne({
    restaurantName: restaurantName,
  });
  if (!foundRestaurant) {
    return res.status(404).json({ msg: "error accessing restaurant details" });
  }
  const newMenuItem = MenuItem({
    itemName: payload.itemName,
    image: payload.image,
    mealType: payload.mealType,
    price: payload.price,
  });

  //push to restaurant menu []
  foundRestaurant.menu.push(newMenuItem);

  //save changes
  foundRestaurant.save();

  return res.status(201).json({ msg: "menu item added" });
};

const fetchRestaurant = async (req, res) => {
  //query url
  const restaurantName = req.query.name;
  //find restaurant
  const foundRestaurant = await Restaurant.findOne({
    restaurantName: restaurantName,
  });
  if (!foundRestaurant) {
    return res.status(404).json({ msg: "error accessing restaurant" });
  }
  return res.status(200).json({
    restaurant: foundRestaurant,
    msg: "restaurant fetched",
  });
};
module.exports = {
  createRestaurant,
  addMenuItem,
  fetchRestaurant,
};
