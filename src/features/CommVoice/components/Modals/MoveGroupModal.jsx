import React from 'react';
import ModalRight from '../../../../common/components/modals/ModalRight';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import Select2 from '../../../../common/components/forms/Select2';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function MoveGroupModal() {
  return (
    <ModalRight width="450px" id="moveGroupModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-24px">Move to a group</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary mb-0">
        This action will <span className="text-blue-active fw-medium">Move</span> the selected
        contacts (3 contacts) from the group
        <span className="text-blue-active fw-medium"> Gsoftcomm list</span>to new groups(s) .
      </p>

      <Input
        label="Source group"
        id="source"
        placeholder="Gsoftcomm list"
        type="textbox"
        disabled={false}
      />

      <div className="form-group form-custom-group mt-3">
        <label htmlFor="assign">Destination group</label>
        <Select2 />
      </div>
      <div className="modal-footer d-flex justify-content-start align-items-center gap-4 border-0 p-0 mt-3">
        <button
          id="moveGroupToast"
          data-bs-dismiss="modal"
          type="button"
          className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px"
        >
          Move
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </ModalRight>
  );
}

export default MoveGroupModal;
