import React from 'react';

function NameBadge({
  bgColor, height, width, name, weight
}) {
  return (

    <div role="button" className={`bg-${bgColor} d-flex flex-column align-items-center justify-content-center fs-11px h-${height} w-${width} rounded fw-${weight}`}>
      {name}
    </div>
  );
}

export default NameBadge;
