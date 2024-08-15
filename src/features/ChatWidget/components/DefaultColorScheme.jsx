import React from 'react';

function DefaultColorScheme({ id, colorSchemeType, setColorSchemeType, handleSelection }) {
  return (
    <div
      id="defaultTheme"
      role="button"
      className={`gradient-section default-theme  border ${
        id === colorSchemeType ? 'border-blue-active' : ''
      } shadow-6 rounded`}
      onClick={() => {
        setColorSchemeType(id);
        handleSelection(id);
      }}
    >
      <div className="d-flex flex-column  p-3">
        <div className="d-flex justify-content-between align-items-center  mb-3">
          <div className="text-primary d-flex">Default</div>
          <div className="dropdown-center d-flex justify-content-end align-items-end" />
        </div>
        <div className="d-flex">
          <div className="d-flex align-items-center gap-2 text-primary">
            <a
              href="/#"
              className="color-box  d-flex align-items-center justify-content-center h-4 w-4 rounded-circle bg-blue-active"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          <div className="d-flex align-items-center gap-2 text-primary">
            <a
              href="/#"
              className="color-box  ms-n2  d-flex align-items-center justify-content-center h-4 w-4 rounded-circle bg-white"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </div>

          <div className="d-flex align-items-center gap-2 text-primary">
            <a
              href="/#"
              className="color-box  ms-n2  d-flex align-items-center justify-content-center h-4 w-4 rounded-circle bg-blue-active"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultColorScheme;
