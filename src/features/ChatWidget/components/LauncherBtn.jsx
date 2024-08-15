import React from 'react';

function LauncherBtn({ active, onClick, img }) {
  return (
    <div
      role="button"
      className={`border launcher-btn common-hover d-flex  ${
        active === true && 'common-hover-active'
      }`}
      onClick={onClick}
    >
      <img src={img} alt="" />
    </div>
  );
}

export default LauncherBtn;
