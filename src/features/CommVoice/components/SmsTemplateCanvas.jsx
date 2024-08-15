import React from 'react';
import SmsTemplate from './SmsTemplates';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';

function SmsTemplateCanvas({ show, setShow }) {
  const hanldeClose = () => {
    setShow({ isVisible: false, type: '' });
  };
  if (show) {
    return (
      <>
        <div
          className={`offcanvas offcanvas-end   ${show ? 'showing' : 'hiding'}`}
          tabIndex="-1"
          id="offcanvasSmsTemplate"
          aria-labelledby="offcanvasSmsTemplateLabel"
        >
          <div className="offcanvas-header px-4 pt-4 pb-2">
            <h5
              // role="button"
              className="offcanvas-title fs-16px fw-medium"
              id="offcanvasSmsTemplateLabel"
              onClick={() => {
                setShow({ isVisible: true, type: 'sms-offcanvas' });
              }}
            >
              <img className="me-2" src="/assets/left-arrow-black.svg" alt="" />
              Message templates
            </h5>
            <button type="button" className="btn-close" onClick={hanldeClose} aria-label="Close" />
          </div>
          <div className="offcanvas-body px-4">
            <a
              className="fs-13px text-blue-active fw-medium"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00014 5.42871C6.57997 5.42871 5.42871 6.57999 5.42871 8.00016C5.42871 9.42028 6.57997 10.5716 8.00014 10.5716C8.77088 10.5716 9.46243 10.2324 9.93374 9.69531C10.3308 9.24273 10.5716 8.64953 10.5716 8.00016C10.5716 7.73731 10.5321 7.48371 10.4589 7.24491C10.1363 6.19331 9.15745 5.42871 8.00014 5.42871ZM6.28585 8.00016C6.28585 7.05336 7.05334 6.28588 8.00014 6.28588C8.94694 6.28588 9.71443 7.05336 9.71443 8.00016C9.71443 8.94691 8.94694 9.71445 8.00014 9.71445C7.05334 9.71445 6.28585 8.94691 6.28585 8.00016Z"
                  fill="#645DF6"
                />
                <path
                  d="M12.4055 12.797L11.4183 12.3636C11.1359 12.2398 10.8042 12.2579 10.5373 12.4124C10.2704 12.567 10.1001 12.8395 10.0663 13.1466L9.94757 14.2202C9.92305 14.4416 9.76242 14.6238 9.54614 14.6754C8.52945 14.9177 7.47014 14.9177 6.45345 14.6754C6.23717 14.6238 6.07648 14.4416 6.05202 14.2202L5.93351 13.1481C5.89871 12.8417 5.72083 12.57 5.45415 12.416C5.18747 12.262 4.86366 12.2439 4.58219 12.367L3.59483 12.8004C3.39032 12.8902 3.15153 12.841 2.99903 12.6776C2.28856 11.9163 1.7597 11.0034 1.45226 10.0078C1.38604 9.7933 1.46255 9.56033 1.64294 9.42719L2.51568 8.78296C2.76426 8.59999 2.91108 8.30936 2.91108 8.00033C2.91108 7.69125 2.76426 7.40062 2.51535 7.21742L1.64316 6.57427C1.4625 6.44107 1.38593 6.20782 1.45238 5.99319C1.76036 4.99841 2.28949 4.08658 2.99997 3.3263C3.15262 3.16295 3.39152 3.11388 3.596 3.20388L4.57897 3.63653C4.86181 3.76089 5.18697 3.74211 5.45509 3.58516C5.72202 3.43001 5.8998 3.15723 5.93408 2.85018L6.05345 1.77717C6.07842 1.55309 6.24271 1.36967 6.46237 1.32072C6.96585 1.20853 7.47962 1.14891 8.00762 1.14282C8.52282 1.14877 9.03603 1.20842 9.53888 1.32078C9.75843 1.36984 9.9226 1.55321 9.94751 1.77717L10.067 2.851C10.1211 3.34405 10.5365 3.71749 11.0319 3.71801C11.165 3.71822 11.2967 3.69043 11.4197 3.6359L12.4029 3.20318C12.6073 3.11318 12.8463 3.16225 12.9989 3.32559C13.7094 4.08587 14.2385 4.99771 14.5465 5.9925C14.6129 6.20696 14.5365 6.4401 14.356 6.57336L13.4846 7.2169C13.236 7.39993 13.0859 7.69056 13.0859 7.99959C13.0859 8.30867 13.236 8.5993 13.4852 8.78267L14.3573 9.4265C14.5379 9.5597 14.6143 9.79285 14.5479 10.0074C14.24 11.002 13.7112 11.9138 13.0011 12.6742C12.8487 12.8375 12.6099 12.8867 12.4055 12.797ZM9.29328 12.6837C9.42768 12.2676 9.70808 11.9021 10.1078 11.6707C10.6117 11.3789 11.2308 11.3455 11.7625 11.5786L12.5305 11.9157C13.0236 11.345 13.4055 10.6864 13.6562 9.97433L12.977 9.47296L12.9765 9.47256C12.5133 9.13136 12.2287 8.58719 12.2287 7.99959C12.2287 7.41245 12.5129 6.86822 12.9757 6.52719L12.9764 6.52667L13.6548 6.02565C13.404 5.31353 13.0219 4.65499 12.5286 4.08433L11.7671 4.4195L11.7658 4.42009C11.5341 4.52258 11.2843 4.57549 11.0309 4.57515C10.0981 4.57395 9.31705 3.87097 9.21505 2.94545L9.21494 2.94445L9.12214 2.11024C8.75454 2.04181 8.38168 2.00491 8.00757 2.00003C7.62237 2.00502 7.24705 2.04203 6.87882 2.11038L6.78591 2.94537C6.72157 3.52149 6.38831 4.0337 5.88694 4.32557C5.38264 4.62027 4.76844 4.65618 4.23368 4.42104L3.47027 4.08503C2.97699 4.65565 2.59495 5.31412 2.34412 6.02616L3.02403 6.52753C3.49222 6.87245 3.76822 7.41919 3.76822 8.00033C3.76822 8.58125 3.49238 9.12805 3.02435 9.47285L2.34392 9.97513C2.59444 10.6882 2.97642 11.3476 3.46988 11.9192L4.23866 11.5818C4.77011 11.3492 5.38056 11.3836 5.88282 11.6738C6.38528 11.9639 6.71974 12.4754 6.78517 13.0514L6.78551 13.0539L6.87797 13.8907C7.61877 14.0364 8.38083 14.0364 9.12162 13.8907L9.21425 13.0524C9.2282 12.9266 9.25471 12.8031 9.29328 12.6837Z"
                  fill="#645DF6"
                />
              </svg>
              Manage template
            </a>

            <div className="mt-4">
              <SearchWithBorder
                placeholderText="Search by template name"
                onChange={() => {}}
                clearBtn={() => {}}
              />
            </div>
            <div className="template-section scroll-custom">
              <SmsTemplate
                title="New offer"
                desc="Lorem ipsum dolor sit amet, consectetur adipisc ing elit. dolor sit amet.."
              />
              <SmsTemplate
                title="Transactions"
                desc="Lorem ipsum dolor sit amet, consectetur adipisc ing elit. dolor sit amet.."
              />

              <SmsTemplate
                title="Escalation"
                desc="Lorem ipsum dolor sit amet, consectetur adipisc ing elit. dolor sit amet.."
              />

              <SmsTemplate
                title="Support"
                desc="Lorem ipsum dolor sit amet, consectetur adipisc ing elit. dolor sit amet.."
              />
              <SmsTemplate
                title="Usage"
                desc="Lorem ipsum dolor sit amet, consectetur adipisc ing elit. dolor sit amet.."
              />
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
              <button
                id="smsSendButton"
                // data-bs-dismiss="modal"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
              >
                <span className="pe-2"> </span>
                Use Template
              </button>
              <button
                type="button"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                onClick={hanldeClose}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
        {show && <div className="offcanvas-backdrop fade show" />}
      </>
    );
  }
}

export default SmsTemplateCanvas;
