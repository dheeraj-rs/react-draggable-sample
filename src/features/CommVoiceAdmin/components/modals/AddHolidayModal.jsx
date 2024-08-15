/* eslint-disable indent */
import React from 'react';
import moment from 'moment';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import Calendars from '../../../../common/components/forms/Calendars';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';
import Input from '../../../../common/components/forms/Input';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function AddHolidayModal({
  show,
  onClose,
  setSelectedDate,
  selectedDate,
  isProcessing,

  formik,
}) {
  const handleOnClose = () => {
    onClose();
  };

  if (show) {
    return (
      <Modal show={show} width="450px" id="addHoliday">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Add Holiday</p>
          <ModalClose onClose={handleOnClose} />
        </div>

        <label className="text-primary mb-1">Enter Holiday</label>
        <div className="dropdown">
          <div
            className="input-group"
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
              placeholder="YYYY/MM/DD"
              aria-label="date"
              aria-describedby="date"
              name="holidayDate"
              onChange={formik.handleChange}
              value={formik.values.holidayDate}
              style={
                isFormFieldValid(formik, 'holidayDate')
                  ? { border: '0px' }
                  : { border: '1px solid #b2bcc8' }
              }
            />

            <a
              href="/"
              role="button"
              className="input-group-text bg-white"
              id="basic-addon2"
              style={
                isFormFieldValid(formik, 'holidayDate')
                  ? { border: '0px' }
                  : { border: '1px solid #b2bcc8' }
              }
            >
              <img src="/assets/date-icon.svg" alt="" />
            </a>
          </div>
          <span style={{ color: 'red' }}>{getFormErrorMessage(formik, 'holidayDate')}</span>

          <ul
            className="dropdown-menu drop-calendar w-50 ms-3 p-0 "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-blue-active rounded-top p-3 text-white">
              <p className="fw-bolder fs-12px mb-0">SELECT DATE</p>
              <p className="fw-medium fs-14px mb-0">
                {selectedDate
                  ? selectedDate?.toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                  : moment().format('ddd, MMM D')}
              </p>
            </div>
            <div className="p-2">
              <Calendars
                defaultYear={moment().year()}
                defaultMonth={moment().month()}
                defaultDay={moment().date()}
                onChange={(date) => {
                  const formattedDate = moment(date).format('YYYY/MM/DD');
                  console.log('formattedDate', formattedDate);
                  setSelectedDate(date);
                  formik.setFieldValue('holidayDate', formattedDate);
                }}
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
            id="addHolidayBtn"
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

export default AddHolidayModal;
