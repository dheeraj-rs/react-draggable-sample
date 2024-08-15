import React from 'react';
import Select from 'react-select';
import $ from 'jquery';

const handleChange = (event, props) => {
  if (props.type === 'Group') {
    props.setAssignedToData({ ...props.assignedToData, groupName: event.value });
  } else if (props.type === 'Agent') {
    props.setAssignedToData({ ...props.assignedToData, AgentType: event.value });
  }

  $('#assignedAgentSubmit').removeClass('bg-disable-btn text-disable disabled ');
  $('#assignedAgentSubmit').addClass('bg-black');
};

function SelectSearch({
  type = '',
  options = [],
  placeholder = '',
  selectedOption,
  setSelectedOption,
}) {
  return (
    <div>
      <Select
        options={
          options?.length > 0
            ? options
            : [{ value: 'select', label: placeholder, isDisabled: true }]
        }
        placeholder={placeholder}
        onChange={(event) => {
          setSelectedOption({ ...selectedOption, [type]: event });
          handleChange(event, {});
        }}
        value={selectedOption && selectedOption[type]?.value ? selectedOption[type] : 'select'}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
export default SelectSearch;
