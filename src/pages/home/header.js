import { UserContext } from "../../context.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import "../../css/common.css";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogOut = () => {
    setUser("");
    navigate("/login");
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="header-logo-container">
        <h1 className="header-logo-text">Postify</h1>
      </div>
      <div className="header-nav">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "400", fontSize: "14px" }}>Admin</div>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={`${user}님`}
            menuVariant="dark"
            style={{ fontWeight: "600", fontSize: "18px" }}
          >
            <NavDropdown.Item onClick={handleLogOut} href="#action/3.1">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
