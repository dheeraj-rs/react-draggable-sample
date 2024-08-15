import React from 'react';
import { Link } from 'react-router-dom';
import ButtonToast from '../../../../common/components/toast/ButtonToast';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function ChangeRoleModal({ show, onClose, agent, role, onSave }) {
  if (show) {
    return (
      <>
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <h4 className="modal-title text-dark fw-medium fs-15px">Change role</h4>

                  <Link
                    to="/"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                  />
                </div>

                <div className="modal-body">
                  <p>
                    This action will <b>Change</b> the role of <b>{agent?.attributes.first_name}</b>{' '}
                    to <b>{role}.</b>
                  </p>

                  <div className="d-flex gap-2 align-items-start bg-version-blue bg-version-blue p-3 mb-4 rounded">
                    <div>
                      <img src="/assets/info-svgrepo-com.svg" alt="" />
                    </div>
                    <div>
                      <p className="mb-0 text-blue-badge">
                        {`Once confirmed the ${agent?.attributes.first_name} has the full access over the application and
                        related settings.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top-0 justify-content-center">
                  <ButtonToast
                    text="Save"
                    btnID="roleSave"
                    onClick={() => {
                      onSave();
                    }}
                  />
                  <ButtonWhiteModalCancel text="cancel" onCancel={() => onClose()} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop show"
          onClick={() => {
            onClose();
          }}
        />
      </>
    );
  }
  return '';
}

export default ChangeRoleModal;
