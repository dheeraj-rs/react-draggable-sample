import React from 'react';

function TabsHead({ setType }) {
  return (
    <ul className="nav nav-tabs d-flex ps-0 mb-0 col-lg-12" id="myTab" role="tablist">
      <li
        className="nav-item pe-4"
        role="presentation"
        onClick={() => {
          setType(1);
        }}
      >
        <a
          className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary active"
          id="configuration"
          data-bs-toggle="tab"
          data-bs-target="#tab-configuration"
          type="button"
          role="tab"
          aria-controls="configuration-tab"
          aria-selected="false"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Configuration
        </a>
      </li>

      <li
        className="nav-item pe-4"
        role="presentation"
        onClick={() => {
          setType(2);
        }}
      >
        <a
          className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary"
          id="map-bot-tab"
          data-bs-toggle="tab"
          data-bs-target="#tab-map-bot"
          type="button"
          role="tab"
          aria-controls="call"
          aria-selected="true"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Topics
        </a>
      </li>

      <li
        className="nav-item pe-4"
        role="presentation"
        onClick={() => {
          setType(3);
        }}
      >
        <a
          className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary"
          id="map-faq-tab"
          data-bs-toggle="tab"
          data-bs-target="#tab-map-faq"
          type="button"
          role="tab"
          aria-controls="call"
          aria-selected="true"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          FAQs
        </a>
      </li>

      <li
        className="nav-item pe-4"
        role="presentation"
        onClick={() => {
          setType(4);
        }}
      >
        <a
          className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary"
          id="appearance-tab"
          data-bs-toggle="tab"
          data-bs-target="#widget-tab-appearance"
          type="button"
          role="tab"
          aria-controls="call"
          aria-selected="true"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Appearance
        </a>
      </li>

      <li
        className="nav-item pe-4"
        role="presentation"
        onClick={() => {
          setType(5);
        }}
      >
        <a
          className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary"
          id="embed-code-tab"
          data-bs-toggle="tab"
          data-bs-target="#tab-embed-code"
          type="button"
          role="tab"
          aria-controls="call"
          aria-selected="true"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Widget embed code
        </a>
      </li>
    </ul>
  );
}

export default TabsHead;
