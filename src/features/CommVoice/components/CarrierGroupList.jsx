import React from 'react';
import { Link } from 'react-router-dom';

import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function CarrierGroupList({
  carrierId,
  carrierGroup,
  region,
  carriersIp,
  carriersPort,
  localSwitch,
  localSwitchCount,
  usage,
  enabled,
  handleBulkSelection,
  selectedItemsForBulkExport,
  setShow,
  formik,
  batchCount,
  isAuthRequired,
  CarrierCredentials,
}) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={carrierId}
            checked={selectedItemsForBulkExport?.some(
              (group) => parseInt(group?.id, 10) === parseInt(carrierId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor={carrierId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_carriers',
                id: parseInt(carrierId, 10),
              });
            }}
          >
            {carrierGroup?.name}
          </label>
        </div>
      </td>
      <td>{region}</td>
      <td>{carriersIp}</td>
      <td>{carriersPort}</td>
      <td className="col d-flex align-items-center gap-2">
        {localSwitchCount === 0 ? (
          <a
            href="/#"
            // data-bs-toggle="offcanvas"
            // data-bs-target="#offcanvasLocalSwitch"
            // aria-controls="offcanvasLocalSwitch"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            0 Switch
          </a>
        ) : null}
        {localSwitchCount > 0 ? (
          <>
            <a
              href="/#"
              // data-bs-toggle="offcanvas"
              // data-bs-target="#offcanvasLocalSwitch"
              // aria-controls="offcanvasLocalSwitch"
              onClick={(e) => {
                setShow({ isVisible: true, type: 'add-existing-carriers-modal' });
                e.preventDefault();
              }}
            >
              {localSwitch}
            </a>
            <div role="button" className="bg-gray-blue rounded text-white plus-one fs-12px d-block">
              {localSwitchCount}
            </div>
          </>
        ) : null}
      </td>

      <td className="text-blue-active">
        <Link to="/comm-telephony/vendor-batch/">{batchCount} Batch</Link>
      </td>
      <td className="text-blue-active">
        {' '}
        <a
          href="/#"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasUsage"
          aria-controls="offcanvasUsage"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          ₹{usage}
        </a>
      </td>
      <td>
        <div className="d-flex justify-content-between">
          <CheckboxTickChat active={enabled} checkid="activeId" title="" onChange={() => {}} />
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
                  // data-bs-toggle="modal"
                  // data-bs-target="#addCarrierdropModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue('carrierName', carrierGroup?.name);
                    formik.setFieldValue('carrierRegion', region);
                    formik.setFieldValue('carrierGroup', carrierGroup?.id);

                    formik.setFieldValue('batch', batchCount);
                    formik.setFieldValue('carrierIp', carriersIp);
                    formik.setFieldValue('carrierPort', carriersPort);
                    formik.setFieldValue('isCarrierCredentialsActive', isAuthRequired);
                    formik.setFieldValue('username', CarrierCredentials?.username);
                    formik.setFieldValue('password', CarrierCredentials?.password);
                    formik.setFieldValue('enable', CarrierCredentials?.enable);

                    setShow({ isVisible: true, type: 'edit-carrier', carrierId });
                  }}
                >
                  <img className="me-2" src="/assets/note-pencil.svg" alt="" />
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  // data-bs-toggle="modal"
                  // data-bs-target="#deleteModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'delete-carrier',
                      carrier: { id: carrierId, name: carrierGroup?.name },
                    });
                  }}
                >
                  <img className="me-2" src="/assets/move-to.svg" alt="" />
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

export default CarrierGroupList;
