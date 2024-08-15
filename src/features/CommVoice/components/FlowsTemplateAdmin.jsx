import React from 'react';
import { Tooltip } from 'react-tooltip';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CheckboxSlider from '../../../common/components/forms/CheckboxSlider';
import SuccessBadge from '../../../common/components/badges/SuccessBadge';

function FlowsTemplateAdmin({
  templateHead,
  templateSubHead,
  setShow,
  isEnabled,
  id,
  formik,
  allCallFlow,
  callFlowId,
  editFlowsTemplate,
  isPublished,
}) {
  const findCallFlowName = (callflowid) => {
    const callFlow = allCallFlow.find((flow) => parseInt(flow.id, 10) === parseInt(callflowid, 10));
    return callFlow ? callFlow.attributes.name : '-Select call flow-';
  };

  return (
    <div>
      <div className="rounded bg-white shadow-6 p-3 mb-3">
        <div className="row">
          <div className="col-12 col-md-5 col-lg-6">
            <div className="d-flex flex-column">
              <p className="text-primary fw-medium mb-0">{templateHead}</p>
              <p className="text-secondary mb-0 line-clamp-1">{templateSubHead}</p>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-4 mt-3 mt-md-0">
            <div className="d-flex align-items-center gap-2">
              <p className="mb-0">Call flow:</p>
              <div className="dropdown-center">
                <button
                  className="form-control w-100 form-select text-start bg-white"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="d-flex gap-2">
                    <span className="p-1">
                      <img src="/assets/flow-stream.svg" className="pe-2" alt="" />
                      {findCallFlowName(callFlowId)}
                    </span>
                  </div>
                </button>

                <ul className="dropdown-menu w-100 shadow-6 pb-2 p-3">
                  <div className="d-flex justify-content-between gap-3">
                    <div className="w-100">
                      <SearchWithBorder
                        placeholderText="Search call  flow"
                        onChange={() => {}}
                        clearBtn={() => {}}
                      />
                    </div>
                  </div>
                  <div className="scroll-custom scroll-custom-flow">
                    {allCallFlow?.map((allcallflow, index) => (
                      <li
                        key={index}
                        className="mt-2"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <a
                          href="/#"
                          className="dropdown-item py-3 px-2"
                          onClick={(e) => {
                            e.preventDefault();
                            editFlowsTemplate(
                              id,
                              templateHead,
                              templateSubHead,
                              isEnabled,
                              allcallflow.id
                            );
                          }}
                        >
                          {allcallflow.attributes.name}
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-2 mt-3 mt-md-0">
            <div className="d-flex align-items-center justify-content-start justify-content-md-end px-lg-2 px-sm-3  gap-3 gap-lg-3 gap-sm-1 py-lg-3 py-sm-2">
              <div
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShow({
                    isVisible: true,
                    type: isEnabled ? 'disable-template' : 'enable-template',
                    key: `${isEnabled ? 'Disable' : 'Enable'}`,
                    templateId: id,
                    name: templateHead,
                  });
                }}
              >
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-tooltip-id={`tooltip-enable-disable-${id}`}
                >
                  <CheckboxSlider checked={isEnabled} />
                  <Tooltip
                    id={`tooltip-enable-disable-${id}`}
                    content={isEnabled ? 'Disable Template' : 'Enable Template'}
                    place="top"
                  />
                </span>
              </div>

              <div className="d-flex gap-3">
                <div className="dropup">
                  <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/assets/vertical-dot.svg" alt="" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-group p-1">
                    <li>
                      <a
                        href="/#"
                        className="dropdown-item py-2 px-3"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow({ isVisible: true, type: 'edit-template-modal', templateId: id });
                          formik.setFieldValue('templateName', templateHead);
                          formik.setFieldValue('templateDescription', templateSubHead);
                          formik.setFieldValue('isEnabled', isEnabled);
                          formik.setFieldValue('linkCallFlow', callFlowId ?? 'select');
                        }}
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="dropdown-item py-2 px-3"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow({
                            isVisible: true,
                            type: 'delete-modal',
                            templateId: id,
                            name: templateHead,
                          });
                        }}
                      >
                        Delete
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="dropdown-item py-2 px-3"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow({
                            isVisible: true,
                            type:
                              isPublished === 1 ? 'unpublish-single-modal' : 'publish-single-modal',
                            templateId: id,
                            name: templateHead,
                          });
                        }}
                      >
                        {isPublished === 1 ? 'Unpublish' : 'Publish'}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowsTemplateAdmin;
