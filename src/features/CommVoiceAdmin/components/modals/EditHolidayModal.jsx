import React from 'react';
import moment from 'moment';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';
import Calendars from '../../../../common/components/forms/Calendars';
import Input from '../../../../common/components/forms/Input';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function EditHolidayModal({ show, onClose, formik, setSelectedDate, isProcessing }) {
  const handleOnClose = () => {
    onClose();
  };
  if (show) {
    return (
      <Modal show={show} width="450px" id="editHoliday">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Edit Holiday</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <div className="dropdown">
          <div
            className="input-group mb-3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={
              isFormFieldValid(formik, 'holidayDate')
                ? { border: '1px solid red', borderRadius: '8px' }
                : { border: '' }
            }
          >
            <input
              type="text"
              className="form-control bg-white border-end-0"
              name="holidayDate"
              onChange={formik.handleChange}
              value={formik.values.holidayDate}
              placeholder="DD-MM-YY"
              aria-label="date"
              aria-describedby="date"
            />
            <a href="/" role="button" className="input-group-text bg-white" id="basic-addon2">
              <img src="/assets/date-icon.svg" alt="" />
            </a>
          </div>
          <span style={{ color: 'red' }}>{getFormErrorMessage(formik, 'holidayDate')}</span>

          <ul
            className="dropdown-menu drop-calendar w-50 ms-3 p-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-blue-active rounded-top p-3 text-white">
              <p className="fw-bolder fs-12px mb-0">SELECT DATE</p>

              <p className="fw-medium fs-14px mb-0">
                {formik.values.holidayDate &&
                  new Date(
                    formik.values.holidayDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
                  ).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
              </p>
            </div>
            <div className="p-2">
              <Calendars
                onChange={(date) => {
                  const formattedDate = moment(date).format('YYYY/MM/DD');
                  console.log('formattedDate', formattedDate);
                  setSelectedDate(date);
                  formik.setFieldValue('holidayDate', formattedDate);
                }}
                holidayDate={formik.values.holidayDate}
              />
            </div>
          </ul>
        </div>

        <Input
          label="Holiday Name"
          id="delete"
          placeholder="Enter a holiday name"
          type="text"
          name="holidayName"
          onChange={formik.handleChange}
          value={formik.values.holidayName}
          style={
            isFormFieldValid(formik, 'holidayName')
              ? { border: '1px solid red', borderRadius: '8px' }
              : { border: '' }
          }
        />
        <span style={{ color: 'red' }}>{getFormErrorMessage(formik, 'holidayName')}</span>

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="editHolidayBtn"
            className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px"
            data-bs-dismiss="modal"
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Save'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
        </div>
      </Modal>
    );
  }
}

export default EditHolidayModal;
