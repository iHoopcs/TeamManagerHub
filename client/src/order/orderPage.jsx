import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./orderPage-styles.css";
import { MenuItem } from "./menu-item/menuItem";

export const OrderPage = (props) => {
  const { restaurantName } = props;
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  const nav = useNavigate();
  const changeRestaurant = () => {
    //redirect to dashboard
    //re render order modal on /dashboard - display restaurants
    nav("/dashboard", {
      replace: true,
      state: { openOrderModal: true },
    });
  };

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/restaurant", {
        params: { name: restaurantName },
      });
      console.log(response);
      setRestaurant(response.data.restaurant);
      setMenu(response.data.restaurant.menu);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <div className="order-container">
      <button onClick={changeRestaurant}>Change restaurant</button>
      <div className="order-content">
        <h1>Welcome to {restaurantName}!</h1>

        {/* display players? */}
        <div className="team-members">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde,
          tempore!
        </div>
        {/* display menu items */}
        <div className="menu-items">
          {menu.map((item, index) => {
            return <MenuItem item={item} key={index} />;
          })}
        </div>

        {/* TODO: */}
        {/* display team info & members one by one? */}
        {/* display menu - breakfast, lunch, dinner w/ price */}
        {/* text message to each player */}
        {/* receive response - fill in order for each member */}
      </div>
    </div>
  );
};
