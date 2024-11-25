import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../../css/post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faFaceGrinTongueWink,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  PostContext,
  UserContext,
  CommentCountContext,
  ViewCountContext,
} from "../../context";

const Post = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(UserContext);
  const { commentCount, setCommentCount } = useContext(CommentCountContext);

  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const { postList, setPostList } = useContext(PostContext);

  useEffect(() => {
    localStorage.setItem("postList", JSON.stringify(postList));
  }, [postList]);

  const { viewCount, setViewCount } = useContext(ViewCountContext);

  const handleChange = () => {
    const newPost = {
      title: postTitle,
      text: postText,
    };

    const copy = [...postList];
    copy.push(newPost);
    setPostList(copy);
    setPostTitle("");
    setPostText("");
  };

  const deleteComment = (event, i) => {
    event.stopPropagation();
    const copy = [...postList];
    copy.splice(i, 1);
    setPostList(copy);

    setCommentCount((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[i];
      return updatedCounts;
    });
  };

  const handleViewCount = (postId) => {
    setViewCount((prevViewCount) => ({
      ...prevViewCount,
      [postId]: (prevViewCount[postId] || 0) + 1,
    }));
  };

  const navigate = useNavigate();

  return (
    <div className="post-container">
      <table>
        <thead className="post-table-head">
          <tr>
            <th>PostID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>
              댓글수
              <FontAwesomeIcon icon={faComment} />
            </th>
            <th>
              조회수
              <FontAwesomeIcon icon={faFaceGrinTongueWink} />
            </th>
            <th>
              <FontAwesomeIcon icon={faTrash} />
            </th>
          </tr>
        </thead>
        <tbody>
          {postList.map((el, i) => {
            return (
              <tr
                className="table-row"
                key={i}
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                  handleViewCount(i);
                  navigate(`/post/${i}`, { state: { i, postList } });
                }}
              >
                <td>{i}</td>
                <td>{postList[i].title}</td>
                <td>{user}</td>
                <td>{commentCount[i] || 0}</td>
                <td>{viewCount[i] || 0}</td>
                <td>
                  {" "}
                  <button
                    onClick={(event) => {
                      deleteComment(event, i);
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="post-bottom">
        pagenation{" "}
        <Button onClick={handleShow} className="add-post-btn" variant="warning">
          글 쓰기
        </Button>
      </div>
      <AddPostModal
        show={show}
        handleClose={handleClose}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postText={postText}
        setPostText={setPostText}
        handleChange={handleChange}
      />
    </div>
  );
};

const AddPostModal = ({
  show,
  handleClose,
  setPostTitle,
  setPostText,
  handleChange,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>제목</Form.Label>
              <Form.Control
                onChange={(event) => {
                  const title = event.target.value;
                  setPostTitle(title);
                }}
                type="text"
                placeholder="글 제목을 입력하세요"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postContent">
              <Form.Label>내용</Form.Label>
              <Form.Control
                onChange={(event) => {
                  const text = event.target.value;
                  setPostText(text);
                }}
                as="textarea"
                rows={3}
                placeholder="글 내용을 입력하세요"
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
              handleClose();
              handleChange();
            }}
          >
            글쓰기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
