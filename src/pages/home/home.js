import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context.js";
import Header from "./header.js";
import SideNavBar from "./sideNavBar.js";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import MainContent from "./mainContent.js";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <div>
      <Header />
      <div style={{ display: "flex", height: "100%" }}>
        <SideNavBar />
        {location.pathname === "/" ? <MainContent /> : <Outlet />}
      </div>
    </div>
  );
};

export default Home;
