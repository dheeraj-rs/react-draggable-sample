import React from 'react';

function DraftBadge({ title }) {
  return (
    <span>
      <p className="bg-sandal-color rounded text-sandal-dark text-uppercase fs-9px fw-bolder my-0 px-2 py-1 gap-1 d-inline-flex">
        {title}
      </p>
    </span>
  );
}

export default DraftBadge;
