import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import normalize from 'json-api-normalizer';

import Layout from '../../../common/layout';
import AddPlanList from '../components/AddPlanList';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import Pagination from '../components/pagination/Pagination';
import { ListPaginatedCarrierPlanRateSheets } from '../../../common/api-collection/Telephony/CarrierPlanRateSheets';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import { GetCarrierPlan } from '../../../common/api-collection/Telephony/CarrierPlans';

function VendorCarrierExportPreview() {
  const params = useParams();

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [toastAction, setToastAction] = useState({
    isVisible: false,
    type: '',
    message: '',
  });

  const [page, setPage] = useState();

  const [paginatedCarriersPlanRates, setPaginatedCarriersPlanRates] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [normalizedData, setNormalizedData] = useState();

  const [carrierPlanDetails, setCarrierPlanDetails] = useState();

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const validate = () => {};

  const formik = useFormik({
    initialValues: {
      country: '',
      state: '',
      city: '',
      areaCode: '',

      buyRate: '',
      buyEffectiveOn: '',
      buyStarPulse: '',
      buyNextPluse: '',

      sellRate: '',
      sellEffectiveOn: '',
      sellStarPulse: '',
      sellNextPluse: '',

      enable: false,

      selectField: '',
      setValueTo: '',
      startPulse: '',
      nextPulse: '',
      effectiveDate: '',
      applyValueFilterByType: '',
      applyValueFilterBySelectType: '',
    },
    validate,
    onSubmit: () => {},
  });

  useEffect(() => {
    setPaginatedCarriersPlanRates({
      isLoading: true,
    });

    ListPaginatedCarrierPlanRateSheets(searchTerm, page, '', '', '', '', '', '')?.then(
      (response) => {
        setPaginatedCarriersPlanRates({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });

        const normalized = normalize(response);
        setNormalizedData(normalized);
      }
    );
  }, [searchTerm, page]);

  useEffect(() => {
    GetCarrierPlan(params.id)?.then((response) => {
      setCarrierPlanDetails(response);
    });
  }, []);
  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="row carrier-pad mb-3 pt-3 pt-sm-0">
                <div className="col-12 col-sm-6 d-flex align-items-center">
                  <div className="bg-dark-gray-color left-widget d-none d-sm-block">
                    <Link
                      to={`/comm-telephony/vendor-carrier-add-plan/${params?.id}`}
                      className="d-flex justify-content-center"
                    >
                      <img src="/assets/leftback.svg" alt="" />
                    </Link>
                  </div>
                  <div>
                    <h5 className="fs-16px fw-500 d-flex gap-3 mb-0">
                      <Link to="/comm-telephony/vendor-carrier-plan/" className="d-block d-sm-none">
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </Link>{' '}
                      {carrierPlanDetails?.data?.attributes?.name} (Export Preview)
                    </h5>
                  </div>
                </div>
              </div>

              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex align-items-center mt-lg-2 mt-2 mt-sm-4 mb-3 row">
                        <div className="col-10 col-sm-4 col-lg-3">
                          <SearchWithBorder
                            placeholderText="Search"
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                            clearBtn={() => {
                              setSearchTerm('');
                            }}
                            searchTerm={searchTerm}
                          />
                        </div>
                        <div className="col-2 col-sm-2 col-lg-2 filter-col d-flex">
                          <div
                            id="roleSelection"
                            className={`filter-wrap ${isFilterApplied ? 'd-none' : ''}`}
                          >
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
                                <p className="mb-0">Type</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
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
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
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
                                    onClick={() => {
                                      setIsFilterApplied(true);
                                    }}
                                  >
                                    Apply
                                  </button>
                                  <a
                                    href="/#"
                                    type="button"
                                    id="roleCancel"
                                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    Clear
                                  </a>
                                </div>
                              </div>
                            </ul>
                          </div>
                          <div id="selectedRole" className={isFilterApplied ? '' : 'd-none'}>
                            <a
                              href="/#"
                              className="p-10px rounded text-blue-active border border-blue-active position-relative"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsFilterApplied(false);
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

                        <div className="col-lg-7 col-sm-6 col-12 mt-3 mt-sm-0 text-end d-flex gap-3 align-items-center justify-content-between justify-content-start justify-content-sm-end">
                          <div className="mb-0 text-primary fw-medium ">Export </div>

                          <div>
                            <select
                              className="form-select form-control bg-white"
                              aria-label="Default select example"
                            >
                              <option selected>MS Excel</option>
                              <option value="1">Pdf</option>
                              <option value="2">word</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <a
                            href="/#"
                            id="export"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                            onClick={(e) => {
                              e.preventDefault();
                              setToastAction({
                                isVisible: true,
                                type: 'success',
                                message: 'You have successfully Exported',
                              });
                            }}
                          >
                            Export
                          </a>
                          <Link
                            to="/comm-telephony/vendor-carrier-plan/"
                            type="button"
                            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px"
                          >
                            Cancel
                          </Link>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">Area Code</th>
                              <th scope="col">Buy Rate</th>
                              <th scope="col">Start/Next Pulse(S)</th>
                              <th scope="col">Effective On</th>
                              <th scope="col">Sell Rate</th>
                              <th scope="col">Start/Next Pulse(S)</th>
                              <th scope="col">Effective On</th>
                              <th scope="col">Country</th>
                              <th scope="col">State</th>
                              <th scope="col">City</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedCarriersPlanRates?.isLoading && (
                              <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>
                                  {' '}
                                  <SpinningLoader />
                                </td>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                              </tr>
                            )}
                            {paginatedCarriersPlanRates?.data?.length > 0 &&
                              paginatedCarriersPlanRates?.data?.map((plan) => (
                                <AddPlanList
                                  carrierId={plan?.id}
                                  areaCode={plan?.attributes?.area_code}
                                  buyRate="---"
                                  startPluse="---"
                                  sellRate={parseFloat(plan?.attributes?.rate, 10).toFixed(2)}
                                  startPulseSell={plan?.attributes?.start_pulse}
                                  nextPulseSell={plan?.attributes?.next_pulse}
                                  country={
                                    normalizedData?.country[plan?.attributes?.country_id]
                                      ?.attributes?.name
                                  }
                                  state={
                                    normalizedData?.state[plan?.attributes?.state_id]?.attributes
                                      ?.name
                                  }
                                  city={
                                    normalizedData?.city[plan?.attributes?.city_id]?.attributes
                                      ?.name
                                  }
                                  effectiveOnBuy="---"
                                  effectiveOnSell={plan?.attributes?.effective_on}
                                  isEnabled={plan?.attributes?.is_enabled}
                                  setShow={() => {}}
                                  formik={formik}
                                  plan={plan}
                                  handleBulkSelection={() => {}}
                                  selectedItemsForBulkSelection={[]}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {paginatedCarriersPlanRates?.meta?.pagination != null && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedCarriersPlanRates?.meta?.pagination?.current_page}
                          totalPages={paginatedCarriersPlanRates?.meta?.pagination?.total_pages}
                          count={paginatedCarriersPlanRates?.meta?.pagination?.per_page}
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

export default VendorCarrierExportPreview;
