import React from 'react';
import ButtonToast from '../../../../common/components/toast/ButtonToast';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function SmsModal() {
  return (
    <div className="modal mt-65" tabIndex="-1" id="smsSender">
      <div className="modal-dialog">
        <div className="modal-content border-0">
          <div className="modal-content p-4">
            {/* <!-- Modal Header --> */}
            <div className="modal-header border-0">
              <h4 className="modal-title text-dark fw-medium fs-15px">SMS Sender ID added</h4>

              <a to="/" type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body">
              <p>
                Request has been send. Waiting for the approval. Once approved the id will be active
              </p>
            </div>
            <div className="modal-footer border-top-0 justify-content-center">
              <ButtonToast text="OK" btnID="okMessage" />
              <ButtonWhiteModalCancel text="cancel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmsModal;
