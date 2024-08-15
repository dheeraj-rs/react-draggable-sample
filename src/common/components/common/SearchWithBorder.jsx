import React from 'react';

function SearchWithBorder({ placeholderText, onChange, searchTerm = '', clearBtn }) {
  const closeStyle = {
    width: '10px',
    height: '10px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '10px',
    zIndex: '99',
    display: 'none',
    cursor: 'pointer',
  };

  // useEffect(() => {
  //   const customSearch = document.querySelectorAll('.custom_search');
  //   const searchClose = document.querySelectorAll('.search-clear');

  //   customSearch?.forEach((item) => {
  //     item.addEventListener('keyup', () => {
  //       if (item.value.length >= 1) {
  //         item.nextElementSibling.style.display = 'block';
  //       } else {
  //         item.nextElementSibling.style.display = 'none';
  //       }
  //     });
  //   });

  //   searchClose?.forEach((item) => {
  //     item.addEventListener('click', () => {
  //       item.previousElementSibling.value = '';
  //       item.style.display = 'none';
  //     });
  //   });
  // });

  return (
    <div
      className="input-group search-input-group border-0 custom-search-sidebar-border rounded overflow-hidden"
      style={{ height: '37px' }}
    >
      <span className="input-group-text border-0 bg-white  h-6" id="basic-addon1">
        <img src="/assets/search-form.svg" alt="" />
      </span>
      <input
        type="text"
        className="form-control border-0 px-0 bg-white search-input pe-5 custom_search"
        style={{ height: '3rem' }}
        value={searchTerm || ''}
        placeholder={placeholderText}
        onChange={onChange}
        aria-label="search"
        aria-describedby="basic-addon1"
        id=""
      />
      <img
        src="/bot-admin/search-close.svg"
        alt=""
        className={`search-close search-clear ${searchTerm ? 'd-block' : 'd-none'}`}
        style={closeStyle}
        id=""
        onClick={() => clearBtn('')}
      />
    </div>
  );
}

export default SearchWithBorder;
