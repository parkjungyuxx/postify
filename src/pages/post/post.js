import Header from "../home/header";
import SideNavBar from "../home/sideNavBar";
import List from "./list";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import "../../css/post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faFaceGrinTongueWink,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Post = () => {
  const [postList, setPostList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="post-container">
      <table>
        <thead className="post-table-head">
          <tr>
            <th>PostID</th>
            <th>제목</th>
            <th>
              댓글수
              <FontAwesomeIcon icon={faComment} />
            </th>
            <th>
              조회수
              <FontAwesomeIcon icon={faFaceGrinTongueWink} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </table>
      <div className="post-bottom">
        pagenation{" "}
        <Button
          onClick={handleShow}
          className="add-post-btn"
          variant="warning"
        >
          글 쓰기
        </Button>
      </div>
      <AddPostModal show={show} handleClose={handleClose} />
    </div>
  );
};

const AddPostModal = ({ show, handleClose }) => {
  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>글 작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="글 제목을 입력하세요" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postContent">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="글 내용을 입력하세요" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleClose}>
          글쓰기
        </Button>
      </Modal.Footer>
    </Modal>
  </>;
};

export default Post;
