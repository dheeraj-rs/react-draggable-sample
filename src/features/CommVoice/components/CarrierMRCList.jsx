/* eslint-disable no-shadow */
import React from 'react';

function CarrierMRCList({
  groupId,
  carrier,
  batch,
  mrc,
  createdDate,
  formik,
  setShow,
  carrierData,
  handleBulkSelection,
  selectedItemsForBulkAction,
}) {
  return (
    <tr className="vendor-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={groupId}
            checked={selectedItemsForBulkAction?.some(
              (carrier) => parseInt(carrier?.id, 10) === parseInt(carrierData?.id, 10)
            )}
            onChange={(e) => {
              e.preventDefault();
            }}
          />
          <label
            className="text-primary mb-0 fw-500"
            htmlFor={groupId}
            onClick={(e) => {
              e.preventDefault();
              handleBulkSelection({
                type: 'telephony_vendor_carriers',
                id: parseInt(carrierData?.id, 10),
              });
            }}
          >
            {carrier}
          </label>
        </div>
      </td>

      <td>{batch}</td>

      <td>{mrc}</td>

      <td>
        <div className="d-flex justify-content-between">
          <h6 className="mb-0">{createdDate}</h6>

          <div className="dropup">
            <a
              href="#/"
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
                  href="#/"
                  // data-bs-toggle="modal"
                  // data-bs-target="#addCarrierdropModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue('carrierName', carrierData?.attributes?.name);
                    formik.setFieldValue('carrierRegion', carrierData?.attributes?.region);
                    formik.setFieldValue('carrierGroup', carrierData?.attributes?.carrier_group_id);

                    formik.setFieldValue('batch', carrierData?.attributes?.batches_count);
                    formik.setFieldValue('carrierIp', carrierData?.attributes?.ip);
                    formik.setFieldValue('carrierPort', carrierData?.attributes?.port);
                    formik.setFieldValue(
                      'isCarrierCredentialsActive',
                      carrierData?.attributes?.is_authentication_required
                    );
                    formik.setFieldValue('username', carrierData?.attributes?.password);
                    formik.setFieldValue('password', carrierData?.attributes?.password);
                    formik.setFieldValue('enable', carrierData?.attributes?.is_enabled);

                    setShow({ isVisible: true, type: 'edit-carrier' });
                  }}
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  // data-bs-toggle="modal"
                  // data-bs-target="#deleteModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'delete-carrier',
                      carrier: { name: carrier, id: carrierData?.id },
                    });
                  }}
                >
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

export default CarrierMRCList;
