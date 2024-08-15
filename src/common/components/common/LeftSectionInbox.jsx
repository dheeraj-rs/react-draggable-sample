import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import normalize from 'json-api-normalizer';

import Input from '../forms/Input';
import Checkbox from '../forms/Checkbox';
import Search from '../../../features/TeamInbox/components/Search';
import SearchSection from '../../../features/TeamInbox/team-inbox-user-listing/SearchSection';
import UserListingInbox from '../../../features/TeamInbox/team-inbox-user-listing/UserListingInbox';
import MobileViewRightSection from '../../../features/TeamInbox/team-inbox-user-listing/MobileViewRightSection';
import MenuFilter from './MenuFilter';
import {
  CreateChatCustomView,
  ListCustomViews,
  ListPredefinedCustomViews,
} from '../../api-collection/ChatWidget/ChatCustomViews';
import { getFormErrorMessage, isFormFieldValid } from '../../helpers/utils';
import '../../../styles/formvalidation.css';
import { ListAgents } from '../../api-collection/TenantAdmin/Agents';
import { ListDepartments } from '../../api-collection/TenantAdmin/Departments';
import { ListChatTopics } from '../../api-collection/ChatWidget/ChatTopics';

function LeftSectionInbox({
  setToastAction,
  setSelectedSession,
  selectedSession,
  setChatSessions,
  chatSessions,
  dataFromPusher,
  latesteMessageFromAgent,
  section,
  setSection,
  chatSessionsData,
  filterTypes,
  setFilterTypes,
  setSearchTerm,
  searchTerm,
  onMobileView,
  setOnMobileView,
  normalizedChatSessions,
  setNormalizedChatSessions,
}) {
  const [activeSection, setActiveSection] = useState(1);

  const [predefinedCustomViews, setPredefinedCustomViews] = useState({});
  const [customViews, setCustomViews] = useState([]);

  const [agetnts, setAgetnts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [topics, setTopics] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loadingConversations, setLoadingConversations] = useState(false);

  const validate = (data) => {
    const errors = {};

    if (!data.viewName) {
      errors.viewName = 'view name is required';
    }

    if (!data.topic) {
      errors.topic = 'topic is required';
    }

    // if (!data.group) {
    //   errors.group = 'groups is required';
    // }

    if (!data.agents) {
      errors.agents = 'agents is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      viewName: '',
      topic: '',
      group: '',
      agents: '',
      isNewIncluded: true,
      isAssignedIncluded: true,
      isResolvedIncluded: true,
      isAlwayConversationsOnly: true,
      ShareWithYourTeam: true,
    },
    validate,
    onSubmit: () => {
      const data = {
        type: 'chat_custom_views',
        attributes: {
          agent_id: null, // formik?.values?.agents,
          name: formik?.values?.viewName,
          topic_id: formik?.values?.topic,
          is_new_included: formik?.values?.isNewIncluded,
          is_assigned_included: formik?.values?.isAssignedIncluded,
          is_resolved_included: formik?.values?.isResolvedIncluded,
          department_id: null, // formik?.values?.group,
          session_agent_id: null,
          is_away_conversations_only: formik?.values?.isAlwayConversationsOnly,
        },
      };
      setLoading(true);
      CreateChatCustomView(data)
        .then(() => {
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Saved: You have successfully saved the View',
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
          setLoading({ state: false, type: '' });
          $('#custom-filter-box').removeClass('d-block');
          $('#custom-filter-box').addClass('d-none');
        });
    },
  });

  const getLatestChat = (contactId, chatEntries = []) => {
    if (
      parseInt(dataFromPusher?.contact?.id, 10) === parseInt(contactId, 10) &&
      latesteMessageFromAgent === null
    ) {
      const temp = {
        attributes: {
          message: dataFromPusher?.content,
        },
      };

      return temp;
    }

    if (
      parseInt(latesteMessageFromAgent?.contactId, 10) === parseInt(contactId, 10) &&
      latesteMessageFromAgent?.message
    ) {
      const temp = {
        attributes: {
          message: latesteMessageFromAgent?.message,
        },
      };
      return temp;
    }

    const element = chatSessions?.included?.find(
      (item) => item.id === chatEntries[chatEntries.length - 1]?.id
    );
    return element;
  };

  const getLatestTime = (contactId, lastMessageAt) => {
    if (
      parseInt(latesteMessageFromAgent?.contactId, 10) === parseInt(contactId, 10) &&
      latesteMessageFromAgent?.time
    ) {
      return moment(latesteMessageFromAgent?.time).fromNow();
    }
    if (lastMessageAt) {
      return moment(lastMessageAt).fromNow();
    }
    return null;
  };

  const getContactName = (contactId) => {
    if (normalizedChatSessions?.contact) {
      if (
        normalizedChatSessions?.contact[contactId] &&
        normalizedChatSessions?.contact[contactId]?.attributes?.displayName
      ) {
        return normalizedChatSessions?.contact[contactId]?.attributes?.displayName;
      }
      return contactId;
    }
    return null;
  };

  useEffect(() => {
    // custom filter show and hide
    $('#custom-filter').on('click', () => {
      $('.custom-filter-box').toggleClass('d-none d-block');
    });

    // custom filter box cancel event
    $('#custom-filter-cancel').on('click', () => {
      $('#custom-filter-box').removeClass('d-block');
      $('#custom-filter-box').addClass('d-none');
    });
  }, []);

  useEffect(() => {
    ListPredefinedCustomViews()?.then((response) => {
      setPredefinedCustomViews(response);
    });

    ListAgents('chat')?.then((response) => {
      setAgetnts({ data: response?.data });
    });

    ListDepartments('chat')?.then((response) => {
      setDepartments({ data: response?.data });
    });

    ListChatTopics()?.then((response) => {
      setTopics({ data: response?.data });
    });
  }, []);

  useEffect(() => {
    ListCustomViews()?.then((response) => {
      setCustomViews({ data: response?.data });
    });
  }, [refresh]);

  useEffect(() => {
    if (chatSessionsData?.data === undefined) {
      setLoadingConversations(true);
    } else {
      setLoadingConversations(false);
    }
    if (chatSessionsData?.data) {
      setChatSessions({
        data: chatSessionsData?.data,
        included: chatSessionsData?.included,
      });
      setNormalizedChatSessions(
        normalize({
          data: chatSessionsData?.data,
          included: chatSessionsData?.included,
        })
      );
    }
  }, [chatSessionsData?.data, searchTerm]);

  return (
    <div className="col-lg-3">
      <div
        className="panel-left"
        style={onMobileView.isMobile && onMobileView.chatExpand ? { display: 'none' } : {}}
      >
        <div className="panel-filter">
          <div className="filter-box bg-white rounded-3 shadow-sm p-3 d-flex align-items-center">
            <div className="px-0">
              <div className="dropdown more">
                <a
                  className="select-box d-flex align-items-center pe-4 text-primary fw-bolder fs-13px"
                  href="/#"
                  role="button"
                  id="dropdownMenu"
                  data-bs-toggle="dropdown"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div id="selectedVal" className="status-truncate d-inline-block">
                    {section?.value}
                  </div>
                </a>

                <ul
                  id="dropdown-left-status"
                  className="dropdown-menu dropdown-left-status mt-4 m-auto dropdown-status shadow-6"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <div className="d-flex flex-row align-items-center p-3">
                      <div className="input-group custom-search-sidebar rounded">
                        <span className="input-group-text border-end-0 bg-white" id="basic-addon1">
                          <img src="/assets/search-form.svg" alt="" />
                        </span>
                        <input
                          type="search"
                          className="form-control bg-white border-start-0"
                          placeholder="Search"
                          aria-label="search"
                          aria-describedby="basic-addon1"
                          onChange={(e) => {
                            setSearchTerm({ type: 'custom-views', key: e?.target?.value });
                          }}
                          value={searchTerm?.type === 'custom-views' ? searchTerm?.key : ''}
                        />
                      </div>
                    </div>
                  </li>

                  {Object.keys(predefinedCustomViews)?.map((key, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item py-3 px-4 filter-item"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSection({ value: predefinedCustomViews[key], key, count: 3 });
                        }}
                      >
                        {predefinedCustomViews[key]}
                        {/* <span className="select-box-value float-end p-0">
                          <i className="count d-flex
                          align-items-center justify-content-center
                          h-3 w-3 fst-normal bg-blue-badge text-white text-center
                          ms-3 d-inline-block rounded-circle fs-12">
                            3
                          </i>
                        </span> */}
                      </a>
                    </li>
                  ))}

                  {customViews?.data?.map((view, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item py-3 px-4 filter-item"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSection({
                            value: view?.attributes?.name,
                            key: view?.attributes?.name,
                            count: 3,
                          });
                        }}
                      >
                        {view?.attributes?.name}
                        {/* <span className="select-box-value float-end p-0">
                          <i className="count d-flex align-items-center
                          justify-content-center h-3 w-3 fst-normal bg-blue-badge
                          text-white text-center
                          ms-3 d-inline-block rounded-circle fs-12">
                            3
                          </i>
                        </span> */}
                      </a>
                    </li>
                  ))}
                  <li />

                  <a
                    id="custom-filter"
                    className="dropdown-item dropdown-item-hover text-center primary-blue mt-1 py-3 px-4 "
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img className="pe-2" src="/assets/add-blue.svg" alt="" />
                    New custom view
                  </a>
                </ul>
              </div>
              {/* <!-- custom filter starts --> */}

              <ul
                id="custom-filter-box"
                className="p-4 dropdown-menu dropdown-left-status dropdown-custom-filter filterscroll custom-filter-box shadow-6 d-none "
                aria-labelledby="dropdownMenuLink"
              >
                <div className="form-group form-custom-group">
                  <span className="fw-500 text-dark-blue fs-14 mb-2">New Custom View</span>
                </div>
                <div className="mt-4">
                  <Input
                    label="View name"
                    id="name"
                    placeholder="Provide a name to view"
                    type="input"
                    disabled={false}
                    name="viewName"
                    onChange={formik.handleChange}
                    value={formik?.values?.viewName}
                    style={isFormFieldValid(formik, 'viewName') ? { border: '1px solid red' } : {}}
                  />
                  {getFormErrorMessage(formik, 'viewName')}
                </div>
                <div className="mt-4">
                  <div className="form-group mt-3">
                    <label className="text-primary mb-1" htmlFor="agents">
                      Topic
                    </label>
                    <select
                      name="topic"
                      className="form-control  form-select bg-white"
                      id="topic"
                      onChange={(e) => {
                        formik.setFieldValue('topic', parseInt(e?.target?.value, 10));
                      }}
                      style={isFormFieldValid(formik, 'topic') ? { border: '1px solid red' } : {}}
                      value={formik?.values?.topic || 'select'}
                    >
                      <option key={0} disabled value="select">
                        Select
                      </option>
                      {topics?.data?.map((option, index) => (
                        <option key={index} value={option?.id}>
                          {option?.attributes?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {getFormErrorMessage(formik, 'topic')}
                </div>
                <div className="form-group mt-4">
                  <label className="text-primary mb-1">Filter by status</label>
                  <div className="d-flex justify-content-between gap-3">
                    <Checkbox
                      title="New"
                      id="new"
                      onClick={() => {
                        formik.setFieldValue('isNewIncluded', !formik?.values?.isNewIncluded);
                      }}
                      checked={formik?.values?.isNewIncluded}
                      onChange={() => {}}
                    />
                    <Checkbox
                      title="Assigned"
                      id="assigned"
                      onClick={() => {
                        formik.setFieldValue(
                          'isAssignedIncluded',
                          !formik?.values?.isAssignedIncluded
                        );
                      }}
                      checked={formik?.values?.isAssignedIncluded}
                      onChange={() => {}}
                    />
                    <Checkbox
                      title="Resolved"
                      id="resolved"
                      onClick={() => {
                        formik.setFieldValue(
                          'isResolvedIncluded',
                          !formik?.values?.isResolvedIncluded
                        );
                      }}
                      checked={formik?.values?.isResolvedIncluded}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="form-group mt-3">
                    <label className="text-primary mb-1" htmlFor="agents">
                      Groups
                    </label>
                    <select
                      name="group"
                      className="form-control  form-select bg-white"
                      id="agents"
                      onChange={(e) => {
                        formik.setFieldValue('group', parseInt(e?.target?.value, 10));
                      }}
                      style={isFormFieldValid(formik, 'group') ? { border: '1px solid red' } : {}}
                      value={formik?.values?.group || 'select'}
                    >
                      <option key={0} disabled value="select">
                        Select
                      </option>
                      {departments?.data?.map((option, index) => (
                        <option key={index} value={option?.id}>
                          {option?.attributes?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {getFormErrorMessage(formik, 'group')}
                </div>
                <div className="mt-4">
                  <div className="form-group mt-3">
                    <label className="text-primary mb-1" htmlFor="agents">
                      Agents
                    </label>
                    <select
                      name="agents"
                      className="form-control  form-select bg-white"
                      id="agents"
                      onChange={(e) => {
                        formik.setFieldValue('agents', parseInt(e?.target?.value, 10));
                      }}
                      style={isFormFieldValid(formik, 'agents') ? { border: '1px solid red' } : {}}
                      value={formik?.values?.agents || 'select'}
                    >
                      <option key={0} disabled value="select">
                        Select
                      </option>
                      {agetnts?.data?.map((option, index) => (
                        <option key={index} value={option?.id}>
                          {`${option?.attributes?.first_name} ${option?.attributes?.last_name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  {getFormErrorMessage(formik, 'agents')}
                </div>

                <div className="form-group mt-4">
                  <div className="d-flex flex-column gap-2">
                    <Checkbox
                      title="Show 'Alway Conversations' only"
                      id="conversation"
                      onClick={() => {
                        formik.setFieldValue(
                          'isAlwayConversationsOnly',
                          !formik?.values?.isAlwayConversationsOnly
                        );
                      }}
                      checked={formik?.values?.isAlwayConversationsOnly}
                      onChange={() => {}}
                    />
                    <Checkbox
                      title="Share this view with your team"
                      id="share"
                      onClick={() => {
                        formik.setFieldValue(
                          'ShareWithYourTeam',
                          !formik?.values?.ShareWithYourTeam
                        );
                      }}
                      checked={formik?.values?.ShareWithYourTeam}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="form-group d-flex gap-3 mt-4">
                  <button
                    type="button"
                    className="btn bg-black d-flex align-items-center text-white w-100 justify-content-center"
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                    disabled={loading}
                  >
                    <span>{loading ? 'Saving ...' : 'Save'}</span>
                  </button>
                  <button
                    type="button"
                    id="custom-filter-cancel"
                    className="btn border border-1 custom-filter-cancel rounded px-2 py-3 d-flex align-items-center justify-content-center me-3 w-100"
                    onClick={() => {
                      formik.resetForm();
                    }}
                  >
                    cancel
                  </button>
                </div>
              </ul>
              {/* <!--custom filter ends --> */}
            </div>

            <div className="ms-auto me-3">
              <ul className="switcher h-5 w-11 d-flex align-items-center justify-content-between rounded-pill bg-cyan-blue">
                <li className={activeSection === 1 ? 'active' : ''}>
                  <div
                    role="button"
                    className="d-block h-5 w-5 text-center rounded-circle"
                    onClick={() => {
                      setActiveSection(1);
                    }}
                  >
                    <img
                      data-bs-toggle="tooltip"
                      data-bs-title="tooltip"
                      data-bs-placement="top"
                      src="/assets/bag.svg"
                      alt=""
                    />
                  </div>
                </li>
                <li className={activeSection === 2 ? 'active' : ''}>
                  <div
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-title="Priority inbox"
                    data-bs-placement="top"
                    className="d-block h-5 w-5 text-center rounded-circle"
                    onClick={() => {
                      setActiveSection(2);
                    }}
                  >
                    <img src="/assets/bag-in.svg" alt="" />
                  </div>
                </li>
              </ul>
            </div>
            <MenuFilter setFilterTypes={setFilterTypes} filterTypes={filterTypes} />
            <MobileViewRightSection />
          </div>
          <Search
            onChange={(e) => setSearchTerm({ type: 'chat-session', key: e?.target?.value })}
          />
        </div>
        <div className="inbox-user-listing">
          <div className="bg-white rounded mt-3 shadow-1 overflow-hidden pe-1">
            <div className="inbox-wrapper scroll-custom  pe-1">
              <div className="wrapping-section">
                {/* dummy-data for demo start  */}
                {/* <div className="card-list card white rounded border-0 position-relative p-3">
                  <div className="d-flex">
                    <div className="card-round d-flex flex-nowrap">
                      <div className="avatar h-6 w-6 d-inline-flex align-items-center
                      justify-content-center text-center texttext-uppercase bg-light-blue
                      rounded-circle position-relative fs-3 border-green" />
                    </div>
                    <div className="ps-3 w-100">
                      <div className="d-flex">
                        <div>
                          <span
                            className="fs-13px d-block fw-500 text-primary
                            text-truncate card-truncate"
                            data-bs-toggle="tooltip"
                            data-bs-title="55"
                          >
                            Paige Turner
                          </span>
                          <span className="text-primary fs-12px d-block mt-1
                          text-truncate card-truncate">
                            Welcome to gsoftcomm...
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <span className="card-time fs-12px text-mist-gray fw-normal">
                          5 minutes ago
                        </span>
                        <a
                          className="text-contrast-blue d-flex fs-12 fw-normal bg-transparent
                          d-flex align-items-center rounded-pill py-1 px-2 chat-whatsapp ms-auto"
                          href="/#"
                        >
                          <i>
                            <img
                              className="me-1"
                              src="/assets/side-messages.svg"
                              alt=""
                              width="17px"
                              height="17px"
                            />
                          </i>
                          Paige Turner
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* dummy-data for demo end  */}

                {chatSessions?.data?.map((data, index) => (
                  <UserListingInbox
                    key={index}
                    borderColor="whatsapp"
                    active={
                      selectedSession?.attributes?.contact_id ===
                      parseInt(data?.attributes?.contact_id, 10)
                        ? 'bg-chat-blue'
                        : 'white'
                    }
                    // title={data?.attributes?.contact_id}
                    title={getContactName(data?.attributes?.contact_id)}
                    subtitle={getLatestChat(
                      data?.attributes?.contact_id,
                      data?.relationships?.chatEntries?.data
                    )}
                    time={getLatestTime(
                      data?.attributes?.contact_id,
                      data?.attributes?.last_message_at
                    )}
                    username={data?.attributes?.contact_id}
                    socialMedia="/assets/side-messages.svg"
                    setSelectedSession={setSelectedSession}
                    data={data}
                    isNewMessageAvailable={
                      parseInt(dataFromPusher?.contact?.id, 10) ===
                        parseInt(data?.attributes?.contact_id, 10) &&
                      parseInt(dataFromPusher?.contact?.id, 10) !==
                        parseInt(selectedSession?.attributes?.contact_id, 10)
                    }
                    onMobileView={onMobileView}
                    setOnMobileView={setOnMobileView}
                    contactId={getContactName(data?.attributes?.contact_id)}
                    selectedSessionContactId={selectedSession?.attributes?.contact_id}
                  />
                ))}

                {loadingConversations && (
                  <div className="loading text-center mt-3 mb-3">
                    <div
                      className="spinner-border text-vampire-gray text-loader spinner-border-sm"
                      role="status"
                    >
                      {/* <span className="sr-only">Loading...</span> {<>&nbsp;</>} */}
                    </div>
                    &nbsp; Loading more conversations
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <SearchSection />
      </div>
    </div>
  );
}

export default LeftSectionInbox;
