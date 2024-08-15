/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import { Tooltip } from 'react-tooltip';
import SpinningLoader from '../../../../common/components/Loader/SpinningLoader';

function EditTimeSlotOffcanvas({
  show,
  setShow,
  isProcessing,
  addNewSlot,
  formik,
  updateSlot,

  dayName,
  id,
  action,
}) {
  const hanldeClose = () => {
    formik.setFieldValue('slots', [{ startTime: '', endTime: '' }]);
    setShow({ isVisible: false, type: '' });
  };
  // const handleClearAll = () => {
  //   const clearedTimeSlots = Array.from({ length: formik.values.slots.length }, () => ({
  //     startTime: '',
  //     endTime: '',
  //   }));

  //   formik.setFieldValue('slots', clearedTimeSlots);
  // };

  const isStartTimeAvailable = (index) => {
    return formik.values.slots[index]?.startTime === '';
  };
  return (
    <>
      <div
        className={`offcanvas offcanvas-end offcanvas-time ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasEditTime"
        aria-labelledby="offcanvasEditTimeLabel"
      >
        <div className="offcanvas-header offcanvas-header-title justify-content-between p-23px pb-10px">
          <div className="d-flex flex-column">
            <h5
              className="mb-0 offcanvas-title text-dark fs-16px fw-medium"
              id="offcanvasEditContactLabel"
            >
              Edit Time Slot
            </h5>
            <p className="mb-0 fs-13px text-secondary">
              Add multiple working hour slots for a {dayName}
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={hanldeClose}
            />
          </div>
        </div>

        <div className="offcanvas-body p-23px pt-0px">
          <div>
            <p className="mb-0 text-black fw-medium mt-2">{dayName}</p>
          </div>
          {isProcessing ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                <SpinningLoader />
              </div>
            </div>
          ) : (
            formik?.values?.slots?.map((timeslot, index) => (
              <div className="p-3 rounded time-slot-box mt-3" key={index}>
                <p className="text-secondary fw-medium">Time Slot {index + 1}</p>
                <div className="d-flex align-items-center flex-wrap gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-primary">From</span>
                    <input
                      type="time"
                      className="form-control clear-input time-input bg-white"
                      id="timeFrom"
                      // value="02:00"
                      placeholder="08:00 AM"
                      value={timeslot.startTime}
                      onChange={(e) => updateSlot(e.target.value, index, 'startTime')}
                      style={timeslot.startTime === '' ? { border: '1px solid red' } : {}}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-primary">To</span>
                    <input
                      type="time"
                      className="form-control clear-input time-input bg-white"
                      id="timeTo"
                      // value="03:00"
                      placeholder="01:00 PM"
                      value={timeslot.endTime}
                      onChange={(e) => updateSlot(e.target.value, index, 'endTime')}
                      style={timeslot.endTime === '' ? { border: '1px solid red' } : {}}
                      disabled={isStartTimeAvailable(index)}
                    />
                  </div>
                  {index !== 0 && (
                    <div>
                      <a
                        className=""
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow({
                            isVisible: true,
                            type: 'edit-time-slot-offcanvas',
                            isDeleteVisible: true,
                            deleteType: 'edit-delete-timeslot-modal',
                            slotId: timeslot.id,
                            timeSlotName: `Time slot ${index + 1}`,
                            slotIndex: index,
                            dayId: id,
                            day: dayName,
                          });
                        }}
                      >
                        <div
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-original-title="Delete slot"
                          data-tooltip-id="delete-time-slot"
                        >
                          <Tooltip id="delete-time-slot" content="Delete slot" place="top" />
                          <img src="/assets/delete-voice.svg" alt="" />
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          <div className="mt-3">
            <a
              id="addTimeSlot"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                addNewSlot();
              }}
            >
              <img className="pe-2" src="/assets/add-blue.svg" alt="" />
              Add Time Slot
            </a>
          </div>
          <div className="d-flex align-items-center gap-3 flex-wrap border-0 ps-0 mt-5">
            <button
              id="editTimeBtn"
              // data-bs-dismiss="offcanvas"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
              onClick={formik.handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? 'Loading...' : 'Save'}
            </button>
            <a
              href="/#"
              className="blue-btn d-flex align-items-center px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
              onClick={(e) => {
                e.preventDefault();
                // handleApplyToAll();
                setShow({
                  isVisible: true,
                  applytype: 'apply-to-all-offcanvas',
                  type: 'edit-time-slot-offcanvas',
                  isApplyVisible: true,
                  dayId: id,
                  day: dayName,
                });
              }}
            >
              Apply to All Days
            </a>

            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
              onClick={() => {
                setShow({ isVisible: true, type: 'edit-time-slot-offcanvas', dayId: id });
                action();
              }}
            >
              Clear All
            </button>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
              data-bs-dismiss="offcanvas"
              onClick={hanldeClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default EditTimeSlotOffcanvas;
