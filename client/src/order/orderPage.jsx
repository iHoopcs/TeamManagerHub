import React from "react";
import { useNavigate } from "react-router-dom";
import "./orderPage-styles.css";

export const OrderPage = (props) => {
  const { name } = props;

  const nav = useNavigate();
  const changeRestaurant = () => {
    //redirect to dashboard
    //re render order modal on /dashboard - display restaurants
    nav("/dashboard", {
      replace: true,
      state: { openOrderModal: true },
    });
  };
  return (
    <div className="order-container">
      <button onClick={changeRestaurant}>Change restaurant</button>
      <div className="order-content">
        <h1>Welcome to {name}!</h1>
        {/* TODO: */}
        {/* display team info & members one by one? */}
        {/* display menu - breakfast, lunch, dinner w/ price */}
        {/* text message to each player */}
        {/* receive response - fill in order for each member */}
      </div>
    </div>
  );
};
