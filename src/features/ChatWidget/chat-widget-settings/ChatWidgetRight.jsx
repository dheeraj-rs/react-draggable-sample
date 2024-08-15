import React from 'react';

function ChatWidgetRight({ userName, time, userQuery }) {
  return (
    <div className="chat-right">
      <div className="d-flex  align-items-start">
        <div className="chat-cvr d-flex align-items-end w-100 justify-content-end">
          <div className="d-flex flex-column align-items-end">
            <span className="text-mist-gray text-secondary d-block ps-4 ">
              {' '}
              <span className="tick h-3 w-3 d-inline-block me-1" />
              {' '}
              {userName}
            </span>
            <div className="d-flex w-100 justify-content-end align-items-center mt-2">

              <div className="chat-border-right bg-blue-active text-white p-3 d-flex flex-column align-items-end gap-2 mb-1">
                <span>
                  {' '}
                  {userQuery}
                </span>

              </div>

            </div>
            <div className="text-secondary mt-2">{time}</div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ChatWidgetRight;
