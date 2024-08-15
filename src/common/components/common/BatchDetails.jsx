import React from 'react';
import { Link } from 'react-router-dom';

function BatchDetails({ show, setShow, batchDetails }) {
  const handleClose = () => {
    setShow({ isVisible: false, type: '' });
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasBatchDetails"
        aria-labelledby="offcanvasBatchLabel"
      >
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Batch details</p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                handleClose();
              }}
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <div className="accordion-body acc-card-content p-3 pt-0 shadow-6 rounded">
            <div className="py-2 px-2 mt-3">
              <p className="text-primary fw-medium mb-2">{batchDetails?.batchName}</p>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Batch name:</p>
              </div>
              <div>
                <h6>{batchDetails?.batchName}</h6>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Carrier:</p>
              </div>
              <div>
                <Link
                  to="/comm-telephony/vendor-carriers-local-switch/"
                  className="text-blue-active fw-medium"
                >
                  {batchDetails?.carrier}
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Lot:</p>
              </div>
              <div>
                <a href="/comm-telephony/vendor-lot/" className="text-blue-active fw-medium">
                  {batchDetails?.lot}
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">DID/TF Count:</p>
              </div>
              <div>
                <h6>{batchDetails?.DIDTFCount}</h6>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Channels:</p>
              </div>
              <div>
                <h6>{batchDetails?.channels}</h6>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">MRC/MRC(Inc):</p>
              </div>
              <div>
                <Link
                  href="/comm-telephony/vendor-batch-mrc-details/"
                  className="text-blue-active fw-medium"
                >
                  {batchDetails?.mrcCount}
                </Link>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Carrier Plan In:</p>
              </div>
              <div>
                <h6> {batchDetails?.carrierPlanIn}</h6>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Carrier Plan In Package:</p>
              </div>
              <div>
                <h6>{batchDetails?.carrierPlanInPackage}</h6>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Carrier Plan Out:</p>
              </div>
              <div>
                <h6>{batchDetails?.carrierPlanOut}</h6>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between py-2 edit-group px-2 rounded">
              <div>
                <p className="fs-13px mb-0">Carrier Plan Out Package:</p>
              </div>
              <div>
                <h6>{batchDetails?.carrierPlanOutPackage}</h6>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
            <a
              href="/#"
              className="d-flex bg-black text-white align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px"
              data-bs-dismiss="offcanvas"
              onClick={(e) => {
                e.preventDefault();
                setShow({ isVisible: true, type: 'edit-batch' });
              }}
            >
              Edit Batch
            </a>
          </div>
        </div>
      </div>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default BatchDetails;
