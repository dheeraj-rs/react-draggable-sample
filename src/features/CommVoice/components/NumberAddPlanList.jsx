import React from 'react';

function NumberAddPlanList({
  carrierDateId,
  number,
  mrc,
  channel,
  region,
  state,
  city,
  status,
  carrierDate,
  setShow,
}) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input type="checkbox" id={carrierDateId} />
          <label className="text-primary mb-0" htmlFor={carrierDateId}>
            {number}
          </label>
        </div>
      </td>
      <td>{mrc}</td>
      <td> {channel}</td>
      <td>{region}</td>
      <td>{state}</td>
      <td>{city}</td>

      <td>
        {status}
        <a
          href="/#"
          data-bs-toggle="tooltip"
          data-bs-title="Assign To: John Doe"
          className="d-none"
        >
          <img className="ps-2" src="/assets/info-admin.svg" alt="" />
        </a>
      </td>
      {/* <td>{ prefix}</td> */}
      <td>{carrierDate}</td>

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
                  // data-bs-toggle="modal"
                  // data-bs-target="#editNewRecord"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'edit-record',
                      data: {
                        country: '1',
                        state: '2',
                        city: '3',
                        number: '91845254841',
                        countryCode: '91',
                        channels: channel,
                        prefix: '44#',
                        mrc,
                      },
                    });
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
                      type: 'delete-plan',
                      data: { name: 'BTH BANG1' },
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

export default NumberAddPlanList;
