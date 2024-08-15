import React from 'react';
import Input from '../../../common/components/forms/Input';

function EditGroupCarrierView() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasLocalSwitch"
      aria-labelledby="offcanvasLocalSwitchLabel"
    >
      <div className="local-switch">
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Local Switch</p>
            <p className="mb-0">Bharti Banglore</p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <div className="shadow-10 py-4 px-3 rounded mt-3">
            <h5 className="fs-13px mb-3">BTH BANG1</h5>
            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Switch name:</p>
              </div>
              <div>
                <h6>BTH BANG1</h6>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Switch IP:</p>
              </div>
              <div>
                <h6>192.168.1.5</h6>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Switch name:</p>
              </div>
              <div>
                <h6>5060</h6>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Switch name:</p>
              </div>
              <div>
                <h6>Bharti_Banglore</h6>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <select className="form-select bg-white" aria-label="Default select example">
              <option defaultValue>BTH BANG2</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
            <button
              id="addSwitch"
              data-bs-dismiss="modal"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
            >
              Add Switch
            </button>

            <a
              href="/#"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            >
              Manage Local Switches
            </a>
          </div>
        </div>
      </div>

      <div className="add-local-switch d-none">
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Add Local Switch</p>
            <p className="mb-0">Bharti Banglore</p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <Input
            label="Switch name"
            id="delete"
            placeholder="Enter switch name"
            type="textbox"
            disabled={false}
          />

          <Input
            label="Switch IP"
            id="delete"
            placeholder="00:00:00:00"
            type="textbox"
            disabled={false}
          />

          <Input
            label="Switch Port"
            id="delete"
            placeholder="Enter port number"
            type="textbox"
            disabled={false}
          />
          <div className="mt-4">
            <label className="mb-1">Switch Port</label>
            <select className="form-select" aria-label="Default select example">
              <option defaultValue>Bharati Banglore</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
            <button
              id="saveLocalSwitch"
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
            >
              Save
            </button>

            <a
              href="/#"
              data-bs-dismiss="offcanvas"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGroupCarrierView;
