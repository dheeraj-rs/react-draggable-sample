import React from 'react';

function Pagination({ handlePagination, currentPage, totalPages, count }) {
  return (
    <div className="d-flex flex-row align-items-center shadow-1 p-3 mt-3">
      <div className="d-flex align-items-center gap-3">
        <span className="bg-blue-lily border-0 rounded h-4 w-4 d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold">
          {count}
        </span>{' '}
        Records per page
      </div>

      <div className="ms-auto">
        <nav aria-label="Page navigation contact">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage !== 1) {
                    handlePagination(currentPage - 1);
                  }
                }}
                aria-label="Previous"
              >
                <img src="/assets/pagination-left.svg" alt="" />
              </a>
            </li>
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
                className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    handlePagination(currentPage + 1);
                  }
                }}
                aria-label="Previous"
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

export default Pagination;
