import React from 'react';

function CountBadge({ from, to }) {
  return (
    <div className="bg-gray-blue fs-13px text-white rounded-1 mb-0 px-2 py-1">
      <span className="fw-semibold">{from}</span> of <span className="fw-semibold">{to}</span>
    </div>
  );
}

export default CountBadge;
