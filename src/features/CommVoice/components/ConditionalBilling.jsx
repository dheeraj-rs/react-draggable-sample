import React, { useState } from 'react';
import { generateUniqueId, handleKeyPressForNumber } from '../../../common/helpers/utils';

function ConditionalBilling({
  details,
  show,
  onClose,
  setShow,
  action,
  unPaginatedCarrierPlans,
  isLoading,
  billingMode,
  conditions,
  setConditions,
  conditionalBillingElseCondition,
  setConditionalBillingElseCondition,
}) {
  const [errors, setErrors] = useState([]);

  const handleClose = () => {
    setErrors([]);
    setConditions([
      {
        id: 1,
        condition: 'select',
        conditionalMinute: 0,
        startMinute: 0,
        endMinute: 0,
        carrierPlan: 'select',
      },
    ]);

    onClose();
  };

  const handleDelete = (slab) => {
    setErrors((prevArray) => prevArray.filter((element) => element.id !== slab?.id));
    setConditions((prevArray) => prevArray.filter((element) => element.id !== slab?.id));
  };

  const updateItemValue = (type, itemId, value) => {
    const updatedErrors = errors.map((error) => {
      if (error.id === itemId) {
        return { ...error, [`${type}`]: false };
      }
      return error;
    });
    setErrors(updatedErrors);

    const updatedItems = conditions.map((slab) => {
      if (slab.id === itemId) {
        return { ...slab, [`${type}`]: value };
      }
      return slab;
    });

    setConditions(updatedItems);
  };

  const isValid = (targetId, name) => {
    const foundItem = errors?.find((slab) => slab?.id === targetId);
    if (foundItem) {
      if (
        foundItem?.condition === false &&
        foundItem?.conditionalMinute === false &&
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

      conditions?.map((slab) => {
        const err = {
          id: '',
          condition: false,
          conditionalMinute: false,
          startMinute: false,
          endMinute: false,
          carrierPlan: false,
        };

        err.id = slab?.id;

        if (!slab?.condition || slab?.condition === 'select') {
          err.condition = true;
          errorsArray.push(`Condition is required for id ${slab?.id}`);
        }

        if (!slab?.conditionalMinute) {
          err.conditionalMinute = true;
          errorsArray.push(`Conditional Minute is required ${slab?.id}`);
        }

        if (!slab?.startMinute) {
          err.startMinute = true;
          errorsArray.push(`Start Minute is required ${slab?.id}`);
        }

        if (!slab?.endMinute) {
          err.endMinute = true;
          errorsArray.push(`End Minute is required ${slab?.id}`);
        }

        if (!slab?.carrierPlan || slab?.carrierPlan === 'select') {
          err.carrierPlan = true;
          errorsArray.push(`Carrier Plan is required ${slab?.id}`);
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
        action(conditions);
      })
      .catch(() => {});
  };

  if (show) {
    return (
      <>
        <div
          className="modal mt-65 show"
          tabIndex="-1"
          id="conditionModal"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" style={{ maxWidth: '1106px' }}>
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
                        setConditions([
                          {
                            id: 1,
                            condition: 'select',
                            conditionalMinute: 0,
                            startMinute: 0,
                            endMinute: 0,
                            carrierPlan: 'select',
                          },
                        ]);
                      }}
                    >
                      <a href="/#" className="d-flex justify-content-center">
                        <img src="/assets/leftback.svg" alt="" />
                      </a>
                    </div>
                    <h4 className="modal-title text-dark fw-medium fs-15px">Conditional Billing</h4>
                  </div>

                  <a
                    href="/#"
                    type="button"
                    className="btn-close"
                    // data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  />
                </div>

                <div className="modal-body pt-0">
                  <div className="table-responsive">
                    <table className="table vendor-billing-table">
                      <thead className="mb-5">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Condition</th>
                          <th scope="col">Conditional Minute</th>
                          <th scope="col">Start Minute</th>
                          <th scope="col">End Minute</th>
                          <th scope="col">Carrier Plan</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {conditions?.map((slab, index) => (
                          <tr key={index}>
                            <td>
                              <div
                                role="button"
                                className="bg-regent-grey text-white d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-bolder"
                              >
                                {index + 1}
                              </div>
                            </td>
                            <td>
                              <select
                                className="form-select mb-0 bg-white select w-auto form-select-custom role  text-black"
                                aria-label="Default select example"
                                name="condition"
                                onChange={(e) => {
                                  updateItemValue(e.target.name, slab?.id, e.target.value);
                                }}
                                value={slab?.condition}
                                style={
                                  isValid(slab?.id, 'condition') ? {} : { border: '1px solid red' }
                                }
                              >
                                <option value="select" disabled>
                                  -Select-
                                </option>
                                <option value="equal_to">Equalto </option>
                                <option value="less_than">Lessthan</option>
                                <option value="greater_than">Greaterthan</option>
                                <option value="less_than_or_equal_to">LessThan or Equalto</option>
                                <option value="greater_than_or_equal_to">
                                  Greater than or Equalto
                                </option>
                              </select>
                              {isValid(slab?.id, 'condition') ? (
                                ''
                              ) : (
                                <span style={{ color: 'red' }}>*required</span>
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control bg-white"
                                id="condition"
                                placeholder="0"
                                name="conditionalMinute"
                                onChange={(e) => {
                                  updateItemValue(e.target.name, slab?.id, e.target.value);
                                }}
                                value={slab?.conditionalMinute}
                                style={
                                  isValid(slab?.id, 'conditionalMinute')
                                    ? {}
                                    : { border: '1px solid red' }
                                }
                                onKeyPress={handleKeyPressForNumber}
                                autoComplete="off"
                              />
                              {isValid(slab?.id, 'conditionalMinute') ? (
                                ''
                              ) : (
                                <span style={{ color: 'red' }}>*required</span>
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control bg-white"
                                id="start1"
                                placeholder="0"
                                name="startMinute"
                                onChange={(e) => {
                                  updateItemValue(e.target.name, slab?.id, e.target.value);
                                }}
                                value={slab?.startMinute}
                                style={
                                  isValid(slab?.id, 'startMinute')
                                    ? {}
                                    : { border: '1px solid red' }
                                }
                                onKeyPress={handleKeyPressForNumber}
                                autoComplete="off"
                              />
                              {isValid(slab?.id, 'startMinute') ? (
                                ''
                              ) : (
                                <span style={{ color: 'red' }}>*required</span>
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control bg-white"
                                id="end1"
                                placeholder="0"
                                name="endMinute"
                                onChange={(e) => {
                                  updateItemValue(e.target.name, slab?.id, e.target.value);
                                }}
                                value={slab?.endMinute}
                                style={
                                  isValid(slab?.id, 'endMinute') ? {} : { border: '1px solid red' }
                                }
                                onKeyPress={handleKeyPressForNumber}
                                autoComplete="off"
                              />
                              {isValid(slab?.id, 'endMinute') ? (
                                ''
                              ) : (
                                <span style={{ color: 'red' }}>*required</span>
                              )}
                            </td>
                            <td>
                              <select
                                className="form-select mb-0 bg-white select w-auto form-select-custom role  text-black"
                                aria-label="Default select example"
                                name="carrierPlan"
                                onChange={(e) => {
                                  updateItemValue(e.target.name, slab?.id, e.target.value);
                                }}
                                value={slab?.carrierPlan}
                                style={
                                  isValid(slab?.id, 'carrierPlan')
                                    ? {}
                                    : { border: '1px solid red' }
                                }
                              >
                                <option value="select">-No plan selected-</option>
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
                                handleDelete(slab);
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
                  <div
                    className="d-flex mt-3 mt-sm-2 mt-lg-0"
                    onClick={() => {
                      if (errors?.length === 0) {
                        setConditions((prevArray) => [
                          ...prevArray,
                          {
                            id: generateUniqueId(),
                            condition: '',
                            conditionalMinute: '',
                            startMinute: '',
                            endMinute: '',
                            carrierPlan: 'select',
                          },
                        ]);
                      }
                    }}
                  >
                    <a
                      id="addConditionSlab"
                      href="/#"
                      className=" text-blue-active"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <img className="pe-2" src="/assets/plus-blue-round.svg" alt="" />
                      Add Condition
                    </a>
                  </div>
                  <div className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row gap-2 gap-sm-5 mt-3 bg-input-gray p-3 rounded">
                    <div
                      role="button"
                      className="bg-gray-blue-white text-white d-flex flex-column align-items-center justify-content-center fs-13px h-5 w-8 rounded fw-medium"
                      onClick={() => {
                        setConditions((prevArray) => [
                          ...prevArray,
                          {
                            id: generateUniqueId(),
                            condition: 'else',
                            conditionalMinute: '',
                            startMinute: '',
                            endMinute: '',
                            carrierPlan: 'select',
                          },
                        ]);
                      }}
                    >
                      Else
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="text-primary">Carrier Plan</label>
                      <select
                        className="form-select mb-0 bg-white select w-auto form-select-custom role text-black select-carrier-plan"
                        aria-label="Default select example"
                        onChange={(e) => {
                          setConditionalBillingElseCondition(e.target.value);
                        }}
                        value={conditionalBillingElseCondition || 'select'}
                      >
                        <option value="select">-No plan selected-</option>
                        {unPaginatedCarrierPlans?.map((carrierPlan) => (
                          <option value={carrierPlan?.id} key={carrierPlan?.id}>
                            {carrierPlan?.attributes?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
                    <button
                      id="saveConditionButton"
                      //   data-bs-dismiss="modal"
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
                      // data-bs-dismiss="modal"
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
        </div>
        <div className="modal-backdrop show" />
      </>
    );
  }
  return null;
}

export default ConditionalBilling;
