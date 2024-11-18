import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../../userContext.js";
import Header from "./header.js";
import SideNavBar from "./sideNavBar.js";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <Header />
      <SideNavBar />
    </div>
  );
};

export default Home;
