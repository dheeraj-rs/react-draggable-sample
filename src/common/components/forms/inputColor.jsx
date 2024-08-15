import React from 'react';

function InputColor({ value }) {
  return (
    <input type="color" name="color" defaultValue={value} />
  );
}

export default InputColor;
