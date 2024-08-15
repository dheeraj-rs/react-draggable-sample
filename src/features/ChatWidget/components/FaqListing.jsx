import React from 'react';
import ChatWidgetFaqQuestions from '../chat-widget-settings/ChatWidgetFaqQuestions';

function FaqListing({ showFAQListing, onBack, setShowFaqDetails }) {
  return (
    <div
      className={`accordion-body rounded-bottom p-0 faq-article-new ${
        showFAQListing ? '' : 'd-none'
      }`}
    >
      <div className="d-flex bg-white justify-content-between p-3 align-items-center">
        <div className="d-flex align-items-center gap-2">
          <div className="p-1 rounded faq-qn-back">
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
            >
              <img src="/assets/ArrowLeft.svg" alt="" />
            </a>
          </div>
          <div className="">
            <img src="/assets/faq-1.svg" alt="" />
          </div>
          <div className="">
            <p className="fw-500 mb-0">FGS Questioner</p>
          </div>
        </div>

        <div>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div
              role="button"
              data-bs-toggle="tooltip"
              data-bs-title="Open in new Browser"
              data-bs-placement="top"
              className="d-block"
            >
              <img src="/assets/CopySimpleblack.svg" alt="" />
            </div>
          </a>
        </div>
      </div>

      <hr className="m-0 border-black o-16" />
      <div className="p-4">
        {/* <!-- sample qns starts --> */}
        <ChatWidgetFaqQuestions
          serialNum="1"
          qns="How to configure chat widget"
          onClick={() => {
            setShowFaqDetails(true);
          }}
        />
        <ChatWidgetFaqQuestions
          serialNum="2"
          qns="How to start with building c..."
          onClick={() => {
            setShowFaqDetails(true);
          }}
        />
        <ChatWidgetFaqQuestions
          serialNum="3"
          qns="How to crate a flow for chat"
          onClick={() => {
            setShowFaqDetails(true);
          }}
        />
        <ChatWidgetFaqQuestions
          serialNum="4"
          qns="Which is the best channel .."
          onClick={() => {
            setShowFaqDetails(true);
          }}
        />
        {/* <!-- sample qns ends --> */}

        <p className="text-center mt-4 text-dark-blue-bb">
          Powered by, <b>Gsoftcomm</b>
        </p>
      </div>
    </div>
  );
}

export default FaqListing;
