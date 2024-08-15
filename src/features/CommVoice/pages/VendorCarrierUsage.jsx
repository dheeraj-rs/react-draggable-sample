import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SideMenu from '../components/common/SideMenu';
import VendorCarrierUsageList from './VendorCarrierUsageList';
import Pagination from '../components/pagination/Pagination';
import {
  CSVExportCarrierGroupUsage,
  ListAllCarrierGroupUsages,
  ListPaginatedCarrierGroups,
} from '../../../common/api-collection/Telephony/CarrierGroupsUsage';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function VendorCarrierUsage() {
  const [toggleFillter, setToggleFilter] = useState(false);
  const [fillterActive, setFillterActive] = useState(false);
  const [usageData, setUsageData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [pageLoading, setPageLoading] = useState({ isLoading: false, type: '' });
  const [page, setPage] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const handleApply = () => {
    setFillterActive(!fillterActive);
    setToggleFilter(false);
  };
  const handleClose = () => {
    setFillterActive(false);
    setToggleFilter(false);
  };

  const formatDateTime = (dateTimeString) => {
    const formattedDateTime = moment(dateTimeString).format('DD MMM YYYY hh:mm A');
    return formattedDateTime;
  };

  const handleBulkExport = () => {
    CSVExportCarrierGroupUsage(usageData)
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
    ListAllCarrierGroupUsages()
      .then((response) => {
        setPaginationData(response.meta.pagination);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    setPageLoading({ isLoading: true, type: '' });
    ListPaginatedCarrierGroups(page, searchTerm)
      .then((response) => {
        setUsageData(response?.data);
        setPageLoading({ isLoading: false, type: '' });
      })
      .finally(() => {});
  }, [page, searchTerm]);

  return (
    <Layout
      title="Gsoft admin"
      headerTitle="Gsoft admin"
      favIcon="/assets/favIcons/favicon-admin.ico"
    >
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link to="/comm-telephony/" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                    <Link to="/comm-telephony/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    Vendor Operations
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
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h5 className="mb-0 fs-15px">
                          <a href="/app/comm-telephony/vendor-carriers">Carrier Group</a> - Bharati
                          banglore / Usage
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-2 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10 vendor-mobile-search">
                          <SearchWithBorder
                            placeholderText="Search User"
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col">
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
                                <p className="mb-0">Region</p>
                                <select
                                  className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                  aria-label="Default select example"
                                >
                                  <option defaultValue="0">All</option>
                                  <option defaultValue="1">Organization admin</option>
                                  <option defaultValue="2">Product admin</option>
                                  <option defaultValue="3">Agent</option>
                                  <option defaultValue="4">Supervisor</option>
                                </select>
                              </div>
                              <div className="d-flex flex-column">
                                <p className="mb-0">carrier group</p>
                                <select
                                  className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                  aria-label="Default select example"
                                >
                                  <option defaultValue="0">All</option>
                                  <option defaultValue="1">Active</option>
                                  <option defaultValue="2">Inactive</option>
                                </select>
                              </div>
                              <div className="d-flex flex-column mt-2">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                  aria-label="Default select example"
                                >
                                  <option defaultValue="0">All</option>
                                  <option defaultValue="1">Active</option>
                                  <option defaultValue="2">Inactive</option>
                                </select>

                                <div className="setting-buttons d-flex align-items-end mt-4">
                                  <button
                                    id="applyBtn"
                                    type="button"
                                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                    onClick={handleApply}
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
                                      handleClose();
                                    }}
                                  >
                                    Cancel
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
                                onClick={handleApply}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-end justify-content-lg-end">
                          <div className="dropdown">
                            <a
                              href="#/"
                              className="hor-dots"
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
                                <a
                                  href="#/"
                                  className="dropdown-item py-2 px-3"
                                  onClick={handleBulkExport}
                                >
                                  <img src="/assets/export-black.svg" alt="" /> Export
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex mt-3 mb-3 gap-4 rounded align-items-center bg-secondary-light-blue p-3">
                        <h6 className="mb-0">
                          Usage: <b>300</b>
                        </h6>
                        <h6 className="mb-0">
                          Total MRC: <b>8000</b>{' '}
                          <a href="/app/comm-telephony/carrier-mrc-details">
                            <img className="ps-2" src="/assets/actions-new.svg" alt="" />
                          </a>
                        </h6>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">Particular</th>
                              <th scope="col">Transaction Date</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Credit Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pageLoading?.isLoading && (
                              <tr>
                                <td />
                                <td />
                                <td>
                                  <SpinningLoader />{' '}
                                </td>
                                <td />
                                <td />
                              </tr>
                            )}
                            {!pageLoading?.isLoading &&
                              usageData?.map((data, index) => (
                                <VendorCarrierUsageList
                                  key={index}
                                  particular={data.attributes.type}
                                  transactionDate={formatDateTime(data.attributes.created_at)}
                                  amount={Number(data?.attributes?.amount).toFixed(1)}
                                  creditBalance={Number(data.attributes.total).toFixed(1)}
                                />
                              ))}
                          </tbody>
                        </table>
                        {usageData.length === 0 && !pageLoading?.isLoading && <NoMatchingRecords />}
                      </div>
                      {usageData.length > 0 && !pageLoading?.isLoading && (
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
  );
}

export default VendorCarrierUsage;
