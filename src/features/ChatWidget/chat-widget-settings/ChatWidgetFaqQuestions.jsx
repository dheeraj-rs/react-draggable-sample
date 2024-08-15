import React from 'react';

function ChatWidgetFaqQuestions({ onClick, serialNum, qns }) {
  return (
    <div
      role="button"
      className="map-topics map-faq-details d-flex align-items-center shadow-6 rounded p-3 gap-3 mb-3"
      onClick={onClick}
    >
      <div>
        <img src="/assets/questioner-icon.svg" alt="" />
      </div>
      <div>
        <p className="text-primary fw-medium mb-0">
          <span>{serialNum}</span> {qns}
        </p>
      </div>
    </div>
  );
}

export default ChatWidgetFaqQuestions;
