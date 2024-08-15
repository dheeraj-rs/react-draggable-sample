import React from 'react';

function Connect({ isVisible, edges = [], activeNodeId = '', moveToNextNode }) {
  const options = [
    { title: 'On Call Ends', type: 'on-call-ends' },
    { title: 'Agent is/are not available', type: 'agent-not-available' },
    { title: 'Agent is online but no answer ', type: 'agent-not-answered' },
    { title: 'All agents are busy', type: 'agent-busy' },
    { title: 'No response from URL', type: 'no-response-from-url' },
  ];

  const handleMove = (type) => {
    const result = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === type
    )[0];
    moveToNextNode(result?.target);
  };

  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="connectCall"
    >
      <div className="choose-agent px-3 mt-4">
        <div className="bg-cyan-blue p-4 d-flex justify-content-center rounded py-5">
          <p className="mb-0 text-blue-active">Ringing...</p>
        </div>

        <div className="choose-ivr mt-4 pb-3">
          <h6 className="mb-3">Choose an option to redirect the flow</h6>

          <div className="" />
          <div className="ivr-btns d-flex gap-2 flex-column">
            {options?.map((option, index) => (
              <a
                key={index}
                href="/#"
                role="button"
                type="btn"
                className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleMove(option.type);
                }}
              >
                {option?.title} <img src="/assets/next-filled.svg" alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connect;
