import React from 'react';
import { Link } from 'react-router-dom';
import ModalRight from '../../../../common/components/modals/ModalRight';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Select2 from '../../../../common/components/forms/Select2';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function EditContactSecondPageModal() {
  return (
    <ModalRight width="450px" id="editContactSecondPage">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-3">Edit contact</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary">Manage and modify contact details.</p>

      <p className="text-primary fs-13px">Phone numbers</p>

      <div className="p-3 bg-white-azurish rounded">
        <input
          id="phoneEditContact3"
          type="tel"
          className="form-control bg-white w-100"
          name="phone"
          style={{ minWidth: '350px' }}
        />

        <div className="d-flex gap-3 justify-content-start align-items-center mt-2">
          <label className="switch mt-2">
            <input type="checkbox" defaultChecked />
            <span className="slider round" />
          </label>
          <span className="fw-normal fs-13px mt-1">Default</span>
        </div>
      </div>
      <div className="p-3 bg-light rounded mt-2">
        <input
          id="phoneEditContact4"
          type="tel"
          className="form-control bg-white"
          name="phone"
          style={{ minWidth: '350px' }}
        />

        <div className="d-flex gap-3 justif-content-start align-items-center mt-2">
          <label className="switch mt-2">
            <input type="checkbox" />
            <span className="slider round" />
          </label>
          <span className="fw-normal fs-13px mt-1">Default</span>
          <div className="ms-auto">
            <Link to="/">
              {' '}
              <img src="/assets/delete.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-3 d-flex align-items-center">
        <Link to="/" className="text-blue-badge">
          <img className="pe-2" src="/assets/plus-circle.svg" alt="" />
          Add number
        </Link>
      </div>
      <div className="form-group form-custom-group mt-3">
        <label htmlFor="assign">Groups (You can associate to multiple groups)</label>
        <Select2 />
      </div>

      <div className="modal-footer d-flex justify-content-start align-items-center border-0 ps-0 mt-3">
        <button
          id="editContactToast"
          data-bs-dismiss="modal"
          type="button"
          className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
        >
          Update Contact
        </button>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editContactSecondPage"
          className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-lg-3 ms-0"
        >
          Back
        </button>
        <ButtonWhiteModalCancel text="Cancel" />
      </div>
    </ModalRight>
  );
}

export default EditContactSecondPageModal;
