import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../../common/layout';
import ContactUserProfileContactsListing from '../components/ContactUserProfileContactsListing';
import ContactUserProfileEditContactCanvas from '../components/ContactUserProfileEditContactCanvas';
import ContactUserProfileDeleteModal from '../components/ContactUserProfileDeleteModal';
import ContactUserProfileCallLogCanvas from '../components/ContactUserProfileCallLogCanvas';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ConnectionCall from '../components/ConnectionCall';
import ConnectingDIDCall from '../components/ConnectingDIDCall';
import { DeleteContact, GetContact } from '../../../common/api-collection/Contact';
import rearrangeData from '../functions/ArrangeContactData';
import EditContactCanvas from '../components/EditContactCanvas';
import ToastError from '../../../common/components/toast/ToastError';
import { GetCompany } from '../../../common/api-collection/ContactCompany';

function ContactUserProfile() {
  const [isConnecting, setIsConnecting] = useState({ show: false, mob: '' });
  const [isConnectingDIDCall, setIsConnectingDIDCall] = useState(false);
  const [contact, setContact] = useState();
  const [company, setCompany] = useState();
  const [showEditContact, setShowEditContact] = useState(false);
  const [showDeleteContact, setShowDeleteContact] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const getCompany = (companyiId) => {
    GetCompany(companyiId).then((res) => {
      setCompany(res.data);
    });
  };

  const getContact = () => {
    GetContact(id)
      .then((response) => {
        setContact(rearrangeData(response));

        if (response?.data?.attributes?.company_id) {
          getCompany(response?.data?.attributes?.company_id);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const deleteContact = () => {
    DeleteContact(id)
      .then(() => {
        window.location.href = '/app/comm-telephony/contact-company-management';
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Contact deleted successfully!',
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
      .finally(() => {});
  };

  useEffect(() => {
    getContact();
  }, [id]);

  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-23px w-100 d-flex flex-column flex-lg-row align-items-start gap-3 gap-lg-0 company-profile">
                    <div className="col-lg-1">
                      <a
                        href="/app/comm-telephony/contact-company-management"
                        className="d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold bg-white"
                      >
                        <img src="/assets/left-arrow-black.svg" alt="" />
                      </a>
                    </div>
                    <div className="col-lg-1">
                      <div className="position-relative">
                        <img className="position-relative" src="/assets/addie.svg" alt="" />
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <img
                            className="position-absolute  translate-middle-y upload-user"
                            src="/assets/camera-upload.svg"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div>
                        <div className="d-flex align-items-start gap-4">
                          <div className="d-flex gap-5 flex-column flex-lg-row">
                            <div className="d-flex flex-column">
                              <p className="mb-0 text-primary fw-bolder fs-18px">
                                {contact?.attributes?.display_name}
                              </p>
                              {/* <p className="mb-0 text-primary fs-13px">United States</p> */}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex mt-4 gap-4">
                          <div>
                            <a
                              href="/#"
                              // data-bs-toggle="offcanvas"
                              // data-bs-target="#offcanvasEditContact"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowEditContact(true);
                              }}
                              className="d-flex align-items-center text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                            >
                              <i className="me-2">
                                <span>
                                  <img src="/assets/pencil-blue.svg" alt="# " />
                                </span>
                              </i>
                              <span>Edit</span>
                            </a>
                          </div>
                          <div>
                            <a
                              href="/#"
                              // data-bs-toggle="modal"
                              // data-bs-target="#deleteModal"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowDeleteContact(true);
                              }}
                              className="d-flex align-items-center text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                            >
                              <i className="me-2">
                                <span>
                                  <img src="/assets/trash-blue.svg" alt="# " />
                                </span>
                              </i>
                              <span>Delete</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <div>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-primary fw-medium fs-13px">
                            {contact?.attributes?.emails[0]?.email}
                          </p>
                          {/* <p className="mb-0 text-secondary fs-13px">Germany</p> */}
                        </div>

                        <div className="d-flex mt-4 gap-4">
                          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                            <div
                              className="btn-group btn-center-group bg-bold-gray d-flex align-items-center rounded border shadow-1"
                              role="group"
                              aria-label="Basic example"
                            >
                              <span
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Add a contact"
                                aria-label="Add "
                              >
                                <button
                                  //   data-bs-toggle="modal"
                                  //   data-bs-target="#addContactModal"
                                  type="button"
                                  className="btn border-right contact-grp-btn contact-add-btn"
                                  onClick={() => {
                                    setIsConnectingDIDCall({ show: true, mobile: '+1 9834527645' });
                                  }}
                                />
                              </span>
                              <span
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Import contacts"
                                aria-label="Import contacts"
                              >
                                <button
                                  type="button"
                                  //   data-bs-toggle="modal"
                                  //   data-bs-target="#importContactModal"
                                  className="btn contact-grp-btn border-right contact-share-btn"
                                  onClick={() => {
                                    setIsConnecting({ show: true, mobile: '+1 9834527645' });
                                  }}
                                />
                              </span>
                              <span
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Options"
                                aria-label="Options"
                                className="dropdown dropdown-dot"
                              >
                                <div className="dropdown dropdown-dot">
                                  <button
                                    className="dropdown-toggle btn contact-grp-btn contact-opt-btn"
                                    type="button"
                                  />
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2">
                      <div className="d-flex">
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="d-flex align-items-center text-primary bg-white px-sm-5 px-10px px-lg-4 py-12px rounded"
                        >
                          <i className="me-2">
                            <span>
                              <img src="/assets/building-small.svg" alt="# " />
                            </span>
                          </i>
                          {company ? <span>{company?.attributes?.name}</span> : ''}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gx-0 bg-white rounded content-area mt-3">
                {/* <!-- contacts listing starts --> */}
                <ContactUserProfileContactsListing />
                {/* <!-- contacts listing ends --> */}
              </div>
            </div>
            {/* <!--/.col--9--> */}
          </div>
        </div>
      </div>

      <EditContactCanvas
        show={showEditContact}
        setToastAction={setToastAction}
        id={id}
        onClose={() => {
          setShowEditContact(false);
        }}
      />
      {/* <!-- call log offcanvas  starts --> */}
      <ContactUserProfileCallLogCanvas />

      {/* <!-- call log offcanvas ends --> */}

      {/* <!-- Edit contact  canvas starts--> */}
      <ContactUserProfileEditContactCanvas />
      {/* <!-- Edit contact canvas ends --> */}

      {/* <!-- delete modal starts--> */}
      <ContactUserProfileDeleteModal
        show={showDeleteContact}
        onDelete={() => {
          deleteContact();
          setShowDeleteContact(false);
        }}
        onClose={() => {
          setShowDeleteContact(false);
        }}
      />

      <ConnectionCall isConnecting={isConnecting} setIsConnecting={setIsConnecting} />
      <ConnectingDIDCall
        isConnectingDIDCall={isConnectingDIDCall}
        setIsConnectingDIDCall={setIsConnectingDIDCall}
      />
      {/* <!-- delete modal ends --> */}
      {/* <!-- Delete group toast --> */}
      {toastAction?.type?.toLocaleLowerCase() === 'success' ? (
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

export default ContactUserProfile;
