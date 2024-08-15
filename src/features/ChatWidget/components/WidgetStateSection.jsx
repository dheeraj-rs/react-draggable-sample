import React from 'react';
import RadioButtonCircle from '../../../common/components/forms/RadioButtonCircle';

function WidgetStateSection({ formik }) {
  return (
    <>
      {/* widget state section starts */}
      <div className="shadow-6 mt-4 p-4 rounded">
        <div className="row gx-5">
          <div className="col-lg-12 col-sm-12 d-flex flex-column">
            <div className="widget-state ">
              <div className="d-flex">
                <h6 className="font-13 text-primary">Default widget state</h6>
              </div>
              <div className="d-flex gap-3 mt-3">
                <RadioButtonCircle
                  id="minimized"
                  title="Minimized"
                  name="widget-state"
                  onClick={() => formik.setFieldValue('defaultWidgetState', 'minimized')}
                  checked={formik?.values?.defaultWidgetState === 'minimized'}
                  onChange={() => {}}
                />

                <RadioButtonCircle
                  id="popout"
                  title="Popout"
                  name="widget-state"
                  onClick={() => formik.setFieldValue('defaultWidgetState', 'popout')}
                  checked={formik?.values?.defaultWidgetState === 'popout'}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* widget state section ends */}
    </>
  );
}

export default WidgetStateSection;
