/* eslint-disable max-len */
/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
import moment from 'moment/moment';
import React, { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';

function WorkingHours({
  dayName,
  timeSlots,
  isEnabled,
  setShow,
  isDisable,
  normalizedTimeSlots,
  id,
  formik,
  getMatchingWorkingHours,
  allWorkingHours,
}) {
  const handleEditTimeSlot = () => {
    const matchingWorkingHours = getMatchingWorkingHours(allWorkingHours?.data, dayName);

    if (matchingWorkingHours) {
      const slotsData = matchingWorkingHours?.relationships?.slots?.data;

      if (slotsData && slotsData.length > 0) {
        const formattedSlots = slotsData.map((slot) => {
          const { startTime, endTime } = normalizedTimeSlots.slots[slot.id]?.attributes || {};
          return { id: slot.id, startTime, endTime };
        });

        formik.setFieldValue('slots', formattedSlots);
      }
    }
  };
  const handleApply = () => {
    setShow({
      isVisible: true,
      type: 'apply-to-all',
      day: dayName,
      dayId: id,
    });
    const matchingWorkingHours = getMatchingWorkingHours(allWorkingHours?.data, dayName);

    if (matchingWorkingHours) {
      const slotsData = matchingWorkingHours?.relationships?.slots?.data;

      if (slotsData && slotsData.length > 0) {
        const formattedSlots = slotsData.map((slot) => {
          const { startTime, endTime } = normalizedTimeSlots.slots[slot.id]?.attributes || {};
          return { id: slot.id, startTime, endTime };
        });
        // handleApplyToAll(formattedSlots);
        setShow({
          isVisible: true,
          type: 'apply-to-all',
          day: dayName,
          dayId: id,
          applySlots: formattedSlots,
        });
      }
    }
  };
  const getTimeslots = (slotId, data = []) => {
    const memoizedTimeslot = useMemo(() => {
      if (data?.slots) {
        const slot = data.slots[slotId];
        if (slot && slot.attributes?.startTime && slot.attributes?.endTime) {
          const startTime12hr = moment(slot.attributes.startTime, 'HH:mm').format('hh:mm A');
          const endTime12hr = moment(slot.attributes.endTime, 'HH:mm').format('hh:mm A');

          return `${startTime12hr} - ${endTime12hr}`;
        }
      }
      return null;
    }, [normalizedTimeSlots, slotId]);

    return memoizedTimeslot;
  };

  return (
    <div className="row holiday-hover justify-content-between border-transparent align-items-center p-2 p-lg-3 p-sm-2 py-3 py-lg-2 rounded mt-2 cursor-pointer mx-0 flex-wrap">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-5 col-md-4 col-lg-3 mb-lg-0 mb-3 mb-sm-0">
        <div className="d-flex flex-grow-1">
          <a href="/#" className="text-primary fw-medium">
            {dayName}
          </a>
        </div>
      </div>
      <div className="col-7 col-md-4 col-lg-4">
        <div className="time-list d-flex flex-column gap-2">
          {timeSlots && timeSlots.length > 0 ? (
            <div className="time-list d-flex flex-column gap-2">
              {timeSlots.map((slot, index) => (
                <div key={index} className="p-2 rounded time-list-box">
                  <p className="mb-0 text-primary text-center">
                    {getTimeslots(slot.id, normalizedTimeSlots)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mb-lg-0 mb-3 mb-sm-0 time-slot">
              <span className="fs-13px">
                <img className="pe-2" src="/assets/slot.svg" alt="" />
                No time slots selected
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-5 mt-3 mt-lg-0 mt-sm-0 operation-sec">
        <div className="d-flex align-items-center px-lg-2 px-sm-3 justify-content-start justify-content-lg-end gap-3 gap-lg-4 gap-sm-1 py-lg-2 py-sm-2">
          {timeSlots && timeSlots.length > 0 ? (
            <>
              <a
                href="/#"
                className="text-blue-active fs-13px"
                onClick={(e) => {
                  e.preventDefault();
                  handleApply();
                }}
              >
                Apply to All
              </a>
              <div className="d-flex gap-3 ms-2 ps-3">
                <a
                  className="row-action-agent"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditTimeSlot();
                    setShow({
                      isVisible: true,
                      type: 'edit-time-slot-offcanvas',
                      day: dayName,
                      dayId: id,
                    });
                  }}
                >
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="Edit Time slot"
                    data-tooltip-id="tooltip-edit-time-slot"
                  >
                    <Tooltip id="tooltip-edit-time-slot" content="Edit Time slot" place="top" />
                    <img src="/assets/edit-voice.svg" alt="" />
                  </div>
                </a>
                <div className="pt-1 ps-3">
                  <label
                    className="switch"
                    data-bs-toggle="tooltip"
                    data-tooltip-id="tooltip-enable-disable"
                    onClick={() => {
                      setShow({
                        isVisible: true,
                        type: isEnabled ? 'disable-time-slot' : 'enable-time-slot',
                        key: `${isEnabled ? 'Disable' : 'Enable'}`,
                        dayId: id,
                      });
                    }}
                  >
                    <input
                      className="check-powered"
                      type="checkbox"
                      onChange={() => {}}
                      checked={isEnabled}
                    />
                    <span className="slider round" />
                  </label>
                  <Tooltip id="tooltip-enable-disable" content="Enable/Disable" place="top" />
                </div>
              </div>
            </>
          ) : (
            <button
              type="button"
              // data-bs-toggle="offcanvas"
              // data-bs-target="#offcanvasSetTime"
              className="text-blue-active fs-13px border-0"
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  isVisible: true,
                  type: 'set-time-slot-offcanvas',
                  day: dayName,
                  dayId: id,
                });
              }}
              disabled={isDisable || false}
              style={{ background: 'transparent' }}
            >
              Set Time Slot
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default WorkingHours;
