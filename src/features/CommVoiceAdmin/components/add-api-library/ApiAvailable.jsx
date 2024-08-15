import React from 'react';
import moment from 'moment';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import ApiList from './ApiList';
import Pagination from '../../../CommVoice/components/pagination/Pagination';
import NoMatchingRecords from '../../../../common/components/NoMatchingRecords';
import SpinningLoader from '../../../../common/components/Loader/SpinningLoader';

function ApiAvailable({
  ApiListRow,
  setShow,
  searchTermApiList,
  setSearchTermApiList,
  paginatedData,
  handlePaginationFunction,
  loading,
  formik,
}) {
  const formatDate = (dateString) => {
    const momentDate = moment(dateString)?.format('DD MMM YYYY');
    return momentDate;
  };
  return (
    <div className="add-api-compaign">
      <div className="d-flex align-items-center justify-content-between row">
        <div className="col-lg-5 col-sm-7 col-12 mt-3 mt-sm-0 mb-3 mb-sm-0">
          <SearchWithBorder
            placeholderText="Search API"
            searchTerm={searchTermApiList}
            onChange={(e) => {
              e.preventDefault();
              setSearchTermApiList(e.target.value);
            }}
            clearBtn={() => {
              setSearchTermApiList('');
            }}
          />
        </div>
        <div className="col-lg-7 col-sm-5 col-12 d-flex justify-content-end gap-3">
          <a
            href="#/"
            onClick={() => setShow({ isVisible: true, type: 'add-api' })}
            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px black-btn-mobile"
          >
            Add API
          </a>
        </div>
      </div>

      {loading?.isLoading && loading?.type === 'list-Api-Library' ? (
        <div className="d-flex align-items-center m-3 justify-content-center">
          <SpinningLoader />
        </div>
      ) : null}

      {ApiListRow?.map((list, index) => (
        <div className="mt-4 mb-3" key={index}>
          <ApiList
            formik={formik}
            setShow={setShow}
            selectId={list?.id}
            name={list?.attributes?.name}
            type={list?.attributes?.type}
            primaryApi={list?.attributes?.primary_api_url}
            fallbackApi={list?.attributes?.fallback_api_url}
            isenabled={list?.attributes?.is_enabled}
            updatedat={formatDate(list?.attributes?.updated_at)}
            campaign={list?.attributes?.created_at}
          />
        </div>
      ))}

      {ApiListRow.length === 0 && !loading.isLoading ? <NoMatchingRecords /> : null}

      {ApiListRow.length !== 0 && paginatedData?.meta?.pagination != null && (
        <Pagination
          handlePagination={handlePaginationFunction}
          currentPage={paginatedData?.meta?.pagination?.current_page}
          totalPages={paginatedData?.meta?.pagination?.total_pages}
          count={paginatedData?.meta?.pagination?.per_page}
        />
      )}
    </div>
  );
}

export default ApiAvailable;
