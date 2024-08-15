import React from 'react';
import { Link } from 'react-router-dom';

import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function VendorCarriersList({
  carrierId,
  carrierName,
  carrierGroupId,
  region,
  carriersIp,
  carriersPort,
  localSwitch,
  batch,
  usage,
  display,
  setShow,
  enable,
  normalizedCarriersListData,
  userName,
  password,
  handleBulkSelection,
  selectedItemsForBulkDelete,
}) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={carrierId}
            checked={selectedItemsForBulkDelete?.some(
              (carrier) => parseInt(carrier?.id, 10) === parseInt(carrierId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor={carrierGroupId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_carriers',
                id: parseInt(carrierId, 10),
              });
            }}
          >
            {carrierName}
          </label>
        </div>
      </td>
      <td>{region}</td>
      <td>{carriersIp}</td>
      <td>{carriersPort}</td>
      <td className="d-flex align-items-center gap-2">
        <Link
          to={`/comm-telephony/vendor-carriers-local-switch/${carrierId}`}
          data-bs-toggle="tooltip"
          data-bs-title="View Local Switches"
        >
          {localSwitch}
        </Link>

        <div className={`bg-gray-blue rounded text-white plus-one fs-12px ${display}`}>1+</div>
      </td>
      <td className="text-blue-active">
        <Link
          data-bs-toggle="tooltip"
          data-bs-title="View Group"
          to="/comm-telephony/vendor-plans-and-packges/"
        >
          {normalizedCarriersListData?.carrierGroup[carrierGroupId]?.attributes?.name}
        </Link>
      </td>

      <td className="d-flex align-items-center gap-2">
        <Link
          to={`/app/comm-telephony/vendor-carrier-batch/${carrierId}`}
          data-bs-toggle="tooltip"
          data-bs-title="View Batches"
        >
          {`${batch} Batch`}
        </Link>
      </td>

      <td>
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/comm-telephony/vendor-carrier-usage/"
            data-bs-toggle="tooltip"
            data-bs-title="View Usage Summary"
          >
            ₹{usage}
          </Link>
        </div>
      </td>

      <td>
        <div className="d-flex gap-3">
          <CheckboxTickChat checkid="activeId" title="" active={enable} onChange={() => {}} />
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
                    setShow({ isVisible: true, type: 'edit-carrier', carrierId });
                  }}
                >
                  Edit carrier
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'view-credentials-carrier',
                      carrierName,
                      userName,
                      password,
                    });
                  }}
                >
                  View credentials
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({ isVisible: true, type: 'delete-carrier', carrierId });
                  }}
                >
                  Delete carrier
                </a>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default VendorCarriersList;
