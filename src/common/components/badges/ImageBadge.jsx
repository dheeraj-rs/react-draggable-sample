import React from 'react';

function ImageBadge({
  bgColor, height, width, img
}) {
  return (

    <div role="button" className={`bg-${bgColor} d-flex flex-column align-items-center justify-content-center fs-11px h-${height} w-${width} rounded fw-semibold`}>
      <img src={img} alt="" />
    </div>
  );
}

export default ImageBadge;
