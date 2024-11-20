import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const state = location.state;

  const postList = state.postList;
  const post = postList[postId];

  const navigate = useNavigate();

  return (
    <div className="post-detail">
      <button onClick={()=>{navigate("/post")}}>목록으로</button>
      <div className="post-card">
        <div>
          <p
            style={{ textAlign: "left", fontSize: "72px", fontWeight: "bold" }}
          >
            {post.title}
          </p>
        </div>
        <div>
          <p>{post.text}</p>
          <p></p>
        </div>
        <button>수정하기</button>
      </div>
    </div>
  );
};

export default PostDetail;
