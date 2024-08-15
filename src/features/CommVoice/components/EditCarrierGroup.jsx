/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Input from '../../../common/components/forms/Input';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Checkbox from '../../../common/components/forms/Checkbox';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';

function EditCarrierGroup({
  editCarrierGroup,
  show,
  dataSubmitting,
  onClose,
  unPaginatedCarriersList,
  carrierGroupDetails,
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
      const data = {
        type: 'telephony_vendor_carrier_groups',
        id: parseInt(carrierGroupDetails?.data?.id, 10),
        attributes: {
          name: formik.values.groupName,
        },
        relationships: {
          carriers: {
            data: formik?.values?.carriers,
          },
        },
      };
      setIsAllCarriersSelected(false);
      editCarrierGroup(formik, data, carrierGroupDetails?.data?.id);
    },
  });

  const handleCarrierSelection = (carrier) => {
    const index = formik?.values?.carriers?.findIndex((obj) => obj.id === carrier.id);

    if (index === -1) {
      // carrier is not in the array, so add it.
      formik.setFieldValue('carriers', [...formik.values.carriers, carrier]);
    } else {
      // carrier is already in the array, so remove it.

      const updatedCarriers = formik.values.carriers.filter((e) => e?.id !== carrier.id);

      formik.setFieldValue('carriers', updatedCarriers);
    }
  };

  const handleRemoveCarrier = (carrierId) => {
    const index = formik?.values?.carriers?.findIndex((obj) => obj.id === carrierId);
    if (index != null) {
      const updatedCarriers = formik.values.carriers.filter((e) => e?.id !== carrierId);

      formik.setFieldValue('carriers', updatedCarriers);
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setIsAllCarriersSelected(false);
    onClose();
  };

  // const handleSearch = () => {
  //   const matchingNames = unPaginatedCarriersList?.filter((carrier) =>
  //     carrier.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setSearchResult(matchingNames);
  // };

  // useEffect(() => {
  //   handleSearch();
  // }, [searchTerm]);

  useEffect(() => {
    const data = [];
    if (isAllCarriersSelected === true) {
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
    if (carrierGroupDetails?.data?.id) {
      formik.setFieldValue('groupName', carrierGroupDetails?.data?.attributes?.name);
      formik.setFieldValue('carriers', carrierGroupDetails?.data?.relationships?.carriers?.data);
    }

    if (
      carrierGroupDetails?.data?.relationships?.carriers?.data?.length ===
      unPaginatedCarriersList?.length
    ) {
      setIsAllCarriersSelected(true);
    } else {
      setIsAllCarriersSelected(false);
    }
  }, [carrierGroupDetails, unPaginatedCarriersList]);

  useEffect(() => {
    if (formik?.values?.carriers?.length === unPaginatedCarriersList?.length) {
      setIsAllCarriersSelected(true);
    } else {
      setIsAllCarriersSelected(false);
    }
  }, [formik?.values?.carriers]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'show' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasRightEditCarrierGroup"
        aria-labelledby="offcanvasRightEditCarrierGroupLabel"
      >
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-14px text-primary fw-medium mb-0">Edit Carrier group</p>
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
          <div>
            <Input
              label="Carrier Group Name"
              id="property"
              placeholder="Enter group name"
              type="text"
              disabled={false}
              name="groupName"
              onChange={formik.handleChange}
              value={formik?.values?.groupName}
              style={isFormFieldValid(formik, 'groupName') ? { border: '1px solid red' } : {}}
            />
            {getFormErrorMessage(formik, 'groupName')}
          </div>

          <div>
            <div className="d-flex flex-column mt-3">
              <div className="d-flex justify-content-between">
                {' '}
                <p className="mb-0 text-secondary fw-medium fs-13px mb-2">Carrier List</p>
                <p className="mb-0">
                  {' '}
                  <span className="fw-medium">{formik?.values?.carriers?.length}</span> Carriers
                  selected
                </p>
              </div>

              <div className="dropdown-center">
                <button
                  className="form-control w-100 form-select text-start bg-white py-12px mb-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Choose carriers
                </button>

                {/* preview selected a carrier -- start */}
                <div
                  id="selectedCarriers"
                  style={formik?.values?.carriers?.length > 0 ? {} : { display: 'none' }}
                >
                  <div className="d-flex gap-2 flex-wrap shadow-6 p-3 rounded">
                    {(searchTerm !== '' ? searchResult : unPaginatedCarriersList)?.map(
                      (carrier, index) => {
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
                      }
                    )}
                  </div>
                </div>
                {/* preview selected a carrier -- end */}

                {/* select a carrier -- start */}
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
                    {searchTerm === '' ? (
                      <div
                        className="mb-3 search-carrier"
                        style={searchResult?.length > 0 ? { display: 'none' } : {}}
                      >
                        <Checkbox
                          title="All carriers"
                          id="allCarriersSelected"
                          onClick={() => {
                            setIsAllCarriersSelected(!isAllCarriersSelected);
                          }}
                          checked={isAllCarriersSelected}
                          onChange={() => {}}
                        />
                      </div>
                    ) : null}

                    {(searchResult?.length > 0 ? searchResult : unPaginatedCarriersList)?.map(
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
                  </div>
                </ul>
                {/* select a carrier -- end */}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
            <button
              id="editCarrierButton"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
              disabled={dataSubmitting}
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              {dataSubmitting ? 'Saveing...' : 'Save'}
            </button>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
              onClick={() => {
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

export default EditCarrierGroup;
