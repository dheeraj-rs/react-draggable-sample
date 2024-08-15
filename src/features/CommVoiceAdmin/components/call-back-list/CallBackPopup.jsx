import React from 'react';
import '../../../../styles/scss/components/ComponentSelectPopup.scss';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';

function CallBackPopup() {
  return (
    <div
      className="modal fade"
      id="callBackPopup"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog shadow-7" style={{ top: '80px' }}>
        <div className="modal-content" style={{ border: 'none' }}>
          <div className="modal-body" style={{ padding: '30px' }}>
            <div className="d-flex justify-content-between mb-4 mt-n2">
              <h5 className="fs-16px text-primary fw-500 m-0">Components</h5>
              <span className="cursor-pointer" data-bs-dismiss="modal">
                <img src="/assets/call-flows-hours/X.svg" alt="" />
              </span>
            </div>
            <div>
              <SearchWithBorder
                placeholderText="Search component"
                onChange={() => {}}
                clearBtn={() => {}}
              />
            </div>
            <div>
              <ul className="mt-3 component-select-popup-items d-flex flex-wrap">
                <li
                  className="d-flex gap-2 align-items-center p-3 bg-pattens-white-hover rounded"
                  id="hangUpOnly"
                  data-bs-dismiss="modal"
                >
                  <span>
                    <img src="/assets/call-flows-hours/hangUp.svg" alt="" />
                  </span>
                  <span className="fs-13px text-primary">Hang-up</span>
                </li>
                <li className="d-flex gap-2 align-items-center p-3 bg-pattens-white-hover rounded">
                  <span className="">
                    <img src="/assets/call-flows-hours/goToFlow.svg" alt="" />
                  </span>
                  <span className="fs-13px text-primary">Go to flow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallBackPopup;
