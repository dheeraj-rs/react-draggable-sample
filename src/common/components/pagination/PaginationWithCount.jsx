import React from 'react';
import { handleKeyPressForNumber } from '../../helpers/utils';

function PaginationWithCount({ handlePagination, currentPage, totalPages, count, recordCount }) {
  return (
    <div className="d-flex flex-column flex-lg-row  shadow-1 p-3 rounded mt-3 mb-2">
      <div className="d-flex justify-content-between justify-content-lg-start">
        <div className="d-flex justify-content-start align-items-center gap-2 ">
          <span className="text-primary fw-medium ">{recordCount}</span>
          <p className=" mb-0">Records available</p>
        </div>
        <div className="d-flex d-block d-lg-none align-items-center gap-3  page-input">
          <div>
            <input
              type="text"
              placeholder={count}
              className="form-control text-center bg-white w-5 h-5"
              onKeyPress={handleKeyPressForNumber}
              readOnly
            />
          </div>
          <div>
            <p className="m-0 text-primary fs-12px">Records per page</p>
          </div>
        </div>
      </div>
      <div className="ms-none ms-lg-auto d-sm-flex gap-3 mt-3 mt-lg-0 justify-content-sm-center">
        <div className="d-none d-lg-block d-flex align-items-center gap-3 justify-content-center justify-content-between page-input">
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder={count}
              className="form-control text-center bg-white w-5 h-5"
              onKeyPress={handleKeyPressForNumber}
              readOnly
            />

            <p className="m-0 text-primary fs-12px ">Records per page</p>
          </div>
        </div>
        <nav aria-label="Page navigation contact ">
          <ul className="pagination justify-content-between">
            <li className="page-item">
              <a
                type="button"
                className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                href="/#"
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage !== 1) {
                    handlePagination(currentPage - 1);
                  }
                }}
              >
                <img src="/assets/pagination-left.svg" alt="" />
              </a>
            </li>
            <div className="d-flex">
              <li className="page-item">
                <a
                  className="page-link border-0 rounded fw-semibold text-blue-active"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {currentPage}
                </a>
              </li>
            </div>
            {currentPage + 1 <= totalPages && (
              <li className="page-item">
                <a
                  className="page-link border-0 rounded fw-semibold text-primary"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePagination(currentPage + 1);
                  }}
                >
                  {currentPage + 1}
                </a>
              </li>
            )}
            <li className="page-item">
              <a
                type="button"
                className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                href="/#"
                aria-label="Previous"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    handlePagination(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
              >
                <img src="/assets/pagination-right.svg" alt="" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PaginationWithCount;
