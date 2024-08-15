/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';

import Modal from '../../../common/components/modals/Modal';
import MomentaryFileUpload from '../../../common/api-collection/Common/MomentaryFileUpload';

import ModalClose from '../../../common/components/modals/ModalClose';
import KYCFile from '../components/KYCFile';
import { ListKYC, SubmitKYC } from '../../../common/api-collection/KYC';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';

function CommKycDocuments() {
  const [certificateOfAgreement, setCertificateOfAgreement] = useState();
  const [pancard, setPANCard] = useState();
  const [address, setAddress] = useState();
  const [pancardSubmited, setPancardSubmited] = useState(false);
  const [photoSubmited, setPhotoSubmited] = useState(false);
  const [addressSubmited, setAddressSubmited] = useState(false);

  const [uploadedPancard, setUploadedPancard] = useState();
  const [uploadedPhoto, setUploadedPPhoto] = useState();
  const [uploadedAddress, setUploadedAddress] = useState();
  const [KYCList, setKYCList] = useState();
  const [apiAction, setApiAction] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [reload, setReload] = useState(0);
  const [percentage, setPercentage] = useState({ type: '', percentage: '' });
  const [photo, setPhoto] = useState();

  const handleReload = () => setReload(Math.floor(Math.random() * 1000));
  function getDocumentMediaUrl(jsonData) {
    const documentMediaId = jsonData.data.relationships.documentMedia.data.id;

    const documentMedia = jsonData.included.find(
      (item) => item.type === 'document_media' && item.id === documentMediaId
    );

    if (documentMedia) {
      return documentMedia;
    }

    return null;
  }
  const listKYC = () => {
    ListKYC().then((res) => {
      setKYCList(res.data);

      res.data?.map((item) => {
        if (item?.attributes?.specification_id === 1) {
          setPancardSubmited(true);
          setUploadedPancard(
            res.included?.find((include) => include.id === item.relationships.media.data[0].id)
              .attributes
          );
        }
        if (item?.attributes?.specification_id === 2) {
          setPhotoSubmited(true);
          setUploadedPPhoto(
            res.included?.find((include) => include.id === item.relationships.media.data[0].id)
              .attributes
          );
        }
        if (item?.attributes?.specification_id === 3) {
          setAddressSubmited(true);
          setUploadedAddress(
            res.included?.find((include) => include.id === item.relationships.media.data[0].id)
              .attributes
          );
        }
        return true;
      });
    });
  };

  useEffect(() => {
    listKYC();
  }, [reload]);

  const submitKYC = (data, type) => {
    setApiAction(true);
    SubmitKYC(data)
      .then((res) => {
        setPancardSubmited(true);
        if (res?.data.attributes.specification_id === 1) {
          setUploadedPancard(getDocumentMediaUrl(res));
        }
        if (res?.data.attributes.specification_id === 2) {
          setUploadedPPhoto(getDocumentMediaUrl(res));
        }
        if (res?.data.attributes.specification_id === 3) {
          setUploadedAddress(getDocumentMediaUrl(res));
        }
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Submited!',
        });
        switch (type) {
          case 'pancard':
            setPancardSubmited(true);
            break;
          case 'photo':
            setPhotoSubmited(true);

            break;
          case 'address':
            setAddressSubmited(true);

            break;
          default:
            break;
        }
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while submiting!',
        });
      })
      .finally(() => {
        setApiAction(false);
        handleReload();
      });
  };

  const handleFileInputChange = (event, type) => {
    const file = event.target.files[0];
    setApiAction(true);
    if (file && file.size <= 4 * 1024 * 1024) {
      const formData = new FormData();
      formData.append('upload_file', event.target.files[0]);
      MomentaryFileUpload(formData, (progress) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: 'File Size exeed',
        });
        setPercentage({ type, percentage: progress });
      })
        .then((response) => {
          switch (type) {
            case 'pancard':
              setPANCard(response?.data?.data?.attributes.storage_name);

              break;
            case 'photo':
              setPhoto(response?.data?.data?.attributes.storage_name);
              break;
            case 'address':
              setAddress(response?.data?.data?.attributes.storage_name);
              break;

            default:
          }
          setCertificateOfAgreement(response?.data?.data?.attributes);
        })
        .catch(() => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'File Size exeed',
          });
        })
        .finally(() => {
          setApiAction(false);
          setPercentage('');
        });
    } else {
      setApiAction(false);
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'File Size exeed',
      });
    }
  };

  return (
    <>
      <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
        <div className="wrapper">
          <div className="bg-gray-bright w-100">
            <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100">
                <div className="d-flex gap-2 left-mob">
                  <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                    <a href="/support-widget/" className="d-flex justify-content-between">
                      <img src="/assets/leftback.svg" alt="" />
                    </a>
                  </div>
                  <div>
                    <h5 className="fs-16px fw-500">
                      <Link to="/" className="d-block d-lg-none">
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </Link>{' '}
                      KYC Documents
                    </h5>
                    <p>
                      Indian telecom regulations demands us to verify your KYC documents. Below are
                      the major documents you have to submit.
                    </p>
                  </div>
                </div>
                {!pancardSubmited ? (
                  <KYCFile
                    title="PAN Card"
                    fileDescription="Max. file size 4 MB. (Accept jpg, png, pdf)"
                    uploadedFile={uploadedPancard}
                    apiAction={apiAction}
                    fileTypes=".jpg,.jpeg,.png,.pdf"
                    maxSize="2000000"
                    file={pancard}
                    type="pancard"
                    upload={!pancardSubmited}
                    submited={pancardSubmited}
                    uploadPercentage={percentage}
                    cancelled={() => {
                      setPANCard(false);
                    }}
                    handleFileInputChange={(e, type) => {
                      handleFileInputChange(e, type);
                    }}
                    onSubmitClick={() => {
                      const data = {
                        type: 'telephony_kyc_document_uploads',
                        attributes: {
                          specification_id: 1,
                          document_image: pancard,
                        },
                      };
                      submitKYC(data, 'pancard');
                    }}
                  />
                ) : (
                  ''
                )}

                {!photoSubmited ? (
                  <KYCFile
                    title="Photo"
                    fileDescription="Max. file size 4 MB. (Accept jpg, png, pdf)"
                    uploadedFile={uploadedPhoto}
                    apiAction={apiAction}
                    fileTypes=".jpg,.jpeg,.png,.pdf"
                    maxSize="2000000"
                    file={photo}
                    uploadPercentage={percentage}
                    type="photo"
                    cancelled={() => {
                      setPhoto(false);
                    }}
                    upload={!photoSubmited}
                    submited={photoSubmited}
                    handleFileInputChange={(e, type) => {
                      handleFileInputChange(e, type);
                    }}
                    onSubmitClick={() => {
                      const data = {
                        type: 'telephony_kyc_document_uploads',
                        attributes: {
                          specification_id: 2,
                          document_image: photo,
                        },
                      };
                      submitKYC(data, 'photo');
                    }}
                  />
                ) : (
                  ''
                )}

                {!addressSubmited ? (
                  <KYCFile
                    title="Address Proof"
                    fileDescription="Max. file size 4 MB. (Accept jpg, png, pdf)"
                    uploadedFile={uploadedAddress}
                    apiAction={apiAction}
                    fileTypes=".jpg,.jpeg,.png,.pdf"
                    maxSize="2000000"
                    file={address}
                    type="address"
                    cancelled={() => {
                      setAddress(false);
                    }}
                    uploadPercentage={percentage}
                    upload={!addressSubmited}
                    submited={addressSubmited}
                    handleFileInputChange={(e, type) => {
                      handleFileInputChange(e, type);
                    }}
                    onSubmitClick={() => {
                      const data = {
                        type: 'telephony_kyc_document_uploads',
                        attributes: {
                          specification_id: 3,
                          document_image: address,
                        },
                      };
                      submitKYC(data, 'address');
                    }}
                  />
                ) : (
                  ''
                )}

                <div>
                  <h5 className="fs-16px fw-500" style={{ marginTop: '50px' }}>
                    <Link to="/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    Verification pending
                  </h5>
                </div>

                {pancardSubmited ? (
                  <KYCFile
                    title="PAN Card"
                    fileDescription="Max. file size 4 MB. (Accept jpg, png, pdf)"
                    uploadedFile={uploadedPancard}
                    apiAction={apiAction}
                    fileTypes=".jpg,.jpeg,.png,.pdf"
                    maxSize="2000000"
                    file={pancard}
                    upload={!pancardSubmited}
                    submited={pancardSubmited}
                    handleFileInputChange={(e, type) => {
                      handleFileInputChange(e, type);
                    }}
                    onSubmitClick={() => {
                      const data = {
                        type: 'telephony_kyc_document_uploads',
                        attributes: {
                          specification_id: 1,
                          document_image: pancard,
                        },
                      };
                      submitKYC(data, 'pancard');
                    }}
                  />
                ) : (
                  ''
                )}

                {photoSubmited ? (
                  <KYCFile
                    title="Photo"
                    fileDescription="Max. file size 4 MB. (Accept jpg, png, pdf)"
                    uploadedFile={uploadedPhoto}
                    apiAction={apiAction}
                    fileTypes=".jpg,.jpeg,.png,.pdf"
                    maxSize="2000000"
                    file={photo}
                    upload={!photoSubmited}
                    submited={photoSubmited}
                    handleFileInputChange={(e, type) => {
                      handleFileInputChange(e, type);
                    }}
                    onSubmitClick={() => {
                      const data = {
                        type: 'telephony_kyc_document_uploads',
                        attributes: {
                          specification_id: 2,
                          document_image: photo,
                        },
                      };
                      submitKYC(data, 'photo');
                    }}
                  />
                ) : (
                  ''
                )}

                {addressSubmited ? (
                  <KYCFile
                    title="Address Proof"
                    fileDescription="Max. file size 4 MB. (Accept jpg, png, pdf)"
                    uploadedFile={uploadedAddress}
                    apiAction={apiAction}
                    fileTypes=".jpg,.jpeg,.png,.pdf"
                    maxSize="2000000"
                    file={address}
                    upload={!addressSubmited}
                    submited={addressSubmited}
                    handleFileInputChange={(e, type) => {
                      handleFileInputChange(e, type);
                    }}
                    onSubmitClick={() => {
                      const data = {
                        type: 'telephony_kyc_document_uploads',
                        attributes: {
                          specification_id: 3,
                          document_image: address,
                        },
                      };
                      submitKYC(data, 'address');
                    }}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal width="" id="modalCerficate">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between w-100">
              <p className="fs-15px text-primary fw-medium">
                Certificate of Incorporation_2018.pdf
              </p>
              <div className="me-4">
                <Link
                  href="/assets/agreement.svg"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-original-title="Download"
                  download
                >
                  <img src="/assets/upload-icon.svg" alt="" />
                </Link>
              </div>
            </div>
            <ModalClose />
          </div>
          <p className="text-secondary fs-13px mb-2">
            file-size: <span>700 KB</span>
          </p>
          <div>
            <img className="w-100" src="/assets/certificate-img.svg" alt="" />
          </div>
          <div />
        </Modal>
      </Layout>
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
    </>
  );
}

export default CommKycDocuments;
