import UserContext from "../../userContext.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";

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
    <>
      <h1>{user}님</h1>
      <Button variant="secondary">Secondary</Button>
      <Button variant="primary">Primary</Button>
      <button
        onClick={handleLogOut}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FF5733",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        로그아웃
      </button>
    </>
  );
};

export default Header;
