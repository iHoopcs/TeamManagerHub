import React from "react";
import "./startOrderModal.css";
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

            <div className="display-container">
              {restaurants.map((item, index) => {
                return (
                  <a
                    href={`/restaurants/order/${item.name}/${index}`}
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
