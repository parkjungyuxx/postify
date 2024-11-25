import { createContext } from "react";

const UserContext = createContext();
const PostContext = createContext();
const CommentContext = createContext();
const CommentCountContext = createContext();
const ViewCountContext = createContext();

export {
  UserContext,
  PostContext,
  CommentContext,
  CommentCountContext,
  ViewCountContext,
};
