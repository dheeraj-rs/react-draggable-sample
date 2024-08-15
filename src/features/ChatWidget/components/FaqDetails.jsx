import React from 'react';

function FaqDetails({ showFaqDetails, onBack }) {
  return (
    <div
      className={`accordion-body rounded-bottom p-0 faq-qn-details ${(showFaqDetails) ? ('') : ('d-none')}`}
    >
      <div
        className="d-flex bg-white justify-content-between p-3 align-items-center"
      >
        <div className="d-flex align-items-center gap-2">
          <div className="p-1 rounded faq-back">
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
            >
              <img src="/assets/ArrowLeft.svg" alt="" />
            </a>
          </div>
          <div className="fw-medium">
            1. How to configure chat widget
          </div>
        </div>
        <div>
          <a
            href="/#"
            onClick={(e) => { e.preventDefault(); }}
          >
            <div
              role="button"
              data-bs-toggle="tooltip"
              data-bs-title="Open in new Browser"
              data-bs-placement="top"
              className="d-block"
            >
              <img src="/assets/CopySimpleblack.svg" alt="" />
            </div>
          </a>
        </div>
      </div>
      <hr className="m-0 border-black o-16" />
      <div className="p-4">
        <p className="fs-13px">
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Aliquam sem urna, condimentum sed nisl ac,
          rhoncus convallis diam. Duis elit lacus, ornare et
          odio in, lobortis sagittis sapien. Mauris
          sollicitudin, ante eget facilisis semper, sapien
          lectus scelerisque tortor.
        </p>

        <p className="fs-13px">
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Aliquam sem urna.
        </p>
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            className="bg-white border border-bor-dot-blue border-1 text-black mt-4 fw-500 fs-14 rounded p-2 btn-blue-hover"
            type="submit"
            value=""
          >
            <img src="/assets/ThumbsUp.svg" alt="" />
            {' '}
            Helpful
          </button>
          <button
            className="bg-white border border-bor-dot-blue border-1 text-black mt-4 fw-500 fs-14 rounded p-2 btn-blue-hover"
            type="submit"
            value=""
          >
            <img src="/assets/ThumbsDown.svg" alt="" />
            {' '}
            Not Helpful
          </button>
        </div>
        <p className="text-center mt-4 text-dark-blue-bb">
          Powered by,
          {' '}
          <b>Gsoftcomm</b>
        </p>
      </div>
    </div>
  );
}

export default FaqDetails;
