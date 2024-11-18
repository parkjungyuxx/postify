import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import UserContext from "../../userContext.js";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const { setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  // inputValue를 User로 설정 후 home으로 이동
  const handleNavigate = () => {
    setUser(inputValue); 
    navigate("/", { state: { user: inputValue } });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: "72px", fontWeight: "900" }}>Postify</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (inputValue.trim() === "") {
            alert("작성자를 입력해주세요");
            return;
          }
          handleNavigate();
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "120px",
        }}
      >
        <input
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
          style={{
            border: "none",
            borderRadius: "4px",
            width: "240px",
            height: "36px",
          }}
        />
        <Button
          type="submit"
          style={{
            border: "none",
            height: "36px",
            fontSize: "18px",
            cursor: "pointer",
          }}
          variant="secondary"
        >
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Login;
