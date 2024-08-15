import React from 'react';

function ButtonBlackModal({ text, target }) {
  return (
    <button
      type="button"
      className="btn bg-black text-white px-4  py-12px"
      data-bs-toggle="modal"
      data-bs-target={target}
    >
      {text}
    </button>
  );
}

export default ButtonBlackModal;
