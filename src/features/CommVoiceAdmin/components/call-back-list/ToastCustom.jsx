/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect } from 'react';
import '../../../../styles/scss/components/custom-toast.scss';

function ToastCustom({ id, children, btnId }) {
  useEffect(() => {
    const toastClose = document.querySelectorAll('.toast-close');
    const toastButton = document.querySelector(`#${btnId}`);
    const toastMessage = document.querySelector(`#${id}`);

    toastClose.forEach((item) => {
      item.addEventListener('click', function () {
        this.parentElement.parentElement.classList.remove('show');
      });
    });

    toastButton?.addEventListener('click', () => {
      toastMessage.classList.add('show');

      setTimeout(() => {
        toastMessage.classList.remove('show');
      }, 5500);
    });
  });

  return (
    <div className="custom-toast-outer d-flex align-items-center justify-content-center" id={id}>
      <div className="d-flex align-items-center gap-3 toast-wrapper rounded">
        <div>
          <img src="/custom-toast/success.svg" alt="" />
        </div>
        <div>
          <p className="m-0 text-primary fs-12px">{children}</p>
        </div>
        <div className="toast-close cursor-pointer">
          <img src="/custom-toast/X.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ToastCustom;
