/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Layout from '../../../common/layout';
import CreateGroupModal from '../components/Modals/CreateGroupModal';
import DeleteGroupModal from '../components/Modals/DeleteGroupModal';
import ClearGroupModal from '../components/Modals/ClearGroupModal';
import DeleteContactModal from '../components/Modals/DeleteContactModal';
import MoveGroupModal from '../components/Modals/MoveGroupModal';
import AddContactOffCanvas from '../components/OffCanvas/AddContactOffCanvas';
import ImportContactOffCanvas from '../components/OffCanvas/ImportContactOffCanvas';
import ImportContactModal from '../components/Modals/ImportContactModal';
import SmsOffCanvas from '../components/OffCanvas/SmsOffCanvas';
import SmsTemplateOffCanvas from '../components/OffCanvas/SmsTemplateOffCanvas';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import AddCompanyOffCanvas from '../components/OffCanvas/AddCompanyOffCanvas';
import DepartmentsHeader from '../components/DepartmentsHeader';
import StartAcall from '../components/StartAcall';
import ConnectionCall from '../components/ConnectionCall';
import ConnectedCall from '../components/ConnectedCall';
import OnHoldCall from '../components/OnHoldCall';
import { DeleteAgent } from '../../../common/api-collection/AgentManagemant';
import {
  DeleteDepartment,
  ListDepartments,
  UpdateDepartment,
} from '../../../common/api-collection/Department';
import AgentListing from '../components/AgentListing';
import DepartmentsList from '../components/DepartmentsList';
import EditDepartmentOffCanvas from '../components/OffCanvas/EditDepartmentOffCanvas';
import ToastError from '../../../common/components/toast/ToastError';
import ClearModel from '../../../common/components/modals/ClearModel';

function AgentsDepartments() {
  const [departments, setDepartments] = useState();
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [showClearDepartment, setShowClearDepartment] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedAgent, setSelectedAgent] = useState();
  const [showEditAgent, setShowEditAgent] = useState(false);
  const [showEditDepartment, setShowEditDepartment] = useState();
  const [showDeleteDepartment, setShowDeleteDepartment] = useState(false);
  const [showDeleteAgent, setShowDeleteAgent] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState();
  const [agentCount, setAgentCount] = useState(0);

  const [reload, setReload] = useState(0);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const handleReload = () => setReload(Math.floor(Math.random() * 1000));

  const onActionSelect = (id, action) => {
    switch (action) {
      case 'addDepartment':
        setShowAddDepartment(true);
        break;
      case 'clearDepartment':
        setSelectedDepartment(id);
        setShowClearDepartment(true);
        break;
      case 'editDepartment':
        setSelectedDepartment(id);
        setShowEditDepartment(true);
        break;

      case 'deleteDepartment':
        setSelectedDepartment(id);
        setShowDeleteDepartment(true);
        break;

      case 'deleteAgent':
        setSelectedAgent(id);
        setShowDeleteAgent(true);
        break;

      case 'editAgent':
        setSelectedAgent(id);
        setShowEditAgent(true);
        break;

      default:
    }
  };

  const listDepartments = () => {
    ListDepartments().then((response) => {
      setDepartments(response?.data);
    });
  };

  const deleteDepartment = () => {
    setShowDeleteDepartment(false);
    DeleteDepartment(selectedDepartment).then(() => {
      listDepartments();
      setToastAction({
        isVisible: true,
        type: 'success',
        message: 'Department deleted!',
      })
        .catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while deleting department!',
          });
        })
        .finally(() => {});
    });
  };

  const clearDepartment = () => {
    setShowClearDepartment(false);
    setShowDeleteDepartment(false);
    const data = {
      type: 'departments',
      id: parseInt(selectedDepartment, Number),
      relationships: {
        agents: {
          data: [],
        },
      },
    };

    UpdateDepartment(data, selectedDepartment).then(() => {
      listDepartments();
      setToastAction({
        isVisible: true,
        type: 'success',
        message: 'Department cleared!',
      })
        .catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while clearing department!',
          });
        })
        .finally(() => {});
    });
  };

  const deleteAgent = () => {
    setShowDeleteAgent(false);
    DeleteAgent(selectedAgent).then(() => {
      listDepartments();
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
        .finally(() => {
          handleReload();
        });
    });
  };

  useEffect(() => {
    listDepartments();
  }, [reload]);

  const [isConnecting, setIsConnecting] = useState(false);
  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area">
                {/* <!-- contact header starts--> */}
                <DepartmentsHeader />
                {/* <!-- contact header ends--> */}
                {/* <!-- contacts listing starts --> */}
                <AgentListing
                  onActionSelect={(id, action) => {
                    onActionSelect(id, action);
                  }}
                  selectedDepartmentId={selectedDepartmentId}
                  reload={reload}
                  agentCount={(count) => {
                    setAgentCount(count);
                  }}
                />
                {/* <!-- contacts listing ends --> */}
                {/* <!-- companies starts --> */}
                <DepartmentsList
                  departments={departments}
                  agentCount={agentCount}
                  onActionSelect={(id, action) => {
                    onActionSelect(id, action);
                  }}
                  setSelectedDepartmentId={(id) => {
                    setSelectedDepartmentId(id);
                  }}
                  reloadList={handleReload}
                />
                <ClearModel
                  isOpen={showClearDepartment}
                  onClose={() => {
                    setShowClearDepartment(false);
                  }}
                  callBack={clearDepartment}
                  text=" the users from the list."
                  label="To confirm this action please type "
                  action="“Clear”"
                  // isDeleting={isDeleting}
                  setShowDeleteModal={showClearDepartment}
                  btnLabel="Clear"
                />
                {/* <!-- companies ends --> */}
                {/* <!--/.col-3--> */}
                {/* <!--/.start a call--> */}
                {/* <DepartmentStartCalling /> */}
                <StartAcall setIsConnecting={() => setIsConnecting()} />
                {/* <!--/.start a call ends--> */}
                {/* <!-- connection call starts --> */}
                <ConnectionCall
                  isConnecting={isConnecting}
                  setIsConnecting={() => setIsConnecting()}
                />
                {/* <!-- connection call Ends --> */}

                {/* <!-- connected call starts --> */}
                <ConnectedCall />
                {/* <!-- connected call Ends --> */}

                {/* <!-- on hold call starts--> */}
                <OnHoldCall />
                {/* <!-- on hold call ends --> */}
              </div>
            </div>
            {/* <!--/.col--9--> */}
          </div>
        </div>
      </div>
      {/* <!-- create group modal --> */}
      {/* <!-- The Modal --> */}

      <CreateGroupModal />

      {/* <!-- delete modal starts--> */}

      <DeleteGroupModal
        show={showDeleteDepartment}
        onClose={() => setShowDeleteDepartment(false)}
        onDelete={() => {
          deleteDepartment();
        }}
        setToastAction={setToastAction}
      />
      {/* <!-- delete modal ends --> */}
      {/* <!-- clear group modal starts --> */}
      <ClearGroupModal />
      {/* <!-- clear group modal starts --> */}
      {/* <!-- contact delete modal starts--> */}
      <DeleteContactModal
        show={showDeleteAgent}
        onClose={() => setShowDeleteAgent(false)}
        onDelete={() => {
          deleteAgent();
        }}
      />

      {/* <!--contact delete modal ends --> */}
      {/* <!-- move to a group modal starts--> */}

      <MoveGroupModal />
      {/* <!-- move to a group modal ends --> */}
      {/* <!-- Add contact  offcanvas starts--> */}
      <AddContactOffCanvas />

      {/* <!-- Add Contact canvas ends --> */}
      {/* <!-- Edit contact  canvas starts--> */}
      {/* <EditContactOffCanvas show={showEditAgent} onClose={() => setShowEditAgent(false)} /> */}

      {/* <!-- Edit contact canvas ends --> */}

      {/* <!-- import contact offcanvas starts--> */}
      <ImportContactOffCanvas />
      <ImportContactModal />

      {/* <!-- import contact offcanvas ends --> */}

      {/* <!-- sms offcanvas starts --> */}
      <SmsOffCanvas />

      {/* <!-- sms offcanvas ends --> */}
      <EditDepartmentOffCanvas
        show={showEditDepartment}
        id={selectedDepartment}
        onClose={() => setShowEditDepartment(false)}
        setToastAction={setToastAction}
        reloadList={handleReload}
      />
      {/* <!-- sms template offcanvas  starts --> */}
      <SmsTemplateOffCanvas />

      {/* <!-- sms tremplate offcanvas ends --> */}

      {/* <!-- Add company offcanvas  starts --> */}
      <AddCompanyOffCanvas
        show={showAddDepartment}
        reloadList={handleReload}
        onClose={() => {
          setShowAddDepartment(false);
        }}
        setToastAction={setToastAction}
      />

      {/* <!-- Add department offcanvas ends --> */}

      {/* <!-- Edit department offcanvas  starts --> */}
      {/* <EditContactOffCanvas /> */}

      {/* <!-- Edit company offcanvas ends --> */}
      {/* <!-- add company toast --> */}

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

      <ToastSuccess id="createCompanyToastMsg">
        <span>
          <span className="fw-bolder">Department added :</span> You have successfully added
          department Human Resources
        </span>
      </ToastSuccess>
      {/* <!-- add company ends --> */}

      {/* <!-- edit company starts --> */}
      <ToastSuccess id="editCompanyToastMsg">
        <span>
          <span className="fw-bolder">Edited :</span> You have successfully edited the Department
          High-tech pvt ltd
        </span>
      </ToastSuccess>
      {/* <!-- edit company starts --> */}

      {/* <!-- Delete group toast --> */}
      <ToastSuccess id="deleteToastMsg">
        <span>
          <span className="fw-bolder">Department deleted :</span> you have successfully deleted
          department Human resources
        </span>
      </ToastSuccess>
      {/* <!-- clear group toast --> */}
      <ToastSuccess id="clearGroupToastMsg">
        <span>
          You have successfully <span className="fw-bolder">cleared</span> the group{' '}
          <span className="fw-bolder">Custom people list</span>
        </span>
      </ToastSuccess>
      {/* <!-- clear group toast --> */}
      <ToastSuccess id="deleteContactToastMsg">
        <span>
          You have successfully <span className="fw-bolder">deleted</span> the selected contacts
          from the group <span className="fw-bolder">Gsoftcomm list</span>
        </span>
      </ToastSuccess>
      {/* <!-- move group toast --> */}
      <ToastSuccess id="moveGroupToastMsg">
        <span>
          You have successfully <span className="fw-bolder">moved</span> the contacts from the group
          Gsoftcomm list to <span className="fw-bolder"> UX-sample</span>
        </span>
      </ToastSuccess>

      {/* <!-- add contact to group toast --> */}
      <ToastSuccess id="addContactToastMsg">
        <span>
          <span className="fw-bolder">Contact added :</span>You have successfully added the contact{' '}
          <span>Stock Melon</span>
        </span>
      </ToastSuccess>

      {/* <!-- edit contact  toast --> */}
      <ToastSuccess id="editContactToastMsg">
        <span>
          <span className="fw-bolder">Updated :</span>You have successfully updated the contact{' '}
          <span>Stock Melon</span>
        </span>
      </ToastSuccess>

      {/* <!-- import contact csv toast --> */}

      <ToastSuccess id="importCSVButtonMsg">
        <span>
          <span className="fw-bolder">Contacts imported :</span> You have successfully imported 30
          contacts.
        </span>
      </ToastSuccess>

      {/* <!-- message send toast --> */}

      <ToastSuccess id="smsSendButtonMsg">
        <span> Message sent</span>
      </ToastSuccess>

      {/* <!-- add duplicate group toast --> */}

      <ToastSuccess id="addDuplicateButtonMsg">
        <span>
          Dupicate group <span className="fw-bolder">created</span> successfully
        </span>
      </ToastSuccess>
    </Layout>
  );
}

export default AgentsDepartments;
