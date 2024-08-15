/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';

function Selectbox({
  options,
  label,
  disabled,
  id,
  style2,
  search,
  placeholder,
  classs,
  onSelect,
}) {
  const [option, setOption] = useState(options);
  const [open, setOpen] = useState(false);
  const [firstOption, setFirstOption] = useState(option[0]);

  const SelectboxBorder = {
    border: '1px solid #afb5bf',
    height: '38px',
  };

  const SelectboxBorder2 = {
    border: '1px solid #829bcf',
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

  // dropdown click function

  const dropdownHandler = () => {
    setOpen(!open);
  };

  // function for changing option
  const optionChangeHandler = (e) => {
    const selectedOption = e.target.innerText;
    setFirstOption(selectedOption);
    setOpen(!open);

    // Call the provided onSelect callback with the selected option
    onSelect(selectedOption);
  };

  useEffect(() => {
    // close option when clicking outside

    const handler = () => {
      // if (!menuRef.current.contains(e.target)) {
      //   setOpen(false);
      // }
    };

    document.addEventListener('mousedown', handler);

    // close option when pressing escape button
    const escapePress = (e) => {
      if (e.keyCode === 27) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', escapePress);
  });

  return (
    <div>
      {label ? <label className="mb-1 text-primary fs-13px">{label}</label> : ''}
      <div
        className={`selectbox-selected-div rounded position-relative cursor-pointer bg-white ${
          disabled === 'true' ? 'disabled-style' : ''
        }`}
        id={id && id}
        style={style2 === 'true' ? SelectboxBorder2 : SelectboxBorder}
        ref={menuRef}
      >
        <p
          className="defaultText m-0 px-2 d-flex align-items-center ps-3"
          onClick={dropdownHandler}
          style={{ height: '100%', width: '100%', paddingRight: '30px !important' }}
        >
          {firstOption}
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
                  placeholderText={placeholder}
                  onChange={() => {}}
                  clearBtn={() => {}}
                />
              </div>
            ) : (
              ''
            )}
            <ul
              className="bg-white rounded-2 shadow scroll-custom p-2"
              id={id}
              style={search ? dropdownPositionOne : dropdownPosition}
            >
              {option.map((item, index) => (
                <li
                  key={index}
                  onClick={optionChangeHandler}
                  className={`cursor-pointer bg-titan-water-hover color-blue-active-hover rounded ${
                    classs || ''
                  }`}
                  style={{ padding: '10px' }}
                >
                  {item}
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
