import React, { useState } from 'react';
import { useFormik } from 'formik';

import { ReactFlowProvider } from 'reactflow';
import Flow from '../components/flow/Flow';
import TestFlowModal from '../components/flow/test/TestFlowModal';

function CallFlowsReactFlow() {
  const [show, setShow] = useState({ isVisible: false, type: '' });

  const validate = () => {
    const errors = {};
    return errors;
  };

  const formik = useFormik({
    initialValues: {},
    validate,
    onSubmit: () => {},
  });
  return (
    <>
      <ReactFlowProvider>
        <Flow formik={formik} show={show} setShow={setShow} />
      </ReactFlowProvider>
      <ReactFlowProvider>
        <TestFlowModal setShow={setShow} />
      </ReactFlowProvider>
    </>
  );
}

export default CallFlowsReactFlow;
