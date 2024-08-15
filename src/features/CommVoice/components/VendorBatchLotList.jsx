import React from 'react';
import { Link } from 'react-router-dom';

function VendorBatchLotList({
  lotId,
  batchId,
  lotName,
  carrier,
  mrc,
  mrcInc,
  didPlan,
  didCount,
  type,
  setShow,
  handleBulkSelection,
  selectedItemsForBulkExport,
}) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={batchId}
            checked={selectedItemsForBulkExport?.some(
              (lot) => parseInt(lot?.id, 10) === parseInt(lotId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor={batchId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_lots',
                id: parseInt(lotId, 10),
              });
            }}
          >
            {lotName}
          </label>
        </div>
      </td>
      <td>
        <Link to="/comm-telephony/vendor-carriers-local-switch" className="text-blue-active">
          {carrier}
        </Link>
      </td>
      <td>
        <Link
          to="/comm-telephony/vendor-batch-mrc-details/"
          // data-bs-toggle="tooltip"
          // data-bs-title="View MRC details"
        >
          {mrc ? parseFloat(mrc, 10)?.toFixed(2) : '---'}/
          {mrcInc ? parseFloat(mrcInc, 10)?.toFixed(2) : '---'}
        </Link>
      </td>
      <td>
        <Link to="/comm-telephony/vendor-did-plan/" className="text-blue-active">
          {didPlan}
        </Link>
      </td>
      <td>{didCount}</td>
      <td>{type}</td>

      <td>
        <div className="d-flex gap-3">
          <div className="dropup">
            <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/assets/vertical-dot.svg" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-group p-3">
              <li>
                <Link
                  to={`/comm-telephony/vendor-batch-add-lot/${batchId}/${lotId}/edit`}
                  className="dropdown-item py-3 px-3"
                >
                  <img className="me-2" src="/assets/note-pencil.svg" alt="" />
                  Edit
                </Link>
              </li>
              <li>
                <a
                  href="/#"
                  // data-bs-toggle="modal"
                  // data-bs-target="#deleteModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({ isVisible: true, type: 'delete-lot', lotName, lotId });
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

export default VendorBatchLotList;
