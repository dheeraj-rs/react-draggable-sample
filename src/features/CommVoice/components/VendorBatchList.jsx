import React from 'react';
import { Link } from 'react-router-dom';

function VendorBatchList({
  batchName = '',
  batchId,
  carrier,
  lot,
  didCount,
  tfCount,
  channels,
  totalMrc,
  totalIncludedMrc,
  type,
  setShow,
  carrierPlanIn,
  carrierPlanInPackage,
  carrierPlanOut,
  carrierPlanOutPackage,
  formik,
  description,
  handleBulkSelection,
  selectedItemsForBulkDelete,
  selectedLots = [],
}) {
  return (
    <tr className="horizontal-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={batchId}
            checked={selectedItemsForBulkDelete?.some(
              (plan) => parseInt(plan?.id, 10) === parseInt(batchId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor={batchId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_carrier_plans',
                id: parseInt(batchId, 10),
              });
            }}
          >
            {batchName}
          </label>
        </div>
      </td>
      <td>{carrier?.name}</td>
      <td>
        <Link to={`/comm-telephony/vendor-batch-lot-details/${batchId}`}>{lot} </Link>{' '}
      </td>
      <td>{`${didCount}/${tfCount}(${didCount + tfCount})`}</td>
      <td>{channels}</td>
      <td>
        <Link to={`/comm-telephony/vendor-batch-mrc-details/${batchId}`}>
          {`${totalMrc}/${totalIncludedMrc}`}
        </Link>
      </td>
      <td className="d-none">{type}</td>

      <td>
        <div className="d-flex gap-3">
          <div className="dropup">
            <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
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
                      type: 'batch-details',
                      data: 'dfdfdf',
                      batchDetails: {
                        batchName,
                        carrier: carrier?.name,
                        lot,
                        DIDTFCount: `${didCount}/${tfCount}(${didCount + tfCount})`,
                        channels,
                        mrcCount: `${totalMrc}/${totalIncludedMrc}`,
                        carrierPlanIn: carrierPlanIn?.name,
                        carrierPlanInPackage: carrierPlanInPackage?.name,
                        carrierPlanOut: carrierPlanOut?.name,
                        carrierPlanOutPackage: carrierPlanOutPackage?.name,
                      },
                    });
                  }}
                >
                  Batch details
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
                      type: 'edit-batch',
                      batchId,
                    });
                    formik.setFieldValue('batchName', batchName);
                    formik.setFieldValue('carrier', carrier?.id);
                    formik.setFieldValue('carrierPlanInPackage', carrierPlanInPackage);
                    formik.setFieldValue('carrierPlanOutPackage', carrierPlanOutPackage);
                    formik.setFieldValue('carrierPlanOut', carrierPlanOut);
                    formik.setFieldValue('carrierPlanIn', carrierPlanIn);
                    formik.setFieldValue('batchDescription', description);
                    formik.setFieldValue('lots', selectedLots);
                  }}
                >
                  Edit batch
                </a>
              </li>
              <li>
                <Link to="/comm-telephony/vendor-lot-new-lot" className="dropdown-item py-3 px-3">
                  Add Lot
                </Link>
              </li>
              <li>
                <Link
                  to="/comm-telephony/vendor-batch-mrc-details"
                  className="dropdown-item py-3 px-3"
                >
                  View MRC details
                </Link>
              </li>
              <li>
                <a
                  to="/#"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'delete-batch',
                      selectedBatchForDelete: { name: batchName, id: batchId },
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

export default VendorBatchList;
