import React from 'react';

function ButtonLogin({ text }) {
  return (
    <button type="button" className="btn d-flex gap-3 px-4  py-12px learn-more">
      {text} <img src="/assets/arrow-right.svg" alt="" />
    </button>
  );
}

export default ButtonLogin;
