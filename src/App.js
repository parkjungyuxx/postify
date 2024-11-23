import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.js";
import { useState } from "react";
import { UserContext, PostContext, CommentContext } from "./context.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [user, setUser] = useState("");

  const [postList, setPostList] = useState(() => {
    const savedPosts = localStorage.getItem("postList");
    return savedPosts ? JSON.parse(savedPosts) : []; // 로컬 스토리지에 데이터가 없으면 빈 배열 반환
  });

  const [comment, setComment] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <PostContext.Provider value={{ postList, setPostList }}>
          <CommentContext.Provider value={{ comment, setComment }}>
            <RouterProvider router={router} />
          </CommentContext.Provider>
        </PostContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
