import React from 'react';

function VendorViewCarrierBatch() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasBatch"
      aria-labelledby="offcanvasBatchLabel"
    >
      <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
        <div>
          <p className="fs-16px text-primary fw-medium mb-0">Batch</p>
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
        <div className="accordion accordion-custom-right mt-3" id="accordionBth">
          <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-2 fs-13px position-relative">
            <div className="accordion-header bg-white" id="headingUpdate">
              <a
                className="accordion-button collapsed head d-flex align-items-center bg-white px-3 py-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseBth"
                aria-expanded="false"
                aria-controls="collapseBth"
                href="/"
              >
                <div className="d-flex align-items-center">
                  <span className="text-primary d-block fs-13px fw-500">Bharti-45</span>
                </div>
              </a>
            </div>
            <div
              id="collapseBth"
              className="accordion-collapse collapse show"
              aria-labelledby="headingUpdate"
              data-bs-parent="#accordionBth"
            >
              <div className="accordion-body acc-card-content pt-0 px-2 pb-1">
                <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
                  <div>
                    <p className="fs-13px mb-0">Batch name:</p>
                  </div>
                  <div>
                    <h6>Bharti-45</h6>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
                  <div>
                    <p className="fs-13px mb-0">DID/TF Count:</p>
                  </div>
                  <div>
                    <h6>800/100(900)</h6>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
                  <div>
                    <p className="fs-13px mb-0">Total Channels:</p>
                  </div>
                  <div>
                    <h6>4000</h6>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
                  <div>
                    <p className="fs-13px mb-0">MRC/MRC(Inc):</p>
                  </div>
                  <div>
                    <h6>3500/3000</h6>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
                  <div>
                    <p className="fs-13px mb-0">Carrier Plan:</p>
                  </div>
                  <div>
                    <h6 className="text-blue-active">Bharti_new</h6>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
                  <div>
                    <p className="fs-13px mb-0">Vendor Package:</p>
                  </div>
                  <div>
                    <h6 className="text-blue-active">Bharti_vendor_new</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion accordion-custom-right mt-3" id="accordionBharathy">
          <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-2 fs-13px position-relative">
            <div className="accordion-header bg-white" id="accordionBharathy75">
              <a
                className="accordion-button collapsed head d-flex align-items-center bg-white px-3 py-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseCompany"
                aria-expanded="false"
                aria-controls="collapseCompany"
                href="/"
              >
                <div className="d-flex align-items-center">
                  <span className="text-primary d-block fs-13px fw-500">Bharti-74</span>
                </div>
              </a>
            </div>
            <div
              id="collapseCompany"
              className="accordion-collapse collapse"
              aria-labelledby="accordionBharathy75"
              data-bs-parent="#accordionBharathy"
            >
              <div className="accordion-body acc-card-content pt-0 px-2 pb-1">
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
                    <p className="fs-13px mb-0">Batch name:</p>
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
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
          <a
            href="/comm-telephony/vendor-batch/"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px"
          >
            Manage Batch
          </a>
        </div>
      </div>
    </div>
  );
}

export default VendorViewCarrierBatch;
