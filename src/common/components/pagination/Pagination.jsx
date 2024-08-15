import React from 'react';
import { handleKeyPressForNumber } from '../../helpers/utils';

function Pagination({ handlePagination, currentPage, totalPages, total = '', count }) {
  return (
    <div className="d-flex flex-column flex-md-row gap-4 justify-content-between mt-4">
      <p className="fs-12px mb-0 d-flex">
        <span className="text-primary fw-semibold"> {count} </span>
        <span className="text-secondary ms-1"> Record(s) available</span>
      </p>
      <div className="d-flex align-items-center gap-3">
        <p className="text-secondary mb-0">Show</p>
        <input
          type="text"
          className="form-control bg-white w-50px h-50px text-center"
          id="exampleFormControlInput1"
          placeholder=""
          value={total}
          // onChange={handlePagination}
          onKeyPress={handleKeyPressForNumber}
          readOnly
        />
        <p className="text-secondary mb-0 me-3">records</p>
        <button
          type="button"
          className={`btn ${
            currentPage === 1 ? 'btn-roman-silver' : 'btn-white border'
          } o-50 d-flex align-items-center justify-content-center w-26px h-26px w-md-40px h-md-40px`}
          disabled={currentPage === 1}
          onClick={() => {
            handlePagination(currentPage - 1);
          }}
        >
          {currentPage === 1 ? (
            <img src="/svg/icons/prev-white.svg" alt="" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="btn btn-ghost-white d-flex align-items-center justify-content-center w-26px h-26px w-md-40px h-md-40px"
        >
          1
        </button>
        <button
          type="button"
          className={`btn ${
            currentPage === totalPages ? 'btn-roman-silver' : 'btn-white border'
          } btn-white border d-flex align-items-center justify-content-center w-26px h-26px w-md-40px h-md-40px`}
          onClick={() => {
            handlePagination(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          {currentPage === totalPages ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          ) : (
            <img src="/svg/icons/next-gray.svg" alt="" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
