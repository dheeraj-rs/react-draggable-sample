import React from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteApiModal({ formik, onClose, title, show, loading }) {
  const handleDelete = () => {
    formik.handleSubmit();
    // console.log('click handleSubmit');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div
        className="modal show"
        tabIndex="-1"
        id="deleteApis"
        style={show ? { display: 'block' } : {}}
      >
        <div className="modal-dialog mt-65">
          <div className="modal-content border-0">
            <div className="modal-content p-4">
              <div className="modal-header border-0">
                <h4 className="modal-title text-dark fw-medium fs-15px">Delete API</h4>

                <a href="#/" type="button" className="btn-close" onClick={handleClose} />
              </div>

              <div className="modal-body">
                <p>
                  This action will delete the selected API{' '}
                  <span className="fw-medium">{title}</span> from the library.
                </p>
                <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
                  <div>
                    <img alt="" src="/assets/info-blue.svg" />
                  </div>
                  <div>
                    <p className="mb-0 text-mariner">
                      Once delete the API, It wont be available for the component. this process
                      cannot undo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top-0 justify-content-start">
                <button
                  type="button"
                  className="btn bg-faded-red text-white px-4 py-12px delete-btn border-1"
                  id="deleteApiBtn"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default DeleteApiModal;
