import React from 'react';

function AgentBadge({ bgColor, color, textCase, size, medium, title }) {
  return (
    <span>
      <p
        className={`bg-${bgColor} rounded text-${color} text-${textCase}  fs-${size} fw-${medium} my-0 px-2 py-1 d-inline-flex`}
      >
        {title}
      </p>
    </span>
  );
}

export default AgentBadge;
