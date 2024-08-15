import React from 'react';

function ButtonRed({ text, onClick }) {
  return (
    <button type="button" className="btn bg-faded-red text-white px-4  py-12px" onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonRed;
