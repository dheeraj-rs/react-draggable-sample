import React from 'react';

function Button({ option, btnImage, btnName, bgColor, textColor }) {
  return (
    <button
      type="button"
      className={`btn bg-${bgColor} d-flex align-items-center text-${textColor} px-3 py-12px`}
    >
      <i className="me-2">
        {option === 0 ? (
          <span>
            <img className="rounded-circle" src={btnImage} width="22" height="22" alt="# " />
          </span>
        ) : null}
        {option === 1 ? (
          <span className="position-relative">
            <img className="rounded-circle" src={btnImage} width="22" height="22" alt="# " />
            <img
              className="rounded-circle position-absolute top-50 start-50 bg-white"
              src="/assets/facebook.svg"
              alt="# "
            />
          </span>
        ) : null}
      </i>
      <span>{btnName}</span>
    </button>
  );
}

export default Button;
