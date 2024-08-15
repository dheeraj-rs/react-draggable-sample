import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import ButtonToast from '../../../common/components/toast/ButtonToast';

function UnMapModalFaq({ show, onClick }) {
  return (
    <>
      <Modal width="435px" id="faqModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-17px text-primary fw-medium mb-24px" />
          <ModalClose onClose={onClick} />
        </div>

        <div className="modal-body mx-auto d-flex justify-content-center flex-column gap-2 align-items-center">
          <div>
            <img src="/assets/un-map.svg" alt="" />
          </div>
          <p className="fw-medium fs-18px text-primary">Oh, No!</p>
          <p className="text-center fs-13px text-primary">
            You cannot unmap this faq. At least one faq must be mapped to the widget
          </p>
        </div>
        <div className="modal-footer border-top-0 justify-content-center">
          <ButtonToast text="Ok" btnID="unMapFaq" onClick={onClick} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default UnMapModalFaq;
