/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import ContactHeader from '../components/ContactHeader';
import ContactsListing from '../components/ContactsListing';
import Companies from '../components/Companies';
import StartAcall from '../components/StartAcall';
import ConnectionCall from '../components/ConnectionCall';
import ConnectedCall from '../components/ConnectedCall';
import OnHoldCall from '../components/OnHoldCall';
import ModalClose from '../../../common/components/modals/ModalClose';
import Input from '../../../common/components/forms/Input';
import Select2 from '../../../common/components/forms/Select2';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import ModalRight from '../../../common/components/modals/ModalRight';
import CreateGroupModal from '../components/Modals/CreateGroupModal';
import DeleteGroupModal from '../components/Modals/DeleteGroupModal';
import ClearGroupModal from '../components/Modals/ClearGroupModal';
import DeleteContactModal from '../components/Modals/DeleteContactModal';
import MoveGroupModal from '../components/Modals/MoveGroupModal';
import EditContactSecondPageModal from '../components/Modals/EditContactSecondPageModal';
import ImportContactModal from '../components/Modals/ImportContactModal';
import SmsOffCanvas from '../components/OffCanvas/SmsOffCanvas';
import SmsTemplateOffCanvas from '../components/OffCanvas/SmsTemplateOffCanvas';
import AddCompanyOffCanvas from '../components/OffCanvas/AddCompanyOffCanvas';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

function ContactCompanyNew() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnectingDIDCall, setIsConnectingDIDCall] = useState(false);
  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area">
                {/* <!-- contact header starts--> */}
                <ContactHeader />
                {/* <!-- contact header ends--> */}
                <ContactsListing
                  setIsConnectingDIDCall={(e) => {
                    setIsConnectingDIDCall(e);
                  }}
                  setIsConnecting={() => setIsConnecting()}
                />
                {/* <!-- contacts listing ends --> */}
                {/* <!-- companies starts --> */}
                <Companies />
                {/* <!-- companies ends --> */}
                {/* <!--/.start a call--> */}
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
          </div>
        </div>
      </div>
      {/* <!-- create group modal --> */}
      {/* <!-- The Modal --> */}

      <CreateGroupModal />

      {/* <!-- delete modal starts--> */}

      <DeleteGroupModal />
      {/* <!-- delete modal ends --> */}
      {/* <!-- clear group modal starts --> */}
      <ClearGroupModal />
      {/* <!-- clear group modal starts --> */}
      {/* <!-- contact delete modal starts--> */}
      <DeleteContactModal />

      {/* <!--contact delete modal ends --> */}
      {/* <!-- move to a group modal starts--> */}

      <MoveGroupModal />
      {/* <!-- move to a group modal ends --> */}
      {/* <!-- Add contact  modal starts--> */}

      <ModalRight width="450px" id="addContactModal">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-24px">Add a contact</p>
          <ModalClose />
        </div>
        <p className="fs-13px text-primary mb-0">
          You can add a new contact with or without a contact group.
        </p>

        <Input
          label="First name"
          id="firstName"
          placeholder="Eileen "
          type="textbox"
          disabled={false}
        />
        <Input
          label="Last name"
          id="lastName"
          placeholder="Dover"
          type="textbox"
          disabled={false}
        />
        <Input
          label="Organization"
          id="organization"
          placeholder="Pixel dig inc"
          type="textbox"
          disabled={false}
        />
        <Input
          label="Email adddress"
          id="emailAdddress"
          placeholder="Eileend@example.com"
          type="textbox"
          disabled={false}
        />
        <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
          <button
            data-bs-toggle="modal"
            data-bs-target="#addContactSecondPage"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
          >
            Next
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </ModalRight>
      {/* <!-- Add Contact modal ends --> */}

      {/* <!-- Add contact second page modal starts--> */}

      <ModalRight width="450px" id="addContactSecondPage">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-3">Add a contact</p>
          <ModalClose />
        </div>
        <p className="fs-13px text-primary">
          You can add a new contact with or without a contact group.
        </p>

        <p className="text-primary fs-13px">Phone numbers</p>

        <div className="p-3 bg-white-azurish rounded">
          <input
            id="phoneAddContact1"
            type="tel"
            className="form-control bg-white w-100"
            name="phone"
          />

          <div className="d-flex gap-3 justif-content-start align-items-center mt-2">
            <label className="switch mt-2">
              <input type="checkbox" defaultChecked />
              <span className="slider round" />
            </label>
            <span className="fw-normal fs-13px mt-1">Default</span>
          </div>
        </div>
        <div className="p-3 bg-light rounded mt-2">
          <input id="phoneAddContact2" type="tel" className="form-control bg-white" name="phone" />

          <div className="d-flex gap-3 justif-content-start align-items-center mt-2">
            <label className="switch mt-2">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
            <span className="fw-normal fs-13px mt-1">Default</span>
            <div className="ms-auto">
              <Link to="/">
                {' '}
                <img src="/assets/delete.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center">
          <Link to="/" className="text-blue-badge">
            <img className="pe-2" src="/assets/plus-circle.svg" alt="" />
            Add number
          </Link>
        </div>
        <div className="form-group form-custom-group mt-3">
          <label htmlFor="assign">Groups (You can associate to multiple groups)</label>
          <Select2 />
        </div>

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 ps-0 mt-3 flex-nowrap">
          <button
            id="addContactToast"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-lg-4 px-2 py-12px"
          >
            Add Contact
          </button>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addContactModal"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-lg-3 ms-0"
          >
            Back
          </button>
          <ButtonWhiteModalCancel text="Cancel" />
        </div>
      </ModalRight>
      {/* <!-- Add contact second page modal ends --> */}

      {/* <!-- Edit contact  page modal starts--> */}

      <ModalRight width="450px" id="editGroupModal">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-3">Edit contact</p>
          <ModalClose />
        </div>
        <p className="fs-13px text-primary">Manage and modify contact details.</p>

        <Input
          label="First name"
          id="firstName"
          placeholder="Eileen "
          type="textbox"
          disabled={false}
        />
        <Input
          label="Last name"
          id="lastName"
          placeholder="Dover"
          type="textbox"
          disabled={false}
        />
        <Input
          label="Organization"
          id="organization"
          placeholder="Pixel dig inc"
          type="textbox"
          disabled={false}
        />
        <Input
          label="Email adddress"
          id="emailAdddress"
          placeholder="Eileend@example.com"
          type="textbox"
          disabled={false}
        />
        <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
          <button
            data-bs-toggle="modal"
            data-bs-target="#editContactSecondPage"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white me-3 px-4 py-12px"
          >
            Next
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </ModalRight>
      {/* <!-- Edit contact page modal ends --> */}
      {/* <!-- Edit contact second page modal starts--> */}

      <EditContactSecondPageModal />
      {/* <!-- Edit contact second page modal ends --> */}

      {/* <!-- import contact Modal modal popup starts--> */}
      <ImportContactModal />

      {/* <!-- sms offcanvas starts --> */}
      <SmsOffCanvas />

      {/* <!-- sms offcanvas ends --> */}

      {/* <!-- sms template offcanvas  starts --> */}
      <SmsTemplateOffCanvas />

      {/* <!-- sms tremplate offcanvas ends --> */}

      {/* <!-- Add company offcanvas  starts --> */}
      <AddCompanyOffCanvas />

      {/* <!-- Add company offcanvas ends --> */}
      {/* <!-- add company toast --> */}
      <ToastSuccess id="createGroupToastMsg">
        <span>
          You have successfully added a new group <span className="fw-bolder">UX-sample</span>
        </span>
      </ToastSuccess>
      {/* <!-- add company ends --> */}
      {/* <!-- toast create group --> */}
      <ToastSuccess id="createCompanyToastMsg">
        <span>
          <span className="fw-bolder">Company added :</span> You have successfully added company
          High-tech pvt ltd
        </span>
      </ToastSuccess>
      {/* <!-- Delete group toast --> */}
      <ToastSuccess id="deleteToastMsg">
        <span>
          You have successfully <span className="fw-bolder">deleted</span> the group{' '}
          <span className="fw-bolder">FGS new list_temp2</span>
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
          You have successfully <span className="fw-bolder">added</span> the contacts to the group{' '}
          <span className="fw-bolder">Gsoftcomm list</span>
        </span>
      </ToastSuccess>

      {/* <!-- edit contact  toast --> */}
      <ToastSuccess id="editContactToastMsg">
        <span>
          You have successfully <span className="fw-bolder">updated</span> the contacts to the group{' '}
          <span className="fw-bolder">Gsoftcomm list</span>
        </span>
      </ToastSuccess>

      {/* <!-- import contact csv toast --> */}

      <ToastSuccess id="importCSVButtonMsg">
        <span>
          Contacts <span className="fw-bolder">imported</span> successfully into the group
          <span className="fw-bolder">Gsoftcomm list</span>
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
      {/* <!-- connect to a flow dropdown visibility --> */}
    </Layout>
  );
}

export default ContactCompanyNew;
