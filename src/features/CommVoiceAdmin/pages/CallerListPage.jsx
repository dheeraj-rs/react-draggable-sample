import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useFormik } from 'formik';
import 'react-tooltip/dist/react-tooltip.css';
import Layout from '../../../common/layout';
import CallerListItem from './CallerListItem';
import AllCallersList from '../components/AllCallerList';
import MoveCallerModal from '../components/modals/MoveCallerModal';
import ToastError from '../../../common/components/toast/ToastError';
import DeleteCallerModal from '../components/modals/DeleteCallerModal';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import NewCallerListModal from '../components/modals/NewCallerListModal';
import Pagination from '../../CommVoice/components/pagination/Pagination';
import GetCountries from '../../../common/api-collection/Common/Countries';
import EditCallerOffcanvas from '../components/modals/EditCallerOffcanvas';
import AddCallerOffcanvas from '../components/offcanvas/AddCallerOffcanvas';
import ClearCallerListModal from '../components/modals/ClearCallerListModal';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import DeleteCallerListModal from '../components/modals/DeleteCallerListModal';
import RenameCallerListModal from '../components/modals/RenameCallerListModal';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import { ListAllCarriers } from '../../../common/api-collection/Telephony/VendorCarriers';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import {
  CreateCaller,
  DeleteCaller,
  ListPaginatedCaller,
  MoveCaller,
  UpdateCaller,
} from '../../../common/api-collection/Telephony/Caller';
import {
  BulkDeleteCallerList,
  ClearCallerList,
  CreateCallerlist,
  DeleteCallerList,
  ListCallerList,
  UpdateCallerList,
} from '../../../common/api-collection/Telephony/CallerList';

function CallerListPage() {
  const temp = [];
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [paginatedCallerList, setPaginatedCallerList] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [carriers, setCarriers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [callerList, setCallerList] = useState([]);
  const [selectedItemsForBulkSelection, setSelectedItemsForBulkSelection] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [dataSubmitting, setDataSubmitting] = useState(false);
  const [refreshCallerList, setRefreshCallerList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [callerListId, setCallerListId] = useState('');
  const [searchTermCallerList, setSearchTermCallerList] = useState('');
  const [page, setPage] = useState(1);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const validate = (data) => {
    const errors = {};
    if (show?.type === 'add-caller') {
      if (!data.callerName) {
        errors.callerName = 'caller name required';
      }
      if (!data.groupId) {
        errors.groupId = 'group name required';
      }
      if (!data.countryCode) {
        errors.countryCode = 'required';
      }
      if (!data.phone) {
        errors.phone = 'number required';
      }
    } else if (show?.type === 'new-caller-list') {
      if (!data.callerListName) {
        errors.callerListName = 'list name required';
      }
    }
    if (show?.type === 'move-caller') {
      if (!data.selectedCallerListId) {
        errors.selectedCallerList = 'required';
      }
    }
    return errors;
  };

  const handleAddCaller = (data, formik) => {
    CreateCaller(data, show?.data?.groupId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Caller has been added successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        setDataSubmitting(false);
        setShow({ isVisible: false, type: '' });
        formik.resetForm();
      });
  };

  const handleAddCallerList = (data, formik) => {
    CreateCallerlist(data, show?.data?.groupId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'New category has been added successfully.',
          type: 'success',
        });
        setRefreshCallerList(!refreshCallerList);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        setDataSubmitting(false);
        setShow({ isVisible: false, type: '' });
        formik.resetForm();
      });
  };

  const handleEditCaller = (data, formik) => {
    UpdateCaller(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Caller details has been saved successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        formik.resetForm();
        setDataSubmitting(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const handleBulkSelection = (selectedplans) => {
    const existingItem = selectedItemsForBulkSelection.find(
      (plan) => plan?.id === selectedplans?.id
    );
    if (existingItem) {
      const newArray = selectedItemsForBulkSelection.filter(
        (plan) => plan?.id !== selectedplans?.id
      );
      setSelectedItemsForBulkSelection(newArray);
    } else {
      setSelectedItemsForBulkSelection([...selectedItemsForBulkSelection, selectedplans]);
    }
  };

  const renameCallerList = (data, formik) => {
    setDataSubmitting(true);
    UpdateCallerList(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Caller list name has been changed successfully.',
          type: 'success',
        });
        setRefreshCallerList(!refreshCallerList);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        formik.resetForm();
        setDataSubmitting(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const clearCallerList = () => {
    setDataSubmitting(true);
    ClearCallerList(show?.data?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Caller list clear successfully.',
          type: 'success',
        });
        setRefreshCallerList(!refreshCallerList);
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        setDataSubmitting(false);
        setShow({ isVisible: false, type: '' });
      });
  };
  const moveCaller = (data, formik) => {
    setDataSubmitting(true);
    MoveCaller(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Caller has been moved successfully.',
          type: 'success',
        });
        setRefreshCallerList(!refreshCallerList);
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        formik.resetForm();
        setDataSubmitting(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const formik = useFormik({
    initialValues: {
      callerName: '',
      groupId: '',
      countryCode: '',
      phone: '',
      carrierId: '',
      callerListName: '',
      selectedCallerListName: 'Select',
      selectedCallerListId: '',
      clearCallerListId: '',
      countryId: '',
    },
    validate,
    onSubmit: () => {
      setDataSubmitting(true);
      if (show?.type === 'add-caller') {
        const data = {
          type: 'telephony_vendor_caller',
          attributes: {
            name: formik?.values?.callerName,
            caller_list_id: formik?.values?.groupId,
            region: 'India',
            number: formik?.values?.phone,
            number_international: `${formik?.values?.countryCode}${formik?.values?.phone}`,
            country_code: formik?.values?.countryCode,
          },
        };
        handleAddCaller(data, formik);
      } else if (show?.type === 'new-caller-list') {
        const data = {
          type: 'telephony_vendor_caller_list',
          attributes: {
            name: formik.values.callerListName,
          },
        };
        handleAddCallerList(data, formik);
      } else if (show?.type === 'edit-caller') {
        const data = {
          type: 'telephony_vendor_callers',
          id: show?.data?.id,
          attributes: {
            caller_list_id: 9,
            name: formik?.values?.callerName,
            region: 'India',
            number_international: `${formik?.values?.countryCode}${formik?.values?.phone}`,
            number: formik?.values?.phone,
            country_code: formik?.values?.countryCode,
          },
        };
        handleEditCaller(data, formik);
      } else if (show?.type === 'rename-caller-list') {
        const data = {
          type: 'telephony_vendor_voice_libraries',
          id: parseInt(show?.data?.id, 10),
          attributes: {
            name: formik?.values?.callerListName,
          },
        };
        renameCallerList(data, formik);
      } else if (show?.type === 'move-caller') {
        const data = {
          type: 'telephony_vendor_callers',
          id: parseInt(show?.data?.id, 10),
          attributes: {
            caller_list_id: parseInt(formik.values.selectedCallerListId, 10),
          },
        };
        moveCaller(data, formik);
      }
    },
  });

  const handleDeleteCaller = () => {
    setDataSubmitting(true);
    if (selectedItemsForBulkSelection?.length > 0) {
      BulkDeleteCallerList(selectedItemsForBulkSelection)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Caller has been deleted successfully.',
            type: 'success',
          });
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            setToastAction({
              isVisible: true,
              type: 'failed',
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong!',
            });
          }
        })
        .finally(() => {
          setShow({ isVisible: false, type: '' });
          setDataSubmitting(false);
          setSelectedItemsForBulkSelection([]);
        });
    } else {
      DeleteCaller(show?.id)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Caller has been deleted successfully.',
            type: 'success',
          });
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            setToastAction({
              isVisible: true,
              type: 'failed',
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong!',
            });
          }
        })
        .finally(() => {
          setShow({ isVisible: false, type: '' });
          setDataSubmitting(false);
        });
    }
  };

  const handleDeleteCallerList = () => {
    setDataSubmitting(true);
    DeleteCallerList(show?.data?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Caller list been deleted successfully.',
          type: 'success',
        });
        setRefreshCallerList(!refreshCallerList);
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        setShow({ isVisible: false, type: '' });
        setDataSubmitting(false);
      });
  };

  useEffect(() => {
    setPaginatedCallerList({ isLoading: true });
    const { countryId } = formik.values;
    ListPaginatedCaller(searchTerm, page, callerListId, countryId)?.then((response) => {
      setPaginatedCallerList({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page, searchTerm, callerListId]);

  useEffect(() => {
    ListAllCarriers()?.then((response) => {
      setCarriers(response?.data);
    });
  }, []);

  useEffect(() => {
    setCallerList({ isLoading: true });
    ListCallerList(searchTermCallerList)
      ?.then((response) => {
        setCallerList({
          data: response?.data,
          isLoading: false,
          totalCallersCount: response?.data?.reduce(
            (total, item) => total + item.attributes.callers_count,
            0
          ),
        });
      })
      ?.catch(() => {
        setCallerList({ data: [], isLoading: false });
      });
  }, [refreshCallerList, refresh, searchTermCallerList]);

  useEffect(() => {
    if (isAllSelected) {
      paginatedCallerList?.data?.map((e) => {
        temp.push({ type: 'telephony_vendor_caller', id: parseInt(e?.id, 10) });
        return null;
      });

      setSelectedItemsForBulkSelection(temp);
    } else {
      setSelectedItemsForBulkSelection([]);
    }
  }, [isAllSelected]);

  useEffect(() => {
    GetCountries()
      .then((response) => {
        if (response?.data) {
          setCountries(response?.data);
        }
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <Layout
      title="comm voice"
      headerTitle="Contacts"
      favIcon="/assets/favIcons/organization_admin_fav.ico"
    >
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area scroll-custom scroll-caller-list">
                <div id="headerVoice" className="d-none d-lg-block">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <a
                              href="/#"
                              className="d-block d-lg-none"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Caller list</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage all caller information in an organized list.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12 ps-0">
                          <div className="d-flex gap-2 align-items-start">
                            <a
                              id="voiceHeaderMainMob"
                              href="/comm-voice-admin/"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <a
                              id="voiceHeaderMob"
                              href="/#"
                              className="d-none"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <a
                                href="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </a>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Voice library</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage voice clips uploaded in the library.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12 right-sec-voice d-lg-block">
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 pe-xl-4 pb-xl-4 pe-2">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="inbox-voice-wrapper scroll-custom">
                        <div className="p-23px gap-23px">
                          <div className="contact-content">
                            <a
                              href="#/"
                              role="button"
                              id="voiceFiles"
                              className="rounded d-flex align-items-center p-16px gap-13px voice-file active-voice"
                              onClick={(e) => {
                                e.preventDefault();
                                setCallerListId('');
                              }}
                            >
                              <div className="d-flex">
                                <p className="voice-name fs-13px fw-semibold mb-0 group-name">
                                  All Callers
                                </p>
                              </div>
                              <div className="ms-auto d-flex align-items-center me-3">
                                <p className="fs-12px mb-0 text-secondary">
                                  {callerList?.totalCallersCount} callers
                                </p>
                              </div>
                            </a>
                          </div>
                          <hr className="m-0 border-black o-16 mt-4" />
                          <div className="d-flex align-items-center mt-4">
                            <div className="text-primary fw-medium fs-14px d-flex">Lists</div>
                            <div className="ms-auto">
                              <div>
                                <a
                                  href="/#"
                                  className="bg-black d-flex align-items-center justify-content-center text-white h-4 w-4 rounded"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'new-caller-list' });
                                  }}
                                  data-tooltip-id="tooltip-add-list"
                                >
                                  <img src="/assets/add-white-icon.svg" alt="# " />
                                  <Tooltip id="tooltip-add-list" content="Add List" place="top" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div id="category-wrap" className="d-flex mb-2">
                            <div className="rounded mt-4 w-100">
                              <SearchWithBorder
                                placeholderText="Search list"
                                onChange={(e) => {
                                  setSearchTermCallerList(e?.target?.value);
                                }}
                                clearBtn={() => {
                                  setSearchTermCallerList('');
                                }}
                                searchTerm={searchTermCallerList}
                              />
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {callerList?.isLoading && <SpinningLoader />}
                          </div>
                          {callerList?.data?.map((list, index) => (
                            <CallerListItem
                              onClick={() => {
                                setCallerListId(list.id);
                              }}
                              key={index}
                              id={list?.id}
                              active={callerListId}
                              title={list?.attributes?.name}
                              count={list?.attributes?.callers_count}
                              setShow={setShow}
                              formik={formik}
                            />
                          ))}
                          {callerList?.data?.length === 0 && <NoMatchingRecords />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="voice-expand" className="col-lg-9 col-sm-12">
                  <div className="scroll-custom scroll-carrier carrier-pad">
                    <div className="d-flex gap-4 align-items-center mb-3 mt-3  ">
                      <h6 className="mb-0">All Callers</h6>
                      <p className="mb-0 text-secondary">
                        <span className="fw-medium text-primary">
                          {paginatedCallerList?.meta?.pagination?.total}
                        </span>{' '}
                        Callers available
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-2 row">
                      <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                        <SearchWithBorder
                          placeholderText="Search caller"
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
                          clearBtn={() => {
                            setSearchTerm('');
                          }}
                          searchTerm={searchTerm}
                        />
                      </div>
                      <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col d-none">
                        <div id="roleSelection" className="filter-wrap">
                          <a
                            href="/#"
                            className="filter-btn p-10px fw-medium rounded-3 border role-selection"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <span className="filter-text">Filter</span>
                            <img
                              className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                              src="/assets/black-filter.svg"
                              alt=""
                            />
                          </a>

                          <ul className="dropdown-menu p-4">
                            <div className="d-flex flex-column">
                              <label className="mb-0">Country</label>
                              <select
                                className="form-select bg-white"
                                aria-label="Default select example"
                                name="countryId"
                                onChange={(e) => {
                                  formik.setFieldValue('countryId', parseInt(e?.target?.value, 10));
                                }}
                                style={
                                  isFormFieldValid(formik, 'countryId')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                                value={formik?.values?.countryId || 'select'}
                              >
                                <option value="select" disabled>
                                  select
                                </option>
                                {countries?.map((country, index) => (
                                  <option key={index} value={country?.id}>
                                    {country?.attributes?.name}
                                  </option>
                                ))}
                              </select>
                              {getFormErrorMessage(formik, 'countryId')}
                            </div>
                            <div className="d-flex flex-column mt-2">
                              <p className="mb-0">Enabled/disabled</p>
                              <select
                                className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                aria-label="Default select example"
                                value="select"
                                onChange={() => {}}
                              >
                                <option value="select">All</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                              </select>
                              <div
                                className="setting-buttons d-flex align-items-center mt-3"
                                style={{ marginBottom: '0 !important' }}
                              >
                                <button
                                  id="applyBtn"
                                  type="button"
                                  className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                  onClick={formik.handleSubmit}
                                >
                                  Apply
                                </button>
                                <button
                                  type="button"
                                  id="roleCancel"
                                  className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          </ul>
                        </div>
                        <div id="selectedRole" className="d-none">
                          <a
                            href="/#"
                            className="p-10px rounded text-blue-active border border-blue-active position-relative"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <span className="position-absolute top-0 start-100 translate-middle p-5px bg-blue-active border border-light rounded-circle">
                              <span className="visually-hidden">New alerts</span>
                            </span>
                            <span className="filter-text">Filter</span>
                            <img
                              id="clearFilter"
                              className="ps-0 ps-md-4"
                              src="/assets/close-blue.svg"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end gap-3">
                        <a
                          href="/#"
                          id="addCaller"
                          className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  newCarrier"
                          onClick={(e) => {
                            e.preventDefault();
                            setShow({ isVisible: true, type: 'add-caller' });
                          }}
                        >
                          Add Caller
                        </a>

                        <div className="dropdown">
                          <a
                            href="/#"
                            data-bs-toggle="dropdown"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                              <img src="/assets/dot-menu-black.svg" alt="# " />
                            </span>
                          </a>
                          <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-1">
                            <a
                              href="/#"
                              data-bs-toggle="dropdown"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            />
                            <li
                              className={`caller-select ${
                                selectedItemsForBulkSelection?.length > 0
                                  ? 'opacity-100'
                                  : 'opacity-50'
                              }`}
                            >
                              <a
                                href="/#"
                                className="dropdown-item py-3 px-4"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (selectedItemsForBulkSelection?.length > 0) {
                                    setShow({
                                      isVisible: true,
                                      type: 'delete-caller',
                                    });
                                  }
                                }}
                              >
                                <img className="me-2" src="/assets/delete-voice.svg" alt="" />
                                Delete selected caller
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive vendor-plans-table">
                      <table className="table table-width-mobile">
                        <thead>
                          <tr>
                            <th scope="col">
                              <div className="check-box">
                                <input
                                  type="checkbox"
                                  id="selectCaller"
                                  checked={
                                    paginatedCallerList?.data?.length ===
                                    selectedItemsForBulkSelection?.length
                                  }
                                  onChange={() => {}}
                                />
                                <label
                                  className="text-primary mb-0"
                                  htmlFor="selectCaller"
                                  onClick={() => {
                                    setIsAllSelected(!isAllSelected);
                                  }}
                                >
                                  Caller name
                                </label>
                              </div>
                            </th>
                            <th scope="col">Region</th>
                            <th scope="col">Number</th>
                            <th scope="col">Last Session</th>
                            <th scope="col">Updated on</th>
                            <th scope="col">Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedCallerList?.isLoading > 0 && (
                            <tr>
                              <td />
                              <td />
                              <td />
                              <td>
                                <SpinningLoader />{' '}
                              </td>
                              <td />
                              <td />
                            </tr>
                          )}
                          {paginatedCallerList?.data?.length > 0 &&
                            paginatedCallerList?.data?.map((item, index) => (
                              <AllCallersList
                                key={index}
                                id={item?.id}
                                groupId={item?.attributes?.caller_list_id}
                                callerName={item?.attributes?.name}
                                region={item?.attributes?.region}
                                number={item?.attributes?.number_international}
                                session="---"
                                updatedDate={moment(item?.attributes?.updated_at)?.format(
                                  'DD/MM/YYYYY hh.mm A'
                                )}
                                setShow={setShow}
                                formik={formik}
                                countryCode={item?.attributes?.country_code}
                                phone={item?.attributes?.number}
                                handleBulkSelection={handleBulkSelection}
                                selectedItemsForBulkSelection={selectedItemsForBulkSelection}
                              />
                            ))}
                        </tbody>
                      </table>
                      {paginatedCallerList?.data?.length === 0 && <NoMatchingRecords />}
                    </div>
                    {paginatedCallerList?.data?.length > 0 && (
                      <Pagination
                        handlePagination={handlePaginationFunction}
                        currentPage={paginatedCallerList?.meta?.pagination?.current_page}
                        totalPages={paginatedCallerList?.meta?.pagination?.total_pages}
                        count={paginatedCallerList?.meta?.pagination?.per_page}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MoveCallerModal
        show={show?.isVisible && show?.type === 'move-caller'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        dataSubmitting={dataSubmitting}
        callerList={callerList}
      />

      <NewCallerListModal
        show={show?.isVisible && show?.type === 'new-caller-list'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        dataSubmitting={dataSubmitting}
      />

      <DeleteCallerModal
        show={show?.isVisible && show?.type === 'delete-caller'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        details={show?.data}
        callerList={callerList?.data}
        handleDelete={handleDeleteCaller}
        dataSubmitting={dataSubmitting}
      />

      <AddCallerOffcanvas
        formik={formik}
        show={show?.isVisible && show?.type === 'add-caller'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        carriers={carriers}
        dataSubmitting={dataSubmitting}
        callerList={callerList?.data}
      />

      <EditCallerOffcanvas
        formik={formik}
        show={show?.isVisible && show?.type === 'edit-caller'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        carriers={carriers}
        dataSubmitting={dataSubmitting}
        callerList={callerList?.data}
      />

      <RenameCallerListModal
        show={show?.isVisible && show?.type === 'rename-caller-list'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        dataSubmitting={dataSubmitting}
      />

      <ClearCallerListModal
        show={show?.isVisible && show?.type === 'clear-caller-list'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        clearCallerList={clearCallerList}
        dataSubmitting={dataSubmitting}
      />

      <DeleteCallerListModal
        show={show?.isVisible && show?.type === 'delete-caller-list'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        details={show?.data}
        handleDeleteCallerList={handleDeleteCallerList}
        dataSubmitting={dataSubmitting}
      />

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
    </Layout>
  );
}

export default CallerListPage;
