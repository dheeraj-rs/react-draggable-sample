import React, { useEffect, useState } from 'react';
import ButtonWhiteModalCancel from '../../../features/ChatWidget/components/ButtonWhiteModalCancel';
import InputLabel from '../../../features/ChatWidget/components/InputLabel';

function ClearModel({ isOpen, onClose, callBack, text, label, action, isDeleting, btnLabel }) {
  const [key, setKey] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleOnClose = () => {
    setKey('');
    onClose();
  };
  useEffect(() => {
    if (key.toLocaleLowerCase() === 'clear') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [key]);
  if (isOpen) {
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
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <h4 className="modal-title text-dark fw-medium fs-15px">Clear widget</h4>

                  <span
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={handleOnClose}
                  />
                </div>

                <div className="modal-body">
                  <p>
                    This action will <span className="text-red">Clear</span>
                    {text}
                  </p>

                  <InputLabel
                    id="responseTitle"
                    placeholder="Type “Clear"
                    type="textbox"
                    disabled="false"
                    value={key}
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                    label={label}
                    action={action}
                  />
                </div>
                <div className="modal-footer border-top-0 justify-content-center">
                  <button
                    type="button"
                    className="btn bg-faded-red text-white px-4 py-12px delete-btn border-1"
                    id="deleteWidgetBtn"
                    onClick={() => {
                      setKey('');
                      callBack();
                    }}
                    disabled={isDisabled || isDeleting}
                  >
                    {isDeleting ? 'Clearing ...' : btnLabel}
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

export default ClearModel;
