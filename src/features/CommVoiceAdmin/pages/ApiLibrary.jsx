import React, { useLayoutEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import DeleteApiModal from '../components/add-api-library/DeleteApiModal';
import AddApiModal from '../components/add-api-library/AddApiModal';
import DisableApiModal from '../components/add-api-library/DisableApiModal';
import EditApiModal from '../components/add-api-library/EditApiModal';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import NoApiAvailable from '../components/add-api-library/NoApiAvailable';
import ApiAvailable from '../components/add-api-library/ApiAvailable';
import {
  CreateApiLibrary,
  DeleteApiLibrary,
  DisableApiLibrary,
  EnableApiLibrary,
  ListAllApiLibrary,
  ListPaginatedApiLibrary,
  UpdateApiLibrary,
} from '../../../common/api-collection/Telephony/ApiLibrary';
import ChatUs from '../components/add-api-library/ChatUs';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';

function ApiLibrary() {
  const [ApiListRow, setApiListRow] = useState([]);
  const [ApiAllList, setApiAllList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTermApiList, setSearchTermApiList] = useState('');
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [loading, setLoading] = useState({ isLoading: false, type: '' });
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [paginatedData, setPaginatedData] = useState({
    data: {},
    included: [],
    links: {},
    meta: {},
    isLoading: false,
  });
  const [page, setPage] = useState(1);

  const handleAddVoiceError = (error) => {
    setLoading({ isLoading: false, type: '' });
    if (error?.response) {
      if (error.response.status === 500) {
        setToastAction({
          isVisible: true,
          message: 'Something went wrong.',
          type: 'failed',
        });
      } else if (error.response.status === 413) {
        setToastAction({
          isVisible: true,
          message: error.response.data.message || 'Request Entity Too Large',
          type: 'failed',
        });
      } else {
        setToastAction({
          isVisible: true,
          message: error.response.data.message || 'An unexpected error occurred',
          type: 'failed',
        });
      }
    } else {
      setToastAction({
        isVisible: true,
        message: 'An unexpected error occurred',
        type: 'failed',
      });
    }
  };

  const listAllApiLibrary = () => {
    ListAllApiLibrary()
      ?.then((response) => {
        setApiAllList(response.data);
      })
      .finally(() => {});
  };

  const listApiLibrary = () => {
    setLoading({ isLoading: true, type: 'list-Api-Library' });
    ListPaginatedApiLibrary(searchTermApiList, page)
      ?.then((response) => {
        setApiListRow(response.data);
        setPaginatedData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      })
      .finally(() => {
        setLoading({ isLoading: false, type: '' });
      });
  };

  const handleAddApi = async (formik) => {
    setLoading({ isLoading: true, type: 'add-api' });
    try {
      const data = {
        type: 'telephony_api_library',
        attributes: {
          name: formik?.values?.apiName,
          type: formik?.values?.onSelected,
          primary_api_url: formik?.values?.primaryApi,
          fallback_api_url: formik?.values?.fallbackApi,
          is_enabled: formik?.values?.isEnabled,
        },
      };
      await CreateApiLibrary(data);
      setToastAction({
        isVisible: true,
        message: 'Added :You have successfully added API',
        type: 'success',
      });
      setRefresh(!refresh);
      formik.resetForm();
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      formik.resetForm();
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
    }
  };

  const handleEditApiLibrary = async (formik) => {
    setLoading({ isLoading: true, type: 'edit-api' });
    try {
      const data = {
        type: 'telephony_callbacks',
        id: parseInt(formik.values.selectId, 10),
        attributes: {
          name: formik?.values?.apiName,
          type: formik?.values?.onSelected,
          primary_api_url: formik?.values?.primaryApi,
          fallback_api_url: formik?.values?.fallbackApi,
          is_enabled: formik?.values?.isEnabled,
        },
      };
      await UpdateApiLibrary(parseInt(formik.values.selectId, 10), data);
      setToastAction({
        isVisible: true,
        message: 'Saved :You have successfully Saved API',
        type: 'success',
      });
      setRefresh(!refresh);
      formik.resetForm();
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      formik.resetForm();
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
    }
  };

  const handleDeleteApiLibrary = async (formik) => {
    setLoading({ isLoading: true, type: 'delete-api' });
    try {
      const data = {
        type: 'telephony_vendor_lots',
        id: parseInt(formik.values.selectId, 10),
      };
      await DeleteApiLibrary(parseInt(formik.values.selectId, 10), data);
      setToastAction({
        isVisible: true,
        message: 'Deleted : You have successfully deleted the API VoiceBlast_API .',
        type: 'success',
      });
      setRefresh(!refresh);
      formik.resetForm();
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      formik.resetForm();
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
    }
  };

  const handleDesableApiLibrary = async (formik) => {
    try {
      const data = {
        type: 'telephony_vendor_lots',
        id: parseInt(formik.values.selectId, 10),
      };
      await DisableApiLibrary(parseInt(formik.values.selectId, 10), data);
      setToastAction({
        isVisible: true,
        message: 'Disabled : You have successfully disabled the API VoiceBlast_API .',
        type: 'success',
      });
      setRefresh(!refresh);
      formik.resetForm();
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      formik.resetForm();
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
    }
  };

  const handleEnableApiLibrary = async (formik) => {
    try {
      const data = {
        type: 'telephony_vendor_templates',
        id: parseInt(formik.values.selectId, 10),
      };
      await EnableApiLibrary(parseInt(formik.values.selectId, 10), data);
      setToastAction({
        isVisible: true,
        message: 'Enable : You have successfully Enable the API VoiceBlast_API .',
        type: 'success',
      });
      setRefresh(!refresh);
      formik.resetForm();
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      formik.resetForm();
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
    }
  };

  const validate = (data) => {
    const errors = {};
    if (
      (show.type === 'add-api' && show.isVisible === true) ||
      (show.type === 'edit-api' && show.isVisible === true)
    ) {
      if (!data.apiName) {
        errors.apiName = 'name is required';
      }
      if (data.onSelected === 'Select API type') {
        errors.onSelected = 'type is required';
      }
      if (!data.primaryApi) {
        errors.primaryApi = 'url is required';
      } else {
        const urlRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?(?:(?!\.com).)*$/i;
        const protocolRegex = /^(http|https):\/\//i;
        if (!urlRegex.test(data.primaryApi) || !protocolRegex.test(data.primaryApi)) {
          errors.primaryApi = 'invalid url';
        }
      }
      if (!data.fallbackApi) {
        errors.fallbackApi = 'url is required';
      } else {
        const urlRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?(?:(?!\.com).)*$/i;
        const protocolRegex = /^(http|https):\/\//i;
        if (!urlRegex.test(data.fallbackApi) || !protocolRegex.test(data.fallbackApi)) {
          errors.fallbackApi = 'invalid url';
        }
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      apiName: '',
      onSelected: 'Select API type',
      primaryApi: '',
      fallbackApi: '',
      isEnabled: true,
      selectId: '',
    },
    validate,
    onSubmit: () => {
      if (show?.type === 'add-api') {
        setLoading({ isLoading: true, type: 'add-api' });
        handleAddApi(formik);
      }
      if (show?.type === 'enable-api') {
        setLoading({ isLoading: true, type: 'enable-api' });
        handleEnableApiLibrary(formik);
      }
      if (show?.type === 'disable-api') {
        setLoading({ isLoading: true, type: 'disable-api' });
        handleDesableApiLibrary(formik);
      }
      if (show?.type === 'edit-api') {
        setLoading({ isLoading: true, type: 'edit-api' });
        handleEditApiLibrary(formik);
      }
      if (show?.type === 'delete-api') {
        setLoading({ isLoading: true, type: 'delete-api' });
        handleDeleteApiLibrary(formik);
      }
    },
  });

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setShow({ isVisible: false, type: '' });
    formik.resetForm();
  };

  useLayoutEffect(() => {
    listApiLibrary();
    listAllApiLibrary();
  }, [page, searchTermApiList, refresh]);

  return (
    <>
      <Layout
        favIcon="/assets/favIcons/favicon-voice.ico"
        title="comm voice"
        headerTitle="Settings"
        sideNavIcon="/assets/comm-voice-logo.svg"
      >
        <div className="wrapper">
          <div className="bg-gray-bright w-100">
            <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 scroll-custom api-library-wrap">
                <div className="col-lg-12 col-sm-12 pe-0 campaign-landing">
                  <div>
                    <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                      <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                        <Link to="/comm-voice-admin" className="d-flex justify-content-center">
                          <img src="/assets/leftback.svg" alt="" />
                        </Link>
                      </div>
                      <div className="roles-top">
                        <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                          <Link to="/comm-voice-admin" className="d-block d-lg-none">
                            <img src="/assets/leftback.svg" className="me-2" alt="" />
                          </Link>
                          API Library
                        </h5>
                      </div>
                    </div>
                    {loading?.type === 'list-Api-Library' && ApiAllList.length === 0 ? (
                      <div className="d-flex align-items-center m-3 justify-content-center">
                        <SpinningLoader />
                      </div>
                    ) : null}
                    {ApiAllList.length !== 0 && (
                      <ApiAvailable
                        formik={formik}
                        searchTermApiList={searchTermApiList}
                        setSearchTermApiList={setSearchTermApiList}
                        ApiListRow={ApiListRow}
                        setShow={setShow}
                        paginatedData={paginatedData}
                        handlePaginationFunction={handlePaginationFunction}
                        loading={loading}
                      />
                    )}
                    {ApiAllList.length === 0 && !loading.isLoading ? (
                      <NoApiAvailable setShow={setShow} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <AddApiModal
        formik={formik}
        onClose={handleClose}
        show={show?.isVisible && show?.type === 'add-api'}
        loading={loading?.isLoading && loading?.type === 'add-api'}
      />

      <EditApiModal
        formik={formik}
        onClose={handleClose}
        show={show?.isVisible && show?.type === 'edit-api'}
        loading={loading?.isLoading && loading?.type === 'edit-api'}
      />

      <DeleteApiModal
        formik={formik}
        title={show?.name}
        onClose={handleClose}
        show={show?.isVisible && show?.type === 'delete-api'}
        loading={loading?.isLoading && loading?.type === 'delete-api'}
      />

      <DisableApiModal
        show={show?.isVisible && (show?.type === 'disable-api' || show?.type === 'enable-api')}
        type={show?.type}
        title={show?.title}
        onClose={handleClose}
        formik={formik}
        disableLoading={loading?.isLoading && loading?.type === 'disable-api'}
        enableLoading={loading?.isLoading && loading?.type === 'enable-api'}
      />

      <div
        className={`offcanvas offcanvas-end bg-bot ${
          show?.isVisible && show?.type === 'ChatBot' ? 'show' : 'hiding'
        }`}
        tabIndex="-1"
        id="offcanvasChatBot"
      >
        <div className="offcanvas-header offcanvas-header-title p-23px pb-10px" />
        <div className="offcanvas-body p-23px pt-0px">
          <ChatUs onClose={handleClose} />
        </div>
      </div>

      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
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

export default ApiLibrary;
