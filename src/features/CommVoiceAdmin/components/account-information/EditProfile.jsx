import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Layout from '../../../../common/layout';
import Input from '../../../../common/components/forms/Input';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import Selectbox from '../../../Campaigns/Components/Selectbox';
import ToastSuccess from '../../../../common/components/toast/ToastSucess';
import ToastError from '../../../../common/components/toast/ToastError';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

const countryOptions = [
  { code: '+91', name: 'India', flag: '/assets/ind.svg' },
  { code: '+44', name: 'UK', flag: '/assets/uk.svg' },
  { code: '+1', name: 'USA', flag: '/assets/us-flag.svg' },
];
function EditProfile() {
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [searchTermCallerList, setSearchTermCallerList] = useState('');
  const [imageUrl, setImageUrl] = useState('/assets/jhonimg.svg');

  const validate = (data) => {
    const errors = {};

    if (!data.aboutMe.trim()) {
      errors.aboutMe = 'about me is required';
    }
    if (!data.firstName.trim()) {
      errors.firstName = 'first name is required';
    }
    if (!data.middleName.trim()) {
      errors.middleName = 'middle name is required';
    }
    if (!data.lastName.trim()) {
      errors.lastName = 'last name is required';
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = 'phone number is required';
    }
    if (data.selectedCountry.code === 'code') {
      errors.selectedCountry = 'select';
    }

    if (!data.email.trim()) {
      errors.email = 'email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'email is invalid';
    }

    if (data.country.trim() === 'Select Country') {
      errors.country = 'select country is required';
    }
    if (data.city.trim() === 'Select City') {
      errors.city = 'select city is required';
    }

    if (!data.zipCode) {
      errors.zipCode = 'zip code is required';
    }
    if (!data.professionalCompany.trim()) {
      errors.professionalCompany = 'company name is required';
    }

    if (!data.professionalEmail.trim()) {
      errors.professionalEmail = 'email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.professionalEmail = 'email is invalid';
    }

    if (data.selectedCountry2.code === 'code') {
      errors.selectedCountry2 = 'select';
    }

    if (!data.professionalPhoneNumber) {
      errors.professionalPhoneNumber = 'phone number is required';
    }

    if (!data.professionalRole.trim()) {
      errors.professionalRole = 'company role is required';
    }

    if (!data.facebookUrl.trim()) {
      errors.facebookUrl = 'facebook url is required';
    } else if (!/^https?:\/\/(www\.)?facebook\.com\/.+/.test(data.facebookUrl)) {
      errors.facebookUrl = 'invalid facebook url';
    }
    if (!data.linkedinUrl.trim()) {
      errors.linkedinUrl = 'linkedIn url is required';
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(data.linkedinUrl)) {
      errors.linkedinUrl = 'invalid linkedIn url';
    }
    if (!data.xfaceUrl.trim()) {
      errors.xfaceUrl = 'twitter url is required';
    } else if (!/^https?:\/\/(www\.)?twitter\.com\/.+/.test(data.xfaceUrl)) {
      errors.xfaceUrl = 'invalid twitter url';
    }
    if (!data.instagramUrl.trim()) {
      errors.instagramUrl = 'instagram url is required';
    } else if (!/^https?:\/\/(www\.)?instagram\.com\/.+/.test(data.instagramUrl)) {
      errors.instagramUrl = 'invalid instagram url';
    }
    if (!data.youtubeUrl.trim()) {
      errors.youtubeUrl = 'YouTube URL is required';
    } else if (!/^https?:\/\/(www\.)?youtube\.com\/.+/.test(data.youtubeUrl)) {
      errors.youtubeUrl = 'Invalid YouTube URL';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      aboutMe: '',
      firstName: '',
      middleName: '',
      lastName: '',
      selectedCountry: {
        code: 'code',
        name: '',
        flag: '',
      },
      phoneNumber: '',
      email: '',
      country: 'Select Country',
      city: 'Select City',
      zipCode: '',
      professionalCompany: '',
      professionalEmail: '',
      professionalPhoneNumber: '',
      selectedCountry2: {
        code: 'code',
        name: '',
        flag: '',
      },
      professionalRole: '',
      facebookUrl: '',
      linkedinUrl: '',
      xfaceUrl: '',
      instagramUrl: '',
      youtubeUrl: '',
    },
    validate,
    onSubmit: () => {
      setToastAction({
        isVisible: true,
        type: 'success',
        message: 'Updated : You have successfully updated.',
      });
      formik.resetForm();
    },
  });

  const filterCountries = () => {
    const searchTermLowerCase = searchTermCallerList.toLowerCase();
    return countryOptions.filter((country) => {
      const countryNameLowerCase = country.name.toLowerCase();
      return countryNameLowerCase.includes(searchTermLowerCase);
    });
  };

  const handleInputChange = (event, type, length) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    const truncatedValue = inputValue.slice(0, length);
    formik.setFieldValue(type, truncatedValue);
  };

  const convertToUrl = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      convertToUrl(file);
    }
  };

  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 scroll-custom overall-padding-mobile">
              <div className="col-lg-12 col-sm-12 pe-0 campaign-landing">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                    <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                      <Link
                        to="/comm-voice-admin/account-information/"
                        className="d-flex justify-content-center"
                      >
                        <img src="/assets/leftback.svg" alt="" />
                      </Link>
                    </div>

                    <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                      <Link
                        to="/comm-voice-admin/account-information/"
                        className="d-block d-lg-none"
                      >
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </Link>{' '}
                      Edit Profile
                    </h5>
                  </div>
                </div>

                <div className="campaign-new-contact mt-3 mt-sm-0">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="upload-logo d-flex gap-3 rounded align-items-center">
                        <div className="position-relative">
                          <img className=" w-8 h-8 rounded-5 " src={imageUrl} alt="Uploaded Imag" />
                          <a className="image-upload" href="#/">
                            <label htmlFor="file-input">
                              <img
                                src="/assets/copy-profile-img.svg"
                                className="edit-profile-icon cursor-pointer"
                                alt=""
                              />
                            </label>

                            <input
                              className="d-none"
                              id="file-input"
                              type="file"
                              onChange={handleFileChange}
                              accept="JPG,PNG,WEBP"
                            />
                          </a>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <div className="text-primary fw-medium">Profile Image</div>
                          <div className="text-secondary">
                            Upload image resolution 100X100 and 1:1 aspect ratio (JPG,PNG,WEBP)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h6 className="text-primary fw-500 fs-14px mb-3">About Me</h6>
                    <textarea
                      className="form-control bg-white about-me px-3"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      maxLength="500"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                      name="aboutMe"
                      value={formik.values.aboutMe}
                      onChange={formik.handleChange}
                      style={isFormFieldValid(formik, 'aboutMe') ? { border: '1px solid red' } : {}}
                    />
                    {getFormErrorMessage(formik, 'aboutMe')}
                  </div>

                  <div className="row gx-5 pb-2 mt-4">
                    <h6 className="text-primary fw-500 fs-14px mb-0">Basic details</h6>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="First name"
                        id="firstName"
                        placeholder="John"
                        type="textbox"
                        maxLength="41"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        style={
                          isFormFieldValid(formik, 'firstName') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'firstName')}
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Middle Name"
                        id="middleName"
                        placeholder="Middle name"
                        type="textbox"
                        maxLength="41"
                        name="middleName"
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                        style={
                          isFormFieldValid(formik, 'middleName') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'middleName')}
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Last name"
                        id="lastName"
                        placeholder="Doe"
                        type="textbox"
                        maxLength="41"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        style={
                          isFormFieldValid(formik, 'lastName') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'lastName')}
                    </div>
                  </div>

                  <div className="row gx-5 align-items-center pb-2">
                    <div className="col-lg-4 col-sm-6 col-xl-4">
                      <label className="text-primary mb-1 mt-3">Phone Number</label>
                      <div className="d-flex gap-3">
                        <div>
                          <div
                            className="dropdown form-control bg-white rounded more p-2 global-height d-flex align-items-center rounded-start d-flex"
                            style={
                              isFormFieldValid(formik, 'selectedCountry')
                                ? { border: '1px solid red' }
                                : {}
                            }
                          >
                            <a
                              className="select-box-flag d-flex align-items-center text-primary fs-13px"
                              href="#/"
                              role="button"
                              id="dropdownMenu"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <div
                                id="selectedVal"
                                className="status-truncate d-inline-block text-white d-flex align-items-center"
                              >
                                <img
                                  className="pe-md-2 pe-1 selected-flag"
                                  src={formik.values.selectedCountry.flag}
                                  alt=""
                                />
                                <span className="selected-country text-secondary">
                                  {formik.values.selectedCountry.code}
                                </span>
                              </div>
                              <img className="ps-2" src="/assets/down-black.svg" alt="" />
                            </a>
                            <ul
                              id="dropdown-left-status w-100"
                              className="dropdown-menu w-100 m-auto dropdown-status rounded shadow-6 dropdown-country-chat"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li className="py-3 px-4">
                                <SearchWithBorder
                                  placeholderText="Search Country"
                                  onChange={(e) => {
                                    setSearchTermCallerList(e?.target?.value);
                                  }}
                                  clearBtn={() => {
                                    setSearchTermCallerList('');
                                  }}
                                  searchTerm={searchTermCallerList}
                                />
                              </li>
                              <div className="scroll-custom country-scroll">
                                {filterCountries().map((country) => (
                                  <li key={country.code}>
                                    <a
                                      className="py-3 px-4 country-item"
                                      href="#/"
                                      onClick={() => {
                                        formik.setFieldValue('selectedCountry', country);
                                      }}
                                    >
                                      <img className="pe-2" src={country.flag} alt="" />
                                      {country.name} ({country.code})
                                    </a>
                                  </li>
                                ))}
                              </div>
                            </ul>
                          </div>
                          {getFormErrorMessage(formik, 'selectedCountry')}
                        </div>
                        <div className="w-100">
                          <input
                            id="phoneNumber"
                            className="form-control bg-white"
                            placeholder="43543569876"
                            type="number"
                            maxLength="11"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={(e) => handleInputChange(e, 'phoneNumber', 11)}
                            style={
                              isFormFieldValid(formik, 'phoneNumber')
                                ? { border: '1px solid red' }
                                : {}
                            }
                          />
                          {getFormErrorMessage(formik, 'phoneNumber')}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-xl-4">
                      <Input
                        label="Email"
                        id="Email"
                        placeholder="JohnD@gmail.com"
                        type="email"
                        disabled=""
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        style={isFormFieldValid(formik, 'email') ? { border: '1px solid red' } : {}}
                      />
                      {getFormErrorMessage(formik, 'email')}
                    </div>

                    <div className="col-lg-4 col-sm-6 col-xl-4">
                      <label className="mb-1 mt-3">Country</label>
                      <Selectbox
                        style2={
                          isFormFieldValid(formik, 'country')
                            ? { border: '1px solid red', height: '36px' }
                            : {}
                        }
                        options={['Select Country', 'United States', 'India', 'UK', 'US']}
                        onChange={(country) => formik.setFieldValue('country', country)}
                        selectedOption={formik.values.country}
                      />
                      {getFormErrorMessage(formik, 'country')}
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <label className="mb-1 mt-3">City</label>
                      <Selectbox
                        style2={
                          isFormFieldValid(formik, 'city')
                            ? { border: '1px solid red', height: '36px' }
                            : {}
                        }
                        options={['Select City', 'Chicago', 'America', 'UK', 'US']}
                        onChange={(city) => formik.setFieldValue('city', city)}
                        selectedOption={formik.values.city}
                      />
                      {getFormErrorMessage(formik, 'city')}
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Zip Code"
                        id="Website"
                        type="number"
                        placeholder="452654"
                        disabled=""
                        name="zipCode"
                        value={formik.values.zipCode}
                        onChange={(e) => handleInputChange(e, 'zipCode', 6)}
                        style={
                          isFormFieldValid(formik, 'zipCode') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'zipCode')}
                    </div>
                  </div>
                  <hr className="my-4" />

                  <div className="row gx-5 pb-2">
                    <h6 className="text-primary fw-500 fs-14px mb-0 mt-2">Professional Details</h6>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Company"
                        id="Forerun"
                        type="textbox"
                        placeholder="Forerun Global"
                        disabled=""
                        name="professionalCompany"
                        value={formik.values.professionalCompany}
                        onChange={formik.handleChange}
                        style={
                          isFormFieldValid(formik, 'professionalCompany')
                            ? { border: '1px solid red' }
                            : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'professionalCompany')}
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Email"
                        id="middleName"
                        placeholder="JohnD@gmail.com"
                        type="email"
                        disabled=""
                        name="professionalEmail"
                        value={formik.values.professionalEmail}
                        onChange={formik.handleChange}
                        style={
                          isFormFieldValid(formik, 'professionalEmail')
                            ? { border: '1px solid red' }
                            : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'professionalEmail')}
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <label className="text-primary mb-1 mt-3">Phone Number</label>
                      <div className="d-flex gap-3">
                        <div>
                          <div
                            className="dropdown form-control bg-white rounded more p-2 global-height d-flex align-items-center rounded-start d-flex"
                            style={
                              isFormFieldValid(formik, 'selectedCountry2')
                                ? { border: '1px solid red' }
                                : {}
                            }
                          >
                            <a
                              className="select-box-flag d-flex align-items-center text-primary fs-13px"
                              href="#/"
                              id="dropdownMenu"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <div
                                id="selectedVal"
                                className="status-truncate d-inline-block text-white d-flex align-items-center"
                              >
                                <img
                                  className="pe-md-2 pe-1 selected-flag"
                                  src={formik.values.selectedCountry2.flag}
                                  alt=""
                                />
                                <span className="selected-country text-secondary">
                                  {formik.values.selectedCountry2.code}
                                </span>
                              </div>
                              <img className="ps-2" src="/assets/down-black.svg" alt="" />
                            </a>
                            <ul
                              id="dropdown-left-status w-100"
                              className="dropdown-menu w-100 m-auto dropdown-status rounded shadow-6 dropdown-country-chat"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li className="py-3 px-4">
                                <SearchWithBorder
                                  placeholderText="Search Country"
                                  onChange={(e) => {
                                    setSearchTermCallerList(e?.target?.value);
                                  }}
                                  clearBtn={() => {
                                    setSearchTermCallerList('');
                                  }}
                                  searchTerm={searchTermCallerList}
                                />
                              </li>
                              <div className="scroll-custom country-scroll">
                                {filterCountries().map((country) => (
                                  <li key={country.code}>
                                    <a
                                      className="py-3 px-4 country-item"
                                      href="#/"
                                      onClick={() => {
                                        formik.setFieldValue('selectedCountry2', country);
                                      }}
                                    >
                                      <img className="pe-2" src={country.flag} alt="" />
                                      {country.name} ({country.code})
                                    </a>
                                  </li>
                                ))}
                              </div>
                            </ul>
                          </div>
                          {getFormErrorMessage(formik, 'selectedCountry2')}
                        </div>
                        <div className="w-100">
                          <input
                            type="number"
                            className="form-control bg-white"
                            placeholder="435 4356 9876"
                            maxLength="11"
                            name="professionalPhoneNumber"
                            value={formik.values.professionalPhoneNumber}
                            onChange={(e) => handleInputChange(e, 'professionalPhoneNumber', 11)}
                            style={
                              isFormFieldValid(formik, 'professionalPhoneNumber')
                                ? { border: '1px solid red' }
                                : {}
                            }
                          />
                          {getFormErrorMessage(formik, 'professionalPhoneNumber')}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Role"
                        id="Manager"
                        type="textbox"
                        disabled=""
                        placeholder="Manager"
                        name="professionalRole"
                        value={formik.values.professionalRole}
                        onChange={formik.handleChange}
                        style={
                          isFormFieldValid(formik, 'professionalRole')
                            ? { border: '1px solid red' }
                            : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'professionalRole')}
                    </div>
                  </div>

                  <hr className="my-4" />
                  <div className="row mt-3 gx-5">
                    <h6 className="text-primary fw-500 fs-14px mb-3 mt-2">Social Media Profiles</h6>

                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3 mt-sm-0">
                        <img src="/assets/facebook-bg.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          placeholder="http://www.facebook.com/avira.."
                          aria-label="default input example"
                          name="facebookUrl"
                          value={formik.values.facebookUrl}
                          onChange={formik.handleChange}
                          style={
                            isFormFieldValid(formik, 'facebookUrl')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        />
                      </div>
                      <span style={{ marginLeft: '25px' }}>
                        {getFormErrorMessage(formik, 'facebookUrl')}
                      </span>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3 mt-sm-0">
                        <img src="/assets/linkedin-bg.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          placeholder="http://www.linkedin.com/avira.."
                          aria-label="default input example"
                          name="linkedinUrl"
                          value={formik.values.linkedinUrl}
                          onChange={formik.handleChange}
                          style={
                            isFormFieldValid(formik, 'linkedinUrl')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        />
                      </div>
                      <span style={{ marginLeft: '25px' }}>
                        {getFormErrorMessage(formik, 'linkedinUrl')}
                      </span>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3 mt-lg-0">
                        <img src="/assets/xface.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          placeholder="http://www.twitter.com/avira.."
                          aria-label="default input example"
                          name="xfaceUrl"
                          value={formik.values.xfaceUrl}
                          onChange={formik.handleChange}
                          style={
                            isFormFieldValid(formik, 'xfaceUrl') ? { border: '1px solid red' } : {}
                          }
                        />
                      </div>
                      <span style={{ marginLeft: '30px' }}>
                        {getFormErrorMessage(formik, 'xfaceUrl')}
                      </span>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3">
                        <img src="/assets/instagram-pink.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          placeholder="http://www.instagram.com/avi.."
                          aria-label="default input example"
                          name="instagramUrl"
                          value={formik.values.instagramUrl}
                          onChange={formik.handleChange}
                          style={
                            isFormFieldValid(formik, 'instagramUrl')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        />
                      </div>
                      <span style={{ marginLeft: '30px' }}>
                        {getFormErrorMessage(formik, 'instagramUrl')}
                      </span>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3">
                        <img src="/assets/youtube-bg.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          placeholder="http://www.youtube.com/avira.."
                          aria-label="default input example"
                          name="youtubeUrl"
                          value={formik.values.youtubeUrl}
                          onChange={formik.handleChange}
                          style={
                            isFormFieldValid(formik, 'youtubeUrl')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        />
                      </div>
                      <span style={{ marginLeft: '30px' }}>
                        {getFormErrorMessage(formik, 'youtubeUrl')}
                      </span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-start align-items-center border-0 p-0 mt-4 gap-3 mb-3">
                    <button
                      type="button"
                      className="btn bg-black d-flex align-items-center text-white px-4 py-12px"
                      onClick={formik.handleSubmit}
                    >
                      Save
                    </button>
                    <a
                      id="cancelRequest"
                      href="/comm-voice-admin/account-information/"
                      className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </Layout>
  );
}

export default EditProfile;
