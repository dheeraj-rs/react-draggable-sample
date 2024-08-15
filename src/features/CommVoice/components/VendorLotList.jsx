import React from 'react';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function VendorLotList({
  lotId,
  carrier,
  description,
  lotName,
  batch,
  mrc,
  mrcInc,
  tfPlan,
  type,
  tfCount,
  channel,
  switchList,
  totalSwitchCount,
  title,
  setShow,
  normalizedData,
  isEnabled,
  handleBulkSelection,
  selectedItemsForBulkAction,
}) {
  return (
    <tr className="lot-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={lotId}
            onChange={() => {}}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_lots',
                id: parseInt(lotId, 10),
              });
            }}
            checked={selectedItemsForBulkAction?.some(
              (lot) => parseInt(lot?.id, 10) === parseInt(lotId, 10)
            )}
          />
          <label className="text-primary mb-0" htmlFor={lotId}>
            {lotName}
          </label>
        </div>
      </td>
      <td className="text-blue-active">
        <Link to="/comm-telephony/vendor-batch/"> {batch}</Link>
      </td>
      <td className="text-blue-active">
        <Link to={`/comm-telephony/vendor-carriers-local-switch/${carrier}`}>
          {normalizedData?.carrier && normalizedData?.carrier[carrier]?.attributes?.name}
        </Link>
      </td>
      <td>
        <div className="d-flex gap-2">
          <Link
            data-bs-toggle="tooltip"
            data-bs-title="View MRC details"
            to="/comm-telephony/vendor-lot-mrc-details/1"
          >
            {mrc ? parseFloat(mrc, 10)?.toFixed(2) : '---'}\
            {mrcInc ? parseFloat(mrcInc, 10)?.toFixed(2) : '---'}
          </Link>
        </div>
      </td>
      <td className="text-blue-active">
        <Link to="/comm-telephony/vendor-did-plan"> {tfPlan}</Link>
      </td>
      <td>
        <p className=" mb-0">{type}</p>
      </td>
      <td>{tfCount}</td>

      <td>
        <a
          href="/#"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasAddChannel"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span data-bs-toggle="tooltip" data-bs-title="View Channel details">
            {channel || '---'}
          </span>
        </a>
      </td>

      <td className="col d-flex gap-2">
        <Link
          to={`/comm-telephony/vendor-lot-local-switchList/${carrier}`}
          data-bs-toggle="tooltip"
          data-bs-title="View Local Switch"
        >
          {normalizedData?.switches && normalizedData?.switches[switchList]?.attributes?.name}
        </Link>

        {totalSwitchCount > 1 ? (
          <div
            role="button"
            className="local-switchList bg-gray-blue rounded text-white plus-one fs-12px d-block d-none"
          >
            {totalSwitchCount - 1}+
          </div>
        ) : null}
      </td>

      <td className="text-center">
        <a
          href="/#"
          role="button"
          data-bs-toggle="tooltip"
          data-bs-title={title}
          onClick={(e) => e.preventDefault()}
        >
          <img
            src="/assets/description.svg"
            alt=""
            data-toggle="tooltip"
            data-placement="top"
            data-tooltip-id={`tooltip-description-${lotId}`}
          />
          <Tooltip id={`tooltip-description-${lotId}`} content={description} place="top" />
        </a>
      </td>
      <td>
        <div className="d-flex gap-3">
          <CheckboxTickChat
            checkid="activeId"
            title=""
            active={isEnabled}
            onChange={() => {}}
            onClick={(e) => {
              e.preventDefault();
              setShow({
                isVisible: true,
                type: isEnabled ? 'disable-lot' : 'enable-lot',
                key: `${isEnabled ? 'Disable' : 'Enable'}`,
                id: lotId,
              });
            }}
          />
          <div className="dropup">
            <a
              href="/#"
              className=""
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <img src="/assets/vertical-dot.svg" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-group p-3">
              <li>
                <a
                  href="/#"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'delete-lot',
                      lot: { id: lotId, name: lotName },
                    });
                  }}
                >
                  <img className="me-2" src="/assets/delete.svg" alt="" />
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default VendorLotList;
