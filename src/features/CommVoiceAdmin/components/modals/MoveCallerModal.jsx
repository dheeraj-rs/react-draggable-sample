import React, { useState } from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function MoveCallerModal({ show, onClose, formik, dataSubmitting, callerList = [] }) {
  const [toggle, setToggle] = useState(false);

  const handleClose = () => {
    setToggle(false);

    formik.resetForm();
    onClose();
  };

  if (show) {
    return (
      <Modal width="450px" id="moveModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">Move Caller</p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="fs-13px text-secondary mb-3">
          This action will <span className="fw-medium">Move</span> the selected Caller
        </p>

        <div className="">
          <label className="mb-1 text-primary fs-13px">Move to List</label>
          <div
            className="select"
            style={formik?.errors?.selectedCallerList ? { border: '1px solid red' } : {}}
          >
            <div
              className="selectBtn"
              data-type="firstOption"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              {formik?.values?.selectedCallerListName}
            </div>
            <div
              className={`selectDropdown ${toggle ? 'toggle' : ''}`}
              style={toggle ? { zIndex: '10' } : {}}
            >
              {callerList?.data?.map((list, index) => (
                <div
                  key={index}
                  className="option"
                  data-type="firstOption"
                  onClick={() => {
                    setToggle(false);
                    formik.setFieldValue('selectedCallerListName', list?.attributes?.name);
                    formik.setFieldValue('selectedCallerListId', list?.id);
                  }}
                >
                  {list?.attributes?.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-2">
          <button
            // data-bs-dismiss="modal"
            id="moveButton"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-3 py-12px"
            disabled={dataSubmitting}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {dataSubmitting ? 'Moving...' : 'Move'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
        </div>
      </Modal>
    );
  }
  return null;
}

export default MoveCallerModal;
