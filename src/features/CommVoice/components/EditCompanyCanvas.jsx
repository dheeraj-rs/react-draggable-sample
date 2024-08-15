/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Input from '../../../common/components/forms/Input';
import {
  GetCompanyContact,
  ListCountries,
  UpdateCompanyContact,
} from '../../../common/api-collection/ContactCompany';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';

function EditCompanyCanvas({ show, id, reloadList, onClose, setToastAction, editCompanyData }) {
  const [company, setCompany] = useState();
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [countries, setCountries] = useState();
  const [spinner, setSpinner] = useState(false);
  const cid = id;
  const listCountries = () => {
    ListCountries()
      .then((response) => {
        if (response?.data) {
          setCountries(response?.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsProfileUpdating(false);
      });
  };

  const getComapny = () => {
    setSpinner(true);
    GetCompanyContact(id)
      .then((response) => {
        setCompany(response?.data);
      })
      .catch(() => {})
      .finally(() => {
        setSpinner(false);
      });
  };

  useEffect(() => {
    console.log(id);
    listCountries();
    if (id) {
      getComapny();
    }
  }, [id, show]);

  const validate = (data) => {
    const errors = {};

    if (!data.companyName) {
      errors.companyName = 'company name is required';
    }

    if (!data.country) {
      errors.country = 'select a country';
    }

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.phone) {
      errors.phone = 'phone number is required';
    } else if (!/^\+\d{1,15}$/.test(data.phone)) {
      errors.phone = 'Phone is invalid';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      companyName: '',
      email: '',
      phone: '',
      country: '',
    },
    validate,
    onSubmit: () => {
      setIsProfileUpdating(true);
      const data = {
        type: 'contact_companies',
        attributes: {
          id,
          name: formik?.values?.companyName,
          email: formik?.values?.email,
          phone: formik?.values?.phone,
          country_id: formik?.values?.country, // Assuming language ID is not provided in the JSON
        },
      };
      data.type = 'users';
      data.attributes.id = id;
      UpdateCompanyContact(id?.id ? id : cid, data)
        .then(() => {
          show = false;
          reloadList();
          onClose();
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Profile details saved successfully!',
          });
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            let errorMessage = 'Error while saving company';

            if (error?.response?.data?.errors) {
              const errorFields = Object.keys(error?.response?.data?.errors);
              const validationErrors = errorFields.map(
                (field) => `${field}: ${error?.response?.data?.errors[field].join(', ')}`
              );
              errorMessage = validationErrors.join(' ');
            } else if (error?.response?.data?.error?.message) {
              errorMessage = error?.response?.data?.error?.message;
            }

            setToastAction({
              isVisible: true,
              message: errorMessage,
              type: 'failed',
            });
          }
        })
        .finally(() => {
          reloadList();

          setIsProfileUpdating(false);
        });
    },
  });

  useEffect(() => {
    // Update form values when the `company` object changes
    formik.setValues({
      companyName: editCompanyData.companyName || '',
      email: editCompanyData.companyEmail || '',
      phone: editCompanyData.phoneNumbers || '',
      country: editCompanyData.country || '',
    });
  }, [countries, editCompanyData]);

  if (show) {
    return (
      <>
        <div
          className="offcanvas offcanvas-end show"
          tabIndex="-1"
          id="offcanvasEditCompany"
          aria-labelledby="offcanvasEditCompanyLabel"
        >
          <div className="offcanvas-header px-4 pt-4 pb-2">
            <h5
              // role="button"
              className="offcanvas-title fs-16px fw-medium"
              id="offcanvasEditCompanyLabel"
            >
              Edit Company
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              onClick={() => {
                onClose();
              }}
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body px-4">
            <p className="fs-13px text-secondary">
              Manage company and organize your contacts more efficiently.
            </p>

            <div className="mt-4">
              <Input
                label="Company name"
                id="companyName"
                placeholder="High-tech pvt. ltd."
                type="textbox"
                disabled={false}
                name="companyName"
                onChange={formik.handleChange}
                value={formik?.values?.companyName}
                style={isFormFieldValid(formik, 'companyName') ? { border: '1px solid red' } : {}}
              />
              {getFormErrorMessage(formik, 'companyName')}
              <Input
                label="Company Email"
                id="companyEmail"
                placeholder="info@hightech.com "
                type="textbox"
                disabled={false}
                name="email"
                onChange={formik.handleChange}
                value={formik?.values?.email}
                style={isFormFieldValid(formik, 'email') ? { border: '1px solid red' } : {}}
              />
              {getFormErrorMessage(formik, 'email')}
              <label className="text-primary mb-1" htmlFor={id}>
                Country
              </label>
              <select
                name="country"
                className="form-control form-select bg-white"
                id={id}
                value={formik?.values?.country || 'select'}
                onChange={(e) => {
                  formik.setFieldValue('country', e?.target?.value);
                }}
                // onChange={(event) => event.target.value}
              >
                <option value="select" disabled>
                  select
                </option>

                {countries?.length > 0 &&
                  countries?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.attributes?.name}
                    </option>
                  ))}
              </select>
              {getFormErrorMessage(formik, 'country')}

              <Input
                label="Phone number"
                id="phoneNumber"
                placeholder="+1  678-67532 3625"
                type="textbox"
                disabled={false}
                name="phone"
                onChange={(e) => {
                  // const inputValue = e.target.value;
                  // if (/^\+\d+$/.test(inputValue)) {
                  formik.handleChange(e);
                  // }
                }}
                value={formik?.values?.phone}
                style={isFormFieldValid(formik, 'phone') ? { border: '1px solid red' } : {}}
              />
              {getFormErrorMessage(formik, 'phone')}

              {/* <Select
                label="Country"
                id="country"
                name="country"
                value={formik.values.country}
                options={countries?.map((country) => country.attributes.name)}
                onChange={(selectedCountry) => {
                  formik.setFieldValue(
                    'country',
                    countries.find(
                      (country) =>
                        country?.attributes?.name?.toLowerCase() === selectedCountry?.toLowerCase()
                    )?.id || null
                  );
                }}
                selectedIndex={
                  countries && company
                    ? countries.find(
                        (country) =>
                          parseInt(country.id, Number) === parseInt(formik.values.country, Number)
                      )?.attributes?.name
                    : -1
                }
              /> */}
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
              <button
                href="/#"
                id="editCompany"
                // data-bs-dismiss="offcanvas"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                disabled={isProfileUpdating}
              >
                <span className="pe-2"> </span>
                {isProfileUpdating ? 'Loading ...' : ' Save'}
              </button>
              <button
                type="button"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                data-bs-dismiss="offcanvas"
                onClick={() => {
                  onClose();
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop show"
          onClick={() => {
            onClose();
          }}
        />
      </>
    );
  }
  return '';
}

export default EditCompanyCanvas;
