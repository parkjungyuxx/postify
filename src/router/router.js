import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Todo from "../pages/todo/todo";
import Post from "../pages/post/post";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);

export default router;
