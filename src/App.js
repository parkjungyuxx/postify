import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.js";
import { useState } from "react";
import UserContext from "./userContext.js";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
