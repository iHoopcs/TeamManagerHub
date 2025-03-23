import React from "react";
import "./dashboard-styles.css";

export const Dashboard = () => {
  return (
    <>
      <div className="dashboard-grid">
        <div className="header">
          <div className="header-item">
            <button>TeamManagerHub</button>
          </div>
          <div className="header-item">
            <button>Teams</button>
            <button>Order</button>
          </div>
          <div className="header-item">
            <button>Profile</button>
          </div>
        </div>
        <div className="sidebar"></div>
        <div className="main-content"></div>
      </div>
    </>
  );
};
