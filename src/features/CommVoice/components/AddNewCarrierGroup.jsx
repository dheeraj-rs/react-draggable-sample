/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Checkbox from '../../../common/components/forms/Checkbox';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Input from '../../ChatWidget/components/InputLabel';
import '../../../styles/formvalidation.css';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';

function AddNewCarrierGroup({
  addNewGroup,
  show,
  dataSubmitting,
  onClose,
  unPaginatedCarriersList,
}) {
  const [isAllCarriersSelected, setIsAllCarriersSelected] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResult, setSearchResult] = useState([]);

  const validate = (data) => {
    const errors = {};

    if (!data.groupName) {
      errors.groupName = 'group name is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      groupName: '',
      carriers: [],
    },
    validate,
    onSubmit: () => {
      setIsAllCarriersSelected(false);
      addNewGroup(formik, formik.values.groupName);
    },
  });

  const handleCarrierSelection = (carrier) => {
    const index = formik?.values?.carriers?.findIndex((obj) => obj.id === carrier.id);

    if (index === -1) {
      // carrier is not in the array, so add it.
      formik.setFieldValue('carriers', [...formik.values.carriers, carrier]);
    } else {
      // carrier is already in the array, so remove it.
      formik?.values?.carriers?.splice(index, 1);
    }
  };

  const handleRemoveCarrier = (carrierId) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      carriers: prevValues.carriers.filter((obj) => obj.id !== carrierId),
    }));
  };

  const handleClose = () => {
    setSearchTerm('');
    formik.resetForm();
    setIsAllCarriersSelected(false);
    onClose();
  };

  useEffect(() => {
    const data = [];
    if (isAllCarriersSelected) {
      unPaginatedCarriersList?.map((carrier) => {
        data.push({ type: 'telephony_vendor_carriers', id: carrier?.id });
        return null;
      });

      formik.setFieldValue('carriers', data);
    }
  }, [isAllCarriersSelected]);

  useEffect(() => {
    if (searchTerm) {
      const filteredNames = unPaginatedCarriersList.filter((carrier) => {
        return carrier?.attributes?.name?.toLowerCase().includes(searchTerm?.toLowerCase());
      });

      setSearchResult(filteredNames);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (
      unPaginatedCarriersList?.length > 0 &&
      formik.values.carriers?.length !== unPaginatedCarriersList?.length
    ) {
      setIsAllCarriersSelected(false);
    }

    if (
      unPaginatedCarriersList?.length > 0 &&
      formik.values.carriers?.length === unPaginatedCarriersList?.length
    ) {
      setIsAllCarriersSelected(true);
    }
  }, [formik.values.carriers.length]);
  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'show' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasRightCarrierGroup"
        aria-labelledby="offcanvasRightCarrierGroupLabel"
      >
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-14px text-primary fw-500 mb-1">Add Carrier Group</p>
            <p className="mb-0 fs-13px text-secondary">
              Create unique carrier group to organize the carriers with easy
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <div>
            <Input
              label="Group Name"
              id="property"
              placeholder="Enter group name"
              type="text"
              disabled={false}
              name="groupName"
              onChange={formik.handleChange}
              value={formik?.values?.groupName}
              style={isFormFieldValid(formik, 'groupName') ? { border: '1px solid red' } : {}}
              maxLength={50} // Set the character limit here
            />
            {getFormErrorMessage(formik, 'groupName')}
          </div>

          <div>
            <div className="d-flex flex-column mt-3">
              <p className="mb-0 text-secondary fw-medium fs-13px mb-2">Carriers (optional)</p>
              <div className="dropdown-center">
                <button
                  className="form-control w-100 form-select text-start bg-white py-12px mb-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  -No Carriers selected-
                </button>

                <div id="selectedCarriers">
                  <div>
                    <p className="text-primary">
                      <span className="fw-medium">{formik?.values?.carriers?.length}</span> Carriers
                      selected
                    </p>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    {unPaginatedCarriersList?.map((carrier, index) => {
                      if (formik?.values?.carriers?.some((e) => e?.id === carrier?.id)) {
                        return (
                          <div
                            key={index}
                            className="alert alert-dismissible bg-original-gray p-2 fade show w-100 py-2 d-flex justify-content-between mb-2"
                            role="alert"
                            id="virginBanglurSelected"
                          >
                            {carrier?.attributes?.name}
                            <a
                              href="/#"
                              aria-label="Close"
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveCarrier(carrier?.id);
                              }}
                            >
                              <img src="/assets/close-alert.svg" alt="" />
                            </a>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                <ul className="dropdown-menu shadow-6 p-3 w-100">
                  <div className="w-100 w-md-auto mt-3 mb-3">
                    <SearchWithBorder
                      placeholderText="Search carrier"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      clearBtn={() => {
                        setSearchTerm('');
                      }}
                      searchTerm={searchTerm}
                    />
                  </div>
                  <div className="">
                    {!searchTerm && (
                      <div
                        className="mb-3 search-carrier"
                        style={searchResult?.length > 0 ? { display: 'none' } : {}}
                      >
                        <Checkbox
                          title="All carriers"
                          id="allCarriersSelected"
                          onClick={() => {
                            if (isAllCarriersSelected) {
                              formik.setFieldValue('carriers', []);
                            }
                            setIsAllCarriersSelected(!isAllCarriersSelected);
                          }}
                          checked={isAllCarriersSelected}
                          onChange={() => {}}
                        />
                      </div>
                    )}
                    {(searchTerm ? searchResult : unPaginatedCarriersList)?.map(
                      (carrier, index) => (
                        <div className="mb-3 search-carrier" key={index}>
                          <Checkbox
                            title={carrier?.attributes?.name}
                            onClick={() => {
                              handleCarrierSelection({
                                type: 'telephony_vendor_carriers',
                                id: carrier?.id,
                              });
                            }}
                            checked={formik.values.carriers?.some((e) => e?.id === carrier?.id)}
                            onChange={() => {}}
                          />
                        </div>
                      )
                    )}

                    {searchTerm && searchResult?.length === 0 && (
                      <div
                        className="mb-3 search-carrier"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          background: '#ebefff',
                          fontWeight: '600',
                        }}
                      >
                        NO RESULT FOUND
                      </div>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-3">
            <button
              id="addCarrierButton"
              // data-bs-dismiss="offcanvas"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
              onClick={(e) => {
                e.preventDefault();
                setSearchTerm('');
                formik.handleSubmit();
              }}
              disabled={dataSubmitting}
            >
              {dataSubmitting ? 'creating...' : 'Create group'}
            </button>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
              //   data-bs-dismiss="offcanvas"
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default AddNewCarrierGroup;
