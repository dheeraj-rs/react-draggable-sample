/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Input from '../../../common/components/forms/Input';
import Select from '../../../common/components/forms/SelectBox';
import '../../../styles/formvalidation.css';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import { CreateCompanyContact, ListCountries } from '../../../common/api-collection/ContactCompany';

function AddCompanyCanvas({ show, reloadList, onClose, setToastAction }) {
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    } else if (!/^\+\d{12}$/.test(data.phone)) {
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
      setIsLoading(true);
      const data = {
        type: 'contact_companies',
        attributes: {
          name: formik?.values?.companyName,
          email: formik?.values?.email,
          phone: formik?.values?.phone,
          country_id: formik?.values?.country, // Assuming language ID is not provided in the JSON
        },
      };
      CreateCompanyContact(data)
        .then(() => {
          formik?.resetForm();
          formik.setFieldValue('companyName', '');
          formik.setFieldValue('email', '');
          formik.setFieldValue('phone', '');
          formik.setFieldValue('country', '');
          onClose();
          reloadList();
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Company saved successfully!',
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
          setIsProfileUpdating(false);
          setIsLoading(false);
        });
    },
  });

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

  useEffect(() => {
    listCountries();
  }, []);
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  if (show) {
    return (
      <>
        <div
          className="offcanvas offcanvas-end show"
          tabIndex="-1"
          id="offcanvasAddCompany"
          aria-labelledby="offcanvasAddCompanyLabel"
        >
          <div className="offcanvas-header px-4 pt-4 pb-2">
            <h5
              // role="button"
              className="offcanvas-title fs-16px fw-medium"
              id="offcanvasAddCompanyLabel"
            >
              Add Company
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
            />
          </div>
          <div className="offcanvas-body px-4">
            <p className="fs-13px text-secondary">
              Add more companies and organize your contacts more efficiently.
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
              {/* <Select
                label="Country"
                id="country"
                name="country"
                value={formik.values.country}
                selectedValue={formik.values.country}
                options={countries?.map((country) => country.attributes.name)}
                onChange={(selectedCountry) => {
                  console.log(selectedCountry);
                  formik.setFieldValue(
                    'country',
                    countries.find(
                      (country) =>
                        country?.attributes?.name?.toLowerCase() === selectedCountry?.toLowerCase()
                    )?.id || null
                  );
                }}
                selectedIndex={
                  countries
                    ? countries.find(
                        (country) =>
                          parseInt(country.id, Number) === parseInt(formik.values.country, Number)
                      )?.attributes?.name
                    : -1
                }
              /> */}
              <div className="form-group mt-3">
                <label className="text-primary mb-1" htmlFor="country">
                  Country
                </label>
                <select
                  name="country"
                  className="form-control form-select bg-white"
                  id="country"
                  value={formik?.values?.country || 'select'}
                  style={isFormFieldValid(formik, 'country') ? { border: '1px solid red' } : {}}
                  onChange={(e) => {
                    formik.setFieldValue('country', e?.target?.value);
                  }}
                  // onChange={(event) => event.target.value}
                >
                  <option value="select" disabled>
                    select
                  </option>
                  {countries?.length > 0 &&
                    countries?.map((country) => (
                      <option key={country?.id} value={country?.id}>
                        {country?.attributes?.name}
                      </option>
                    ))}
                </select>
              </div>

              {getFormErrorMessage(formik, 'country')}
              <Input
                label="Phone number"
                id="phoneNumber"
                placeholder="+919087876511"
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
            </div>

            <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
              <button
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
                id="addCompany"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                disabled={isProfileUpdating}
              >
                <span className="pe-2"> </span>
                {isProfileUpdating ? 'Loading ...' : ' Add Company'}
              </button>
              <button
                type="button"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                data-bs-dismiss="offcanvas"
                onClick={() => {
                  formik.resetForm();

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
            formik.resetForm();

            onClose();
          }}
        />
      </>
    );
  }
  return '';
}

export default AddCompanyCanvas;
