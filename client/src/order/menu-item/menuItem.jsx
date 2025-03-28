import React from "react";
import "./menuItem-styles.css";

export const MenuItem = (props) => {
  const { item } = props;

  return (
    <div className="menu-item-card">
      <img src={item.image} alt={item.itemName} />
      <div className="item-info">
        <p>${item.price}</p>
        <p>{item.itemName}</p>
      </div>
    </div>
  );
};
