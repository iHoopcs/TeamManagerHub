import React from "react";
import { useNavigate } from "react-router-dom";
export const OrderPage = (props) => {
  const { name } = props;

  const nav = useNavigate();
  const changeRestaurant = () => {
    //redirect to dashboard
    //open order modal - display restaurants
    nav("/dashboard", {
      replace: true,
      state: { openOrderModal: true },
    });
  };
  return (
    <>
      <h1>Welcome to {name}!</h1>
      <button onClick={changeRestaurant}>Change restaurant</button>
    </>
  );
};
