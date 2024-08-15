import React from 'react';

function CampaignButton() {
  return (
    <a
      href="/#"
      className="blue-btn d-flex align-items-center px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active fw-bolder"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <i className="me-2">
        <span>
          <img src="/assets/campaign-blue.svg" alt="# " />
        </span>
      </i>
      <span>Campaigns</span>
    </a>
  );
}

export default CampaignButton;
