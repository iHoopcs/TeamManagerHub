const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/create-restaurant", restaurantController.createRestaurant);
router.post("/add-menu-item", restaurantController.addMenuItem);
router.get("/restaurant", restaurantController.fetchRestaurant);
module.exports = router;
