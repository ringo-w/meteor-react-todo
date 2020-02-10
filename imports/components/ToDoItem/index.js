import React from "react";
import PropTypes from "prop-types";

const ToDoItem = ({ todo, toggleComplete, removeToDo }) => {
  return (
    <li>
      {todo.title}
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.complete}
        onChange={toggleComplete}
      />
      <label htmlFor={todo.id} />
      <button onClick={removeToDo}>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }).isRequired
};

export default ToDoItem;
