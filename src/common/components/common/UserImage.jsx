import React from 'react';

function UserImage({ imgHeight, imgWidth, name }) {
  return (
    <div
      className={`avatar  h-${imgHeight} w-${imgWidth} min-width-2 d-inline-flex align-items-center justify-content-center text-center text  text-uppercase bg-light-blue rounded-circle position-relative ms-2 ms-lg-0 fs-3`}
    >
      {name}
    </div>
  );
}

export default UserImage;
