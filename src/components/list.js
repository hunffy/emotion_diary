import React, { useEffect } from "react";
const List = ({ item, handleDeleteClick, handleCheckClick }) => {
  useEffect(() => {});
  return (
    <div className="todo-list">
      <div className="list-wrapper">
        <div
          className={item.checked ? `list-content-check` : `list-content`}
          onClick={() => {
            handleCheckClick(item);
          }}
        >
          <span className="list-text">{item.text}</span>
        </div>
        <button
          className="delete-btn"
          onClick={() => {
            handleDeleteClick(item);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default React.memo(List);
