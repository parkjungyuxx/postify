import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../../userContext.js";
import Header from "./header.js";

const Home = () => {
  const { user, setUser } = useContext(UserContext);


  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
