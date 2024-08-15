import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import ButtonToast from '../../../features/ChatWidget/components/ButtonToast';
import ButtonWhiteModalCancel from '../../../features/ChatWidget/components/ButtonWhiteModalCancel';
import InputModal from '../common/InputModal';
import { getFormErrorMessage, isFormFieldValid } from '../../helpers/utils';

function RenameWidgetModal({ isOpen, onClose, heading, label, action, showRenameWidgetModal }) {
  const validate = (data) => {
    const errors = {};

    if (!data.widgetName) {
      errors.widgetName = 'widget name is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      widgetName: '',
    },
    validate,
    onSubmit: () => {
      formik.resetForm();
      action(formik?.values?.widgetName);
    },
  });

  const handleOnClose = () => {
    formik.resetForm();
    onClose();
  };

  useEffect(() => {
    formik.setFieldValue('widgetName', showRenameWidgetModal?.name);
  }, [showRenameWidgetModal]);

  useEffect(() => {
    formik.resetForm();
  }, [isOpen]);

  if (isOpen) {
    return (
      <>
        <div
          className="modal mt-65 show"
          tabIndex="-1"
          id="renamewidget"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content border-0 ">
              <div className="modal-content p-4">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <h4 className="modal-title text-dark fw-medium fs-15px">{heading}</h4>

                  <span
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={handleOnClose}
                  />
                </div>

                <div className="modal-body">
                  <InputModal
                    id="AgentXYZ"
                    placeholder="Gsoftcomm"
                    type="text"
                    disabled=""
                    name="widgetName"
                    onChange={formik.handleChange}
                    value={formik?.values?.widgetName}
                    style={
                      isFormFieldValid(formik, 'widgetName') ? { border: '1px solid red' } : {}
                    }
                    label={label}
                  />
                  {getFormErrorMessage(formik, 'widgetName')}
                </div>

                <div className="modal-footer border-top-0 justify-content-center">
                  <ButtonToast
                    text={showRenameWidgetModal?.loading ? 'Saving...' : 'Save'}
                    btnID="RenameWidget"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    disabled={showRenameWidgetModal?.loading}
                  />
                  <ButtonWhiteModalCancel text="cancel" onCancel={handleOnClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" />
      </>
    );
  }
  return <div />;
}

export default RenameWidgetModal;
