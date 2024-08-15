import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const options = [
  { label: 'Account', value: 'Account' },
  { label: 'Customer Support', value: 'Cutomer Support' },
  { label: 'Escalations', value: 'Escalations' },
];
function SelectWithSearch() {
  const [selected, setSelected] = useState([]);
  return (

    <div>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        hasSelectAll={false}
        shouldToggleOnHover={false}
        closeOnChangedValue
        ClearSelectedIcon={null}
        valueRenderer={null}
      />
    </div>

  );
}
export default SelectWithSearch;
