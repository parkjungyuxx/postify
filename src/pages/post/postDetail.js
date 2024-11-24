import React, { useContext, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { PostContext } from "../../context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CommentContext } from "../../context";

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setPostTitle(post.title);
    setPostText(post.text);
  };

  const { postList, setPostList } = useContext(PostContext);
  const post = postList[postId];

  const { comment, setComment } = useContext(CommentContext);
  const [savingComment, setSavingComment] = useState("");

  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");

  const handleChange = () => {
    const updatedPost = {
      title: postTitle,
      text: postText,
    };

    const updatedList = [...postList];
    updatedList.splice(postId, 1, updatedPost);
    setPostList(updatedList);
    setShow(false);
  };

  const addComment = (event) => {
    event.preventDefault();
    if (!savingComment) return alert("댓글을 입력해주세요");
    setComment((prevComments) => {
      const currentComments = prevComments[postId] || []; // 기존 댓글 가져오기
      return {
        ...prevComments,
        [postId]: [...currentComments, savingComment], // 새 댓글 추가
      };
    });
    setSavingComment(""); // 입력 필드 초기화
  };

  return (
    <div className="post-detail" style={{ display: "flex" }}>
      <button
        onClick={() => {
          navigate("/post");
        }}
      >
        목록으로
      </button>
      <div style={{ display: "flex" }}>
        <p>댓글수 1</p>
        <p>조회수 1</p>
      </div>
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
        <button onClick={handleShow}>수정하기</button>
        <EditPostModal
          show={show}
          handleClose={handleClose}
          handleChange={handleChange}
          post={post}
          setPostTitle={setPostTitle}
          setPostText={setPostText}
        />
      </div>
      <div className="comment-box">
        <div>Comment</div>
        <form
          onSubmit={(event) => {
            addComment(event);
            setSavingComment("");
          }}
        >
          <input
            value={savingComment}
            onChange={(event) => {
              const comment = event.target.value;
              setSavingComment(comment);
            }}
          />
          <button>댓글 추가</button>
        </form>
        <div className="comment-container">
          {(comment[postId] || []).map((el, i) => {
            return (
              <div className="comment-card" key={i}>
                {el}
                <button
                  onClick={() => {
                    setComment((prevComments) => {
                      const currentComments = [...(prevComments[postId] || [])];
                      currentComments.splice(i, 1);
                      return {
                        ...prevComments,
                        [postId]: currentComments,
                      };
                    });
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EditPostModal = ({
  show,
  handleClose,
  postTitle,
  postText,
  setPostTitle,
  setPostText,
  handleChange,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>글 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              value={postTitle}
              onChange={(event) => setPostTitle(event.target.value)}
              type="text"
              placeholder="제목을 입력하세요"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postContent">
            <Form.Label>내용</Form.Label>
            <Form.Control
              value={postText}
              onChange={(event) => setPostText(event.target.value)}
              as="textarea"
              rows={3}
              placeholder="내용을 입력하세요"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleChange();
          }}
        >
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostDetail;
