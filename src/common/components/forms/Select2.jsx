/* eslint-disable react/jsx-no-bind */
import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

function Select2({ show, options, selectedOptions, onSelect, onRemove }) {
  if (show) {
    return (
      <Multiselect
        className="basic-multi-select"
        isObject={false}
        onKeyPressFn={function noRefCheck() {}}
        onRemove={(item) => onRemove(item)}
        onSearch={function noRefCheck() {}}
        onSelect={(item) => onSelect(item)}
        customCloseIcon
        showCheckbox
        selectedValues={selectedOptions}
        options={options}
        style={{
          chips: {
            background: '#DFE4F6',
            borderRadius: '5px',
            color: '#333',
            marginBottom: '0px',
          },
          multiselectContainer: {
            color: 'black',
          },
          searchBox: {
            border: '1px solid #b2bcc8',
            borderRadius: '5px',
          },
        }}
      />
    );
  }
  return <div />;
}
export default Select2;
