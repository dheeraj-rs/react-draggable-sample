/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Layout from '../../../common/layout';
import SmsOffcanvas from '../components/SmsOffcanvas';
import ConnectionCall from '../components/ConnectionCall';
import AddContactCanvas from '../components/AddContactCanvas';
import EditCompanyCanvas from '../components/EditCompanyCanvas';
import ConnectingDIDCall from '../components/ConnectingDIDCall';
import ImportContactCanvas from '../components/ImportContactCanvas';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import CompanyProfileContactListing from '../components/CompanyProfileContactListing';
import {
  DeleteCompanyContact,
  GetCompany,
  ListCountries,
} from '../../../common/api-collection/ContactCompany';
import DeleteModal from '../../../common/components/modals/DeleteModal';

function ContactCompanyProfile() {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnectingDIDCall, setIsConnectingDIDCall] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('company');
  const [showEditCompany, setShowEditCompany] = useState(false);
  const [reload, setReload] = useState(0);
  const [countries, setCountries] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const handleReload = () => setReload(Math.floor(Math.random() * 1000));

  const [company, setCompany] = useState();

  const getCompany = () => {
    GetCompany(companyId).then((res) => {
      setCompany(res.data);
    });
  };

  const listCountries = () => {
    ListCountries()
      .then((response) => {
        if (response?.data) {
          setCountries(response?.data);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    getCompany();
    listCountries();
  }, [reload]);

  const deleteComapny = () => {
    DeleteCompanyContact(companyId)
      .then(() => {
        handleReload();
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
      });
  };

  const users = [
    {
      id: 1,
      name: 'Paige Turner',
      org: 'Forerun global',
      email: 'Paige@example.com',
      mob: '+12345678312',
    },
    {
      id: 2,
      name: 'Amanda Hug',
      org: 'Gsoft solutions',
      email: 'Amanda@example.com',
      mob: '+16655678355',
    },
    {
      id: 3,
      name: 'Amanda Hug',
      org: 'Gsoft solutions',
      email: 'Paige@example.com',
      mob: '+12345678312',
    },
    {
      id: 4,
      name: 'Amanda Hug',
      org: 'Gsoft solutions',
      email: 'Amanda@example.com',
      mob: '+16655678355',
    },
    {
      id: 5,
      name: 'Addie Minstra',
      org: 'Gsoft solutions',
      email: 'Amanda@example.com',
      mob: '+16655678355',
    },
  ];

  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-23px w-100 d-flex company-profile">
                    <div className="col-lg-1">
                      <a
                        href="/app/comm-telephony/contact-company-management"
                        className="d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold bg-white"
                      >
                        <img src="../../../../public/assets/left-arrow-black.svg" alt="" />
                      </a>
                    </div>
                    <div className="col-lg-8">
                      <div className="d-flex align-items-start gap-4">
                        <div className="position-relative">
                          <img
                            className="position-relative"
                            src="../../../../public/assets/company-logo.svg"
                            alt=""
                          />
                          <a
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <img
                              className="position-absolute bottom-0 start-50 translate-middle-y"
                              src="../../../../public/assets/camera-upload.svg"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="d-flex gap-5 flex-column flex-lg-row">
                          <div className="d-flex flex-column">
                            <p className="mb-0 text-primary fw-bolder fs-18px">
                              {company?.attributes.name}
                            </p>
                            <p className="mb-0 text-primary fs-13px">
                              {
                                countries?.find(
                                  (country) =>
                                    // eslint-disable-next-line operator-linebreak
                                    parseInt(country.id, Number) ===
                                    parseInt(company?.attributes?.country_id, Number)
                                )?.attributes.name
                              }
                            </p>
                          </div>
                          <div>
                            <div className="d-flex flex-column">
                              <p className="mb-0 text-primary fw-medium fs-13px">
                                {company?.attributes.email}
                              </p>
                              <p className="mb-0 text-secondary fs-13px">
                                {
                                  countries?.find(
                                    (country) =>
                                      // eslint-disable-next-line operator-linebreak
                                      parseInt(country.id, Number) ===
                                      parseInt(company?.attributes?.country_id, Number)
                                  )?.attributes.name
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex  mt-4  gap-4">
                        <div>
                          <a
                            className="d-flex align-items-center text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                            href="/#"
                            // data-bs-toggle="offcanvas"
                            // data-bs-target="#offcanvasEditCompany"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowEditCompany(true);
                            }}
                          >
                            <i className="me-2">
                              <span>
                                <img src="../../../../public/assets/pencil-blue.svg" alt="# " />
                              </span>
                            </i>
                            <span>Edit</span>
                          </a>
                        </div>
                        <div>
                          <a
                            className="d-flex align-items-center text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <i className="me-2">
                              <span>
                                <img src="../../../../public/assets/chat-blue.svg" alt="# " />
                              </span>
                            </i>
                            <span>Send SMS</span>
                          </a>
                        </div>
                        <div>
                          <a
                            className="d-flex align-items-center px-sm-5 px-10px px-lg-4 py-12px rounded delete-profile"
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowDelete(true);
                            }}
                          >
                            <i className="me-2">
                              <span>
                                <img src="../../../../public/assets/trash-blue.svg" alt="# " />
                              </span>
                            </i>
                            <span>Delete</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <img
                        className="img-fluid"
                        src="../../../../public/assets/profile-bg.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gx-0 bg-white rounded content-area mt-3">
                {/* <!-- contacts listing starts --> */}
                <CompanyProfileContactListing
                  companyId={companyId}
                  companyName={company?.attributes.name}
                  users={users}
                  setIsConnectingDIDCall={(e) => {
                    setIsConnectingDIDCall(e);
                  }}
                  setIsConnecting={(e) => {
                    setIsConnecting(e);
                  }}
                />
                {/* <!-- contacts listing ends --> */}
              </div>
            </div>
            {/* <!--/.col--9--> */}
          </div>
        </div>
      </div>
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
      />
      id: 1,
      <EditCompanyCanvas
        show={showEditCompany}
        id={companyId}
        reloadList={handleReload}
        onClose={() => {
          setShowEditCompany(false);
        }}
        setToastAction={setToastAction}
      />
      <EditCompanyCanvas />
      <AddContactCanvas />
      <ImportContactCanvas />
      <SmsOffcanvas setToastAction={setToastAction} />
      <ConnectingDIDCall
        isConnectingDIDCall={isConnectingDIDCall}
        setIsConnectingDIDCall={setIsConnectingDIDCall}
      />
      <ConnectionCall isConnecting={isConnecting} setIsConnecting={setIsConnecting} />
      <ToastSuccess
        id="smsSendButtonMsg"
        onClose={() => {
          setToastAction({ isVisible: false });
        }}
        showToast={toastAction?.isVisible}
      >
        <span>{toastAction?.message}</span>
      </ToastSuccess>
    </Layout>
  );
}

export default ContactCompanyProfile;
