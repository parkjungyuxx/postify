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
  const { commentCount } = useContext(CommentCountContext);

  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const { postList, setPostList } = useContext(PostContext);

  useEffect(() => {
    localStorage.setItem(
      "postList",
      JSON.stringify(postList || { postList: [] })
    );
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

  const deletePost = (event, i) => {
    event.stopPropagation();

    const postId = (currentPage - 1) * postsPerPage + i;
    const copy = [...postList];
    copy.splice(postId, 1);
    setPostList(copy);

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(currentPage * postsPerPage, copy.length);
    setCurrentPosts(copy.slice(startIndex, endIndex));

    if (copy.length <= startIndex && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewCount = (postId) => {
    setViewCount((prevViewCount) => ({
      ...prevViewCount,
      [postId]: (prevViewCount[postId] || 0) + 1,
    }));
  };

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(postList.length / postsPerPage));

  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(currentPage * postsPerPage, postList.length);
    setCurrentPosts(postList.slice(startIndex, endIndex));
  }, [currentPage, postList]);

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
          {currentPosts.map((post, i) => {
            const postId = (currentPage - 1) * postsPerPage + i;
            if (!postList[postId]) return null;

            return (
              <tr
                className="table-row"
                key={postId}
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                  handleViewCount(postId);
                  navigate(`/post/${postId}`);
                }}
              >
                <td>{postId + 1}</td>
                <td>{postList[postId].title}</td>
                <td>{user}</td>
                <td>{commentCount[postId] || 0}</td>
                <td>{viewCount[postId] || 0}</td>
                <td>
                  {" "}
                  <button
                    onClick={(event) => {
                      deletePost(event);
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
        <PageNation
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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

const PageNation = ({ totalPages, setCurrentPage, currentPage }) => {
  const pagesPerGroup = 5;
  const [currentGroup, setCurrentGroup] = useState(1);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => {
      const pageNumber = startPage + i;
      return (
        <button
          key={pageNumber}
          className={currentPage === pageNumber ? "active" : ""}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    }
  );

  const prevPages = () => {
    if (startPage === 1) return;
    setCurrentGroup(currentGroup - 1);
  };

  const nextPages = () => {
    if (endPage === totalPages) return;
    setCurrentGroup(currentGroup + 1);
  };

  return (
    <div>
      <button
        onClick={() => {
          prevPages();
        }}
      >
        이전
      </button>
      {pageButtons}
      <button
        onClick={() => {
          nextPages();
        }}
      >
        다음
      </button>
    </div>
  );
};

export default Post;
