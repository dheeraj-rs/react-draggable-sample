import React from 'react';

function ButtonOutlineWhite({ text }) {
  return (
    <button type="button" className="btn d-flex border text-white gap-3 px-4  py-12px">
      {text} <img src="/assets/arrow-right.svg" alt="" />
    </button>
  );
}

export default ButtonOutlineWhite;
