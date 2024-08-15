import React from 'react';

function Search() {
  return (
    <div className="input-group  custom-search-sidebar  rounded mt-3">
      <span className="input-group-text h-7 bg-white border-0" id="basic-addon1">
        <img src="/assets/search-form.svg" alt="" />
      </span>
      <input
        type="search"
        className="form-control h-7 border-0 bg-white search-user-list search-input"
        placeholder="Search"
        aria-label="search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
}

export default Search;
