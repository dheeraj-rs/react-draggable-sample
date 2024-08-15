import React from 'react';

function CarrierPackageDetails({
  show,
  onClose,
  setShow,
  data,
  billingDetails,
  unPaginatedCarrierPlans,
}) {
  const handleClose = () => {
    onClose();
  };

  if (show) {
    return (
      <>
        <div
          className="modal mt-65"
          tabIndex="-1"
          id="slabBillingModal"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" style={{ maxWidth: '650px' }}>
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <div className="d-flex gap-3 align-items-center">
                    <h4 className="modal-title text-primary fw-medium fs-15px">
                      <img className="pe-2" src="/assets/slab-bill.svg " alt="" />{' '}
                      {data?.packageName}
                    </h4>
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
                  <div className="row justify-content-between bg-pattens-blue align-items-center p-2 p-lg-2 p-sm-2 py-4 py-lg-2 rounded mt-3 cursor-pointer mx-0 flex-wrap">
                    <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-lg-6 col-sm-6 col-12 mb-lg-0 mb-3 mb-sm-0">
                      <div className="d-flex gap-3 align-items-center">
                        <img src="/assets/slab-change.svg" alt="" />
                      </div>
                      <div>
                        <p className="mb-0 fw-500">
                          {data?.billingMode === 'slab_billing' ? 'Slab Billing' : ''}
                          {data?.billingMode === 'conditional_billing' ? 'Conditional Billing' : ''}
                        </p>
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setShow({
                            isVisible: true,
                            id: data?.id || null,
                            attributes: {
                              stage: 1,
                              isVisible: true,
                              billingModeType: data?.billingMode,
                              actionType: 'edit-carrier-package',
                              packageName: data?.packageName,
                            },
                          });
                        }}
                      >
                        <a
                          href="/#"
                          //   data-bs-toggle="tooltip"
                          //   data-bs-title="Change billing mode"
                          className="text-blue-active"
                        >
                          Change
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-2 col-sm-6 col-12 mt-3 mt-lg-0 mt-sm-0">
                      <div className="abc-sample d-flex align-items-center px-2 px-lg-2 px-sm-3 justify-content-end py-3 gap-3 gap-lg-3 gap-sm-1 py-lg-3 py-sm-2">
                        <p className="mb-0 d-flex">Enable</p>
                        <div className="d-flex align-items-center flex-row-reverse justify-content-between flex-wrap">
                          <label className="switch">
                            <input type="checkbox" checked={data?.isEnable} id="activeId" />
                            <span className="slider round" />
                          </label>
                          <span className="fw-normal text-primary check-title" />
                        </div>
                        <div className="border-start d-flex gap-3 ms-2 ps-3">
                          <a
                            href="/#"
                            className="dropdown-item hover-white d-flex align-items-center justify-content-center"
                            // data-bs-toggle="modal"
                            // data-bs-target="#slabEditModal"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({
                                isVisible: true,
                                id: data?.id || null,
                                attributes: {
                                  stage: 1,
                                  isVisible: true,
                                  billingModeType: data?.billingMode,
                                  actionType: 'edit-carrier-package',
                                  packageName: data?.packageName,
                                },
                              });
                            }}
                          >
                            <img
                              //   data-bs-toggle="tooltip"
                              //   data-bs-title="Edit"
                              src="/assets/PencilSimpleLine.svg"
                              alt=""
                            />
                          </a>
                          <a
                            href="/#"
                            className="dropdown-item hover-white d-flex align-items-center justify-content-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({
                                id: data?.id || null,
                                isVisible: true,
                                type: 'delete-carrier-package',
                                packageName: data?.packageName,
                              });
                            }}
                          >
                            <img src="/assets/Trash.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive mt-4">
                    <table className="table carrier-table">
                      <thead className="mb-5">
                        <tr>
                          <th scope="col">Slab</th>
                          <th scope="col">Start Minute</th>
                          <th scope="col">End Minute</th>
                          <th scope="col">Carrier Plan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(billingDetails).length > 0 &&
                          Object.keys(billingDetails)?.map((keys, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td> {billingDetails[keys]?.attributes?.startMinute}</td>
                              <td>{billingDetails[keys]?.attributes?.endMinute}</td>
                              <td>
                                {
                                  unPaginatedCarrierPlans[billingDetails[keys]?.attributes?.planId]
                                    ?.attributes?.name
                                }
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
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

export default CarrierPackageDetails;
