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
import Calender from "../pages/calender/calender";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "todo",
        element: <Todo />,
      },
      {
        path: "post",
        element: <Post />,
      },
      {
        path: "calender",
        element: <Calender />,
      },
    ],
  },

  {
    path: "*",
    element: <p>없는 페이지 입니다~</p>,
  },
]);

export default router;
