import React from "react";
import "./startOrderModal.css";
import { RestaurantCard } from "./restaurant-card/restaurantCard";
const restaurants = require("../../restaurants.json");

export const StartOrderModal = (props) => {
  const { isOpen, closeModal } = props;

  return (
    <>
      {isOpen ? (
        <div className="modal-background">
          <div className="modal-content">
            <div className="header">
              <h2>Where are you ordering from?</h2>
              <button onClick={closeModal}>X</button>
            </div>

            <div className="slideshow-container">
              {restaurants.map((item) => {
                return <RestaurantCard name={item.name} logo={item.logo} />;
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
