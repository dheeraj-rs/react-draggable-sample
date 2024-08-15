import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import ModalClose from './ModalClose';
import InputModal from '../common/InputModal';
import ButtonToast from '../../../features/ChatWidget/components/ButtonToast';
import ButtonWhiteModalCancel from '../../../features/ChatWidget/components/ButtonWhiteModalCancel';
import Modal from './Modal';
import { getFormErrorMessage, isFormFieldValid } from '../../helpers/utils';
import '../../../styles/formvalidation.css';
import { UpdateChatWidgetTheme } from '../../api-collection/ChatWidget/ChatWidgetThemes';

function RenameColorSchemeModal({ renameColorScheme, setToastAction, onRefresh }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const validate = (data) => {
    const errors = {};

    if (!data.schemeName) {
      errors.schemeName = 'Scheme name is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      schemeName: renameColorScheme?.name,
    },
    validate,
    onSubmit: () => {
      setLoading(true);
      const data = {
        type: 'chat_widget_themes',
        id: parseInt(renameColorScheme?.id, 10),
        attributes: {
          widget_id: parseInt(params?.id, 10),
          name: formik?.values?.schemeName,
        },
      };
      UpdateChatWidgetTheme(renameColorScheme?.id, data)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Rename: Color scheme name updated successfully',
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
              : 'Error while updating !',
          });
        })
        ?.finally(() => {
          setLoading(false);
          document.getElementById('moda-close').click();
        });
    },
  });

  const onClose = () => {
    formik.setFieldValue('schemeName', '');
  };

  useEffect(() => {
    formik.setFieldValue('schemeName', renameColorScheme?.name);
  }, [renameColorScheme]);

  return (
    <>
      {/* <!-- rename save modal --> */}
      <Modal width="435px" id="renameModal">
        <div className="d-flex justify-content-between">
          <p className="fs-17px text-primary fw-medium mb-24px">Rename Color Scheme</p>
          <ModalClose onClose={() => {}} />
        </div>

        <div className="modal-body">
          <InputModal
            label="Scheme name"
            id="Grad-blue"
            placeholder="Sea Blue"
            type="textbox"
            disabled=""
            name="schemeName"
            onChange={formik.handleChange}
            value={formik?.values?.schemeName}
            style={isFormFieldValid(formik, 'schemeName') ? { border: '1px solid red' } : {}}
          />
          {getFormErrorMessage(formik, 'schemeName')}
        </div>

        <div className="modal-footer border-top-0 justify-content-center">
          <ButtonToast
            text={loading ? 'Saving ...' : 'Save'}
            btnID="renameColor"
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={loading}
          />
          <ButtonWhiteModalCancel text="cancel" onCancel={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default RenameColorSchemeModal;
