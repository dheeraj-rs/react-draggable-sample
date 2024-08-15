import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function AccountDueList({
  id,
  date,
  type = 'l',
  carrier,
  amount,
  tax,
  receipt,
  description,
  setShow,
}) {
  return (
    <tr className="carrier-table">
      <td>{date}</td>

      <td className="col d-flex align-items-center gap-2">
        {type}
        <a
          href="/#"
          className="d-block"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div className="tooltip-content cursor-pointer">
            {type && <img src="/assets/account-due.svg" alt="" />}
            {/* <span className="tooltiptext-payment p-3">
              <p className="mb-0"> Payment by: Forerun Solutions pvt. ltd.</p>
              <p className="mb-0">Payment via: Bank Transfer</p>
            </span> */}
          </div>
        </a>
      </td>
      <td>{carrier}</td>
      <td className="">{amount}</td>
      <td className="">{tax}</td>
      <td className="text-center">
        <a
          href="/assets/sample.pdf"
          download
          data-bs-toggle="tooltip"
          data-bs-title="Click to download"
          className={`${receipt}`}
        >
          <img src="/assets/Receipt.svg" alt="" />
        </a>
      </td>
      <td className="text-center">
        {description && (
          <div className={`${description}`}>
            <div role="button" data-tooltip-id={`tooltip-voice-${id}`}>
              <img src="/assets/ChatDotsdes.svg" alt="" />
              <Tooltip id={`tooltip-voice-${id}`} content={description} place="Top" />
            </div>
          </div>
        )}
      </td>
      <td>
        <div className="dropup">
          <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
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
                  setShow({ isVisible: true, type: 'edit-transaction' });
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
                  setShow({ isVisible: true, type: 'delete-account-details', id });
                }}
              >
                <img className="me-2" src="/assets/delete.svg" alt="" />
                Delete
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default AccountDueList;
