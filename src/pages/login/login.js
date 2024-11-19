import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import UserContext from "../../userContext.js";
import "../../css/login.css";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // inputValue를 User로 설정 후 home으로 이동
  const handleNavigate = () => {
    setUser(inputValue);
    navigate("/", { state: { user: inputValue } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      alert("작성자를 입력해주세요");
      return;
    }
    handleNavigate();
  };

  return (
    <div className="login-background">
      <p className="login-logo-text">Postify</p>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
          className="login-input"
        />
        <Button type="submit" className="login-btn" variant="secondary">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Login;
