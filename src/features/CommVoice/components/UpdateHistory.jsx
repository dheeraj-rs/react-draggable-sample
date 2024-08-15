import moment from 'moment';
import React from 'react';

function UpdateHistory({
  show,
  onClose,
  setUpdateHistoryFilter = '',
  updateHistoryFilter = '',
  updateHistory = [],
}) {
  const currentYear = moment().year();
  const years = [currentYear - 1, currentYear - 2, currentYear - 3];

  const currentMonth = moment().format('MMMM');
  const months = [1, 2, 3].map((i) => moment().clone().subtract(i, 'months').format('MMMM'));

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="updateHistory"
        aria-labelledby="offcanvasversionHistoryLabel"
      >
        <div className="offcanvas-header offcanvas-header-title p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Update History</p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              //   data-bs-dismiss="offcanvas"
              //   aria-label="Close"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <div className="row mb-3 mt-3">
            <div className="col-md-5">
              <label className="mb-1">Year</label>
              <select
                className="form-select bg-white"
                aria-label="Default select example"
                onChange={(e) => {
                  setUpdateHistoryFilter({ ...updateHistoryFilter, year: e.target.value });
                }}
              >
                <option value={currentYear}>{currentYear} (Current)</option>
                {years?.map((year) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col-md-7 mt-3 mt-sm-0">
              <label className="mb-1">Month</label>
              <select
                className="form-select bg-white"
                aria-label="Default select example"
                onChange={(e) => {
                  setUpdateHistoryFilter({
                    ...updateHistoryFilter,
                    month: moment(e.target.value, 'MMMM').format('M'),
                  });
                }}
              >
                <option value={currentMonth}>{currentMonth} (Current)</option>
                {months?.map((month) => (
                  <option value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="sidebar-timeline timeline-version mt-4">
            {updateHistory?.map((history, index) => (
              <div
                className={`user-timeline user-accounts ${
                  updateHistory.length - 1 === index ? 'user-call-timeline-end' : ''
                }`}
                key={index}
              >
                <div className="user-amount p-2 bg-white shadow-6 rounded py-3 mb-4 px-3">
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex gap-3 align-items-center">
                      <div>
                        <img src="/assets/document-icon.svg" alt="" />
                      </div>
                      <div>
                        <h6 className="d-flex gap-3">
                          Update_{moment(history).format('DD/MM/YYYY')}
                        </h6>
                        <p className="mb-0">
                          Updated on: {moment(history).format('DD/MM/YYYY hh:mm A')}
                        </p>
                      </div>
                    </div>
                    <div className="bg-titan-water p-2 rounded download-history">
                      <a href="/assets/export-icon-black.svg" download>
                        <img src="/assets/export-icon-black.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default UpdateHistory;
