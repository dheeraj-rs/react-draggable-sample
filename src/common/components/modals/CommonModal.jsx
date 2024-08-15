import React, { useEffect, useState } from 'react';
import ButtonWhiteModalCancel from '../../../features/ChatWidget/components/ButtonWhiteModalCancel';
import InputLabel from '../../../features/ChatWidget/components/InputLabel';

function CommonModal({
  isVisible,
  title,
  actionType,
  onClose,
  text,
  label,
  actionKey,
  btnLabel,
  isProcessing,
  handleAction,
}) {
  const [key, setKey] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleOnClose = () => {
    setKey('');
    onClose();
  };
  useEffect(() => {
    if (key && key.toLocaleLowerCase() === actionKey?.toLocaleLowerCase()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [key]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal mt-65 show"
          tabIndex="-1"
          id="deleteModel"
          style={{ display: 'block' }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="">
              <div className="modal-content p-4 mt-0">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <h4 className="modal-title text-dark fw-medium fs-15px">{title}</h4>

                  <span
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={handleOnClose}
                  />
                </div>

                <div className="modal-body">
                  <p>
                    This action will <span className="text-red">{actionType}</span>
                    {text}
                  </p>

                  <InputLabel
                    id="responseTitle"
                    placeholder={`Type “${actionKey}”`}
                    type="textbox"
                    disabled="false"
                    value={key}
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                    label={label}
                  />
                </div>
                <div className="modal-footer border-top-0 justify-content-center">
                  <button
                    type="button"
                    className="btn bg-faded-red text-white px-4 py-12px delete-btn border-1"
                    id="deleteWidgetBtn"
                    onClick={() => {
                      setKey('');
                      handleAction();
                    }}
                    disabled={isDisabled || isProcessing}
                  >
                    {isProcessing ? 'processing ...' : btnLabel}
                  </button>
                  <ButtonWhiteModalCancel text="cancel" onCancel={handleOnClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" />
      </>
    );
  }
  return <div />;
}

export default CommonModal;
