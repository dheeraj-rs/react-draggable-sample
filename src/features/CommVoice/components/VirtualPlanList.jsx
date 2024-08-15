import React from 'react';
import { Link } from 'react-router-dom';

function VirtualPlanList({
  groupId,
  GroupName,
  carriersNumber,
  carriersUsage,
  totalMrc,
  totalMrcInc,
  createdDate,
  handleEditGroup,
  setShow,
  carriersCount,
  carriers,
  handleBulkSelection,
  selectedItemsForBulkDelete,
}) {
  return (
    <tr className="vendor-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={groupId}
            checked={selectedItemsForBulkDelete?.some(
              (group) => parseInt(group?.id, 10) === parseInt(groupId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0 fw-500"
            htmlFor={groupId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_carrier_groups',
                id: parseInt(groupId, 10),
                carriersCount,
              });
            }}
          >
            {GroupName}
          </label>
        </div>
      </td>

      <td>
        <div className="d-flex gap-3">
          <Link
            to={`/comm-telephony/vendor-view-carriers/${groupId}`}
            data-bs-toggle="tooltip"
            data-bs-title="View Carriers"
          >
            <p className="mb-0">{carriersNumber}</p>
          </Link>
        </div>
      </td>

      <td>
        <div className="d-flex gap-3">
          <Link
            to={`/comm-telephony/vendor-account-due/${groupId}`}
            data-bs-toggle="tooltip"
            data-bs-title="View Account Usage"
          >
            <p className="mb-0">{carriersUsage}</p>
          </Link>
        </div>
      </td>
      <td>
        <div className="d-flex gap-3">
          <Link
            to={`/comm-telephony/vendor-carrier-mrc/${groupId}`}
            data-bs-toggle="tooltip"
            data-bs-title="View MRC Details"
          >
            <p className="mb-0">
              {totalMrc}/{totalMrcInc}
            </p>
          </Link>
        </div>
      </td>

      <td className="d-flex justify-content-between gap-3">
        <h6 className="mb-0">{createdDate}</h6>

        <div className="dropup">
          <a href="/#" role="button" className="" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/assets/vertical-dot.svg" alt="" />
          </a>
          <ul className="dropdown-menu dropdown-menu-group p-3">
            <li>
              <a
                href="/#"
                className="dropdown-item py-3 px-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditGroup(groupId);
                  setShow({ isVisible: true, type: 'edit-carrier-group' });
                }}
              >
                <img className="me-2" src="/assets/note-pencil.svg" alt="" />
                Edit group
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
                    type: 'add-existing-carriers-modal',
                    data: {
                      GroupName,
                      carriers,
                      groupId,
                    },
                  });
                }}
              >
                <img className="me-2" src="/assets/move-to.svg" alt="" />
                Add carriers to group
              </a>
            </li>
            <li className={carriersCount === 0 ? '' : 'd-none'}>
              <a
                href="/#"
                className="dropdown-item py-3 px-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditGroup(groupId);
                  setShow({
                    isVisible: true,
                    type: 'delete-group',
                    selectedGroupForDelete: { id: groupId, name: GroupName },
                  });
                }}
              >
                <img className="me-2" src="/assets/Trash-img.svg" alt="" />
                Delete group
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default VirtualPlanList;
