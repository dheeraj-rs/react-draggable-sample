import React, { useState } from 'react';
import { useFormik } from 'formik';
import Layout from '../../../common/layout';
import StartAcall from '../components/StartAcall';
import OnHoldCall from '../components/OnHoldCall';
import SmsOffcanvas from '../components/SmsOffcanvas';
import ConnectedCall from '../components/ConnectedCall';
import ContactHeader from '../components/ContactHeader';
import ConnectionCall from '../components/ConnectionCall';
import Input from '../../../common/components/forms/Input';
import Modal from '../../../common/components/modals/Modal';
import ContactsListing from '../components/ContactsListing';
import AddContactCanvas from '../components/AddContactCanvas';
import ImportingContact from '../components/ImportingContact';
import AddCompanyCanvas from '../components/AddCompanyCanvas';
import Select2 from '../../../common/components/forms/Select2';
import SmsTemplateCanvas from '../components/SmsTemplateCanvas';
import EditCompanyCanvas from '../components/EditCompanyCanvas';
import EditContactCanvas from '../components/EditContactCanvas';
import ImportContactCanvas from '../components/ImportContactCanvas';
import ModalClose from '../../../common/components/modals/ModalClose';
import ModalRight from '../../../common/components/modals/ModalRight';
import ImportedSuccessfully from '../components/ImportedSuccessfully';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import {
  DeleteCompanyContact,
  UpdateCompanyContact,
} from '../../../common/api-collection/ContactCompany';
import DeleteModal from '../../../common/components/modals/DeleteModal';
import ToastError from '../../../common/components/toast/ToastError';
import Contacts from '../components/Contacts';
import AddCompanyOffCanvas from '../components/OffCanvas/AddCompanyOffCanvas';
import { ContactToCalling, DeleteContact } from '../../../common/api-collection/Contact';
import ClearModel from '../../../common/components/modals/ClearModel';
import ConnectingDIDCall from '../components/ConnectingDIDCall';

function ContactCompanyManagement() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnectingDIDCall, setIsConnectingDIDCall] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [companyId, setCompanyId] = useState();

  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [showEditCompany, setShowEditCompany] = useState(false);
  const [showClearCompany, setShowClearCompany] = useState(false);

  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [showDeleteContact, setShowDeleteContact] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState();
  const [editData, setEditData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    emails: [],
    phones: [],
  });
  const [editCompanyData, setEditCompanyData] = useState({
    companyName: '',
    companyEmail: '',
    country: '',

    phoneNumbers: '',
  });
  const [reload, setReload] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleReload = () => setReload(Math.floor(Math.random() * 1000));

  const updateCompanyId = (id, showCanvas) => {
    switch (showCanvas) {
      case 'editCompany':
        setCompanyId(id);
        setShowEditCompany(true);
        break;
      case 'clearCompany':
        setCompanyId(id);
        setShowClearCompany(true);
        break;

      case 'addCompany':
        setCompanyId(id);
        setShowCreateCompany(true);
        break;
      case 'showDelete':
        setCompanyId(id);
        setShowDelete(true);
        break;
      case 'addContact':
        setShowCreateContact(true);
        break;
      case 'editContact':
        setSelectedContactId(id);
        setShowEditContact(true);
        break;
      case 'deleteContact':
        setSelectedContactId(id);
        setShowDeleteContact(true);
        break;
      default:
        break;
    }
  };

  const deleteComapny = () => {
    setIsLoading(true);

    DeleteCompanyContact(companyId)
      .then(() => {
        handleReload();
        setShowDelete(false);
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Company Deleted',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while deleting company!',
        });
      })
      .finally(() => {
        setShowDelete(false);
        setIsLoading(false);
      });
  };
  const validate = () => {
    const errors = {};

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      momentaryStorageName: '',
    },
    validate,

    onSubmit: () => {},
  });
  const clearComapny = () => {
    const data = {
      type: 'contact_companies',
      id: parseInt(companyId, Number),
      relationships: {
        contacts: {
          data: [],
        },
      },
    };

    UpdateCompanyContact(companyId, data)
      .then(() => {
        setShowClearCompany(false);
        handleReload();
        setShowDelete(false);
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Company Cleared',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while clearing company!',
        });
      })
      .finally(() => {});
  };

  const deleteContact = () => {
    setIsLoading(true);

    DeleteContact(selectedContactId)
      .then(() => {
        handleReload();
        setShowDelete(false);
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Contact Deleted',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while deleting contact!',
        });
      })
      .finally(() => {
        handleReload();
        setIsLoading(false);

        setShowDeleteContact(false);
      });
  };

  const hanldeCallingApi = (id, mob2) => {
    const data = {
      id,
      did: {
        number: '917901629519',
        address: '13.234.229.198',
        vendor: 'vodafone',
      },
      endpoint: {
        type: 'pstn',
        number: mob2.replace(/^\+/, ''),
      },
      retry: 2,
      action: {
        id: '5d930c06-579d-11ed-9b6a-0242ac120002',
        name: 'connect',
        timeout: 20,
        retry: 2,
        endpoint: {
          type: 'pstn',
          number: mob2.replace(/^\+/, ''),
        },
      },
    };
    ContactToCalling(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Call has been initiated.',
        });
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
          });
        }
      })
      ?.finally(() => {});
  };

  return (
    <Layout
      title="comm voice"
      headerTitle="Contacts"
      favIcon="/favicon-voice.svg"
      sideNavIcon="/assets/comm-voice-logo.svg"
    >
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          {/* <Checkbox/> for niyas delete this after use */}
          <DeleteModal
            isOpen={showDeleteContact}
            onClose={() => {
              setShowDeleteContact(false);
            }}
            callBack={() => {
              deleteContact();
            }}
            text=" the selected contacts from the list."
            label="To confirm this action please type "
            action="“Delete”"
            // isDeleting={isDeleting}
            setShowDeleteModal={showCreateContact}
            btnLabel="Delete"
            isDeleting={isLoading}
          />
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area shadow-1">
                {/* <!-- contact header starts--> */}
                <ContactHeader setIsMobile={setIsMobile} isMobile={isMobile} setShow={setShow} />
                {/* <!-- contact header ends--> */}

                {/* <!-- contacts listing starts --> */}
                <ContactsListing
                  setIsConnectingDIDCall={(e) => {
                    setIsConnectingDIDCall(e);
                  }}
                  selectedCompany={selectedCompanyId}
                  setIsConnecting={setIsConnecting}
                  updateAction={updateCompanyId}
                  reload={reload}
                  handleReload={handleReload}
                  setShow={setShow}
                  isMobile={isMobile}
                  toastAction={toastAction}
                  setToastAction={setToastAction}
                  editData={editData}
                  setEditData={setEditData}
                  hanldeCallingApi={hanldeCallingApi}
                />
                {/* <!-- contacts listing ends --> */}

                {/* <!-- companies starts --> */}
                <Contacts
                  setCompanyId={updateCompanyId}
                  reload={reload}
                  onCountrySelect={(id) => {
                    setSelectedCompanyId(id);
                  }}
                  updateAction={updateCompanyId}
                  isMobile={isMobile}
                  setIsMobile={setIsMobile}
                  editCompanyData={editCompanyData}
                  setEditCompanyData={setEditCompanyData}
                />
                {/* <!-- companies ends --> */}

                {/* <!--/.col-3--> */}
                {/* <!--/.start a call--> */}
                <StartAcall setIsConnecting={setIsConnecting} />
                {/* <!--/.start a call ends--> */}

                {/* <!-- connection call starts --> */}
                <ConnectionCall isConnecting={isConnecting} setIsConnecting={setIsConnecting} />
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

      <Modal width="429px" id="createGroupModal">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-3">Create a new group</p>
          <ModalClose />
        </div>
        <p className="text-primary mb-3 fs-13px">
          Create a new contact group and organise your contacts more efficiently.
        </p>
        <div className="inputs d-flex flex-row justify-content-center mb-3">
          <Input
            id="groupName"
            label="Group Name"
            placeholder="Enter group name"
            type="text"
            disabled={false}
            onChange={() => {}}
          />
        </div>

        <div>
          <div className="form-group mt-3">
            <label className="mb-1">Assign contacts to the new group (optional)</label>
            <Select2 />
          </div>
        </div>

        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
          <button
            id="createGroupToast"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px"
          >
            Create group
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </Modal>

      {/* <!-- delete modal starts--> */}
      <DeleteModal
        isOpen={showDelete}
        onClose={() => {
          setShowDelete(false);
        }}
        callBack={deleteComapny}
        text=" the user from the list."
        label="To confirm this action please type "
        action="“Delete”"
        // isDeleting={isDeleting}
        setShowDeleteModal={showDelete}
        btnLabel="Delete"
        isDeleting={isLoading}
      />
      <ClearModel
        isOpen={showClearCompany}
        onClose={() => {
          setShowClearCompany(false);
        }}
        callBack={clearComapny}
        text=" the contacts from the list."
        label="To confirm this action please type "
        action="“Clear”"
        // isDeleting={isDeleting}
        setShowDeleteModal={showClearCompany}
        btnLabel="Clear"
      />

      <Modal width="429px" id="clearGroupModal">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-24px">Clear group</p>
          <ModalClose />
        </div>
        <p className="text-primary">
          This action will <span className="text-primary fw-medium">Clear</span> all the contacts
          from the group
          <span className="fw-medium">Custom people list.</span>
        </p>
        <Input
          label="To confirm this action please type Clear"
          id="delete"
          placeholder="Type “Clear”"
          type="textbox"
          disabled={false}
          onChange={() => {}}
        />

        <div className="d-flex justify-content-start gap-3 mt-5">
          <button
            id="clearGroupToast"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px"
          >
            Clear group
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </Modal>
      {/* <!-- clear group modal starts --> */}

      {/* <!-- contact delete modal starts--> */}
      <Modal width="429px" id="deleteContactModal">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-24px">Delete contacts</p>
          <ModalClose />
        </div>
        <p className="fs-12px text-primary mb-0">
          This action will <span className="text-primary fw-medium">Delete</span> the selected
          contacts(
          <span>3</span>) from the group
          <span className="fw-medium">Gsoftcomm</span> list.
        </p>
        <Input
          label="To confirm this action please type Delete"
          id="delete"
          placeholder="Type “Delete”"
          type="textbox"
          disabled={false}
          onChange={() => {}}
        />

        <div className="d-flex justify-content-center gap-3 mt-5">
          <button
            type="button"
            id="deleteContactToast"
            className="btn bg-faded-red text-white px-4 py-12px"
            data-bs-dismiss="modal"
          >
            Delete Contact
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </Modal>
      {/* <!--contact delete modal ends --> */}

      {/* <!-- move to a group modal starts--> */}
      <ModalRight width="450px" id="moveGroupModal">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-24px">Move to a group</p>
          <ModalClose />
        </div>
        <p className="fs-13px text-primary mb-0">
          This action will <span className="text-blue-active fw-medium">Move</span> the selected
          contacts (3 contacts) from the group
          <span className="text-blue-active fw-medium"> Gsoftcomm list</span>
          to new groups(s) .
        </p>

        <Input
          label="Source group"
          id="source"
          placeholder="Gsoftcomm list"
          type="textbox"
          disabled={false}
          onChange={() => {}}
        />

        <div className="form-group form-custom-group mt-3">
          <label htmlFor="assign">Destination group</label>
          <Select2 />
        </div>
        <div className="modal-footer d-flex justify-content-start align-items-center gap-4 border-0 p-0 mt-3">
          <button
            id="moveGroupToast"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px"
          >
            Move
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </ModalRight>
      {/* <!-- move to a group modal ends --> */}

      {/* <!-- Add contact  offcanvas starts--> */}
      <AddContactCanvas
        show={showCreateContact}
        setToastAction={setToastAction}
        onClose={() => {
          setShowCreateContact(false);
        }}
        reloadList={() => handleReload()}
      />
      {/* <!-- Add Contact canvas ends --> */}

      {/* <!-- Edit contact  canvas starts--> */}
      <EditContactCanvas
        show={showEditContact}
        setToastAction={(toast) => {
          setToastAction(toast);
        }}
        reloadList={() => handleReload()}
        id={selectedContactId}
        onClose={() => {
          setShowEditContact(false);
        }}
        editData={editData}
      />
      {/* <!-- Edit contact canvas ends --> */}

      {/* <!-- import contact offcanvas starts--> */}
      <ImportContactCanvas
        setShow={setShow}
        show={show?.isVisible && show?.type === 'import-contacts-offcanvas'}
        formik={formik}
      />

      <ModalRight width="450px" id="importContactModal">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium mb-3">Import contacts</p>
          <ModalClose />
        </div>
        <p className="fs-12px text-primary">
          You can import contacs from CSV file. You can download the CSV template.
        </p>
        {/* <!-- file upload --> */}

        <div className="form-group mt-3">
          <label className="pb-1">Upload CSV file</label>
          <div
            role="button"
            id="uploadContactsCSV"
            className="drop-zone rounded file-upload p-5 mt-3 d-flex flex-column justify-content-center align-items-center rounded gap-2"
          >
            <div>
              <img className="mx-3" src="/assets/file-upload.svg" alt="" />
            </div>
            <p className="text-primary mb-0 mt-3">
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="text-blue-active fw-bolder"
              >
                Click
              </a>
              <span className="fw-medium">to upload</span> or
              <span className="fw-medium"> drag and drop</span>
            </p>
            <p className="text-secondary mb-0">Maximum file size less than 4 MB</p>
            <input
              id="contactUpload"
              type="file"
              name="myFile"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className="drop-zone-input"
              readOnly
            />
          </div>
        </div>
        <ImportingContact />

        {/* <!-- imported successfully started --> */}
        <ImportedSuccessfully />
        {/* <!-- imported successfully ends --> */}

        <div className="mb-3 mt-3">
          <a
            className="fw-medium"
            href="/#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <img className="pe-1" src="/assets/import-icon.svg" alt="" />
            Download CSV template
          </a>
        </div>
        <p className="text-primary">
          Please make sure your CSV file has unique headers. Other wise it may fail to import
        </p>

        <div className="form-group form-custom-group">
          <label htmlFor="assign">
            <span className="fw-medium">Groups</span>
            (You can import to multiple groups)
          </label>
          <Select2 />
        </div>

        <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
          <button
            id="importCSVButton"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white me-3 px-4 py-12px"
          >
            Import Contacts
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
        <AddCompanyOffCanvas />
      </ModalRight>
      {/* <!-- import contact offcanvas ends --> */}

      {/* <!-- sms offcanvas starts --> */}
      <SmsOffcanvas
        setToastAction={setToastAction}
        show={show?.isVisible && show?.type === 'sms-offcanvas'}
        setShow={setShow}
      />
      {/* <!-- sms offcanvas ends --> */}

      {/* <!-- sms template offcanvas  starts --> */}
      <SmsTemplateCanvas
        show={show?.isVisible && show?.type === 'sms-template-offcanvas'}
        setShow={setShow}
      />
      {/* <!-- sms tremplate offcanvas ends --> */}

      {/* <!-- Add company offcanvas  starts --> */}
      <AddCompanyCanvas
        show={showCreateCompany}
        reloadList={handleReload}
        onClose={() => {
          setShowCreateCompany(false);
        }}
        setToastAction={setToastAction}
      />
      {/* <!-- Add company offcanvas ends --> */}

      {/* <!-- Edit company offcanvas  starts --> */}
      <EditCompanyCanvas
        show={showEditCompany}
        id={companyId}
        reloadList={handleReload}
        onClose={() => {
          setShowEditCompany(false);
        }}
        setToastAction={setToastAction}
        editCompanyData={editCompanyData}
      />
      {/* <!-- Edit company offcanvas ends --> */}
      <ConnectingDIDCall
        isConnectingDIDCall={isConnectingDIDCall}
        setIsConnectingDIDCall={setIsConnectingDIDCall}
      />

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

export default ContactCompanyManagement;
