import React from 'react';
import { Tooltip } from 'react-tooltip';
import CheckboxSlider from '../../../common/components/forms/CheckboxSlider';

function FlowsComponents({
  componentDetail,
  flowsIcon,
  flowsName,
  isEnabled,
  id,
  setShow,
  formik,
}) {
  return (
    <div>
      <div className="row justify-content-between align-items-center p-2 p-lg-3 p-sm-2 py-4 rounded mt-2 shadow-6 roles-box cursor-pointer mx-1 flex-wrap border">
        <div className="d-flex gap-3 align-items-center roles-list col-lg-2 col-sm-3 col-12 mb-lg-0 mb-3 mb-sm-0">
          <div>
            <img src="/assets/component-drag.svg" alt="" />
          </div>
          <div className="">
            <img src={flowsIcon} alt="" />
          </div>
          <div className="d-flex gap-4 align-items-center">
            <h6 className="fs-13px fw-500 mb-0 text-primary phone-number-virtual">{flowsName}</h6>
          </div>
        </div>

        <div className="col-lg-7 col-sm-6 col-12 d-flex gap-2 align-items-center">
          <p className="mb-0">{componentDetail}</p>
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
            href="/#"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-title="This component is use to set up the first message that callers listen when they call to your company"
            data-bs-placement="top"
            data-tooltip-id={`tooltip-view-${id}`}
          >
            View
            <Tooltip
              id={`tooltip-view-${id}`}
              content="This component is use to set up the first message that callers listen when they call to your company"
              place="top"
            />
          </a>
        </div>

        <div className="d-flex gap-3 align-items-center col-lg-2 col-sm-2 col-3 mt-lg-0 mt-sm-0 mt-md-0 mt-3 justify-content-end">
          <p className="mb-0 d-flex gap-1" />
          <div
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setShow({
                isVisible: true,
                type: isEnabled ? 'disable-component' : 'enable-component',
                key: `${isEnabled ? 'Disable' : 'Enable'}`,
                componentId: id,
                componentName: flowsName,
              });
            }}
          >
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              data-tooltip-id={`tooltip-enable-disable-${id}`}
            >
              <CheckboxSlider checked={isEnabled} />
              <Tooltip
                id={`tooltip-enable-disable-${id}`}
                content={isEnabled ? 'Disbale Template' : 'Enable Template'}
                place="top"
              />
            </span>
          </div>
          <div className="dropup">
            <a href="/#" role="button" className="" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/assets/vertical-dot.svg" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-group p-1">
              <li>
                <a
                  href="/#"
                  className="dropdown-item py-2 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'edit-component-modal',
                      data: flowsName,
                      componentId: id,
                      icon: flowsIcon,
                      name: flowsName,
                    });
                    formik.setFieldValue('componentName', flowsName);
                    formik.setFieldValue('componentDescription', componentDetail);
                    formik.setFieldValue('isEnabled', isEnabled);
                  }}
                >
                  {/* <img className="me-2" src="/assets/note-pencil.svg" /> */}
                  Edit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowsComponents;
