import React, { useState } from 'react';
import { handleKeyPressForNumber } from '../../../common/helpers/utils';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';

function StartAcall({ setIsConnecting }) {
  const [isDialpadPopupVisible, setIsDialpadPopupVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    country: 'USA',
    countryCode: '+1 ',
    number: '',
    isDefault: true,
  });

  return (
    <div id="startCalling" className="col-sm-3 start-call collapse">
      <div className="card card shadow-6 bg-white border-0 rounded position-relative dial-pop">
        <div className="p-4">
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="bg-platinum d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold">
              <img src="/assets/phone-outgoing.svg" alt="" />
            </div>

            <span className="text-primary fw-medium">Start a call</span>
            <div className="ms-auto">
              <a
                data-bs-toggle="collapse"
                href="#startCalling"
                onClick={() => {
                  setIsDialpadPopupVisible(false);
                  setPhoneNumber({
                    country: 'USA',
                    countryCode: '+1 ',
                    number: '',
                    isDefault: true,
                  });
                }}
              >
                <img src="/assets/close-call.svg" alt="" />
              </a>
            </div>
          </div>
          {/* <!-- dial a contact starts --> */}
          <div
            id="dialContact"
            className={isDialpadPopupVisible === true ? 'dial-contact d-none' : 'dial-contact'}
          >
            <div className="d-flex flex-row align-items-center">
              <div className="text-primary font-400 mt-4 mb-2">Dial a contact</div>
            </div>
            <div className="d-flex flex-row align-items-center mt-2">
              <div id="dialPadWeb" className="input-group mb-3">
                <input
                  type="text"
                  className="form-control bg-geyser border-0 h-7 text-primary"
                  placeholder="Enter number , name"
                  aria-label="Enter number"
                  aria-describedby="basic-addon2"
                  onKeyPress={handleKeyPressForNumber}
                  value={phoneNumber ? phoneNumber?.number : ''}
                  onChange={(e) => {
                    setPhoneNumber({ ...phoneNumber, number: e.target.value });
                  }}
                />
                <span className="input-group-text bg-geyser border-0 h-7" id="basic-addon2">
                  <a
                    className="bg-white p-2 rounded"
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDialpadPopupVisible(true);
                    }}
                  >
                    <img className="dialpad-click" src="/assets/dial-pad.svg" alt="" />
                  </a>
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="button"
                className="btn rounded-start text-white bg-black bg-dark no-drop btn-call-mob px-4 py-12px"
                data-bs-toggle="dropdown"
              >
                <img src="/assets/btn-call-white.svg" alt="" />
              </button>
              <ul className="dropdown-menu dropdown-menu-call" id="timer">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <li className="text-white child-2 mt-2">
                    <img className="me-2" src="/assets/call-white.svg " alt="" />
                    calling...
                  </li>
                  <li className="text-white call-timer">00:00:00</li>
                  <li className="text-white call-number">+17655678356</li>
                  <li id="endcall" className="child-2 call-end">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <img className="me-2" src="/assets/call-end.svg" alt="" />
                    </a>
                  </li>
                </div>
              </ul>
              <button
                type="button"
                className="btn rounded-end text-white bg-dark bg-black no-drop btn-call-web px-3 py-12px phone-call-starts"
                onClick={() => {
                  setIsConnecting({ show: true, mob: '' });
                }}
              >
                <img src="/assets/btn-web-white.svg" alt="" />
              </button>
            </div>
          </div>
          {/* <!-- dial a contact ends --> */}

          {/* <!-- dialpad popup starts  --> */}
          <div
            className={`dropdown-dial dropdown-dial-box  p-23px${
              isDialpadPopupVisible === true ? '' : 'd-none'
            } `}
            id="dropdown-dial-box"
          >
            <div className="px-0">
              <div className="dropdown more pad-dial-drop">
                <a
                  className="select-box-flag d-flex align-items-center pe-4 text-primary fs-13px"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  role="button"
                  id="dropdownMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div
                    id="selectedVal"
                    className="status-truncate d-inline-block text-white d-flex align-items-center"
                  >
                    {phoneNumber?.isDefault && (
                      <img className="pe-2" src="/assets/us-flag.svg" alt="" />
                    )}
                    {phoneNumber?.isDefault && phoneNumber?.countryCode}
                    {phoneNumber?.country}
                  </div>
                  <img className="ps-2" src="/assets/down-white.svg" alt="" />
                </a>
                <ul
                  id="dropdown-left-status"
                  className="dropdown-menu m-auto dropdown-status rounded shadow-6"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li className="py-3 px-4">
                    <SearchWithBorder placeholderText="Search Country" />
                  </li>
                  <div className="scroll-custom country-scroll">
                    <li>
                      <a
                        className="py-3 px-4 country-item"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPhoneNumber({
                            ...phoneNumber,
                            countryCode: '+91',
                            country: 'India',
                            isDefault: false,
                          });
                        }}
                      >
                        India
                      </a>
                      <a
                        className="py-3 px-4 country-item"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPhoneNumber({
                            ...phoneNumber,
                            countryCode: '+61',
                            country: 'Australia',
                            isDefault: false,
                          });
                        }}
                      >
                        Australia
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div className="input-group mb-3 p-23px">
              <input
                id="number-output-web"
                type="text"
                className="form-control bg-dial-pad border-0 h-7 text-white"
                value={phoneNumber ? `${phoneNumber?.countryCode} ${phoneNumber?.number}` : ''}
                aria-label="Enter number"
                aria-describedby="basic-addon2"
                readOnly
              />
              <span className="input-group-text bg-dial-pad border-0 h-7" id="basic-addon2">
                <a
                  className="bg-blue-active p-2 rounded"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img className="dialpad-click" src="/assets/dial-pad-white.svg" alt="" />
                </a>
              </span>
            </div>
            <div className="keypad">
              <div className="dial-row">
                <div
                  className="digit"
                  id="one"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}1` });
                  }}
                >
                  1
                </div>
                <div
                  className="digit"
                  id="two"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}2` });
                  }}
                >
                  2
                </div>

                <div
                  className="digit"
                  id="three"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}3` });
                  }}
                >
                  3
                </div>
              </div>
              <div className="dial-row">
                <div
                  className="digit"
                  id="four"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}4` });
                  }}
                >
                  4
                </div>

                <div
                  className="digit"
                  id="five"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}5` });
                  }}
                >
                  5
                </div>

                <div
                  className="digit"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}6` });
                  }}
                >
                  6
                </div>
              </div>
              <div className="dial-row">
                <div
                  className="digit"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}7` });
                  }}
                >
                  7
                </div>

                <div
                  className="digit"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}8` });
                  }}
                >
                  8
                </div>

                <div
                  className="digit"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}9` });
                  }}
                >
                  9
                </div>
              </div>

              <div className="dial-row">
                <div
                  className="digit"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}*` });
                  }}
                >
                  *
                </div>

                <div
                  className="digit"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}0` });
                  }}
                >
                  0
                </div>

                <div
                  className="digit"
                  onClick={() => {
                    setPhoneNumber({ ...phoneNumber, number: `${phoneNumber?.number}#` });
                  }}
                >
                  #
                </div>
              </div>
              <div className="d-flex justify-content-center gap-5 mt-4 mb-4">
                <div>
                  <a
                    href="/#"
                    data-bs-toggle="dropdown"
                    className="btn rounded-start text-white comm-btn-call btn-call-mob px-4 py-12px"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img src="/assets/phone-call-blue.svg" alt="" />
                  </a>

                  {/*  */}
                  <ul className="dropdown-menu dropdown-menu-call" id="timer">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <li className="text-white child-2 mt-2">
                        <img className="me-2" src="/assets/call-white.svg " alt="" />
                        calling...
                      </li>
                      <li className="text-white call-timer">00:00:00</li>
                      <li className="text-white call-number">+17655678356</li>
                      <li id="endcall" className="child-2 call-end">
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <img className="me-2" src="/assets/call-end.svg" alt="" />
                        </a>
                      </li>
                    </div>
                  </ul>
                  {/*  */}
                </div>
                <div>
                  <a
                    id="phoneCallStarts"
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsConnecting({ show: true, mob: phoneNumber });
                    }}
                  >
                    <img src="/assets/web-call-blue.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- dialpad popup starts  --> */}
        </div>
      </div>
    </div>
  );
}

export default StartAcall;
