import React, { useEffect, useState } from 'react';
import InputModal from '../../CommVoice/components/InputModal';
import ButtonWhiteModalCancel from '../../../common/components/buttons/ButtonWhiteModalCancel';

function DisableTimeSlotModal({ show, actionKey, onClose, action, title, isProcessing }) {
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
          id="disableComponent"
        >
          <div className="modal-dialog mt-65">
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                <div className="modal-header border-0">
                  <h4 className="modal-title text-dark fw-medium fs-15px">Disable TimeSlot</h4>

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
                    This action will disable the selected timeslot <b>{title}</b> from the time slot
                    list.
                  </p>

                  <InputModal
                    label="To confirm this action please type “Disable”"
                    id="AgentXYZ"
                    placeholder="Type “Disable”"
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
                  <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
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
export default DisableTimeSlotModal;
