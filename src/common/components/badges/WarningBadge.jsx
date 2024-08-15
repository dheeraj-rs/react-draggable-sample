import React from 'react';

function WarningBadge({
  title, pill, icon, className
}) {
  return (
    <span
      className={`bg-orange-100 px-3 py-2 d-flex align-items-start gap-2 ${
        pill === true ? 'rounded-pill' : 'rounded'
      }`}
    >
      <img src={icon} alt="" />
      <p
        className={`text-primary fs-12px my-0 gap-1 d-inline-flex ${className}`}
      >
        {title}
      </p>
    </span>
  );
}

export default WarningBadge;
