import "../../css/todo.css";
import { useEffect, useRef, useState } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todo");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList || { todoList: [] }));
  }, [todoList]);
  const [todo, setTodo] = useState("");

  const addTodoList = (event) => {
    event.preventDefault();
    if (!todo) return alert("할일을 작성해주세요");

    setTodoList([...todoList, todo]);
    setTodo("");
  };
  const handleOnChange = (event) => {
    const inputValue = event.target.value;
    setTodo(inputValue);
  };

  const handleDelete = (i) => {
    const copy = [...todoList];
    copy.splice(i, 1);
    setTodoList(copy);
  };

  return (
    <div className="todo-container">
      <h1>TODO</h1>
      <form
        className="todo-form"
        onSubmit={(event) => {
          addTodoList(event);
        }}
      >
        <input
          value={todo}
          onChange={(event) => {
            handleOnChange(event);
          }}
        />
        <button>추가</button>
      </form>
      {todoList.map((el, i) => {
        return (
          <ListBox
            el={el}
            i={i}
            handleDelete={handleDelete}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        );
      })}
    </div>
  );
};

const ListBox = ({ el, i, handleDelete, todoList, setTodoList }) => {
  let [isEditing, setIsEditing] = useState(false);
  const editInput = useRef(null);
  const [editText, setEditText] = useState("");

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setTimeout(() => editInput.current.focus(), 0);
  };

  const handleEditText = (event) => {
    const editingText = event.target.value;
    setEditText(editingText);
  };

  const finishEdit = (event) => {
    event.preventDefault();
    const copy = [...todoList];
    copy.splice(i, 1, editText);
    setTodoList(copy);
    setIsEditing(!isEditing);
  };

  return !isEditing ? (
    <div className="todo-list" key={i}>
      <p>{el}</p>
      <div>
        <button
          onClick={() => {
            handleDelete(i);
          }}
        >
          삭제
        </button>
        <button
          onClick={() => {
            handleEdit(i);
          }}
        >
          수정
        </button>
      </div>
    </div>
  ) : (
    <form
      className="todo-list"
      onSubmit={(event) => {
        finishEdit(event);
      }}
    >
      <input
        ref={editInput}
        className="edit-input"
        onChange={(event) => {
          handleEditText(event);
        }}
      />
      <button>완료</button>
    </form>
  );
};

export default Todo;
