import React, { useEffect } from 'react';
import Input from '../../../common/components/forms/Input';
import ImageBadgeWithTooltip from '../../../common/components/badges/ImageBadgeWithTooltip';

function AddVendorPackage({
  details,
  show,
  onClose,
  setShow,
  packageName,
  setPackageName,
  billingMode,
  setBillingMode,
}) {
  const handleClose = () => {
    setPackageName('');
    onClose();
    setShow({
      type: '',
      isVisible: false,
    });
  };

  useEffect(() => {
    if (details?.id && details?.attributes?.packageName) {
      setPackageName(details?.attributes?.packageName);
    }
  }, [details]);

  if (show) {
    return (
      <>
        <div
          className="modal mt-65 show"
          tabIndex="-1"
          id="newPackageModal"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" style={{ maxWidth: '650px' }}>
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <div className="d-flex flex-column">
                    <h4 className="modal-title text-dark fw-medium fs-15px">Add Vendor Package</h4>
                  </div>

                  <a
                    href="/#"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  />
                </div>

                <div className="modal-body pt-0">
                  <div className="row gx-5">
                    <div className="col-lg-12 col-sm-12">
                      <Input
                        label="Package name"
                        id="planName"
                        placeholder="Enter package name"
                        type="text"
                        value={packageName}
                        onChange={(e) => {
                          setPackageName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="d-flex flex-column mt-3">
                      <h4 className="modal-title text-dark fw-medium fs-14px">
                        Choose billing mode
                      </h4>
                      <p className="text-secondary fs-13px">
                        Build package by picking a right billing structure.
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="invisible-checkboxes d-flex flex-column flex-lg-row gap-3">
                        <input
                          type="checkbox"
                          className="alerts-checkbox"
                          name="billingGroup"
                          value="slab"
                          id="r1"
                          checked={billingMode?.type === 'slab_billing'}
                          onChange={() => {}}
                        />
                        <label
                          className="checkbox-alias"
                          htmlFor="r1"
                          onClick={() => {
                            setBillingMode({ type: 'slab_billing' });
                          }}
                        >
                          <div
                            id="slabBilling"
                            role="button"
                            className="d-flex p-3 gap-3 rounded bg-pattens-blue vendor-pack"
                          >
                            <div>
                              <ImageBadgeWithTooltip
                                bgColor="white"
                                height="5"
                                width="5"
                                img="/assets/slab-billing.svg"
                                title=""
                              />
                            </div>
                            <div className="d-flex flex-column">
                              <a
                                href="/#"
                                role="button"
                                className="fw-medium vendor-bill"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Slab Billing
                              </a>
                              <p className="mb-0 text-secondary">
                                Billing based on certain billing slab specified
                              </p>
                            </div>
                          </div>
                        </label>
                        <input
                          type="checkbox"
                          className="alerts-checkbox"
                          name="billingGroup"
                          value="condition"
                          id="r2"
                          checked={billingMode?.type === 'conditional_billing'}
                          onChange={() => {}}
                        />
                        <label
                          className="checkbox-alias"
                          htmlFor="r2"
                          onClick={() => {
                            setBillingMode({ type: 'conditional_billing' });
                          }}
                        >
                          <div
                            id="conditionalBilling"
                            role="button"
                            className="d-flex p-3 gap-3 rounded bg-pattens-blue vendor-pack"
                          >
                            <div>
                              <ImageBadgeWithTooltip
                                bgColor="white"
                                height="5"
                                width="5"
                                img="/assets/slab-billing.svg"
                                title=""
                              />
                            </div>
                            <div className="d-flex flex-column">
                              <a
                                href="/#"
                                role="button"
                                className="fw-medium vendor-bill"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Conditional Billing
                              </a>
                              <p className="mb-0 text-secondary" />
                              Billing based on the conditions provided
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2 border-0 ps-0 mt-4">
                  <button
                    id="addSlabButton"
                    type="button"
                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                    onClick={() => {
                      setShow({
                        id: details?.id || null,
                        attributes: {
                          stage: 2,
                          isVisible: true,
                          billingModeType: billingMode?.type,
                          actionType: details?.attributes?.actionType,
                        },
                      });
                    }}
                    disabled={packageName ? packageName?.trim() === '' : true}
                  >
                    Continue
                  </button>

                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" />
      </>
    );
  }
  return null;
}

export default AddVendorPackage;
