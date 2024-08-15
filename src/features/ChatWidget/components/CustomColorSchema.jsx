import React from 'react';

function CustomColorSchema({ setColorSchemeType, colorSchemeType }) {
  return (
    <div
      id="customThemeBox"
      role="button"
      className={`gradient-section  border border-transparent  ${
        colorSchemeType === 'new' ? 'border-blue-active' : ''
      } shadow-6 rounded`}
      onClick={() => {
        setColorSchemeType('new');
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center p-3">
        <div className="theme-text text-primary mb-1 d-flex">Custom</div>
        <div>
          <img height="30" src="/assets/custom-icon.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default CustomColorSchema;
