/* eslint-disable react/destructuring-assignment */
import React from 'react';
import CheckboxTickChat from '../../SupportWidget/components/checkBoxTickChat';

function VendorBatchSwitchList(Props) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input type="checkbox" id={Props.switchId} />
          <label className="text-primary mb-0" htmlFor={Props.switchId}>
            {Props.switchName}
          </label>
        </div>
      </td>
      <td>{Props.region}</td>
      <td>{Props.ip}</td>

      <td>{Props.port}</td>
      <td>
        <a href="/comm-telephony/vendor-carriers-local-switch/" className="blue-active">
          {Props.mapping}
        </a>
      </td>
      <td>{Props.created}</td>

      <td>
        <div className="d-flex justify-content-between">
          <CheckboxTickChat title="" checkid="switch1" />
          <div className="dropup">
            <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/assets/vertical-dot.svg" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-group p-3">
              <li>
                <a
                  href="/#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasEditLocalSwitch"
                  aria-controls="offcanvasEditGroup"
                  className="dropdown-item py-3 px-3"
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

export default VendorBatchSwitchList;
