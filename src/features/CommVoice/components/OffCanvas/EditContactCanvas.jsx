import React from 'react';
import Select from '../../../CommAdminCentre/components/common/Select';

function EditContactCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasEditContact"
      aria-labelledby="offcanvasEditContactLabel"
    >
      <div className="offcanvas-header px-4 pt-4 pb-2">
        <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasEditContactLabel">
          Edit Contact
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body px-4">
        <p className="mb-0 fs-13px text-primary">
          Edit individual contacts to the system to manage.
        </p>
        {/* <!-- contact details start --> */}
        <div>
          <div className="form-group w-100 mt-3">
            <label className="text-primary mb-1 label-mandatory" htmlFor="firstName">
              Name
            </label>
            <input
              type="text"
              className="form-control bg-white"
              id="firstName"
              defaultValue="Addie"
              placeholder="Enter first name*"
            />
          </div>

          <div className="form-group w-100 mt-3">
            <input
              type="text"
              className="form-control bg-white"
              id="middleName"
              placeholder="Enter middle name"
            />
          </div>

          <div className="form-group w-100 mt-3">
            <input
              type="text"
              className="form-control bg-white"
              id="lastName"
              defaultValue="Minstra"
              placeholder="Enter last name*"
            />
          </div>
        </div>
        {/* <!-- email details starts --> */}
        <div className="d-flex flex-column p-4 bg-white rounded shadow-6 mt-3">
          <div className="d-flex">
            <label className="text-primary mb-2 label-mandatory" htmlFor="email">
              Email address
            </label>
          </div>
          <div className="p-3 bg-white-azurish rounded">
            <div className="form-group d-flex gap-2">
              <div className="col-sm-4">
                <select className="form-control form-select bg-white" id="pers">
                  <option>Personal</option>
                </select>
              </div>

              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="email"
                  defaultValue="Assiem@example.com"
                  placeholder="name@example.com"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center">
            <a to="/" className="text-blue-active">
              <img className="pe-2" src="/assets/circle-blue.svg" alt="" />
              Add email
            </a>
          </div>
        </div>

        {/* <!-- phone details start --> */}
        <div className="d-flex flex-column p-4 bg-white rounded shadow-6 mt-3">
          <div className="d-flex">
            <label className="text-primary mb-2 label-mandatory" htmlFor="phone">
              Phone number
            </label>
          </div>
          <div className="p-3 bg-white-azurish rounded">
            <div className="form-group d-flex gap-2">
              <div className="col-sm-4">
                <select className="form-control form-select bg-white" id="mobile">
                  <option>Mobile</option>
                </select>
              </div>

              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="mobNum"
                  placeholder="(000) 000-000000"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-white-azurish rounded mt-3">
            <div className="form-group d-flex gap-2">
              <div className="col-sm-4">
                <select className="form-control form-select bg-white" id="work">
                  <option>Work</option>
                </select>
              </div>

              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="work"
                  placeholder="(000) 000-000000"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center">
            <a to="/" className="text-blue-active">
              <img className="pe-2" src="/assets/circle-blue.svg" alt="" />
              Add phone number
            </a>
          </div>
        </div>
        {/* <!-- company starts --> */}
        <div className="mt-4">
          <Select
            label="Company (optional)"
            id="company"
            defaultValue="High-tech pvt ltd "
            onchange={() => {}}
          />
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
          <button
            id="editContactToast"
            data-bs-dismiss="offcanvas"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
          >
            <span className="pe-2"> </span>
            Save
          </button>
          <button
            type="button"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            data-bs-dismiss="offcanvas"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditContactCanvas;
