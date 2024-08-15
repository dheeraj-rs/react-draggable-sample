import React, { useEffect, useState } from 'react';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';
import InputModal from './InputModal';

function EnableComponentModal({ show, actionKey, onClose, action, isProcessing, title }) {
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

  if (show) {
    return (
      <>
        <div
          className={`modal fade${show ? ' show d-block' : ''}`}
          tabIndex="-1"
          id="enableComponent"
        >
          <div className="modal-dialog mt-65">
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                <div className="modal-header border-0">
                  <h4 className="modal-title text-dark fw-medium fs-15px">Enable Component</h4>

                  <a
                    href="/#"
                    type="button"
                    className="btn-close custom-backdrop-close"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOnClose();
                    }}
                  />
                </div>

                <div className="modal-body">
                  <p>
                    This action will enable the selected component <b>{title}</b> into the component
                    list.
                  </p>

                  <div className="d-flex gap-2 align-items-start bg-version-blue bg-version-blue p-3 mb-4 rounded">
                    <div>
                      <img src="/assets/info-svgrepo-com.svg" alt="" />
                    </div>
                    <div>
                      <p className="mb-0 text-blue-badge">
                        Once enabled the component, It will be move into the active component list
                        and also visible to users.
                      </p>
                    </div>
                  </div>

                  <InputModal
                    label="To confirm this action please type “Enable”"
                    id="AgentXYZ"
                    placeholder="Type “Enable”"
                    type="textbox"
                    disabled=""
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                  />
                </div>
                <div className="modal-footer border-top-0 justify-content-center">
                  <button
                    id="disableComponentSave"
                    type="button"
                    className="custom-backdrop-close btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                    onClick={() => {
                      setKey('');
                      action();
                    }}
                    disabled={isDisabled || isProcessing}
                  >
                    {isProcessing ? 'Loading...' : 'Save'}
                  </button>{' '}
                  <ButtonWhiteModalCancel text="Cancel" onCancel={handleOnClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
        ;
        <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
      </>
    );
  }
}

export default EnableComponentModal;
