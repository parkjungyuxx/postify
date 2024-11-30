import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.js";
import { useState } from "react";
import {
  UserContext,
  PostContext,
  CommentContext,
  CommentCountContext,
  ViewCountContext,
} from "./context.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState("");

  const [postList, setPostList] = useState(() => {
    const savedPosts = localStorage.getItem("postList");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [comment, setComment] = useState(() => {
    const savedComment = localStorage.getItem("comment");
    return savedComment ? JSON.parse(savedComment) : {};
  });
  const [commentCount, setCommentCount] = useState({});
  const [viewCount, setViewCount] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <PostContext.Provider value={{ postList, setPostList }}>
          <ViewCountContext.Provider value={{ viewCount, setViewCount }}>
            <CommentCountContext.Provider
              value={{ commentCount, setCommentCount }}
            >
              <CommentContext.Provider value={{ comment, setComment }}>
                <RouterProvider router={router} />
              </CommentContext.Provider>
            </CommentCountContext.Provider>
          </ViewCountContext.Provider>
        </PostContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
