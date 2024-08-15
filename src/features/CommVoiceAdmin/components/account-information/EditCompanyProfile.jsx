import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../common/layout';
import Input from '../../../../common/components/forms/Input';
import Selectbox from '../../../Campaigns/Components/Selectbox';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import InputWithoutLabel from './InputWithoutLabel';
import ToastCustom from '../call-back-list/ToastCustom';

function EditCompanyProfile() {
  const navigate = useNavigate();
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
                      <a
                        href="#/"
                        className="d-flex justify-content-center"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(-1);
                        }}
                      >
                        <img src="/assets/leftback.svg" alt="" />
                      </a>
                    </div>

                    <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                      <a
                        href="/comm-voice-admin/account-information/company-profile/"
                        className="d-block d-lg-none"
                      >
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </a>{' '}
                      Edit Company Profile
                    </h5>
                  </div>
                </div>

                <div className="campaign-new-contact mt-3 mt-sm-0">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="upload-logo d-flex gap-3 rounded align-items-sm-center flex-column flex-sm-row">
                        <div className="position-relative">
                          <img className="rounded" src="/assets/company-profile-logo.svg" alt="" />
                          <a className="image-upload" href="#/">
                            <label htmlFor="file-input">
                              <img
                                src="/assets/copy-profile-img.svg"
                                className="edit-profile-icon cursor-pointer"
                                alt=""
                              />
                            </label>

                            <input className="d-none" id="file-input" type="file" />
                          </a>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <div className="text-primary fw-500 fs-13px">Company logo/ image</div>
                          <div className="text-secondary">
                            Upload image resolution 100X100 and 1:1 aspect ratio (JPG,PNG,WEBP)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h6 className="text-primary fw-500 fs-14px mb-3">About Company</h6>
                    <textarea
                      className="form-control bg-white about-me px-3"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      placeholder=""
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis
                      nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur.
                    </textarea>
                  </div>

                  <div className="row gx-5 pb-2 mt-4">
                    <h6 className="text-primary fw-500 fs-14px mb-0 mt-2">Company details</h6>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Company Name"
                        id="Firstname"
                        placeholder=""
                        type="textbox"
                        disabled=""
                        value="Forerun Glabal"
                      />
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <label className="mb-1 mt-3">Business Type</label>
                      <Selectbox options={['Telecom', 'Telecom', 'Telecom', 'Telecom']} />
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Company Email"
                        id="Lastname"
                        placeholder=""
                        type="email"
                        disabled=""
                        value="Compnayname@company.com"
                      />
                    </div>
                  </div>

                  <div className="row gx-5 align-items-center pb-2">
                    <div className="col-lg-4 col-sm-6 col-xl-4">
                      <label className="text-primary mb-1 mt-3">Company Phone Number</label>
                      <div className="d-flex gap-3">
                        <div>
                          <div className="dropdown form-control bg-white rounded more p-2 global-height d-flex align-items-center rounded-start d-flex">
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
                                  src="/assets/us-flag.svg"
                                  alt=""
                                />
                                <span className="selected-country text-secondary">+1</span>
                              </div>
                              <img className="ps-2" src="/assets/down-black.svg" alt="" />
                            </a>
                            <ul
                              id="dropdown-left-status w-100"
                              className="dropdown-menu w-100 m-auto dropdown-status rounded shadow-6 dropdown-country-chat"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li className="py-3 px-4">
                                <SearchWithBorder placeholderText="Search Country" />
                              </li>
                              <div className="scroll-custom country-scroll">
                                <li>
                                  <a className="py-3 px-4 country-item" href="#/">
                                    <img className="pe-2" src="/assets/ind.svg" alt="" />
                                    +91 India
                                  </a>
                                </li>
                                <li>
                                  <a className="py-3 px-4 country-item" href="#/">
                                    <img className="pe-2" src="/assets/uk.svg" alt="" />
                                    +44 UK
                                  </a>
                                </li>

                                <li>
                                  <a className="py-3 px-4 country-item" href="#/">
                                    <img className="pe-2" src="/assets/us-flag.svg" alt="" />
                                    +1 USA
                                  </a>
                                </li>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div className="w-100">
                          {/* <!-- <input
                        type="number"
                        class="form-control bg-white"
                        value="435 4356 9876"
                        id="phonenUmber"
                      /> --> */}
                          <InputWithoutLabel
                            value="43543569876"
                            id="phoneNumber"
                            placeholder=""
                            type="number"
                            disabled=""
                          />
                          {/* <!-- <Input
                    label="Zip Code"
                    id="Website"
                    value="452654"
                    type="number"
                    disabled=""
                  /> --> */}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-xl-4">
                      <Input
                        label="Website"
                        id="middleName"
                        placeholder=""
                        type="url"
                        disabled=""
                        value="https://mycompany.com"
                      />
                    </div>

                    <div className="col-lg-4 col-sm-6 col-xl-4">
                      <label className="mb-1 mt-3">Country</label>
                      <Selectbox options={['United States', 'India', 'UK', 'US']} search="true" />
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <label className="mb-1 mt-3">City</label>
                      <Selectbox options={['Chicago', 'America', 'UK', 'US']} />
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Zip Code"
                        id="Website"
                        value="452654"
                        type="number"
                        disabled=""
                      />
                    </div>
                  </div>
                  <hr className="my-4" />

                  <div className="row gx-5 pb-2">
                    <h6 className="text-primary fw-500 fs-14px mb-0 mt-3">Address details</h6>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Address line 1"
                        id="Forerun"
                        placeholder="Address line 1"
                        type="textbox"
                        disabled=""
                      />
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Address line 2"
                        id="Forerun"
                        placeholder="Address line 2"
                        type="textbox"
                        disabled=""
                      />
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <Input
                        label="Address line 3"
                        id="Forerun"
                        placeholder="Address line 3"
                        type="textbox"
                        disabled=""
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="row mt-3 gx-5">
                    <h6 className="text-primary fw-500 fs-14px mb-3 mt-3">Social Media Profiles</h6>

                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3 mt-sm-0">
                        <img src="/assets/facebook-bg.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          value="http://www.facebook.com/avira.."
                          aria-label="default input example"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3 mt-sm-0">
                        <img src="/assets/linkedin-bg.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          value="http://www.linkedin.com/avira.."
                          aria-label="default input example"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3 mt-lg-0">
                        <img src="/assets/xface.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          value="http://www.twitter.com/avira.."
                          aria-label="default input example"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3">
                        <img src="/assets/instagram-pink.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          value="http://www.instagram.com/avi.."
                          aria-label="default input example"
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                      <div className="d-flex gap-2 align-items-center mt-3">
                        <img src="/assets/youtube-bg.svg" alt="" />
                        <input
                          className="form-control bg-white"
                          type="url"
                          value="http://www.youtube.com/avira.."
                          aria-label="default input example"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-start align-items-center border-0 p-0 mt-4 gap-3 mb-3">
                    <button
                      data-bs-dismiss="modal"
                      id="addContactButton"
                      type="button"
                      className="btn bg-black d-flex align-items-center text-white px-4 py-12px"
                    >
                      Save
                    </button>
                    <a
                      id="cancelRequest"
                      href="/comm-voice-admin/account-information/company-profile/"
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
      <ToastCustom id="deleteApiBtnMsg" btnId="deleteApiBtn">
        <span className="fw-bolder">Deleted :</span> You have successfully deleted the API.
      </ToastCustom>

      <ToastCustom id="addContactButtonMsg" btnId="addContactButton">
        <span className="fw-bolder">Updated :</span> You have successfully updated.
      </ToastCustom>
    </Layout>
  );
}

export default EditCompanyProfile;
