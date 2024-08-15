import React from 'react';
import RadioLabelImage from '../forms/RadioLabelImage';

function LabelAccordion({ id, target, label, checked, labelName }) {
  return (
    <div className="label-accordion">
      <div className="accordion accordion-custom-right mt-2" id="accordionLabel">
        <div className="accordion-item acc-card bg-white border-0 fs-13px position-relative">
          <div
            className="accordion-header bg-white d-flex align-items-center mt-4"
            id="headingUpdate"
          >
            <div className="w-100">
              <input id={id} className="radio-tick" name={label} type="radio" checked={checked} />
              <label htmlFor="chat-label-input" className="radio-tick-label text-primary">
                <img className="px-3" src="/assets/label-light.svg" alt="" />
                {labelName}
              </label>
            </div>
            <a
              href="/#"
              type="button"
              className="accordion-button head  bg-white p-0 "
              data-bs-toggle="collapse"
              data-bs-target={target}
              aria-expanded="true"
              aria-controls={target}
            />
          </div>
          <div
            id={target}
            className="accordion-collapse collapse show"
            aria-labelledby="headingUpdate"
            data-bs-parent="#accordionLabel"
          >
            <div className="accordion-body acc-card-content ps-5 pe-0">
              <div className="d-flex align-item-center p-12px bg-ghost-white-light rounded mb-3">
                <RadioLabelImage
                  id="cat-1"
                  title="Subcategory 1"
                  name="submission"
                  icon="/assets/subcat-icon.svg"
                />
              </div>
              <div className="d-flex align-item-center p-12px bg-ghost-white-light rounded mb-3">
                <RadioLabelImage
                  id="cat-2"
                  title="Subcategory 2"
                  name="submission"
                  icon="/assets/subcat-icon.svg"
                />
              </div>
              <div className="d-flex align-item-center p-12px bg-ghost-white-light rounded mb-3">
                <RadioLabelImage
                  id="cat-3"
                  title="Subcategory 3"
                  name="submission"
                  icon="/assets/subcat-icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabelAccordion;
