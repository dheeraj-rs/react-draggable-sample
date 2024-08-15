import React from 'react';
import CheckboxTick from '../../../common/components/forms/CheckBoxTick';

function WidgetNotificationSettings({ formik }) {
  return (
    <div className="shadow-10 mt-4 p-4 rounded">
      <div className="row gx-5">
        <h6 className="fs-14 mt-2 mb-4 fw-500">Widget Notification Settings</h6>

        <div className="col-lg-6 col-sm-12">
          <div className="d-flex gap-3">
            <CheckboxTick
              title="Disable desktop message preview"
              classAttributeChild="fw-normal text-primary check-title"
              classAttributeParent="d-flex gap-2 align-items-center"
              checked={formik?.values?.isDesktopMessagePreviewEnabled}
              onClick={() => {
                formik.setFieldValue(
                  'isDesktopMessagePreviewEnabled',
                  !formik?.values?.isDesktopMessagePreviewEnabled
                );
              }}
              onChange={() => {}}
            />

            <div className="dropup">
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="/assets/info.svg" alt="" />
              </a>
              <ul className="dropdown-menu preview-dropdown  p-3">
                <img src="/assets/desktop-preview.svg" alt="desktop preview" />
              </ul>
            </div>
          </div>
          <div className="mt-4 d-flex gap-3">
            <CheckboxTick
              checkid=""
              title="Disable agent typing status notification"
              classAttributeChild="fw-normal text-primary check-title"
              classAttributeParent="d-flex gap-2 align-items-center"
              checked={formik?.values?.isAgentTypingStatusNotificationEnabled}
              onClick={() => {
                formik.setFieldValue(
                  'isAgentTypingStatusNotificationEnabled',
                  !formik?.values?.isAgentTypingStatusNotificationEnabled
                );
              }}
              onChange={() => {}}
            />
            <div className="dropup">
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="/assets/info.svg" alt="" />
              </a>
              <ul className="dropdown-menu preview-dropdown  p-3">
                <div className="d-flex flex-column gap-3">
                  <div>
                    <img src="/assets/preview-type.svg" alt="Animation preview" />
                  </div>
                  <div>
                    {' '}
                    <img src="/assets/chat-box.svg" alt="Animation preview" />
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <div className="mt-4 d-flex gap-3">
            <CheckboxTick
              checkid=""
              title="Disable customer typing status notification"
              classAttributeChild="fw-normal text-primary check-title"
              classAttributeParent="d-flex gap-2 align-items-center"
              checked={formik?.values?.isCustomerTypingStatusNotificationEnabled}
              onClick={() => {
                formik.setFieldValue(
                  'isCustomerTypingStatusNotificationEnabled',
                  !formik?.values?.isCustomerTypingStatusNotificationEnabled
                );
              }}
              onChange={() => {}}
            />
            <div>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <img src="/assets/info.svg" alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-sm-12">
          <div className="mt-4 mt-lg-0">
            <CheckboxTick
              checkid=""
              title="Disable notification sound"
              classAttributeChild="fw-normal text-primary check-title"
              classAttributeParent="d-flex gap-2 align-items-center"
              checked={formik?.values?.isNotificationSoundEnabled}
              onClick={() => {
                formik.setFieldValue(
                  'isNotificationSoundEnabled',
                  !formik?.values?.isNotificationSoundEnabled
                );
              }}
              onChange={() => {}}
            />
          </div>

          <div className="mt-4">
            <CheckboxTick
              checkid=""
              title="Allow customers to attach file"
              classAttributeChild="fw-normal text-primary check-title"
              classAttributeParent="d-flex gap-2 align-items-center"
              checked={formik?.values?.isCustomersAllowedToAttachFiles}
              onClick={() => {
                formik.setFieldValue(
                  'isCustomersAllowedToAttachFiles',
                  !formik?.values?.isCustomersAllowedToAttachFiles
                );
              }}
              onChange={() => {}}
            />
          </div>
          <div className="mt-4">
            <CheckboxTick
              checkid=""
              title="Hide resolve conversation history"
              classAttributeChild="fw-normal text-primary check-title"
              classAttributeParent="d-flex gap-2 align-items-center"
              checked={formik?.values?.isResolvedConversationHistoryHidden}
              onClick={() => {
                formik.setFieldValue(
                  'isResolvedConversationHistoryHidden',
                  !formik?.values?.isResolvedConversationHistoryHidden
                );
              }}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetNotificationSettings;
