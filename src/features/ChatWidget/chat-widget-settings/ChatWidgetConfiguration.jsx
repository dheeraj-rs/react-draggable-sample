import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Tooltip } from 'react-tooltip';
import { Link, useParams } from 'react-router-dom';
import ButtonToast from '../components/ButtonToast';
import LauncherBtn from '../components/LauncherBtn';
import '../../../styles/formvalidation.css';
import Input from '../../../common/components/forms/Input';
import WidgetStateSection from '../components/WidgetStateSection';
import WidgetNotificationSettings from '../components/WidgetNotificationSettings';
import { getFormErrorMessage, isFormFieldValid, scrollToTop } from '../../../common/helpers/utils';
import { UpdateChatTopic } from '../../../common/api-collection/ChatWidget/ChatWidgets';
import WebsiteDomainSection from './WebsiteDomainSection';
import { handleDeleteMethod } from '../../../common/api-config/methods';

function ChatWidgetConfiguration({
  setToastAction,
  chatWidgetDetails,
  chatWidgetDetailsIncluded,
  setRefresh,
  refresh,
  getWidgetDetails,
  setActiveLauncherButton,
  activeLauncherButton,
}) {
  const params = useParams();

  const targetDivRef = useRef(null);

  const [showWebsiteDomain, setShowWebsiteDomain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState([
    {
      type: 'domains',
      id: 'A0',
      attributes: {
        name: '',
        domain: '',
      },
    },
  ]);

  const [websiteDomainError, setWebsiteDomainError] = useState({
    domainName: false,
    url: false,
  });

  const validate = (data) => {
    const errors = {};

    if (!data.bannerMessage) {
      errors.bannerMessage = 'Banner message is required';
    }

    if (!data.bannerDescription) {
      errors.bannerDescription = 'Banner description is required';
    }

    if (!data.launcherButtonTooltip) {
      errors.launcherButtonTooltip = 'Tooltip is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      bannerMessage: '',
      bannerDescription: '',
      launcherButtonTooltip: '',
      launcherButtonIcon: '',
      messengerVisibility: false,
      defaultWidgetState: 'popout',
      isDesktopMessagePreviewEnabled: false,
      isAgentTypingStatusNotificationEnabled: false,
      isCustomerTypingStatusNotificationEnabled: false,
      isNotificationSoundEnabled: false,
      isCustomersAllowedToAttachFiles: false,
      isResolvedConversationHistoryHidden: false,
    },
    validate,
    onSubmit: () => {
      setLoading(true);

      const data = {
        type: 'chat_widgets',
        id: parseInt(chatWidgetDetails?.id, 10),
        attributes: {
          banner_message: formik?.values?.bannerMessage,
          banner_description: formik?.values?.bannerDescription,
          launcher_button_tooltip: formik?.values?.launcherButtonTooltip,
          launcher_button_icon: activeLauncherButton?.name,
          is_visible_on_frontend: formik?.values?.messengerVisibility,
          default_widget_state: formik?.values?.defaultWidgetState,
          is_restricted_mode_enabled: showWebsiteDomain,
          is_desktop_message_preview_enabled: formik?.values?.isDesktopMessagePreviewEnabled,
          is_agent_typing_status_notification_enabled:
            formik?.values?.isAgentTypingStatusNotificationEnabled,
          is_customer_typing_status_notification_enabled:
            formik?.values?.isCustomerTypingStatusNotificationEnabled,
          is_notification_sound_enabled: formik?.values?.isNotificationSoundEnabled,
          is_customers_allowed_to_attach_files: formik?.values?.isCustomersAllowedToAttachFiles,
          is_resolved_conversation_history_hidden:
            formik?.values?.isResolvedConversationHistoryHidden,
        },
        // only when is_restricted_mode_enabled is true.
        ...(showWebsiteDomain && {
          relationships: {
            domains: {
              data: domainList,
            },
          },
        }),
      };

      UpdateChatTopic(data, chatWidgetDetails?.id)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'You have successfully saved the changes            ',
          });
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while Saving the Widget!',
          });
        })
        ?.finally(() => {
          setLoading(false);
        });
    },
  });

  const handleDeleteValueWebsiteDomain = async (idToDelete) => {
    if (chatWidgetDetailsIncluded?.some((item) => item.id === idToDelete)) {
      handleDeleteMethod(`/admin/chat-widgets/${params?.id}/domains/${idToDelete}`, {})
        ?.then(() => {
          setDomainList((prevArray) => prevArray.filter((element) => element.id !== idToDelete));

          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Deleted',
          });
          setWebsiteDomainError({
            domainName: false,
            url: false,
          });
        })
        ?.catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while Deleting!',
          });
        });
    } else {
      const updatedArray = domainList.filter((domain) => domain.id !== idToDelete);
      setDomainList(updatedArray);
      setWebsiteDomainError({
        domainName: false,
        url: false,
      });
    }
  };

  useEffect(() => {
    if (chatWidgetDetails) {
      formik.setFieldValue('bannerMessage', chatWidgetDetails?.attributes?.banner_message);
      formik.setFieldValue('bannerDescription', chatWidgetDetails?.attributes?.banner_description);
      formik.setFieldValue(
        'launcherButtonTooltip',
        chatWidgetDetails?.attributes?.launcher_button_tooltip
      );
      formik.setFieldValue(
        'isDesktopMessagePreviewEnabled',
        chatWidgetDetails?.attributes?.is_desktop_message_preview_enabled
      );
      formik.setFieldValue(
        'isAgentTypingStatusNotificationEnabled',
        chatWidgetDetails?.attributes?.is_agent_typing_status_notification_enabled
      );
      formik.setFieldValue(
        'isCustomerTypingStatusNotificationEnabled',
        chatWidgetDetails?.attributes?.is_customer_typing_status_notification_enabled
      );
      formik.setFieldValue(
        'isNotificationSoundEnabled',
        chatWidgetDetails?.attributes?.is_notification_sound_enabled
      );
      formik.setFieldValue(
        'isCustomersAllowedToAttachFiles',
        chatWidgetDetails?.attributes?.is_customers_allowed_to_attach_files
      );
      formik.setFieldValue(
        'isResolvedConversationHistoryHidden',
        chatWidgetDetails?.attributes?.is_resolved_conversation_history_hidden
      );

      setShowWebsiteDomain(chatWidgetDetails?.attributes?.is_restricted_mode_enabled);
    }
  }, [chatWidgetDetails]);

  useEffect(() => {
    if (chatWidgetDetailsIncluded?.length > 0) {
      setDomainList([]);
      chatWidgetDetailsIncluded?.map((e) => {
        if (e?.type === 'chat_widget_domains') {
          setDomainList((prevArray) => [...prevArray, e]);
        }
        return null;
      });
    }
  }, [chatWidgetDetailsIncluded]);

  useEffect(() => {
    getWidgetDetails(formik?.values);
  }, [formik?.values]);

  useEffect(() => {
    if (formik.isSubmitting) {
      scrollToTop(formik.errors, targetDivRef);
    }
  }, [formik.isSubmitting]);

  useEffect(() => {
    if (showWebsiteDomain && !(chatWidgetDetailsIncluded?.length > 0)) {
      setWebsiteDomainError({
        domainName: true,
        url: true,
      });
    }

    if (showWebsiteDomain && domainList?.length === 0) {
      setWebsiteDomainError({
        domainName: true,
        url: true,
      });
      setDomainList([
        {
          type: 'domains',
          id: 'A0',
          attributes: {
            name: '',
            domain: '',
          },
        },
      ]);
    }
  }, [showWebsiteDomain, domainList]);

  return (
    <div
      className="tab-pane fade show active"
      id="tab-configuration"
      role="tabpanel"
      aria-labelledby="config-tab"
    >
      <div className="scroll-wrap scroll-custom p-1 pe-3 position-relative">
        <div className="row" ref={targetDivRef}>
          <div className="col-lg-8 col-sm-12 tab-left">
            <div className="d-flex flex-column flex-lg-row gap-lg-5">
              <div className="col-sm-8 mt-3">
                <Input
                  label="Banner message"
                  id="bannerMsg"
                  placeholder="Hi, good to see you!"
                  type="textbox"
                  disabled={false}
                  name="bannerMessage"
                  onChange={formik.handleChange}
                  value={formik?.values?.bannerMessage || ''}
                  style={
                    isFormFieldValid(formik, 'bannerMessage') ? { border: '1px solid red' } : {}
                  }
                />
                {getFormErrorMessage(formik, 'bannerMessage')}
              </div>

              <div className="col-sm-8 mt-3">
                <Input
                  label="Banner description"
                  id="bannerDesc"
                  placeholder="How can we help?"
                  type="textbox"
                  disabled={false}
                  name="bannerDescription"
                  onChange={formik.handleChange}
                  value={formik?.values?.bannerDescription || ''}
                  style={
                    isFormFieldValid(formik, 'bannerDescription') ? { border: '1px solid red' } : {}
                  }
                />
                {getFormErrorMessage(formik, 'bannerDescription')}
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-sm-12 tab-left">
            <div className="d-flex flex-column flex-lg-row gap-lg-5">
              <div className="col-sm-8 mt-3">
                <p className="mt-3">Launcher buttonx</p>
                <div className="d-flex gap-3">
                  <LauncherBtn
                    img="/assets/Qicon.svg"
                    active={activeLauncherButton?.name === 'q-chat'}
                    onClick={() => {
                      setActiveLauncherButton({ id: 1, name: 'q-chat' });
                    }}
                  />
                  <LauncherBtn
                    img="/assets/chat-bot-icon.svg"
                    active={activeLauncherButton?.name === 'chat'}
                    onClick={() => {
                      setActiveLauncherButton({ id: 2, name: 'chat' });
                    }}
                  />
                  <LauncherBtn
                    img="/assets/fluent_bot_regular.svg"
                    active={activeLauncherButton?.name === 'chat-bot'}
                    onClick={() => {
                      setActiveLauncherButton({ id: 3, name: 'chat-bot' });
                    }}
                  />
                  <LauncherBtn
                    img="/assets/chat-icon.svg"
                    active={activeLauncherButton?.name === 'text-message'}
                    onClick={() => {
                      setActiveLauncherButton({ id: 4, name: 'text-message' });
                    }}
                  />
                  <LauncherBtn
                    img="/assets/support-music.svg"
                    active={activeLauncherButton?.name === 'support-chat'}
                    onClick={() => {
                      setActiveLauncherButton({ id: 5, name: 'support-chat' });
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-8 mt-3">
                <Input
                  label="Launcher button tooltip"
                  id="Launchertext"
                  placeholder="Ask a question"
                  type="textbox"
                  disabled={false}
                  name="launcherButtonTooltip"
                  onChange={formik.handleChange}
                  value={formik?.values?.launcherButtonTooltip || ''}
                  style={
                    isFormFieldValid(formik, 'launcherButtonTooltip')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
                {getFormErrorMessage(formik, 'launcherButtonTooltip')}
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-sm-12">
            <div className="shadow-6 mt-4 p-4 rounded">
              <div className="row gx-5">
                <div className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-between">
                  <h6 className="fs-14 fw-500 mb-0">
                    Messenger visibility
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="ps-2"
                      data-bs-toggle="tooltip"
                      data-bs-title="info"
                      data-tooltip-id="tooltip-info"
                    >
                      {' '}
                      <img src="/assets/info.svg" alt="" />
                      <Tooltip id="tooltip-home" content="info" place="top" />
                    </a>
                  </h6>
                </div>
                <div className="col-lg-6 col-sm-12 ">
                  <div className="form-group mt-4 d-flex gap-3 align-items-center">
                    <div>
                      <input
                        id="alwaysVisible"
                        className="gs-radio"
                        name="visibility"
                        type="radio"
                        checked={formik?.values?.messengerVisibility === true}
                        onClick={() => {
                          formik.setFieldValue('messengerVisibility', true);
                        }}
                        onChange={() => {}}
                      />
                      <label htmlFor="alwaysVisible" className="radio-tick-label text-primary">
                        Always visible
                      </label>
                    </div>
                    <div>
                      <input
                        id="hide"
                        className="gs-radio"
                        name="visibility"
                        type="radio"
                        checked={formik?.values?.messengerVisibility === false}
                        onClick={() => {
                          formik.setFieldValue('messengerVisibility', false);
                        }}
                        onChange={() => {}}
                      />
                      <label htmlFor="hide" className="radio-tick-label text-primary">
                        hide
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <WidgetStateSection formik={formik} />

            <WebsiteDomainSection
              showWebsiteDomain={showWebsiteDomain}
              setShowWebsiteDomain={setShowWebsiteDomain}
              setDomainList={setDomainList}
              domainList={domainList}
              websiteDomainError={websiteDomainError}
              setWebsiteDomainError={setWebsiteDomainError}
              handleDeleteValue={handleDeleteValueWebsiteDomain}
            />

            <WidgetNotificationSettings formik={formik} />
          </div>

          <div className="setting-buttons d-flex align-items-end mt-5 mb-5">
            <ButtonToast
              text={loading ? 'Saving...' : 'Save'}
              btnID="SaveConfig"
              onClick={() => {
                formik.handleSubmit();
              }}
              disabled={
                loading ||
                (showWebsiteDomain &&
                  !(websiteDomainError?.url === false && websiteDomainError?.domainName === false))
              }
            />

            <Link
              to="/chat-widget/new-widget/"
              className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidgetConfiguration;
