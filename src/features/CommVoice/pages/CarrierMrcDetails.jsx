import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CarrierMRCList from '../components/CarrierMRCList';
import Pagination from '../components/pagination/Pagination';
import {
  CsvExportLotMrc,
  DeleteCarrierGroupUsage,
  ListAllLotMrc,
  ListPaginatedLotMrc,
} from '../../../common/api-collection/Telephony/CarrierGroupsUsage';
import DeleteCallerListModal from '../../CommVoiceAdmin/components/modals/DeleteCallerListModal';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function CarrierMrcDetails() {
  const [toggleFillter, setToggleFilter] = useState(false);
  const [fillterActive, setFillterActive] = useState(false);
  const [mrcListData, setMrcListData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [page, setPage] = useState();
  const [selectedItemsForBulkSelection, setSelectedItemsForBulkSelection] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [pageLoading, setPageLoading] = useState({ isLoading: false, type: '' });

  const temp = [];

  const handleFillterApply = () => {
    setFillterActive(!fillterActive);
    setToggleFilter(false);
  };
  const handleFillterClose = () => {
    setFillterActive(false);
    setToggleFilter(false);
  };

  const formatDateTime = (dateTimeString) => {
    const formattedDateTime = moment(dateTimeString).format('DD MMM YYYY hh:mm A');
    return formattedDateTime;
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });

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

  const handleBulkExport = () => {
    if (selectedItemsForBulkSelection.length !== 0) {
      CsvExportLotMrc(selectedItemsForBulkSelection)
        .then((res) => {
          const blob = new Blob([res], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'batch.csv';
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .then(() => {});
    }
  };

  const handleDetete = () => {
    const carrierGroupId = show?.carrier?.id;
    DeleteCarrierGroupUsage(carrierGroupId)
      .then(() => {})
      .finally(() => {
        setShow({ isVisible: false, type: '' });
      });
  };

  const handlePaginationFunction = (data) => {
    setPage(parseInt(data, 10));
  };

  const styles = {
    position: 'absolute',
    inset: '0px auto auto 0px',
    margin: '0px',
    transform: 'translate3d(756px, 224.5px, 0px)',
  };

  useEffect(() => {
    if (isAllSelected) {
      mrcListData?.map((e) => {
        temp.push({ type: 'carrierMRCList', id: parseInt(e?.id, 10) });
        return null;
      });

      setSelectedItemsForBulkSelection(temp);
    } else {
      setSelectedItemsForBulkSelection([]);
    }
  }, [isAllSelected]);

  useEffect(() => {
    setPageLoading({ isLoading: true, type: '' });
    ListPaginatedLotMrc(page, searchTerm)
      .then((response) => {
        setMrcListData(response?.data);
        setPaginationData(response.meta.pagination);
        setPageLoading({ isLoading: false, type: '' });
      })
      .finally(() => {});
  }, [page, searchTerm]);

  useEffect(() => {
    ListAllLotMrc()
      .then((response) => {
        setPaginationData(response.meta.pagination);
      })
      .finally(() => {});
  }, [page]);

  return (
    <>
      <Layout
        title="Gsoft admin"
        headerTitle="Gsoft admin"
        favIcon="/assets/favIcons/favicon-admin.ico"
      >
        <div className="wrapper">
          <div className="bg-gray-bright w-100">
            <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
                <div className="d-flex gap-2 left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                  <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                    <Link
                      to="/comm-telephony/vendor-plans-and-packges/"
                      className="d-flex justify-content-center"
                    >
                      <img src="/assets/leftback.svg" alt="" />
                    </Link>
                  </div>
                  <div className="roles-top">
                    <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                      <Link
                        to="/comm-telephony/vendor-plans-and-packges/"
                        className="d-block d-lg-none"
                      >
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </Link>{' '}
                      Vendor Plan & Packages
                    </h5>
                  </div>
                </div>
                <div className="pb-3 mt-1">
                  <div className="row">
                    <div className="col-lg-3 col-sm-3 d-none d-lg-block ">
                      <div className="h-100 shadow-6 rounded">
                        <div className="scroll-custom scroll-carrier pt-2">
                          <SideMenu active={1} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-sm-12">
                      <div className="scroll-custom scroll-carrier carrier-pad">
                        <div className="d-flex gap-2 align-items-center mb-3">
                          <h5 className="mb-0 fs-14px">
                            <a
                              href="#/"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              Carriers
                            </a>{' '}
                            - Bharati banglore / MRC Details
                          </h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row px-1">
                          <div className="col-lg-4 col-sm-4 col-md-4 col-10">
                            <SearchWithBorder
                              placeholderText="Search Group"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-2 col-sm-3 col-2 col-md-2 filter-col">
                            <div
                              id="roleSelection"
                              className={`filter-wrap ${fillterActive ? 'd-none' : ''}`}
                            >
                              <a
                                href="#/"
                                className={`filter-btn p-10px fw-medium rounded-3 border role-selection ${
                                  toggleFillter ? 'role-selection show role-selection-active' : ''
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setToggleFilter(!toggleFillter);
                                }}
                              >
                                <span className="filter-text">Filter</span>
                                <img
                                  className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                                  src="/assets/black-filter.svg"
                                  alt=""
                                />
                              </a>

                              <ul
                                className={`dropdown-menu p-4 ${toggleFillter ? 'show' : 'd-none'}`}
                                style={toggleFillter ? styles : {}}
                              >
                                <div className="d-flex flex-column">
                                  <p className="mb-0">Type</p>
                                  <select
                                    className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                    aria-label="Default select example"
                                  >
                                    <option selected>All</option>
                                    <option value="1">Organization admin</option>
                                    <option value="2">Product admin</option>
                                    <option value="3">Agent</option>
                                    <option value="4">Supervisor</option>
                                  </select>
                                </div>
                                <div className="d-flex flex-column mt-3 filter-title">
                                  <p className="mb-0">Enabled/disabled</p>
                                  <select
                                    className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                    aria-label="Default select example"
                                  >
                                    <option selected>All</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                  </select>

                                  <div className="setting-buttons d-flex align-items-end mt-4">
                                    <button
                                      id="applyBtn"
                                      type="button"
                                      className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                      onClick={handleFillterApply}
                                    >
                                      Apply
                                    </button>
                                    <a
                                      href="#/"
                                      type="button"
                                      id="roleCancel"
                                      className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleFillterClose();
                                      }}
                                    >
                                      Clear
                                    </a>
                                  </div>
                                </div>
                              </ul>
                            </div>
                            <div id="selectedRole" className={`${fillterActive ? '' : 'd-none'}`}>
                              <a
                                href="#/"
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
                                  onClick={handleFillterApply}
                                />
                              </a>
                            </div>
                          </div>

                          <div className="col-lg-4 col-10 col-md-5 col-sm-4">
                            <h5 className="fs-13px bg-chat-blue p-3 rounded px-2 justify-content-center d-flex mt-sm-0 mt-4">
                              Total MRC/MRC(Inc) - 7500/7000
                            </h5>
                          </div>
                          <div className="col-lg-2 col-sm-1 col-md-1 col-2 mt-3 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-end justify-content-lg-end">
                            <div className="dropdown">
                              <a
                                href="#/"
                                className="hor-dots ms-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <img src="/assets/3-dots-horizontal.svg" alt="" />
                              </a>
                              <ul className="dropdown-menu dropdown-menu-group py-2 px-1 mt-1">
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item py-2 px-3"
                                    onClick={handleBulkExport}
                                    disabled={selectedItemsForBulkSelection.length === 0}
                                  >
                                    <img src="/assets/export-black.svg" alt="" /> Export
                                  </button>
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
                                      id="groupId"
                                      checked={
                                        mrcListData?.length ===
                                        selectedItemsForBulkSelection?.length
                                      }
                                      onChange={() => {}}
                                    />
                                    <label
                                      className="text-primary mb-0"
                                      htmlFor="groupId"
                                      onClick={() => {
                                        setIsAllSelected(!isAllSelected);
                                      }}
                                    >
                                      Batch
                                    </label>
                                  </div>
                                </th>
                                <th scope="col">Lot MRC</th>
                                <th scope="col">Lot MRC(Inc)</th>
                                <th scope="col">Last Updated</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pageLoading?.isLoading && (
                                <tr>
                                  <td />
                                  <td />
                                  <td>
                                    <SpinningLoader />
                                  </td>
                                  <td />
                                  <td />
                                </tr>
                              )}
                              {!pageLoading?.isLoading &&
                                mrcListData.map((data, index) => (
                                  <CarrierMRCList
                                    key={index}
                                    groupId={data.id}
                                    carrier={`Batch-${data.attributes.lot_id}`}
                                    batch={Number(
                                      data.attributes.monthly_free_usage_amount
                                    ).toFixed(0)}
                                    mrc={Number(data.attributes.monthly_recurring_cost).toFixed(0)}
                                    createdDate={formatDateTime(data.attributes.updated_at)}
                                    carrierData={data}
                                    setShow={setShow}
                                    formik={formik}
                                    handleBulkSelection={handleBulkSelection}
                                    selectedItemsForBulkAction={selectedItemsForBulkSelection}
                                  />
                                ))}
                            </tbody>
                          </table>
                          {mrcListData.length === 0 && !pageLoading?.isLoading && (
                            <NoMatchingRecords />
                          )}
                        </div>
                        {mrcListData.length > 0 && !pageLoading?.isLoading && (
                          <Pagination
                            count={paginationData.per_page}
                            totalPages={paginationData.total_pages}
                            currentPage={paginationData.current_page}
                            handlePagination={handlePaginationFunction}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <DeleteCallerListModal
        show={show.type === 'delete-carrier' && show.isVisible}
        onClose={() => setShow({ isVisible: false, type: '' })}
        handleDeleteCallerList={handleDetete}
      />
    </>
  );
}

export default CarrierMrcDetails;
