import React from "react";
import "./restaurantCard.css";

export const RestaurantCard = (props) => {
  const { name, logo } = props;

  return (
    <>
      <img src={logo} className="logo" alt={name} />
    </>
  );
};
