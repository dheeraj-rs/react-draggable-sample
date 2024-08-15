import React from 'react';

function ColumnSelector({ show, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end map-topic-canvas ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasMapBot"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header offcanvas-header-title d-flex align-items-center px-25px mt-2 border-0">
          <div className="d-flex flex-column">
            <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasRightLabel">
              Column Selector
            </h5>
          </div>
          <div className="ms-auto">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="offcanvas-body p-4 px-25px pt-0">
          <div className="d-flex justify-content-between mt-3">
            <p className="fs-13px text-primary mb-0">0 Columns selected</p>
            <a href="/#" className="fs-13px text-blue-active mb-0 fw-medium select-all-checkbox">
              <div className="check-box">
                <input type="checkbox" id="selectAll" />
                <label className="text-primary mb-0" htmlFor="selectAll">
                  Select All
                </label>
              </div>
            </a>
          </div>

          <div className="select-all-checkbox-list">
            <div
              role="button"
              className="p-10px d-flex align-items-center mt-3 gap-3 rounded p-3 bg-input-gray"
            >
              <div className="check-box checkbox-disable">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="topics-1"
                  checked
                  disabled
                />
                <label className="form-check-label text-primary mb-0" htmlFor="topics-1">
                  Number
                </label>
              </div>
            </div>

            <div
              role="button"
              className="p-10px d-flex align-items-center mt-2 gap-3 rounded p-3 bg-input-gray"
            >
              <div className="check-box checkbox-disable">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="topics-1"
                  checked
                  disabled
                />
                <label className="form-check-label text-primary mb-0" htmlFor="topics-1">
                  MRC
                </label>
              </div>
            </div>

            <div
              role="button"
              className="p-10px d-flex align-items-center mt-2 gap-3 rounded p-3 bg-input-gray"
            >
              <div className="check-box checkbox-disable">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="topics-1"
                  checked
                  disabled
                />
                <label className="form-check-label text-primary mb-0" htmlFor="topics-1">
                  Channels
                </label>
              </div>
            </div>

            <div
              role="button"
              className="colum-selecter d-flex align-items-center mt-2 gap-3 rounded p-3"
            >
              <div className="check-box">
                <input className="form-check-input" type="checkbox" value="" id="country" checked />
                <label className="form-check-label text-primary mb-0" htmlFor="country">
                  Country
                </label>
              </div>
            </div>

            <div
              role="button"
              className="colum-selecter d-flex align-items-center mt-2 gap-3 rounded p-3"
            >
              <div className="check-box">
                <input className="form-check-input" type="checkbox" value="" id="state" />
                <label className="form-check-label text-primary mb-0" htmlFor="state">
                  State
                </label>
              </div>
            </div>

            <div
              role="button"
              className="colum-selecter d-flex align-items-center mt-2 gap-3 rounded p-3"
            >
              <div className="check-box">
                <input className="form-check-input" type="checkbox" value="" id="city" />
                <label className="form-check-label text-primary mb-0" htmlFor="city">
                  City
                </label>
              </div>
            </div>

            <div
              role="button"
              className="colum-selecter d-flex align-items-center mt-2 gap-3 rounded p-3"
            >
              <div className="check-box">
                <input className="form-check-input" type="checkbox" value="" id="status" checked />
                <label className="form-check-label text-primary mb-0" htmlFor="status">
                  Status
                </label>
              </div>
            </div>

            <div
              role="button"
              className="colum-selecter d-flex align-items-center mt-2 gap-3 rounded p-3"
            >
              <div className="check-box">
                <input className="form-check-input" type="checkbox" value="" id="date" />
                <label className="form-check-label text-primary mb-0" htmlFor="date">
                  Date
                </label>
              </div>
            </div>

            <div className="setting-buttons d-flex align-items-end mt-4 mb-4 pt-3">
              <a
                href="/#"
                id="saveColumnbtn"
                data-bs-dismiss="offcanvas"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
              >
                Preview
              </a>
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default ColumnSelector;
