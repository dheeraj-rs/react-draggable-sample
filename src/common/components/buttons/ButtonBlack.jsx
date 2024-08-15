import React from 'react';

function ButtonBlack({ text, onClick }) {
  return (
    <button
      type="button"
      className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonBlack;
