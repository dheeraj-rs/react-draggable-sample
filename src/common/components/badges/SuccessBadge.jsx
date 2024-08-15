import React from 'react';

function SuccessBadge({ title }) {
  return (
    <span>
      <p className="bg-green-torquoise rounded text-green text-uppercase fs-10px fw-bolder my-0 px-2 py-1 gap-1 d-inline-flex">
        <img src="/assets/svg/check-green.svg" alt="" />
        {title}
      </p>
    </span>
  );
}

export default SuccessBadge;
