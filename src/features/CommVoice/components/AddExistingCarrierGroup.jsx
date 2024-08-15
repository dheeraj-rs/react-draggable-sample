/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import React, { useState, useEffect } from 'react';
import CheckBoxCheck from '../../../common/components/common/CheckBoxCheck';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Checkbox from '../../../common/components/forms/Checkbox';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function AddExistingCarrierGroup({
  show,
  carriersselected = [],
  setCarriersselected,
  onClose,
  handleAddCarriersToGroup,
  dataSubmitting,
  groupName = '',
  unPaginatedCarriersList,
}) {
  const [key, setKey] = useState('');

  const [isAllSelected, setIsAllSelected] = useState(false);

  const [searchResult, setSearchResult] = useState([]);

  const addOrRemoveValue = (value) => {
    if (carriersselected.some((e) => e.id === value?.id)) {
      setCarriersselected(carriersselected.filter((item) => item?.id !== value?.id));
    } else {
      setCarriersselected([...carriersselected, value]);
    }
  };

  const handleClose = () => {
    setCarriersselected([]);
    setIsAllSelected(false);
    setKey('');
    onClose();
  };

  const handleSearch = () => {
    const matchingNames = unPaginatedCarriersList?.filter((carrier) =>
      carrier.attributes.name.toLowerCase().includes(key.toLowerCase())
    );
    setSearchResult(matchingNames);
  };

  useEffect(() => {
    handleSearch();
  }, [key]);

  useEffect(() => {
    if (isAllSelected === true) {
      const data = [];
      unPaginatedCarriersList?.map((carrier) => data.push({ id: carrier?.id, type: 'carriers' }));
      setCarriersselected(data);
    }
  }, [isAllSelected]);

  useEffect(() => {
    if (unPaginatedCarriersList?.length === carriersselected?.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [unPaginatedCarriersList, carriersselected]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'show' : 'hiding'}`}
        style={show ? { display: 'block' } : {}}
        id="addExistingCarriers"
        aria-labelledby="addExistingCarriersLabel"
      >
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-14px text-primary fw-medium mb-0">
              <b>Add Carriers to group</b> - {groupName}
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => {
                handleClose();
              }}
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="mb-0">{carriersselected?.length} Carriers selected</p>
            <CheckBoxCheck
              title="Select All"
              id="selectAllCheck"
              onClick={() => {
                setIsAllSelected(!isAllSelected);
                if (isAllSelected === true) {
                  setCarriersselected([]);
                }
              }}
              checked={isAllSelected}
            />
          </div>
          <div className="w-100 w-md-auto mt-2 mb-3">
            <SearchWithBorder
              placeholderText="Search carrier"
              onChange={(e) => {
                setKey(e.target.value);
              }}
              clearBtn={() => {
                setKey('');
              }}
              searchTerm={key}
            />
          </div>
          <div style={{ height: '435px', overflow: 'scroll' }}>
            {(key !== '' ? searchResult : unPaginatedCarriersList)?.map((carrier, index) => (
              <div className="mb-3 carrier-group-selected" key={index}>
                <Checkbox
                  key={carrier?.id}
                  title={carrier?.attributes?.name}
                  id={carrier?.id}
                  onClick={() => {
                    addOrRemoveValue({
                      id: carrier?.id,
                      type: 'telephony_vendor_carriers',
                    });
                  }}
                  checked={carriersselected.some((e) => e.id === carrier?.id)}
                  onChange={() => {}}
                />
              </div>
            ))}
            {key !== '' && searchResult?.length === 0 ? <NoMatchingRecords /> : null}
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-3">
            <button
              id="addPropertyButton"
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
              onClick={() => {
                handleAddCarriersToGroup();
                setKey('');
              }}
              disabled={carriersselected?.length === 0 || dataSubmitting}
            >
              {dataSubmitting ? 'Adding...' : 'Add Carrier'}
            </button>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default AddExistingCarrierGroup;
