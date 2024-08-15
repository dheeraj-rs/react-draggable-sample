import React from 'react';

function NotSubmitted({ title }) {
  return (
    <span>
      <p className="bg-yellow-bisque rounded text-yellow-600 text-uppercase fs-10px fw-bolder my-0 px-2 py-1 gap-1 d-inline-flex">

        {title}
      </p>
    </span>
  );
}

export default NotSubmitted;
