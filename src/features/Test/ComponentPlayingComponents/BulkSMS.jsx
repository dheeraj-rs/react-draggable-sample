import React, { useEffect } from 'react';
import useStore from '../store';

function BulkSMS({ isVisible }) {
  const { componentPlayingDetails, setComponentPlayingDetails, activeNodeId } = useStore();

  useEffect(() => {
    if (isVisible && activeNodeId) {
      setComponentPlayingDetails({
        parentType: 'sendSMS',
        parentId: activeNodeId,
      });
    }
  }, [isVisible, activeNodeId]);

  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="callHours"
    >
      <div className="choose-agent px-3 mt-4">
        <div className="d-flex flex-column gap-2">
          <a
            href="/#"
            role="button"
            type="btn"
            className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            onClick={(e) => {
              e.preventDefault();
              setComponentPlayingDetails({
                ...componentPlayingDetails,
                type: 'after-sms-sent',
              });
            }}
          >
            After sms message sent <img src="/assets/next-filled.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BulkSMS;
