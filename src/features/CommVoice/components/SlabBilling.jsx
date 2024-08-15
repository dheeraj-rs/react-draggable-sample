import React, { useState } from 'react';

import { generateUniqueId } from '../../../common/helpers/utils';

function SlabBilling({
  details,
  show,
  onClose,
  setShow,
  action,
  unPaginatedCarrierPlans,
  isLoading,
  billingMode,
  setSlabs,
  slabs,
}) {
  const [errors, setErrors] = useState([]);

  const updateBillingValues = (type, itemId, newValue) => {
    const updatedItems = slabs.map((slab) => {
      if (slab.id === itemId) {
        if (type === 'endMinute') {
          return { ...slab, endMinute: parseInt(newValue, 10) };
        }
      }

      return slab;
    });

    setSlabs(updatedItems);
  };

  const handleClose = () => {
    setErrors([]);
    setSlabs([
      {
        id: 1,
        startMinute: 0,
        endMinute: -1,
        carrierPlan: 'select',
      },
    ]);
    onClose();
  };

  const handleDelete = (deletedSlabItem, deletedItemIndex) => {
    const indexToDelete = slabs.findIndex((item) => item.id === deletedSlabItem?.id);

    if (indexToDelete) {
      const updatedItems = [...slabs];

      if (deletedItemIndex !== slabs.length - 1) {
        // Replace the endMinute of the preceding item with the startMinute of the deleted item .
        updatedItems[indexToDelete - 1].endMinute = slabs[indexToDelete].startMinute;

        // Replace startMinute of the succeeding item with the startMinute+1 of the deleted item.
        updatedItems[indexToDelete + 1].startMinute = slabs[indexToDelete].startMinute + 1;

        // Remove the deleted item from the array
        updatedItems.splice(indexToDelete, 1);

        // Update the state with the new array
        setSlabs(updatedItems);
      } else {
        // Replace the endMinute of the last item with -1 .
        updatedItems[indexToDelete - 1].endMinute = -1;

        // Remove the deleted item from the array
        updatedItems.splice(indexToDelete, 1);

        // Update the state with the new array
        setSlabs(updatedItems);
      }
    }
  };

  const updateItemValue = (type, itemId, value) => {
    const updatedErrors = errors.map((error) => {
      if (error.id === itemId) {
        return { ...error, [`${type}`]: false };
      }
      return error;
    });
    setErrors(updatedErrors);

    const updatedItems = slabs.map((slab) => {
      if (slab.id === itemId) {
        return { ...slab, [`${type}`]: value };
      }

      return slab;
    });

    setSlabs(updatedItems);
  };

  const isValid = (targetId, name) => {
    const foundItem = errors?.find((slab) => slab?.id === targetId);
    if (foundItem) {
      if (
        foundItem?.carrierPlan === false &&
        foundItem?.endMinute === false &&
        foundItem?.startMinute === false
      ) {
        const updatedData = errors.filter((item) => item.id !== foundItem?.id);
        setErrors(updatedData);
      }
      return !foundItem[`${name}`];
    }

    return true;
  };

  const validate = () => {
    setErrors([]);

    return new Promise((resolve, reject) => {
      const errorsArray = [];

      slabs?.map((slab) => {
        const err = { id: '', startMinute: false, endMinute: false, carrierPlan: false };

        err.id = slab?.id;
        if (slab.startMinute < 0) {
          err.startMinute = true;
          errorsArray.push(`[${slab?.id}] Start Minute should be > 0,  `);
        } else if (slab.startMinute === '') {
          err.startMinute = true;
          errorsArray.push(`[${slab?.id}]  Start Minute is required `);
        }

        if (!slab?.endMinute) {
          err.endMinute = true;
          errorsArray.push(`[${slab?.id}]  End Minute is required `);
        }
        if (!slab?.carrierPlan || slab?.carrierPlan === 'select') {
          err.carrierPlan = true;
          errorsArray.push(`[${slab?.id}] Carrier Plan is required `);
        }
        setErrors((prevArray) => [...prevArray, err]);
        return null;
      });
      if (errorsArray.length === 0) {
        resolve(true); // All conditions are met
      } else {
        reject(errors); // Return the array of error messages
      }
    });
  };

  const handleSubmit = () => {
    validate()
      ?.then(() => {
        if (slabs[slabs.length - 1].endMinute === -1) {
          action();
        } else {
          alert('End Minute of last slab should be -1');
        }
      })
      .catch(() => {
        // console.error('Validation failed with errors:', err);
      });
  };

  if (show) {
    return (
      <>
        <div className="modal mt-65 show" tabIndex="-1" id="slabModal" style={{ display: 'block' }}>
          <div className="modal-dialog" style={{ maxWidth: '650px' }}>
            <div className="modal-content border-0">
              <div className="modal-content p-4">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <div className="d-flex gap-3 align-items-center">
                    <div
                      role="button"
                      className="left-widget d-none d-lg-block"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow({
                          id: details?.id || null,
                          attributes: {
                            stage: 1,
                            isVisible: true,
                            billingModeType: billingMode,
                            actionType: details?.attributes?.actionType,
                            packageName: details?.attributes?.packageName,
                          },
                        });
                        setErrors([]);
                        setSlabs([
                          {
                            id: 1,
                            condition: 'select',
                            conditionalMinute: 0,
                            startMinute: 0,
                            endMinute: -1,
                            carrierPlan: 'select',
                          },
                        ]);
                      }}
                    >
                      <a
                        href="/#"
                        className="d-flex justify-content-center"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <img src="/assets/leftback.svg" alt="" />
                      </a>
                    </div>
                    <h4 className="modal-title text-dark fw-medium fs-15px">Slab Billing</h4>
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
                  <div className="table-responsive">
                    <table className="table vendor-billing-table mt-3">
                      <thead className="mb-5">
                        <tr>
                          <th scope="col">Slab</th>
                          <th scope="col">Start Minute</th>
                          <th scope="col">End Minute</th>
                          <th scope="col">Carrier Plan</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {slabs?.map((slab, index) => (
                          <tr key={index}>
                            <td>
                              <div
                                role="button"
                                className="btn-num bg-regent-grey text-white d-flex flex-column align-items-center justify-content-center fs-13px h-5 w-5 rounded fw-bolder"
                              >
                                {index + 1}
                              </div>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control bg-white"
                                id="start"
                                placeholder="0"
                                name="startMinute"
                                autoComplete="off"
                                value={slab?.startMinute}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control bg-white"
                                id="end"
                                placeholder="0"
                                name="endMinute"
                                autoComplete="off"
                                onChange={(e) => {
                                  if (e.target.value >= -1 && e.target.value > slab.startMinute) {
                                    updateBillingValues('endMinute', slab.id, e.target.value);
                                  }
                                  if (slab.endMinute === -1) {
                                    updateBillingValues(
                                      'endMinute',
                                      slab.id,
                                      slabs[index].startMinute + 1
                                    );
                                  }
                                }}
                                value={slab?.endMinute}
                                disabled={slabs.length - 1 !== index}
                              />
                            </td>
                            <td>
                              <select
                                className="form-select mb-0 bg-white select w-auto form-select-custom role  text-black"
                                aria-label="Default select example"
                                name="carrierPlan"
                                onChange={(e) => {
                                  updateItemValue(e.target.name, slab?.id, e.target.value);
                                }}
                                value={slab?.carrierPlan || 'select'}
                                style={
                                  isValid(slab?.id, 'carrierPlan')
                                    ? {}
                                    : { border: '1px solid red' }
                                }
                              >
                                <option value="select" disabled>
                                  -No plan selected-
                                </option>
                                {unPaginatedCarrierPlans?.map((carrierPlan) => (
                                  <option value={carrierPlan?.id} key={carrierPlan?.id}>
                                    {carrierPlan?.attributes?.name}
                                  </option>
                                ))}
                              </select>
                              {isValid(slab?.id, 'carrierPlan') ? (
                                ''
                              ) : (
                                <span style={{ color: 'red' }}>*required</span>
                              )}
                            </td>
                            <td
                              className={index === 0 ? 'd-none' : ''}
                              onClick={() => {
                                handleDelete(slab, index);
                              }}
                            >
                              <a
                                id="removeConditionSlab"
                                href="/#"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <img src="/assets/remove-icon.svg" alt="" />
                              </a>
                            </td>
                            <td className={index === 0 ? '' : 'd-none'} />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex" onClick={() => {}}>
                    <a
                      id="addSlab"
                      href="/#"
                      className="text-blue-active"
                      onClick={(e) => {
                        e.preventDefault();
                        if (slabs[slabs.length - 1].endMinute !== -1) {
                          setSlabs((prevArray) => [
                            ...prevArray,
                            {
                              id: generateUniqueId(),
                              startMinute: slabs[slabs.length - 1].endMinute + 1,
                              endMinute: -1,
                              carrierPlan: 'select',
                            },
                          ]);
                        }
                      }}
                    >
                      <img className="pe-2" src="/assets/plus-blue-round.svg" alt="" />
                      Add slab
                    </a>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
                    <button
                      id="saveSlabButton"
                      type="button"
                      className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                      onClick={() => {
                        handleSubmit();
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                      onClick={(e) => {
                        e.preventDefault();
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
        </div>
        <div className="modal-backdrop show" />
      </>
    );
  }

  return null;
}

export default SlabBilling;
