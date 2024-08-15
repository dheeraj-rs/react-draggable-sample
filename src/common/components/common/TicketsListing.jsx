import React from 'react';

function TicketList({ ticketNumber, userName, createdDate, dueDate, priority, textColor, active }) {
  return (
    <div
      role="button"
      className={`existing-ticket-list mt-4 rounded-3 py-3 px-4 border existing-ticket-list-${active} `}
    >
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <div className={`rounded-3 py-2 fw-500 text-${textColor}`}>{ticketNumber} </div>
        <div className="d-flex align-items-center">
          {' '}
          <span className="badge bg-light-bright-yellow d-inline-block h-2 w-2 rounded-circle" />
          <span className="text-primary ms-2">{priority}</span>
        </div>
      </div>
      <div className="fw-normal">
        Conversation with
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="fw-500"
        >
          {userName}{' '}
        </a>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-3 gap-2">
        <div>
          <span className="text-primary">Created at </span>
          <span className="text-secondary fw-500">{createdDate}</span>
        </div>
        |
        <div>
          <span className="text-primary"> Due in </span>
          <span className="text-secondary fw-500">{dueDate}</span>
        </div>
      </div>
    </div>
  );
}

export default TicketList;
