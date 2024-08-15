/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useRef } from 'react';

function ToastError(props) {
  const wrapperRef = useRef(null);

  const dismissAll = () => props.onClose();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dismissAll();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayedFunction = () => {
      props.onClose();
    };

    let timeoutId;

    const startDelayedExecution = () => {
      timeoutId = setTimeout(() => {
        delayedFunction();
        clearTimeout(timeoutId);
      }, 3000);
    };

    if (props.showToast === true) {
      startDelayedExecution();
    }

    // Cleanup the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.showToast, props]);

  if (props.showToast) {
    return (
      <div
        ref={wrapperRef}
        aria-live="polite"
        aria-atomic="true"
        className="d-flex justify-content-center align-items-center w-100 bg-success"
      >
        <div className="position-fixed p-3 top-0 start-50" style={{ zIndex: 11 }}>
          <div
            id={props.id}
            className="toast toast-save w-100 shadow-none border-0 show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div
              className={`d-flex align-items-center ${
                props.isSuccess ? 'bg-s-green' : ''
              } rounded shadow-6`}
              style={props.isSuccess ? '' : { backgroundColor: '#e61616' }}
            >
              <div className="toast-body text-white d-flex align-items-center">
                <img src="/assets/check-white.svg" className="me-2" alt="" /> {props.children}
              </div>
              <a
                href="/#"
                className=" me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <img
                  src="/assets/close-support.svg"
                  onClick={() => {
                    props?.onClose();
                  }}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}

export default ToastError;
