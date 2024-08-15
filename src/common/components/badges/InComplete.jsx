import React from 'react';

function StatusBadge({ title }) {
  return (
    <span>
      <p className="bg-tropical-blue rounded text-blueberry text-uppercase fs-10px fw-bolder my-0 px-2 py-1 d-inline-flex">
        {title}
      </p>
    </span>
  );
}

export default StatusBadge;
