import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./authen/authPage";
import { Dashboard } from "./dashboard/dashboard";
import { OrderPage } from "./order/orderPage";
import { useState } from "react";
const restaurants = require("./restaurants.json");

export const App = () => {
  //gives access for order modal control to orderPage & dashboard
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const openOrderModal = () => {
    setOrderModalVisible(true);
  };
  const closeOrderModal = () => {
    setOrderModalVisible(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                openOrderModal={openOrderModal}
                orderModalVisible={orderModalVisible}
                closeOrderModal={closeOrderModal}
              />
            }
          />
          {/* unique url for each */}
          {restaurants.map((item, index) => {
            return (
              <Route
                key={index}
                path={`/restaurants/order/${index}/${item.name}`}
                element={<OrderPage name={item.name} />}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};
