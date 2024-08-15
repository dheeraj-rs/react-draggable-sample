import React from 'react';

function AccordionCustom({ id, collapseTarget, collapseId, parent, children, image, title }) {
  return (
    <div className="sidebar mb-3">
      <div className="accordion accordion-custom-right" id={id}>
        <div className="accordion-item acc-card shadow-1 bg-white border-0 rounded p-2 fs-13px position-relative">
          <div className="accordion-header bg-white" id="headingUpdate">
            <a
              className="accordion-button  head d-flex align-items-center bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={collapseTarget}
              aria-expanded="true"
              aria-controls={collapseId}
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center me-3 ">
                  <img src={image} alt="" />
                </div>
                <span className="text-primary d-block fs-13px fw-500">{title}</span>
              </div>
            </a>
          </div>
          <div
            id={collapseId}
            className="accordion-collapse collapse show"
            aria-labelledby="headingUpdate"
            data-bs-parent={parent}
          >
            <div className="accordion-body acc-card-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionCustom;
