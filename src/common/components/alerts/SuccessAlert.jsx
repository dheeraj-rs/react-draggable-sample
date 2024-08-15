import React from 'react';

function SuccessAlert({ children }) {
  return (
    <div
      className="alert bg-green-100 alert-green-500 alert-dismissible fade show mb-0 border-0 pe-33px pe-md-10px py-10px py-md-18px ps-10px px-md-25px mb-3"
      role="alert"
    >
      {children}
    </div>
  );
}

export default SuccessAlert;
