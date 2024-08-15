import React from 'react';

function ReadMoreLess({ id, text, moreText, message }) {
  return (
    <div>
      <input type="checkbox" className="read-more-state" id={id} />

      <p className="read-more-wrap text-primary fw-normal mb-0">
        {text} <span className="read-more-target">{moreText}</span>
      </p>

      {message?.length > 178 && <label htmlFor={id} className="read-more-trigger" />}
    </div>
  );
}

export default ReadMoreLess;
