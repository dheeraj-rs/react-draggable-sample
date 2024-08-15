import moment from 'moment';
import React from 'react';
import { Tooltip } from 'react-tooltip';

function Holidays({ day, holiday, setShow, id, formik }) {
  return (
    <div className="row holiday-hover justify-content-between border-transparent align-items-center p-2 p-lg-2 p-sm-2 py-3 py-lg-2 rounded mt-2  cursor-pointer mx-0 flex-wrap ">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-5 col-md-4 col-lg-3  mb-lg-0 mb-3 mb-sm-0">
        <a href="/#" className="d-flex flex-column align-items-center justify-content-center ">
          <img src="/assets/calendar-holiday.svg" alt="holiday icon" />
        </a>

        <div className="d-flex flex-grow-1">
          <a href="/#" className="text-primary fw-medium">
            {moment(day).format('MMM DD')}
          </a>
        </div>
      </div>
      <div className="col-7 col-md-4 col-lg-3  ">
        <p className="mb-lg-0 mb-3 mb-sm-0">
          <span className="text-primary fs-13px">{holiday}</span>
        </p>
      </div>

      <div className="col-12 col-md-4 col-lg-3  mt-3 mt-lg-0 mt-sm-0 operation-sec">
        <div className="d-flex align-items-center px-lg-2 px-sm-3 justify-content-start justify-content-lg-end gap-3 gap-lg-4 gap-sm-1 py-lg-2 py-sm-2">
          <div className="d-flex gap-3 ms-2 ps-3 opacity-rate">
            <a
              className="row-action-agent"
              href="/#"
              // data-bs-toggle="modal"
              // data-bs-target="#editHoliday"
            >
              <div
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-tooltip-id="tooltip-agent-timeslot-edit"
                onClick={(e) => {
                  e.preventDefault();
                  setShow({
                    isVisible: true,
                    type: 'edit-holiday-modal',
                    holidayId: id,
                  });
                  formik.setFieldValue('holidayDate', moment(day).format('YYYY/MM/DD'));
                  formik.setFieldValue('holidayName', holiday);
                }}
              >
                <Tooltip id="tooltip-agent-timeslot-edit" content="Edit Holiday" place="top" />

                <img src="/assets/edit-voice.svg" alt="" />
              </div>
            </a>
            <a
              className="row-action-agent"
              href="/#"
              // data-bs-toggle="modal"
              // data-bs-target="#deleteHolidayModal"
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  isVisible: true,
                  type: 'delete-holiday-modal',
                  holidayName: holiday,
                  holidayId: id,
                });
              }}
            >
              <div
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-original-title="Delete Holiday"
                data-tooltip-id="tooltip-agent-timeslot-delete"
              >
                <Tooltip id="tooltip-agent-timeslot-delete" content="Delete Holiday" place="top" />

                <img src="/assets/delete-voice.svg" alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Holidays;
