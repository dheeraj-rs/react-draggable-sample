import React from 'react';
import { Tooltip } from 'react-tooltip';

function AllCallersList({
  id,
  groupId,
  callerName,
  region,
  number,
  session,
  updatedDate,
  setShow,
  formik,
  countryCode,
  phone,
  handleBulkSelection,
  selectedItemsForBulkSelection,
}) {
  return (
    <tr className="vendor-table">
      <td>
        <div className="check-box">
          <input
            className="caller-checkbox"
            type="checkbox"
            id={groupId}
            checked={selectedItemsForBulkSelection?.some(
              (group) => parseInt(group?.id, 10) === parseInt(id, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0 fw-normal"
            htmlFor={groupId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_caller',
                id: parseInt(id, 10),
              });
            }}
          >
            {callerName}
          </label>
        </div>
      </td>

      <td>
        <div className="d-flex gap-3">
          <p className="mb-0">{region}</p>
        </div>
      </td>

      <td>
        <div className="d-flex gap-3">
          <p className="mb-0 text-primary number-mob">{number}</p>
        </div>
      </td>
      <td>
        <div className="d-flex gap-3">
          <p className="mb-0">{session}</p>
        </div>
      </td>

      <td>
        <h6 className="mb-0 fw-normal">{updatedDate}</h6>
      </td>
      <td className="action-icons">
        <div className="d-flex gap-3">
          <a
            className="row-action-caller"
            href="/#"
            // data-bs-toggle="modal"
            // data-bs-target="#moveModal"
            onClick={(e) => {
              e.preventDefault();
              setShow({
                isVisible: true,
                type: 'move-caller',
                data: { id },
                id,
              });
            }}
            data-tooltip-id={`tooltip-add-list-${id}`}
          >
            <div>
              <img src="/assets/swap.svg" alt="" />
              <Tooltip id={`tooltip-add-list-${id}`} content="Move caller" place="top" />
            </div>
          </a>
          <a
            className="row-action-caller"
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              formik.setFieldValue('callerName', callerName);
              formik.setFieldValue('groupId', groupId);
              formik.setFieldValue('countryCode', countryCode);
              formik.setFieldValue('phone', phone);
              formik.setFieldValue('carrierId', '');
              formik.setFieldValue('callerListName', '');

              setShow({
                isVisible: true,
                type: 'edit-caller',
                data: { id },
                id,
              });
            }}
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Edit caller"
              data-tooltip-id={`tooltip-edit-list-${id}`}
            >
              <img src="/assets/edit-voice.svg" alt="" />
              <Tooltip id={`tooltip-edit-list-${id}`} content="Edit caller" place="top" />
            </div>
          </a>
          <a
            className="row-action-caller"
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setShow({
                isVisible: true,
                type: 'delete-caller',
                data: { callerName, groupId },
                id,
              });
            }}
            data-tooltip-id={`tooltip-delete-list-${id}`}
          >
            <div>
              <img src="/assets/delete-voice.svg" alt="" />
              <Tooltip id={`tooltip-delete-list-${id}`} content="Delete" place="top" />
            </div>
          </a>
        </div>
      </td>
    </tr>
  );
}

export default AllCallersList;
