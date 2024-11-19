import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../../userContext.js";
import Header from "./header.js";
import SideNavBar from "./sideNavBar.js";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", height: "100%" }}>
        <SideNavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
