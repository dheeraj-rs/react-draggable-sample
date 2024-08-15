/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../../common/layout';
import AgentBadge from '../components/AgentBadge';
import CallLogOffCanvas from '../components/OffCanvas/CallLogOffCanvas';
import EditContactCanvas from '../components/OffCanvas/EditContactCanvas';
import DeleteCompanyModal from '../components/Modals/DeleteCompanyModal';
import ChangeRoleModal from '../components/Modals/ChangeRoleModal';
import ButtonToast from '../../../common/components/toast/ButtonToast';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import {
  ActivateOrDeactivateAgent,
  DeleteAgent,
  GetAgent,
  ResendVerificationMail,
  UpdateAgent,
  UpdateAgentRole,
} from '../../../common/api-collection/AgentManagemant';
import { ListRoles } from '../../../common/api-collection/TenantAdmin/Roles';
import AddCompanyOffCanvas from '../components/OffCanvas/AddCompanyOffCanvas';
import DeleteContactModal from '../components/Modals/DeleteContactModal';
import ToastError from '../../../common/components/toast/ToastError';
import AgentDepartments from '../components/AgentDepartments';

function AgentProfile() {
  const [agent, setAgent] = useState();
  const [agent2, setAgent2] = useState();

  const [isActive, setIsActive] = useState();
  const [roles, setRoles] = useState();
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState();
  const [showDeleteAgent, setShowDeleteAgent] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const agentId = queryParams.get('id');

  const activateOrDeactivateAgent = (action) => {
    const data = {
      type: 'users',
      id: parseInt(agentId, Number),
    };
    ActivateOrDeactivateAgent(agentId, action, data)
      .then((res) => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Agent Updated',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while updating Agent!',
        });
      })
      .finally(() => {});
  };

  const resendVerification = (mail) => {
    const data = {
      type: 'users',
      id: parseInt(agentId, Number),
      attributes: {
        email: mail,
      },
    };
    ResendVerificationMail(agentId, data)
      .then((res) => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Mail sent success',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while sending Mail!',
        });
      })
      .finally(() => {});
  };

  const listRoles = () => {
    ListRoles().then((response) => {
      setRoles(response.data);
    });
  };

  const deleteAgent = () => {
    setShowDeleteAgent(false);
    DeleteAgent(agentId).then((response) => {
      window.history.back();
      setToastAction({
        isVisible: true,
        type: 'success',
        message: 'Agent deleted!',
      })
        .catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while deleting Agent!',
          });
        })
        .finally(() => {});
    });
  };

  function convertIdsToInt(json) {
    // Deep copy the JSON object to avoid modifying the original
    const modifiedJson = JSON.parse(JSON.stringify(json));

    // Recursive function to convert ids to integers
    function convert(obj) {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          convert(obj[key]); // Recursive call for nested objects
        } else if (key === 'id') {
          obj[key] = parseInt(obj[key], Number);
        }
      }
    }

    // Call the recursive function on the modifiedJson
    convert(modifiedJson);

    return modifiedJson;
  }

  const updateAgentRole = () => {
    setAgent(
      agent?.relationships?.roles?.data.push({
        type: 'acl_roles',
        id: parseInt(selectedRoleId, Number),
      })
    );
    agent.id = parseInt(agentId, Number);
    const data = { data: agent };

    UpdateAgentRole(agentId, convertIdsToInt(agent))
      .then((response) => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Agent Updated!',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while updating Agent!',
        });
      })
      .finally(() => {
        GetAgent(agentId).then((response) => {
          setAgent(response.data);
        });
      });
  };

  const getAgent = () => {
    GetAgent(agentId).then((response) => {
      setAgent(response.data);
      setAgent2(response);
    });
  };
  useEffect(() => {
    getAgent();
    listRoles();
  }, []);
  useEffect(() => {
    // alert(agent?.attributes?.is_active);
    setIsActive(agent?.attributes?.is_active);
  }, [agent]);

  const updateAgentDepartment = (ids) => {
    const data = {
      type: 'users',
      id: parseInt(agentId, Number),
      relationships: {
        departments: {
          data: [
            ...ids.map((departmentId) => ({
              type: 'departments',
              id: parseInt(departmentId, Number),
            })),
          ],
        },
      },
    };

    UpdateAgent(data, agentId)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'updated successfully!',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while updating!',
        });
      })
      .finally(() => {
        getAgent();
      });
  };

  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-23px w-100 d-flex flex-column flex-lg-row company-profile flex-sm-row position-relative">
                    <div className="col-lg-1 mb-4 mb-lg-0 col-sm-1">
                      <a
                        href="/app/comm-telephony/agents-departments/"
                        className="agent-back-btn d-flex flex-column align-items-center position-absolute justify-content-center fs-11px  rounded fw-semibold  agent-back-arrow"
                      >
                        <img src="/assets/left-arrow-black.svg" alt="" />
                      </a>
                    </div>

                    <div className="col-lg-4 col-sm-5">
                      <div className="d-flex gap-4 mt-4 mt-lg-0 mt-sm-0 mt-md-0 mt-xl-0">
                        <div className="position-relative">
                          <img
                            className="position-relative"
                            src={agent?.attributes?.profile_photo_url}
                            alt=""
                            width={65}
                            height={65}
                          />
                          {/* <Link to="/">
                            <img
                              className="position-absolute translate-middle-y upload-user"
                              src="/assets/camera-upload.svg"
                              alt=""
                            />
                          </Link> */}
                        </div>
                        <div className="d-flex flex-column">
                          <div className="d-flex align-items-start gap-4">
                            <div className="d-flex gap-5 flex-column flex-lg-row">
                              <div className="d-flex flex-column">
                                <div>
                                  <p className="mb-0 text-primary fw-bolder fs-18px">
                                    {agent?.attributes?.first_name} {agent?.attributes?.last_name}
                                  </p>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                  <AgentBadge
                                    bgColor="denim-blue"
                                    color="white"
                                    title={
                                      agent?.attributes.is_organization_admin
                                        ? 'Organisation Admin'
                                        : agent2?.included?.find(
                                            (include) =>
                                              include?.type === 'roles' &&
                                              include?.id ===
                                                agent?.relationships?.roles?.data[0]?.id
                                          )?.attributes?.name
                                    }
                                    size="13px"
                                  />
                                  <p className="mb-0 text-secondary">
                                    Ext. {agent?.attributes?.extension}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex mt-4 gap-4">
                            <div>
                              <Link
                                to={`/comm-telephony/edit-an-agent?id=${agentId}`}
                                // data-bs-toggle="offcanvas"
                                // data-bs-target="#offcanvasEditContact"
                                className="d-flex align-items-center text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                              >
                                <i className="me-2">
                                  <span>
                                    <img src="/assets/pencil-blue.svg" alt="# " />
                                  </span>
                                </i>
                                <span>Edit</span>
                              </Link>
                            </div>
                            <div>
                              {!agent?.attributes.is_organization_admin ? (
                                <Link
                                  to="/"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#deleteModal"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowDeleteAgent(true);
                                  }}
                                  className="d-flex align-items-center text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                                >
                                  <i className="me-2">
                                    <span>
                                      <img src="/assets/trash-blue.svg" alt="# " />
                                    </span>
                                  </i>
                                  <span>Delete</span>
                                </Link>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5 col-sm-12">
                      <div>
                        <div className="d-flex flex-column mt-3 mt-lg-0 mt-sm-0 gap-lg-3 gap-sm-0 gap-0">
                          <div className="d-flex gap-2 align-items-center">
                            <p className="mb-0 text-primary fw-medium fs-13px">
                              {agent?.attributes?.email}
                            </p>
                            {agent?.attributes?.email_verified_at ? (
                              <img className="ps-1" src="/assets/verified.svg" alt="" />
                            ) : (
                              <>
                                <p className="mb-0 text-fire-red fw-medium fs-13px">
                                  (Not verified)
                                </p>
                                <div
                                  type="button"
                                  id="reInvite"
                                  className="text-blue-active cursor-pointer"
                                  onClick={() => {
                                    resendVerification(agent?.attributes?.email);
                                  }}
                                >
                                  Reinvite
                                </div>
                              </>
                            )}
                          </div>
                          <div className="d-flex gap-2 align-items-center">
                            <p className="mb-0 text-secondary fs-13px">
                              {agent?.attributes?.phone}
                            </p>
                            {agent?.attributes?.phone_verified_at ? (
                              <img className="ps-1" src="/assets/verified.svg" alt="" />
                            ) : (
                              <p className="mb-0 text-fire-red fs-13px">(Not verified)</p>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-column flex-lg-row mt-4 gap-4">
                          <AgentDepartments
                            selectedDepartments={agent?.relationships?.departments?.data?.map(
                              (data) => data.id
                            )}
                            onDepartmentUpdate={(updatedIds) => {
                              updateAgentDepartment(updatedIds, agent.id);
                            }}
                          />
                          <div>
                            <Link
                              to="/"
                              className="d-flex align-items-center text-primary bg-white px-sm-5 px-10px px-lg-4 py-12px rounded"
                            >
                              <i className="me-2">
                                <span>
                                  <img src="/assets/disconnect.svg" alt="# " />
                                </span>
                              </i>
                              <span>View call log</span>
                            </Link>
                          </div>
                          <div>
                            <div className="d-flex align-items-center text-primary bg-white px-sm-5 px-10px px-lg-4 py-12px rounded">
                              <span>Active</span>
                              <i className="ms-2 me-2">
                                <span>
                                  <img src="/assets/info-dark.svg" alt="# " />
                                </span>
                              </i>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={isActive}
                                  onChange={(e) => {
                                    setIsActive(e.target.checked);
                                    activateOrDeactivateAgent(
                                      e.target.checked ? 'activate' : 'deactivate'
                                    );
                                  }}
                                />
                                <span className="slider num-check round" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2">
                      <div className="d-flex align-items-end">
                        <Link
                          to="/"
                          className="text-blue-active"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRightPassword"
                          aria-controls="offcanvasRightPassword"
                        >
                          <i className="me-2">
                            <span>
                              <img src="/assets/change-pwd.svg" alt="# " />
                            </span>
                          </i>
                          <span>Password Reset</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gx-3 mt-3">
                {/* <AccountDetails /> */}
                <DeleteContactModal
                  show={showDeleteAgent}
                  onClose={() => setShowDeleteAgent(false)}
                  onDelete={() => {
                    deleteAgent();
                  }}
                />

                {/* <div className="col-lg-6">
                  <div className="panel-center bg-white rounded">
                    <div className="p-23px pt-0 user-list-profile scroll-custom">
                      <div className="d-flex justify-content-between mb-3">
                        <p className="mb-0 text-primary">Roles</p>
                        <Link
                          to="/"
                          className="text-blue-active"
                          // data-bs-toggle="modal"
                          // data-bs-target="#changeRole"
                          onClick={(e) => {
                            e.preventDefault();
                            if (selectedRoleId) {
                              setShowChangeRole(true);
                            }
                          }}
                        >
                          Manage roles <img className="ps-2" src="/assets/roles.svg" alt="" />
                        </Link>
                      </div>

                      <RolesSupervisor
                        roles={roles}
                        defaultSelected={agent?.relationships?.roles.data[0]?.id}
                        onSelect={(selectedId) => {
                          setSelectedRoleId(selectedId);
                        }}
                      />
                    </div>
                  </div>
                </div> */}

                <div className="row gx-3 mt-3">
                  {/* Account details starts */}
                  <div className="col-lg-6">
                    <div className="panel-center bg-white rounded scroll-custom agent-profile-height">
                      <div className="p-23px pt-0">
                        <div className="d-flex flex-column">
                          <p className="mb-0 fw-medium text-primary fs-14px">Account details</p>
                          <p className="mb-0 text-secondary">
                            Details of the accounts in which this agent associated
                          </p>
                        </div>
                        <div
                          role="button"
                          className="mt-3 product-box-agent d-flex align-items-center bg-white shadow-6 rounded p-3 px-4"
                        >
                          <div className="d-flex gap-3">
                            <div>
                              <img src="/assets/comm-voice.svg" alt="comm voice" />
                            </div>
                            <div className="d-flex align-items-start justify-content-start flex-column gap-1">
                              <div className="text-primary fw-500">Comm Voice</div>
                              <div className="fw-500 text-blue-badge">
                                abcinternational.comm.com{' '}
                                <a
                                  href="/#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-original-title="info"
                                  aria-label="info"
                                >
                                  <img className="ms-2" src="/assets/info.svg" alt="" />
                                </a>
                                <a className="copy-button" href="/#">
                                  <img className="ms-2 mt-4" src="/assets/copy-code.svg" alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Account details ends */}

                        {/* Agent license starts */}
                        <div className="d-flex mt-4">
                          <p className="mb-0 fw-medium fs-14px">Agent license</p>
                        </div>
                        <div
                          role="button"
                          className="product-box d-flex flex-column p-4 rounded shadow-6 mt-4 col-sm-6"
                        >
                          <p className="mb-0 fw-medium fs-13px text-primary">Permanent Agent</p>
                          <p className="mb-0 fs-13px text-secondary mt-3">
                            is a short time agent who can access the product console for a limited
                            period.
                          </p>
                        </div>
                        {/* Agent license ends */}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="panel-center bg-white rounded scroll-custom agent-profile-height">
                      <div className="p-23px pt-0">
                        <div className="d-flex justify-content-between mb-3">
                          <p className="mb-0 text-primary fw-medium text-primary">Reports</p>
                          <a href="/#" className="text-blue-active">
                            Go to report <img className="ps-2" src="/assets/roles.svg" alt="" />
                          </a>
                        </div>
                        <div className="d-flex flex-column flex-lg-row gap-4 mt-4 flex-sm-row">
                          {/* Activity log starts */}
                          <div
                            role="button"
                            className="report-box d-flex flex-column gap-2 shadow-6 rounded align-items-center p-4 col-sm-3"
                          >
                            <div>
                              <img src="/assets/activity-logg.svg" alt="activity log" />
                            </div>
                            <div>
                              <p className="mb-0 fw-medium fs-13px mt-3">Activity log</p>
                            </div>
                          </div>
                          {/* Productivity starts */}
                          <div
                            role="button"
                            className="report-box d-flex flex-column gap-2 shadow-6 rounded align-items-center p-4 col-sm-3"
                          >
                            <div>
                              <img src="/assets/productivity.svg" alt="productivity" />
                            </div>
                            <div>
                              <p className="mb-0 fw-medium fs-13px mt-3">Productivity</p>
                            </div>
                          </div>
                          {/* Call Summary starts */}
                          <div
                            role="button"
                            className="report-box d-flex flex-column gap-2 shadow-6 rounded align-items-center p-4 col-sm-3"
                          >
                            <div>
                              <img src="/assets/call-summary.svg" alt="call summary" />
                            </div>
                            <div>
                              <p className="mb-0 fw-medium fs-13px mt-3">Call Summary</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddCompanyOffCanvas />
      {/* <!-- call log offcanvas  starts --> */}
      <CallLogOffCanvas />

      {/* <!-- call log offcanvas ends --> */}

      {/* <!-- Edit contact  canvas starts--> */}
      <EditContactCanvas />

      {/* <!-- Edit contact canvas ends --> */}

      {/* <!-- delete modal starts--> */}

      <DeleteCompanyModal />
      {/* <!-- delete modal ends --> */}
      {/* <!-- Delete group toast --> */}
      {/* <!-- Get a role --> */}

      <ChangeRoleModal
        show={showChangeRole}
        agent={agent}
        onClose={() => {
          setShowChangeRole(false);
        }}
        role={roles?.find((role) => role.id === selectedRoleId)?.attributes.name}
        onSave={() => {
          updateAgentRole();
          setShowChangeRole(false);
        }}
      />

      {/* <!-- end --> */}

      {/* <!-- offcanvas agents and password --> */}

      <ButtonToast />

      <ToastSuccess id="deleteToastMsg">
        <span>
          <span className="fw-bolder">Contact deleted :</span> you have successfully deleted contact
          Addie
        </span>
      </ToastSuccess>
      <ToastSuccess id="roleSavemsg">
        <span>
          <span className="fw-bolder">Role changed</span> : You have successfully changed the role
          of <span className="fw-bolder">Tom Daniel</span>
        </span>
      </ToastSuccess>

      {/* <!-- reinvite toast --> */}
      <ToastSuccess id="reInviteMsg">
        <span>
          <span className="fw-bolder">Verification send </span> : You have successfully send the
          verification code{' '}
        </span>
      </ToastSuccess>
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="smsSendButtonMsg"
          onClose={() => {
            setToastAction({ isVisible: false });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </Layout>
  );
}

export default AgentProfile;
