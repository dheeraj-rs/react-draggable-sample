import React from 'react';

function VendorBatchMRCList({
  lotId,
  lotName,
  mrc,
  mrcInc,
  updateDate,
  setShow,
  handleBulkSelection,
  selectedItemsForBulkAction,
}) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={lotId}
            checked={selectedItemsForBulkAction?.some(
              (lot) => parseInt(lot?.id, 10) === parseInt(lotId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor={lotId}
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
      <td>{mrc && parseFloat(mrc, 10)?.toFixed(2)}</td>
      <td>{mrcInc && parseFloat(mrcInc, 10)?.toFixed(2)}</td>

      <td>{updateDate}</td>

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
                  data-bs-toggle="modal"
                  data-bs-target="#addCarrierdropModal"
                  className="dropdown-item py-3 px-3"
                >
                  <img className="me-2" src="/assets/note-pencil.svg" alt="" />
                  Edit
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
                      type: 'delete-batch',
                      batch: { name: 'Lot_bth_Bnglore0' },
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

export default VendorBatchMRCList;
