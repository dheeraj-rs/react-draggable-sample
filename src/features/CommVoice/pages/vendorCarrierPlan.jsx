import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import normalize from 'json-api-normalizer';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import VendorCarrierPlanIncoming from '../components/VendorCarrierPlanIncoming';
import VendorCarrierPlanOutgoing from '../components/VendorCarrierPlanOutgoing';
import Delete from '../components/Delete';
import EditCarrierPlan from '../components/EditCarrierPlan';
import AddCarrierPlan from '../components/AddCarrierPlan';
import '../../../styles/formvalidation.css';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import {
  CSVExportCarrierPlan,
  CreateCarrierPlan,
  DeleteCarrierPlan,
  DisableCarrierPlan,
  EnableCarrierPlan,
  ListPaginatedCarrierPlans,
  UpdateCarrierPlan,
  bulkDeleteCarrierPlan,
} from '../../../common/api-collection/Telephony/CarrierPlans';
import { ListAllCarrierGroups } from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import CommonModal from '../../../common/components/modals/CommonModal';

function vendorCarrierPlan() {
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [paginatedCarrierIncomingData, setPaginatedCarrierIncomingData] = useState({
    data: [],
    links: {},
    meta: {},
    isLoading: false,
  });

  const [normalizedCarrierPlanDataIncoming, setNormalizedCarrierPlanDataIncoming] = useState({});
  const [normalizedCarrierPlanDataOutgoing, setNormalizedCarrierPlanDataOutgoing] = useState({});

  const [paginatedCarrierOutgoingData, setPaginatedCarrierOutgoingData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [pageIncoming, setPageIncoming] = useState();
  const [pageOutgoing, setPageOutgoing] = useState();

  const [isFilterAppliedIncoming, setIsFilterAppliedIncoming] = useState(false);
  const [isFilterAppliedOutgoing, setIsFilterAppliedOutgoing] = useState(false);

  const [searchKeyIncoming, setSearchKeyIncoming] = useState('');
  const [searchKeyOutgoing, setSearchKeyOutgoing] = useState('');

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [refresh, setRefresh] = useState(false);

  const [allCarrierGroups, setAllCarrierGroups] = useState([]);

  const [loading, setLoading] = useState(false);

  const [carrierType, setCarrierType] = useState('incoming');

  const [selectedItemsForBulkDelete, setSelectedItemsForBulkDelete] = useState([]);

  const handleBulkExport = (data, type) => {
    CSVExportCarrierPlan(data, type)
      .then((res) => {
        const blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'carrier_plan.csv'; // Set the desired file name
        // Trigger the click event to start the download
        a.click();
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
        setSelectedItemsForBulkDelete([]);
      })
      .catch(() => {
        setToastAction({
          isVisible: true,
          message: 'Something went wrong.',
          type: 'failed',
        });
      });
  };

  const handlePaginationFunctionIncoming = (newPage) => {
    setPageIncoming(newPage);
  };

  const handlePaginationFunctionOutgoing = (newPage) => {
    setPageOutgoing(newPage);
  };

  const deleteCarrierPlan = () => {
    setLoading(true);
    if (show?.carrierPlan?.id) {
      DeleteCarrierPlan(show?.carrierPlan?.id)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Deleted : You have successfully deleted the plan from the list',
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
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        ?.finally(() => {
          setLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  const changePlanStatus = () => {
    if (show?.type === 'enable-carrier-plan') {
      setLoading(true);
      EnableCarrierPlan(show?.id)
        ?.then(() => {
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
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        ?.finally(() => {
          setLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    } else if (show?.type === 'disable-carrier-plan') {
      setLoading(true);
      DisableCarrierPlan(show?.id)
        ?.then(() => {
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
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        ?.finally(() => {
          setLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  const handleBulkSelection = (selectedGroup) => {
    const existingItem = selectedItemsForBulkDelete.find(
      (group) => group?.id === selectedGroup?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkDelete.filter(
        (group) => group?.id !== selectedGroup?.id
      );
      setSelectedItemsForBulkDelete(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkDelete([...selectedItemsForBulkDelete, selectedGroup]);
    }
  };

  const bulkDeleteCarrierGroups = () => {
    if (selectedItemsForBulkDelete?.length === 0) {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Select at least one Plan',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      setLoading(true);
      bulkDeleteCarrierPlan(selectedItemsForBulkDelete)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: "Carrier plans's deleted You have successfully deleted carrier plans's",
            type: 'success',
          });
          setShow({ isVisible: false, type: '' });
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
          setLoading(false);
          setShow({ isVisible: false, type: '' });
          setSelectedItemsForBulkDelete([]);
        });
    }
  };

  const validate = (data) => {
    const errors = {};

    if (!data.carrierPlanName) {
      errors.carrierPlanName = 'carrier plan name is required';
    }

    if (!data.carrierGroupId) {
      errors.carrierGroupId = 'carrier group is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      carrierPlanName: '',
      carrierGroupId: '',
      isEnabled: true,
    },
    validate,
    onSubmit: () => {
      setLoading(true);

      if (show?.type === 'add-carrier-plan') {
        const data = {
          type: 'telephony_vendor_carrier_plans',
          attributes: {
            carrier_group_id: formik?.values?.carrierGroupId,
            call_type: carrierType,
            name: formik?.values?.carrierPlanName,
            is_enabled: formik?.values?.isEnabled,
          },
        };
        CreateCarrierPlan(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Added: You have successfully added carrier plan',
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
                message: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'Something went wrong.',
                type: 'failed',
              });
            }
          })
          ?.finally(() => {
            setLoading(false);
            formik.resetForm();
            setShow({ isVisible: false, type: '' });
          });
      }

      if (show?.type === 'edit-carrier-plan') {
        const data = {
          type: 'telephony_vendor_carrier_plans',
          id: parseInt(show?.data?.id, 10),
          attributes: {
            carrier_group_id: formik?.values?.carrierGroupId,
            call_type: carrierType,
            name: formik?.values?.carrierPlanName,
            is_enabled: formik?.values?.isEnabled,
          },
        };

        UpdateCarrierPlan(data, show?.data?.id)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Added: You have successfully updated carrier plan',
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
                message: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'Something went wrong.',
                type: 'failed',
              });
            }
          })
          ?.finally(() => {
            setLoading(false);
            formik.resetForm();
            setShow({ isVisible: false, type: '' });
          });
      }
    },
  });

  useEffect(() => {
    setPaginatedCarrierIncomingData({
      isLoading: true,
    });

    setPaginatedCarrierOutgoingData({
      isLoading: true,
    });

    if (carrierType === 'incoming') {
      ListPaginatedCarrierPlans(searchKeyIncoming, pageIncoming, 'incoming')?.then((response) => {
        setPaginatedCarrierIncomingData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
        const normalizedData = normalize(response);
        setNormalizedCarrierPlanDataIncoming(normalizedData);
      });
    }

    if (carrierType === 'outgoing') {
      ListPaginatedCarrierPlans(searchKeyOutgoing, pageOutgoing, 'outgoing')?.then((response) => {
        setPaginatedCarrierOutgoingData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });

        const normalizedData = normalize(response);
        setNormalizedCarrierPlanDataOutgoing(normalizedData);
      });
    }
  }, [refresh, pageIncoming, pageOutgoing, searchKeyIncoming, searchKeyOutgoing, carrierType]);

  useEffect(() => {
    ListAllCarrierGroups()?.then((response) => {
      setAllCarrierGroups(response?.data);
    });
  }, []);

  useEffect(() => {
    if (show?.type === 'edit-carrier-plan' && show?.data) {
      formik.setFieldValue('carrierPlanName', show?.data?.name);
      formik.setFieldValue('carrierGroupId', show?.data?.carrierGroupId);
      formik.setFieldValue('isEnabled', show?.data?.isEnabled);
    }
  }, [show?.isVisible]);

  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a href="/comm-telephony/" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </a>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                    <Link
                      to="/comm-telephony/vendor-plans-and-packges-mobile/"
                      className="d-block d-lg-none"
                    >
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Vendor Operations
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block ">
                    <div className="h-100 shadow-10 rounded">
                      <div className="scroll-custom scroll-carrier pt-3">
                        <SideMenu active={5} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0 fs-14px">Carrier Plan</h6>
                        <p className="mb-0">
                          <span className="fw-medium">
                            {carrierType === 'incoming'
                              ? paginatedCarrierIncomingData?.meta?.pagination?.total
                              : ''}
                            {carrierType === 'outgoing'
                              ? paginatedCarrierOutgoingData?.meta?.pagination?.total
                              : ''}
                          </span>{' '}
                          Plans available
                        </p>
                      </div>
                      <div className="con mt-0 mt-lg-2">
                        <ul
                          className="nav nav-tabs d-flex ps-0 mb-0 col-lg-12"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item pe-4" role="presentation">
                            <a
                              href="/#"
                              className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary active"
                              id="did"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-did"
                              type="button"
                              role="tab"
                              aria-controls="did-tab"
                              aria-selected="true"
                              onClick={() => {
                                setCarrierType('incoming');
                              }}
                            >
                              Carrier Incoming
                            </a>
                          </li>
                          <li className="nav-item pe-4" role="presentation">
                            <a
                              href="/#"
                              className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary"
                              id="toll-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-toll-free"
                              type="button"
                              role="tab"
                              aria-controls="call"
                              aria-selected="false"
                              tabIndex="-1"
                              onClick={() => {
                                setCarrierType('outgoing');
                              }}
                            >
                              Carrier Outgoing
                            </a>
                          </li>
                        </ul>

                        <div className="tab-content" id="pills-tabContent">
                          <VendorCarrierPlanIncoming
                            paginatedCarrierIncomingData={paginatedCarrierIncomingData}
                            handlePaginationFunctionIncoming={handlePaginationFunctionIncoming}
                            isFilterAppliedIncoming={isFilterAppliedIncoming}
                            setIsFilterAppliedIncoming={setIsFilterAppliedIncoming}
                            setShow={setShow}
                            setSearchKeyIncoming={setSearchKeyIncoming}
                            searchKeyIncoming={searchKeyIncoming}
                            normalizedCarrierIncomingData={normalizedCarrierPlanDataIncoming}
                            pagination={paginatedCarrierIncomingData?.meta?.pagination}
                            handleBulkSelection={handleBulkSelection}
                            selectedItemsForBulkDelete={selectedItemsForBulkDelete}
                            handleBulkExport={handleBulkExport}
                          />
                          <VendorCarrierPlanOutgoing
                            paginatedCarrierOutgoingData={paginatedCarrierOutgoingData}
                            handlePaginationFunctionOutgoing={handlePaginationFunctionOutgoing}
                            isFilterAppliedOutgoing={isFilterAppliedOutgoing}
                            setIsFilterAppliedOutgoing={setIsFilterAppliedOutgoing}
                            setShow={setShow}
                            setSearchKeyOutgoing={setSearchKeyOutgoing}
                            searchKeyOutgoing={searchKeyOutgoing}
                            normalizedCarrierOutgoingData={normalizedCarrierPlanDataOutgoing}
                            pagination={paginatedCarrierOutgoingData?.meta?.pagination}
                            handleBulkSelection={handleBulkSelection}
                            selectedItemsForBulkDelete={selectedItemsForBulkDelete}
                            handleBulkExport={handleBulkExport}
                          />
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

      <Delete
        heading="Delete plan"
        part1="This action will Delete the carrier plan "
        part2={show?.carrierPlan?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-carrier-plan'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteCarrierPlan}
        loading={loading}
      />

      <EditCarrierPlan
        show={show?.isVisible && show?.type === 'edit-carrier-plan'}
        allCarrierGroups={allCarrierGroups}
        setShow={setShow}
        formik={formik}
        loading={loading}
      />

      <AddCarrierPlan
        show={show?.isVisible && show?.type === 'add-carrier-plan'}
        allCarrierGroups={allCarrierGroups}
        setShow={setShow}
        formik={formik}
        loading={loading}
      />

      <CommonModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'enable-carrier-plan' || show?.type === 'disable-carrier-plan')
        }
        title={
          show?.type === 'enable-carrier-plan' ? ' Enable Carrier Plan' : ' Disable Carrier Plan'
        }
        actionType={show?.key}
        text=" the plan."
        label={`To confirm this action please type “${show?.key}”`}
        btnLabel={show?.key}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey={show?.key}
        isProcessing={loading}
        handleAction={changePlanStatus}
      />

      <CommonModal
        isVisible={show?.isVisible && show?.type === 'bulk-delete-carrier-plans'}
        title="Delete Carrier Plans"
        actionType="Delete "
        text="the selected carrier plan's."
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="Delete"
        isProcessing={loading}
        handleAction={() => {
          bulkDeleteCarrierGroups();
        }}
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

export default vendorCarrierPlan;
