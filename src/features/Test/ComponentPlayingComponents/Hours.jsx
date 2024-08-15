import React from 'react';

function Hours({ isVisible, edges = [], activeNodeId = '', moveToNextNode }) {
  const options = [
    { title: 'Choose Agent Working Hours', type: 'working-hours' },
    { title: 'On Agent Non-Working Hours', type: 'non-working-hours' },
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
      id="callHours"
    >
      <div className="choose-agent px-3 mt-4">
        <h6 className="text-secondary mb-2  pt-4">Choose Agent Working Hours</h6>
        <div className="d-flex flex-column gap-2">
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
  );
}

export default Hours;
