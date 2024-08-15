import React, { useEffect, useRef, useState } from 'react';
import '../../../../styles/scss/components/selectbox.scss';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';

function Selectbox({ search = '', options = [], onChange, getName, id }) {
  const [open, setOpen] = useState(false);

  const SelectboxBorder = {
    border: '1px solid #afb5bf',
    height: '38px',
  };

  const selectboxImage = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  };

  const dropdownPosition = {
    position: 'absolute',
    top: 'calc(100% + 1px)',
    width: '100%',
    left: '0',
    zIndex: '2',
    maxHeight: '200px',
  };

  const dropdownPositionOne = {
    position: 'absolute',
    top: 'calc(100% + 1px)',
    width: '100%',
    left: '0',
    zIndex: '2',
    maxHeight: '200px',
    marginTop: '52px',
  };

  const menuRef = useRef();

  const dropdownHandler = () => {
    setOpen(!open);
  };

  const optionChangeHandler = (e) => {
    onChange(e);
    setOpen(!open);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    const escapePress = (e) => {
      if (e.keyCode === 27) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', escapePress);
  });

  return (
    <div>
      <div
        className="selectbox-selected-div rounded position-relative cursor-pointer bg-white"
        style={SelectboxBorder}
        ref={menuRef}
      >
        <p
          className="defaultText m-0 px-2 d-flex align-items-center ps-3"
          onClick={dropdownHandler}
          style={{ height: '100%', width: '100%', paddingRight: '30px !important' }}
        >
          {getName(id)}
        </p>
        <img
          className="selectbox-arrow"
          src="/assets/call-flows-hours/CaretDown.svg"
          alt=""
          style={selectboxImage}
        />
        {open ? (
          <div>
            {search ? (
              <div className="p-3 bg-white">
                <SearchWithBorder
                  placeholderText="Select List"
                  onChange={() => {}}
                  clearBtn={() => {}}
                />
              </div>
            ) : (
              ''
            )}
            <ul
              className="bg-white rounded-2 shadow scroll-custom p-2"
              style={search ? dropdownPositionOne : dropdownPosition}
            >
              {options.map((item, index) => (
                <li
                  key={index}
                  onClick={() => optionChangeHandler(item?.id)}
                  className={`cursor-pointer bg-titan-water-hover color-blue-active-hover rounded ${
                    item?.id ? 'active' : ''
                  }`}
                  style={{ padding: '10px' }}
                >
                  {item?.attributes?.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Selectbox;
