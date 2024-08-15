/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Select from '../../../common/components/forms/SelectBox';
import { ListContactCompanies } from '../../../common/api-collection/ContactCompany';
import {
  GetContact,
  ListContactLabels,
  UpdateContact,
} from '../../../common/api-collection/Contact';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';

function EditContactCanvas({ onClose, show, setToastAction, id, reloadList, editData }) {
  const [phoneLabels, setPhoneLabels] = useState();
  const [emailLabels, setEmailLabels] = useState();
  const [companies, setcompanies] = useState();
  const [contact, setContact] = useState();
  const [included, setIncluded] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const listCompanies = () => {
    ListContactCompanies()
      .then((response) => {
        setcompanies(response?.data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const getContact = () => {
    setSpinner(true);
    GetContact(id)
      .then((response) => {
        setContact(response?.data);
        setIncluded(response);
      })
      .catch(() => {})
      .finally(() => {
        setSpinner(false);
      });
  };

  useEffect(() => {
    listCompanies();
  }, [id]);

  useEffect(() => {
    if (id) {
      getContact();
    }
  }, [id]);

  const listLabels = (type) => {
    ListContactLabels(type).then((res) => {
      if (type === 'phone') {
        setPhoneLabels(res.data);
      } else {
        setEmailLabels(res.data);
      }
    });
  };

  useEffect(() => {
    listLabels('phone');
    listLabels('email');
  }, [id]);

  const validate = (data) => {
    const errors = {};

    if (!data.first_name) {
      errors.first_name = 'firstname name is required';
    }

    if (!data.middle_name) {
      errors.middle_name = 'middlename is required';
    }

    if (!data.last_name) {
      errors.last_name = 'lastname is required';
    }

    if (!data.emails || data.emails.length === 0) {
      errors.emails = 'At least one email is required';
    } else {
      data.emails.forEach((mail, index) => {
        if (!mail?.mail) {
          if (!errors.emails) {
            errors.emails = [];
          }
          errors.emails[index] = { mail: 'Email is required' };
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail?.mail)) {
          if (!errors.emails) {
            errors.emails = [];
          }
          errors.emails[index] = { mail: 'Email is invalid' };
        }
      });
    }

    if (!data.phoneNumbers || data.phoneNumbers.length === 0) {
      errors.phoneNumbers = 'At least one phone number is required';
    } else {
      data.phoneNumbers.forEach((phoneNumber, index) => {
        if (!phoneNumber.number) {
          if (!errors.phoneNumbers) {
            errors.phoneNumbers = [];
          }
          errors.phoneNumbers[index] = { number: 'Phone number is required' };
        } else if (!/^\+\d{10,12}$/.test(phoneNumber.number)) {
          if (!errors.phoneNumbers) {
            errors.phoneNumbers = [];
          }
          errors.phoneNumbers[index] = { number: 'Phone number is invalid' };
        }
      });
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      company_id: '',
      emails: [],
      phoneNumbers: [],
    },
    validate,
    onSubmit: () => {
      setIsLoading(true);
      const filteredPhoneNumbers = formik.values.phoneNumbers.filter((item) => item.number !== '');

      formik.values.phoneNumbers = filteredPhoneNumbers;

      const filteredEmails = formik.values.emails.filter((item) => item.mail !== '');
      formik.values.emails = filteredEmails;

      const data = {
        type: 'contacts',
        id: parseInt(id, Number),
        attributes: {
          first_name: formik.values.first_name,
          middle_name: formik.values.middle_name,
          last_name: formik.values.last_name,
          company_id: formik.values.company_id,
        },
      };

      if (formik.values.emails && formik.values.emails.length > 0) {
        data.relationships = {
          contact_emails: {
            data: formik.values.emails.map((item) => ({
              type: 'contact_email',
              id: 1,
              attributes: {
                label_id: item.label,
                email: item.mail,
              },
            })),
          },
        };
      }

      if (formik.values.phoneNumbers && formik.values.phoneNumbers.length > 0) {
        if (!data.relationships) {
          data.relationships = {};
        }

        data.relationships.contact_phones = {
          data: formik.values.phoneNumbers.map((item) => ({
            type: 'contact_phone',
            id: 1,
            attributes: {
              label_id: item.label,
              phone: item.number,
            },
          })),
        };
      }

      UpdateContact(data, id)
        .then(() => {
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Contact Updated!',
          });
          onClose();
          reloadList();
        })
        .catch((error) => {
          reloadList();

          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            let errorMessage = 'Error while saving Contact';

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
          setIsLoading(false);
        });
    },
  });

  // useEffect(() => {
  //   // Update form values when the `company` object changes
  //   if (phoneLabels) {
  //     formik.setFieldValue('phoneNumbers', [{ label: phoneLabels[0]?.id, number: '' }]);
  //   }
  //   if (emailLabels) {
  //     formik.setFieldValue('emails', [{ label: emailLabels[0]?.id, mail: '' }]);
  //   }
  // }, [phoneLabels, emailLabels]);

  // useEffect(() => {
  //   // Update form values when the `company` object changes
  //   if (!show) {
  //     if (phoneLabels) {
  //       formik.setFieldValue('phoneNumbers', [{ label: phoneLabels[0]?.id, number: '' }]);
  //     }
  //     if (emailLabels) {
  //       formik.setFieldValue('emails', [{ label: emailLabels[0]?.id, mail: '' }]);
  //     }
  //     formik.setFieldValue('first_name', '');
  //     formik.setFieldValue('middle_name', '');
  //     formik.setFieldValue('last_name', '');
  //   }
  //   if (id) {
  //     getContact();
  //   }
  // }, [show]);

  useEffect(() => {
    // formik.resetForm();

    if (editData) {
      setSelectedCompanyId(editData.company);
      // const getCompanyName = (companyId) => {
      //   return companies
      //     ?.find((company) => parseInt(company?.id, Number) === parseInt(companyId, Number))
      //     ?.attributes?.name.trim();
      // };
      console.log(editData);
      formik.setFieldValue('first_name', editData.fName);
      formik.setFieldValue('middle_name', editData.mName);
      formik.setFieldValue('last_name', editData.lName);
      formik.setFieldValue('company_id', editData.company);
      // console.log('sss', getCompanyName(contact?.attributes.company_id));
      const emailData = editData.emailArray;
      const phoneData = editData.phoneArray;

      // Creating phone objects to be added to 'formik.values.phoneNumbers'

      const phoneNumbers = phoneData?.map((phone) => ({
        label: phone?.label_id,
        number: phone?.phone,
      }));

      const emails = emailData?.map((email) => ({
        label: email?.label_id,
        mail: email?.email,
      }));

      // Creating email objects to be added to 'formik.values.emails'
      // const emails = emailData.map((email) => ({
      //   label: email?.label_id || '',
      //   mail: email?.email || '',
      // }));

      formik.setFieldValue('phoneNumbers', phoneNumbers);
      formik.setFieldValue('emails', emails);
    }
    // if (phoneLabels) {
    //   formik.setFieldValue('phoneNumbers', [{ label: phoneLabels[0]?.id, number: '' }]);
    // }
    // if (emailLabels) {
    //   formik.setFieldValue('emails', [{ label: emailLabels[0]?.id, mail: '' }]);
    // }
    if (id) {
      getContact();
    }
  }, [editData, show]);

  // useEffect(() => {
  //   if (phoneLabels) {
  //     formik.setFieldValue('phoneNumbers', [{ label: phoneLabels[0]?.id, number: '' }]);
  //   }
  //   if (emailLabels) {
  //     formik.setFieldValue('emails', [{ label: emailLabels[0]?.id, mail: '' }]);
  //   }
  // }, [phoneLabels, emailLabels]);

  // const getCompanyName = (companyId) => {
  //   return companies
  //     ?.find((company) => parseInt(company?.id, Number) === parseInt(companyId, Number))
  //     ?.attributes?.name.trim();
  // };

  if (show) {
    return (
      <>
        <div
          className="offcanvas offcanvas-end show"
          tabIndex="-1"
          id="offcanvasAddContact"
          aria-labelledby="offcanvasContactLabel"
        >
          <div className="offcanvas-header px-4 pt-4 pb-2">
            <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasContactLabel">
              Edit Contact
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
            <p className="mb-0 fs-13px text-primary">
              Add individual contacts to the system to manage.
            </p>
            <div>
              <div className="form-group w-100 mt-3">
                <label className="text-primary mb-1 label-mandatory" htmlFor="firstName">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control bg-white"
                  id="firstName"
                  placeholder="Enter first name*"
                  name="first_name"
                  onChange={formik.handleChange}
                  value={formik?.values?.first_name}
                  style={isFormFieldValid(formik, 'first_name') ? { border: '1px solid red' } : {}}
                />
                {getFormErrorMessage(formik, 'first_name')}
              </div>

              <div className="form-group w-100 mt-3">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="middleName"
                  placeholder="Enter middle name"
                  name="middle_name"
                  onChange={formik.handleChange}
                  value={formik?.values?.middle_name}
                  style={isFormFieldValid(formik, 'middle_name') ? { border: '1px solid red' } : {}}
                />
                {getFormErrorMessage(formik, 'middle_name')}
              </div>

              <div className="form-group w-100 mt-3">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="lastName"
                  placeholder="Enter last name*"
                  name="last_name"
                  onChange={formik.handleChange}
                  value={formik?.values?.last_name}
                  style={isFormFieldValid(formik, 'last_name') ? { border: '1px solid red' } : {}}
                />
                {getFormErrorMessage(formik, 'last_name')}
              </div>
            </div>
            <div className="d-flex flex-column p-4 bg-white rounded shadow-6 mt-3">
              <div className="d-flex">
                <label className="text-primary mb-2 label-mandatory" htmlFor="email">
                  Email Address
                </label>
              </div>
              {formik?.values?.emails?.map((mail, index) => (
                <div key={index} className="p-3 bg-white-azurish rounded mt-3">
                  <div className="form-group d-flex gap-2">
                    <div className="col-sm-4">
                      <select
                        className="form-control form-select bg-white"
                        id={`email-label-${index}`}
                        name={`emails[${index}].label`}
                        value={mail.label}
                        onChange={formik.handleChange}
                      >
                        {emailLabels?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.attributes.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={`form-control bg-white ${
                          formik.errors.emails?.[index]?.mail &&
                          formik.touched.emails?.[index]?.mail
                            ? 'is-invalid'
                            : ''
                        }`}
                        id={`email-address-${index}`}
                        placeholder="email@example.com"
                        name={`emails[${index}].mail`}
                        value={mail.mail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.touched.emails?.[index]?.mail &&
                        formik.errors.emails?.[index]?.mail && (
                          <div className="invalid-feedback">{formik.errors.emails[index].mail}</div>
                        )}
                    </div>
                    {index !== 0 ? (
                      <div className="col-sm-1">
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            const updatedEmails = [...formik.values.emails];
                            updatedEmails.splice(index, 1);
                            formik.setFieldValue('emails', updatedEmails);
                          }}
                        >
                          <img className="pe-2" src="/assets/close-btn.svg" alt="" />
                        </a>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
              {formik.values.emails?.length === 0 && (
                <div className="p-3 bg-white-azurish rounded mt-3">
                  <div className="form-group d-flex gap-2">
                    <div className="col-sm-4">
                      <select
                        className="form-control form-select bg-white"
                        id="email-label-0"
                        name="emails[0].label"
                        value={formik.values.emails[0]?.label}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {emailLabels?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.attributes.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={`form-control bg-white ${
                          formik.touched.emails?.[0]?.mail && formik.errors.emails?.[0]?.mail
                            ? 'is-invalid'
                            : ''
                        }`}
                        id="email-address-0"
                        placeholder="email@example.com"
                        name="emails[0].mail"
                        value={formik?.values?.emails[0]?.mail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.emails?.[0]?.mail && formik.errors.emails?.[0]?.mail && (
                        <div className="invalid-feedback">{formik.errors.emails[0].mail}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3 d-flex align-items-center">
                <a
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue('emails', [
                      ...formik.values.emails,
                      { label: emailLabels[0]?.id, mail: '' },
                    ]);
                  }}
                  className="text-blue-active"
                >
                  <img className="pe-2" src="/assets/circle-blue.svg" alt="" />
                  Add email address
                </a>
              </div>
            </div>
            <div className="d-flex flex-column p-4 bg-white rounded shadow-6 mt-3">
              <div className="d-flex">
                <label className="text-primary mb-2 label-mandatory" htmlFor="phone">
                  Phone number
                </label>
              </div>
              {formik?.values?.phoneNumbers?.map((phone, index) => (
                <div key={index} className="p-3 bg-white-azurish rounded mt-3">
                  <div className="form-group d-flex gap-2">
                    <div className="col-sm-4">
                      <select
                        className="form-control form-select bg-white"
                        id={`phone-label-${index}`}
                        name={`phoneNumbers[${index}].label`}
                        value={phone.label}
                        onChange={formik.handleChange}
                      >
                        {phoneLabels?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.attributes.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={`form-control bg-white ${
                          formik.errors.phoneNumbers?.[index]?.number &&
                          formik.touched.phoneNumbers?.[index]?.number
                            ? 'is-invalid'
                            : ''
                        }`}
                        id={`phone-number-${index}`}
                        placeholder="(000) 000-000000"
                        name={`phoneNumbers[${index}].number`}
                        value={phone.number}
                        onChange={formik.handleChange}
                        onKeyPress={(e) => {
                          const pattern = /[0-9+]/;
                          if (!pattern.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {formik.errors.phoneNumbers?.[index]?.number &&
                        formik.touched.phoneNumbers?.[index]?.number && (
                          <div className="invalid-feedback">
                            {formik.errors.phoneNumbers[index].number}
                          </div>
                        )}
                    </div>
                    {index !== 0 ? (
                      <div className="col-sm-1">
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            const updatedNumbers = [...formik.values.phoneNumbers];
                            updatedNumbers.splice(index, 1);
                            formik.setFieldValue('phoneNumbers', updatedNumbers);
                          }}
                        >
                          <img className="pe-2" src="/assets/close-btn.svg" alt="" />
                        </a>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
              {formik.values.phoneNumbers?.length === 0 && (
                <div className="p-3 bg-white-azurish rounded mt-3">
                  <div className="form-group d-flex gap-2">
                    <div className="col-sm-4">
                      <select
                        className="form-control form-select bg-white"
                        id="phone-label-0"
                        name="phoneNumbers[0].label"
                        value={formik.values.phoneNumbers[0]?.label}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {phoneLabels?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.attributes.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={`form-control bg-white ${
                          formik.errors.phoneNumbers?.[0]?.number &&
                          formik.touched.phoneNumbers?.[0]?.number
                            ? 'is-invalid'
                            : ''
                        }`}
                        id="phone-number-0"
                        placeholder="(000) 000-000000"
                        name="phoneNumbers[0].number"
                        value={formik.values.phoneNumbers[0]?.number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyPress={(e) => {
                          const pattern = /[0-9+]/;
                          if (!pattern.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {formik.errors.phoneNumbers?.[0]?.number &&
                        formik.touched.phoneNumbers?.[0]?.number && (
                          <div className="invalid-feedback">
                            {formik.errors.phoneNumbers[0].number}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3 d-flex align-items-center">
                <a
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue('phoneNumbers', [
                      ...formik.values.phoneNumbers,
                      { label: phoneLabels[0]?.id, number: '' },
                    ]);
                  }}
                  className="text-blue-active"
                >
                  <img className="pe-2" src="/assets/circle-blue.svg" alt="" />
                  Add phone number
                </a>
              </div>
            </div>
            <div className="mt-4">
              <div className="form-group mt-3">
                <label className="text-primary mb-1" htmlFor={id}>
                  Company (optional)
                </label>
                <select
                  name="Company"
                  className="form-control form-select bg-white"
                  id={id}
                  value={formik?.values?.company_id || 'select'}
                  onChange={(e) => {
                    formik.setFieldValue('company_id', e?.target?.value);
                  }}
                  // onChange={(event) => event.target.value}
                >
                  <option value="select" disabled>
                    select
                  </option>

                  {companies?.length > 0 &&
                    companies?.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.attributes?.name}
                      </option>
                    ))}
                </select>
              </div>
              {/* <Select
                label="Company (optional)"
                id="company"
                selectedIndex={getCompanyName(selectedCompanyId)}
                options={companies?.map((item) => item?.attributes?.name)}
                onChange={(name) => {
                  if (name !== 'Select') {
                    const selectedCompany = companies?.find(
                      (company) => company?.attributes?.name === name
                    );
                    setSelectedCompanyId(selectedCompany?.id || null);
                  } else {
                    setSelectedCompanyId('');
                  }
                }}
              /> */}
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
              <button
                id="addContactToast"
                data-bs-dismiss="offcanvas"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                onClick={() => {
                  formik.handleSubmit();
                }}
                disabled={isLoading}
              >
                <span className="pe-2"> </span>
                {isLoading ? 'Loading...' : 'Save'}
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

            {/* <!-- contact details start --> */}
            {/* <!-- company starts --> */}
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

export default EditContactCanvas;
