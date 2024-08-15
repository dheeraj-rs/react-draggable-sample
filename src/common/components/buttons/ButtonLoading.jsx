import React from 'react';

function ButtonLoading() {
  return (
    <button
      type="button"
      className="btn bg-black d-flex align-items-center justify-content-center rounded-circle text-white px-4  py-12px"
    >
      <img src="/assets/circular-dots.svg" alt="" />
    </button>
  );
}

export default ButtonLoading;
