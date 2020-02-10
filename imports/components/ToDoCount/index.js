import React from "react";
import PropTypes from "prop-types";

const ToDoCount = ({ number }) => {
  return <span>{number > 1 ? `Count: ${number}` : "Nothing to do"}</span>;
};
ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

export default ToDoCount;
