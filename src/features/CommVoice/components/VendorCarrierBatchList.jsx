import React from 'react';

function VendorCarrierBatchList({
  batchName,
  batchId,
  lot,
  tfCount,
  channels,
  mrc,
  setShow,
  carrierId,
  handleBulkSelection,
  selectedItemsForBulkExport,
}) {
  return (
    <tr className="horizontal-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={batchId}
            checked={selectedItemsForBulkExport?.some(
              (group) => parseInt(group?.id, 10) === parseInt(batchId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor={batchId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_carriers',
                id: parseInt(batchId, 10),
              });
            }}
          >
            {batchName}
          </label>
        </div>
      </td>
      <td>
        <a
          href="/comm-telephony/vendor-batch-lot-details/"
          data-bs-toggle="tooltip"
          data-bs-title="View Lots"
        >
          {lot}{' '}
        </a>{' '}
      </td>
      <td>{tfCount}</td>
      <td>{channels}</td>
      <td>
        <a
          data-bs-toggle="tooltip"
          data-bs-title="View MRC details"
          href="/comm-telephony/vendor-batch-mrc-details/"
        >
          {mrc}{' '}
        </a>
      </td>

      <td>
        <div className="d-flex gap-3">
          <div className="dropup">
            <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/assets/vertical-dot.svg" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-group p-1">
              <li>
                <a
                  href="/#"
                  // data-bs-toggle="modal"
                  // data-bs-target="#addCarrierdropModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
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
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({ isVisible: true, type: 'delete-batch', batchId });
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

export default VendorCarrierBatchList;
