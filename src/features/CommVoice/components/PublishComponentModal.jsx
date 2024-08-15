import React, { useEffect, useState } from 'react';
import InputModal from './InputModal';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';

function PublishComponentModal({ show, actionKey, onClose, action, isProcessing }) {
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
          id="PublishTemplate"
        >
          <div className="modal-dialog mt-65">
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                <div className="modal-header border-0">
                  <h4 className="modal-title text-dark fw-medium fs-15px">Publish Components</h4>

                  <a
                    href="/#"
                    type="button"
                    className="btn-close"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOnClose();
                    }}
                  />
                </div>

                <div className="modal-body">
                  <img src="/assets/publish-temp.svg" className="mb-3" alt="" />
                  <p>This action will publish the call flow component list.</p>
                  <InputModal
                    label="To confirm this action please type “Publish”"
                    id="AgentXYZ"
                    placeholder="Type “Publish”"
                    type="textbox"
                    disabled=""
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                  />
                </div>
                <div className="modal-footer border-top-0 justify-content-start">
                  <button
                    id="publishTemplatebtn"
                    type="button"
                    className="custom-backdrop-close btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                    disabled={isDisabled || isProcessing}
                    onClick={() => {
                      setKey('');
                      action();
                    }}
                  >
                    {isProcessing ? 'Loading...' : '  Publish Components'}
                  </button>
                  <ButtonWhiteModalCancel text="Cancel" onCancel={handleOnClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
      </>
    );
  }
}

export default PublishComponentModal;
