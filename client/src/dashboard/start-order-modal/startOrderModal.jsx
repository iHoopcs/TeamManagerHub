import React from "react";
import "./startOrderModal-styles.css";
const restaurants = require("../../restaurants.json");
export const StartOrderModal = (props) => {
  const { isOpen,  closeOrderModal } = props;

  return (
    <>
      {isOpen ? (
        <div className="order-modal-background">
          <div className="order-modal-content">
            <div className="order-header">
              <h2>Where are you ordering from?</h2>
              <button onClick={closeOrderModal}>X</button>
            </div>

            <div className="order-display-container">
              {restaurants.map((item, index) => {
                return (
                  <a
                    href={`/restaurants/order/${index}/${item.name}`}
                    className="logo-link"
                  >
                    <img src={item.logo} alt={item.name} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
