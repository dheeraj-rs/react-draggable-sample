import React from 'react';
import { shallow } from 'zustand/shallow';
import useFlowStore from '../../../store/store';
import IncomingCallTest from './IncomingCallTest';
import HoursTest from './HoursTest';
import GreetifyTest from './GreetifyTest';
import IVRMenuTest from './IVRMenuTest';
import ConnectTest from './ConnectTest';
import HangUpTest from './HangUpTest';

const selector = (state) => ({
  activeTest: state.activeTest,
  getNodeTypeById: state.getNodeTypeById,
});

function TestFlowActions() {
  const { activeTest, getNodeTypeById } = useFlowStore(selector, shallow);
  switch (getNodeTypeById(activeTest)) {
    case 'incomingCall':
      return <IncomingCallTest />;
    case 'hours':
      return <HoursTest />;
    case 'greetify':
      return <GreetifyTest />;
    case 'ivrMenu':
      return <IVRMenuTest />;
    case 'connect':
      return <ConnectTest />;
    case 'hangUp':
      return <HangUpTest />;

    default:
      return <IncomingCallTest />;
  }
}

export default TestFlowActions;
