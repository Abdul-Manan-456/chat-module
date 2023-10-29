import React from "react";
import Group from "./group";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={user.image} alt="" />
        <span>{user.name}</span>
      </div>
      <Group />
    </div>
  );
};

export default Navbar;
