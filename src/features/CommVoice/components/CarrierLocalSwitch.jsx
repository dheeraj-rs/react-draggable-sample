import React from 'react';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function CarrierLocalSwitch({
  switchId,
  carrierGroupId,
  carrierId,
  switchName,
  region,
  switchIp,
  switchPort,
  enable,
  createdOn,
  setShow,
  formik,
  handleBulkSelection,
  selectedItemsForBulkDelete,
}) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={carrierId}
            checked={selectedItemsForBulkDelete?.some(
              (localSwitch) => parseInt(localSwitch?.id, 10) === parseInt(switchId, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor={carrierId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_local_switches',
                id: parseInt(switchId, 10),
              });
            }}
          >
            {switchName}
          </label>
        </div>
      </td>
      <td>{region}</td>
      <td>{switchIp}</td>
      <td>{switchPort}</td>
      <td>{createdOn}</td>

      <td>
        <div className="d-flex justify-content-between">
          <CheckboxTickChat
            checkid="activeId"
            title=""
            checked={enable}
            onChange={() => {}}
            onClick={() => {
              setShow({
                isVisible: true,
                type: `${enable ? 'disable-local-switch' : 'enable-local-switch'}`,
                key: `${enable ? 'Disable' : 'Enable'}`,
                id: switchId,
              });
            }}
          />
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
                    setShow({ isVisible: true, type: 'edit-switch', switchId });
                    formik.setFieldValue('switchName', switchName);
                    formik.setFieldValue('carrierGroup', carrierGroupId);
                    formik.setFieldValue('carrierMapping', carrierId);
                    formik.setFieldValue('switchIP', switchIp);
                    formik.setFieldValue('switchPort', switchPort);
                    formik.setFieldValue('switchRegion', region);
                    formik.setFieldValue('enable', enable);
                  }}
                >
                  <img className="me-2" src="/assets/note-pencil.svg" alt="" />
                  Edit
                </a>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShow({
                        isVisible: true,
                        type: 'delete-switch',
                        switch: { switchId, name: switchName },
                      });
                    }}
                    className="dropdown-item py-3 px-3"
                  >
                    <img className="me-2" src="/assets/delete.svg" alt="" />
                    Delete
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CarrierLocalSwitch;
