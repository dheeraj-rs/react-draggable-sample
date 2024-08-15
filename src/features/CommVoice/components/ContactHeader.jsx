import React from 'react';
import SmsButton from './SmsButton';
import CallButton from './CallButton';
import CampaignButton from './CampaignButton';

function ContactHeader({ setIsMobile, isMobile, setShow }) {
  return (
    <div id="headerVoice" className={isMobile ? 'd-none' : ''}>
      {/* <!-- contact header starts--> */}
      <div className="col-lg-12">
        <div className="bg-white rounded p-4 pb-0 w-100">
          <div className="row align-items-center">
            <div className="col-lg-8 col-sm-12">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <h4 className="fs-16px text-primary fw-medium">All Contacts</h4>
                  <div className="text-secondary fs-13px mb-0">
                    List of all the contacts, by groups and create or import contacts.
                  </div>
                </div>
                {/* <!-- mobile view only --> */}
                <div id="mobileCompany" className="d-flex align-items-center d-block d-lg-none">
                  <a
                    href="#/"
                    className="bg-white border d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobile(true);
                    }}
                  >
                    <img src="/assets/mobile-company.svg" alt="" />
                  </a>
                </div>
                {/* <!-- mobile view only --> */}
              </div>
            </div>

            <div className="col-lg-4 col-sm-12">
              <div className="d-flex gap-3 align-items-center float-start float-lg-end mt-4 contact-btns mt-lg-0">
                {/* <!-- call button --> */}
                <CallButton />
                {/* <!-- call button --> */}

                {/* <!-- sms button --> */}
                <SmsButton setShow={setShow} />
                {/* <!-- sms button --> */}

                {/* <!-- campaign button --> */}
                <CampaignButton />
                {/* <!-- campaign button --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactHeader;
