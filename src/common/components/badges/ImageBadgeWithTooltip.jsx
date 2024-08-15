import React from 'react';

function ImageBadgeWithTooltip({
  bgColor, height, width, img, title
}) {
  return (

    <div role="button" data-bs-toggle="tooltip" data-bs-title={title} className={`bg-${bgColor} d-flex flex-column align-items-center justify-content-center fs-11px h-${height} w-${width} rounded fw-semibold`}>
      <img src={img} alt="" />
    </div>
  );
}

export default ImageBadgeWithTooltip;
