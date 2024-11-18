import {
  faCalendarCheck,
  faListCheck,
  faPenToSquare,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeBtn = location.pathname.replace("/", "");

  const handleNavigate = (route) => {
    navigate(`/${route}`);
  };
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "240px",
        height: "100vh",
        backgroundColor: "#eeeeee",
      }}
    >
      <button
        onClick={() => handleNavigate("")}
        className={`sideNavBtn ${activeBtn === "" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faHouse} /> Home
      </button>
      <button
        onClick={() => handleNavigate("todo")}
        className={`sideNavBtn ${activeBtn === "todo" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faListCheck} />
        Todo
      </button>
      <button
        onClick={() => handleNavigate("post")}
        className={`sideNavBtn ${activeBtn === "post" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        Post
      </button>
      <button
        onClick={() => handleNavigate("calender")}
        className={`sideNavBtn ${activeBtn === "calender" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faCalendarCheck} />
        Calender
      </button>
    </nav>
  );
};

export default SideNavBar;
