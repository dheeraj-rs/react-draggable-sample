import React from 'react';

function ButtonDisabled({ text }) {
  return (
    <button type="button" className="btn bg-disable-btn fw-500 text-disable px-4  py-12px ">
      {text}
    </button>
  );
}

export default ButtonDisabled;
