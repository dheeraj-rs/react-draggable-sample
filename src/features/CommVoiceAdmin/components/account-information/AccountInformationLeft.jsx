/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';

function AccountInformationLeft({
  path,
  subhead,
  active,
  image,
  title,
  subTitle,
  subactive,
  subPathOne,
  subPathTwo,
}) {
  return (
    <div>
      <Link
        to={path}
        className={`sms-list-campaign account-info-left d-flex cursor-pointer p-3 border-0 gap-13px align-items-center mb-1 justify-content-between ${
          active === true && subhead === true
            ? 'bg-chat-blue active rounded-top pb-0'
            : active === true
            ? 'bg-chat-blue active rounded'
            : 'rounded'
        }`}
        role={active !== true ? 'button' : null}
      >
        <div className="d-flex gap-3 align-items-center" style={{ width: 'calc(100% - 16px)' }}>
          <div className="d-flex gap-3">
            <img className="p-2" src={`/assets/${image}`} alt="" />
            <div>
              <p className="fs-13px text-primary mb-0 line-clamp-1 fw-500">{title}</p>
              <p className="mb-0 fw-normal text-secondary">{subTitle}</p>
            </div>
          </div>
        </div>

        {/* <div
          className={`rounded-circle bg-blue-light p-1 ms-auto me-2 ${
            active != true && "invisible"
          }`}
        ></div> */}
      </Link>
      {active === true && subhead === true ? (
        <ul
          className="bg-chat-blue active p-2 pb-3 pt-0 rounded-bottom mt-n3"
          style={{ paddingLeft: '42px !important' }}
        >
          <li className="pb-2 pt-1">
            <a
              className={`${subactive === '1' ? 'color-blue-active' : 'text-secondary'} fs-13px`}
              href={subPathOne}
            >
              Active Templates
            </a>
          </li>
          <li>
            <a
              href={subPathTwo}
              className={`${subactive === '2' ? 'color-blue-active' : 'text-secondary'} fs-13px`}
            >
              Requested for approval
            </a>
          </li>
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}

export default AccountInformationLeft;
