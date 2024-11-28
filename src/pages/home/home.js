import { Outlet, useLocation } from "react-router-dom";
import Header from "./header.js";
import SideNavBar from "./sideNavBar.js";
import MainContent from "./mainContent.js";

const Home = () => {
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
