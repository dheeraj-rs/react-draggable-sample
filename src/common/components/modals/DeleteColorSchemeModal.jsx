import React, { useState } from 'react';
import Modal from './Modal';
import ModalClose from './ModalClose';
import Input from '../forms/Input';
import ButtonWhiteModalCancel from '../../../features/ChatWidget/components/ButtonWhiteModalCancel';
import { DeleteChatWidgetTheme } from '../../api-collection/ChatWidget/ChatWidgetThemes';

function DeleteColorSchemeModal({ deleteColorScheme, setToastAction, onRefresh }) {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    DeleteChatWidgetTheme(deleteColorScheme?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Saved: You have successfully deleted the changes',
          type: 'success',
        });
        onRefresh();
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Deleting !',
        });
      })
      ?.finally(() => {
        setLoading(false);
        document.getElementById('moda-close').click();
      });
  };
  return (
    <Modal width="435px" id="deleteModal">
      <div className="d-flex justify-content-between">
        <p className="fs-17px text-primary fw-medium mb-24px">Delete Color Scheme</p>
        <ModalClose
          onClose={() => {
            setKey('');
          }}
        />
      </div>
      <p className="text-primary">
        This action will <span className="text-primary fw-medium">Delete</span> selcted color scheme
        <span className="fw-medium"> {deleteColorScheme?.name}</span> from the collection .
      </p>
      <Input
        label="To confirm this action please type Delete"
        id="delete"
        placeholder="Type “Delete”"
        type="textbox"
        disabled={false}
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
        }}
      />
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="btn bg-faded-red text-white px-4 py-12px delete-btn border-1"
          data-bs-dismiss="modal"
          id="deleteAppearance"
          disabled={key.toLowerCase() !== 'delete' || loading}
          onClick={() => {
            handleDelete();
            setKey('');
          }}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
        <ButtonWhiteModalCancel
          text="cancel"
          onCancel={() => {
            setKey('');
          }}
        />
      </div>
    </Modal>
  );
}

export default DeleteColorSchemeModal;
