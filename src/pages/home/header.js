import UserContext from "../../userContext.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import "../../common.css";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  //// 로그아웃을 위한 유저 이름 초기화 후 로그인 페이지로 이동
  const handleLogOut = () => {
    setUser("");
    navigate("/login");
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          backgroundColor: "#eeeeee",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "240px",
        }}
      >
        <h1 className="logoText">Postify</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          padding: "24px",
          backgroundColor: "#F5F7F8",
          width: "100%",
        }}
      >
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
