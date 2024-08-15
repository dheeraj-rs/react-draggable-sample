import React from 'react';

function DangerBadge({ title }) {
  return (
    <span>
      <p className="bg-pink-pale rounded text-red-lust text-uppercase fs-12px fw-bolder my-0 px-2 py-1 gap-1 d-inline-flex">
        {title}
      </p>
    </span>
  );
}

export default DangerBadge;
