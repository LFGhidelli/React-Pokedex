import React from "react";

const Pagination = (props) => {
  const {page, totalPages, onLeftClick, onRightClick} = props
  return (
    <div className="pagination-container">
      <button onClick={onLeftClick}>◀</button>
      <div>{page} of {totalPages}</div>
      <button onClick={onRightClick}>▶</button>
    </div>
  )
}


export default Pagination;
