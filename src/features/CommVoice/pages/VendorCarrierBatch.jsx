import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import BatchDetails from '../../../common/components/common/BatchDetails';
import VendorCarrierBatchList from '../components/VendorCarrierBatchList';
import {
  AddBatch,
  DeleteBatch,
  ExportBatch,
  GetCarrier,
  GetCarrierPlans,
  GetPaginatedBatches,
  UpdateCarrier,
} from '../../../common/api-collection/Telephony/VendorCarriers';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import Delete from '../components/Delete';
import CarrierAddNewBatchModal from '../components/CarrierAddNewBatchModal';
import EditCarrier from '../components/EditCarrier';
import { ListAllCarrierGroups } from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import { isValidIPAddress } from '../../../common/helpers/utils';

function VendorCarrierBatch() {
  const params = useParams();

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [paginatedBatches, setPaginatedBatches] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);

  const [carrierDetails, setCarrierDetails] = useState();

  const [incomingPlans, setIncomingPlans] = useState([]);

  const [outgoingPlans, setOutgoingPlans] = useState([]);

  const [allCarrierGroups, setAllCarrierGroups] = useState([]);

  const [selectedItemsForBulkExport, setSelectedItemsForBulkExport] = useState([]);

  const validate = (data) => {
    const errors = {};

    if (!data.carrierName.trim()) {
      errors.carrierName = 'carrier name is required';
    }
    if (!data.carrierGroup) {
      errors.carrierGroup = 'carrier group is required';
    }
    if (!data.carrierRegion.trim()) {
      errors.carrierRegion = 'carrier region is required';
    }
    if (!data.batch) {
      errors.batch = 'batch is required';
    }
    if (!data.carrierIp) {
      errors.carrierIp = 'carrier ip is required';
    } else if (isValidIPAddress(data.carrierIp) === false) {
      errors.carrierIp = 'not a valid ip';
    }
    if (!data.carrierPort) {
      errors.carrierPort = 'carrier port is required';
    }
    if (data.isCarrierCredentialsActive) {
      if (!data.username.trim()) {
        errors.username = 'username is required';
      }
      if (!data.password.trim()) {
        errors.password = 'password is required';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      carrierId: params?.id,
      inwardId: '',
      outwardId: '',
      name: '',
      description: '',
      carrierName: '',
      carrierGroup: '',
      carrierRegion: '',
      batch: '',
      carrierIp: '',
      carrierPort: '',
      isCarrierCredentialsActive: false,
      username: '',
      password: '',
      enable: false,
    },
    validate,
    onSubmit: () => {
      setDataSubmitting(true);
      if (show?.type === 'add-batch') {
        const data = {
          type: 'telephony_vendor_batches',
          attributes: {
            carrier_id: params?.id,
            inward_carrier_package_id: formik.values.inwardId,
            outward_carrier_package_id: formik.values.outwardId,
            name: formik.values.name,
            description: formik.values.description,
          },
        };

        AddBatch(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Batch created : You have successfully created batch',
              type: 'success',
            });
            formik.resetForm();
            setShow({ isVisible: false, type: '' });
            setRefresh(!refresh);
          })
          ?.catch((error) => {
            if (error?.response?.status === 500 || error?.response?.status === 404) {
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
          });
      }

      if (show?.type === 'edit-carrier') {
        const data = {
          type: 'telephony_vendor_carriers',
          id: parseInt(show?.carrierId, 10),
          attributes: {
            carrier_group_id: formik.values.carrierGroup,
            name: formik.values.carrierName,
            region: formik.values.carrierRegion,
            ip: formik.values.carrierIp,
            port: formik.values.carrierPort,
            is_authentication_required: formik.values.isCarrierCredentialsActive,
            username: formik.values.username,
            password: formik.values.password,
            is_enabled: formik.values.enable,
          },
        };
        UpdateCarrier(data, show?.carrierId)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Carrier created : You have successfully created carrier',
              type: 'success',
            });
            formik.resetForm();
            setShow({ isVisible: false, type: '' });
            setRefresh(!refresh);
          })
          ?.catch((error) => {
            setToastAction({
              isVisible: true,
              type: 'failed',
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong!',
              statusCode: error?.response.status,
            });
          })
          .finally(() => {
            setDataSubmitting(false);
          });
      }
    },
  });

  const deleteBatch = () => {
    setDataSubmitting(true);

    DeleteBatch(show?.batchId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Batch Deleted : You have successfully Deleted the batch',
          type: 'success',
        });
        setShow({ isVisible: false, type: '' });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Something went wrong!',
          statusCode: error?.response.status,
        });
      })
      .finally(() => {
        setDataSubmitting(false);
      });
  };

  const getBatches = () => {
    GetPaginatedBatches(searchTerm, params?.id).then((response) => {
      setPaginatedBatches(response);
    });
  };

  const handleBulkExport = (data, type) => {
    ExportBatch(data, type)
      .then((res) => {
        const blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Batch.csv'; // Set the desired file name
        // Trigger the click event to start the download
        a.click();
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Something went wrong!',
          statusCode: error?.response.status,
        });
      });
  };

  const handleBulkSelection = (selectedGroup) => {
    const existingItem = selectedItemsForBulkExport.find(
      (group) => group?.id === selectedGroup?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkExport.filter(
        (group) => group?.id !== selectedGroup?.id
      );
      setSelectedItemsForBulkExport(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkExport([...selectedItemsForBulkExport, selectedGroup]);
    }
  };

  useEffect(() => {
    if (carrierDetails?.id) {
      formik.setFieldValue('carrierName', carrierDetails?.attributes?.name);
      formik.setFieldValue('carrierRegion', carrierDetails?.attributes?.region);
      formik.setFieldValue('carrierGroup', carrierDetails?.attributes?.carrier_group_id);
      formik.setFieldValue('batch', carrierDetails?.attributes?.batches_count);
      formik.setFieldValue('carrierIp', carrierDetails?.attributes?.ip);
      formik.setFieldValue('carrierPort', carrierDetails?.attributes?.port);
      formik.setFieldValue(
        'isCarrierCredentialsActive',
        carrierDetails?.attributes?.is_authentication_required
      );
      formik.setFieldValue('username', carrierDetails?.attributes?.username);
      formik.setFieldValue('password', carrierDetails?.attributes?.password);
      formik.setFieldValue('enable', carrierDetails?.attributes?.enable);
    }
  }, [carrierDetails]);

  useEffect(() => {
    ListAllCarrierGroups({ searchTerm })?.then((response) => {
      setAllCarrierGroups(response?.data);
    });
  }, []);

  useEffect(() => {
    getBatches();
  }, [searchTerm, dataSubmitting]);

  useEffect(() => {
    GetCarrier(params?.id).then((response) => {
      setCarrierDetails(response?.data);
    });
  }, []);

  useEffect(() => {
    GetCarrierPlans('incoming').then((response) => {
      setIncomingPlans(response?.data);
    });
  }, []);

  useEffect(() => {
    GetCarrierPlans('outgoing').then((response) => {
      setOutgoingPlans(response?.data);
    });
  }, []);

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
                        <SideMenu active={1} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h5 className="mb-0 fs-15px">
                          <a href="/comm-telephony/vendor-carriers/">Carriers</a> -{' '}
                          {carrierDetails?.attributes?.name}/ Batch
                        </h5>
                        <p className="mb-0 fs-12px">
                          <b>{carrierDetails?.attributes?.batches_count}</b> Batch available
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search Batch"
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                            clearBtn={() => {
                              setSearchTerm('');
                            }}
                            searchTerm={searchTerm}
                          />
                        </div>
                        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex gap-3 align-items-center justify-content-start justify-content-sm-between justify-content-md-end">
                          <a
                            href="/#"
                            // data-bs-toggle="modal"
                            // data-bs-target="#newBatchModal"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px plan-btn-mob"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-batch' });
                            }}
                          >
                            Add Batch
                          </a>
                          <div className="dropdown">
                            <a href="/#" data-bs-toggle="dropdown">
                              <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                <img src="/assets/dot-menu-black.svg" alt="# " />
                              </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
                              <a href="/#" data-bs-toggle="dropdown">
                                {' '}
                              </a>
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-3 px-4"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleBulkExport(selectedItemsForBulkExport, 'csv');
                                  }}
                                >
                                  <img className="me-2" src="/assets/export-black.svg" alt="" />
                                  Export
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div />
                      </div>

                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="check-box">
                                  <input type="checkbox" id="batchName" />
                                  <label className="text-primary mb-0" htmlFor="batchName">
                                    Batch name
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Lot</th>
                              <th scope="col">DID/TF Count</th>
                              <th scope="col">Channels</th>
                              <th scope="col">MRC / MRC(Inc)</th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedBatches?.data?.map((batch, index) => (
                              <VendorCarrierBatchList
                                key={index}
                                batchId={batch?.id}
                                batchName={batch?.attributes?.name}
                                lot={`${batch?.attributes?.lots_count} Lot`}
                                tfCount={`${batch?.attributes?.did_count}/${batch?.attributes?.tf_count}`}
                                channels={batch?.attributes?.channel_count}
                                mrc={`${batch?.attributes?.total_mrc}/${batch?.attributes?.total_included_mrc}`}
                                type="---"
                                setShow={setShow}
                                carrierId={params?.id}
                                handleBulkSelection={handleBulkSelection}
                                selectedItemsForBulkExport={selectedItemsForBulkExport}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* <!-- pagination --> */}
                      <div className="d-flex flex-row align-items-center shadow-1 p-3 rounded mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <span className="bg-blue-lily border-0 rounded h-4 w-4 d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold">
                            5
                          </span>{' '}
                          Records per page
                        </div>
                        <div className="ms-auto">
                          <nav aria-label="Page navigation contact">
                            <ul className="pagination">
                              <li className="page-item">
                                <a
                                  className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                                  href="/#"
                                  aria-label="Previous"
                                >
                                  <img src="/assets/pagination-left.svg" alt="" />
                                </a>
                              </li>
                              <li className="page-item">
                                <a
                                  className="page-link border-0 rounded fw-semibold text-blue-active"
                                  href="/#"
                                >
                                  1
                                </a>
                              </li>
                              <li className="page-item">
                                <a
                                  className="page-link border-0 rounded fw-semibold text-primary"
                                  href="/#"
                                >
                                  2
                                </a>
                              </li>

                              <li className="page-item">
                                <a
                                  className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                                  href="/#"
                                  aria-label="Previous"
                                >
                                  <img src="/assets/pagination-right.svg" alt="" />
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                    {/* <!-- pagination end --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CarrierAddNewBatchModal
        show={show?.isVisible && show?.type === 'add-batch'}
        setShow={setShow}
        formik={formik}
        incomingPlans={incomingPlans}
        outgoingPlans={outgoingPlans}
        carrierName={carrierDetails?.attributes?.name}
      />

      <Delete
        heading="Delete Batch"
        part1="This action will Delete the batch"
        part2={show?.carrierPlan?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-batch'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteBatch}
      />

      <EditCarrier
        show={show?.isVisible && show?.type === 'edit-carrier'}
        setShow={setShow}
        formik={formik}
        allCarrierGroups={allCarrierGroups}
        dataSubmitting={dataSubmitting}
        carrierDetails={carrierDetails}
      />

      <BatchDetails setShow={setShow} />
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

export default VendorCarrierBatch;
