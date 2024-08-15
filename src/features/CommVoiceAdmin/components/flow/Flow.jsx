import 'reactflow/dist/style.css';
import '../../../../styles/scss/components/subhead.scss';
import '../../../../styles/scss/pages/call-flow-hours.scss';
import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, useReactFlow } from 'reactflow';
import { shallow } from 'zustand/shallow';
import Layout from '../../../../common/layout';
import Header from '../Header';
import IncomingCall from '../nodes/IncomingCall';
import Hours from '../nodes/Hours';
import Greetify from '../nodes/Greetify';
import IVRMenu from '../nodes/IVRMenu';
import Connect from '../nodes/Connect';
import Email from '../nodes/Email';
import Queue from '../nodes/Queue';
import CallBack from '../nodes/CallBack';
import GetValue from '../nodes/GetValue';
import GoToFlow from '../nodes/GoToFlow';
import HangUp from '../nodes/HangUp';
import PassThru from '../nodes/PassThru';
import SendSMS from '../nodes/SendSMS';
import Shortcut from '../nodes/Shortcut';
import SMS from '../nodes/SMS';
import VoiceMail from '../nodes/VoiceMail';
import CallerID from '../nodes/CallerID';
import CallerList from '../nodes/CallerList';
import Start from '../nodes/Start';
import ComponentSelectPopup from '../modals/ComponentSelectPopup';
import GreetifyModal from '../modals/GreetifyModal';
import AddVoice from '../modals/AddVoiceModal';
import IVRMenuModal from '../modals/IVRMenuModal';
import ConnectModal from '../modals/ConnectModal';
import HoursModal from '../modals/HoursModal';
import VoiceMailModal from '../modals/VoiceMailModal';
import EmailModal from '../modals/EmailModal';
import CallerListModal from '../modals/CallerListModal';
import PassThruModal from '../modals/PassThruModal';
import SMSModal from '../modals/SMSModal';
import SMSTemplateModal from '../modals/SMSTemplateModal';
import SMSTemplateModalSuccess from '../modals/SMSTemplateModalSuccess';
import SendSMSModal from '../modals/SendSMSModal';
import QueueModal from '../modals/QueueModal';
import HangUpModal from '../modals/HangUpModal';
import GoToFlowModal from '../modals/GoToFlowModal';
import CallBackModal from '../modals/CallBackModal';
import DeleteModal from '../modals/DeleteModal';
import useFlowStore from '../../store/store';

const nodeTypes = {
  start: Start,
  incomingCall: IncomingCall,
  hours: Hours,
  greetify: Greetify,
  ivrMenu: IVRMenu,
  connect: Connect,
  email: Email,
  queue: Queue,
  callBack: CallBack,
  getValue: GetValue,
  goToFlow: GoToFlow,
  hangUp: HangUp,
  'pass-through': PassThru,
  sendSMS: SendSMS,
  shortcut: Shortcut,
  sms: SMS,
  voiceMail: VoiceMail,
  callerID: CallerID,
  callerList: CallerList,
};

const edgeOptions = {
  type: 'step',
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const proOptions = { hideAttribution: true };

function Flow({ formik }) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlowStore(selector, shallow);

  const reactFlowInstance = useReactFlow();

  const onClick = useCallback((customNode) => {
    reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== 'start'));
    const newNode = customNode;
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
    <Layout
      title="Comm Voice Admin"
      headerTitle="Call Flows"
      favIcon="/assets/favIcons/favicon-voice.ico"
    >
      <Header>
        <div
          className="main-body-outer py-3"
          style={{ width: '100%', height: 'calc(100% - 50px)' }}
        >
          <div
            className="main-body-inner main-body-inner-one main-body-react-flow bg-white rounded"
            style={{ width: '100%', height: '100%' }}
          >
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              nodeTypes={nodeTypes}
              edges={edges}
              onEdgesChange={onEdgesChange}
              defaultEdgeOptions={edgeOptions}
              onConnect={onConnect}
              proOptions={proOptions}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </Header>

      <ComponentSelectPopup onClick={onClick} />

      <GreetifyModal onSave={onClick} />

      <AddVoice formik={formik} />

      <IVRMenuModal onSave={onClick} />

      <ConnectModal onSave={onClick} />

      <HoursModal onSave={onClick} />

      <VoiceMailModal onSave={onClick} />

      <EmailModal onSave={onClick} />

      <CallerListModal onSave={onClick} />

      {/* <GetValueModal onSave={onClick} /> */}

      <PassThruModal onSave={onClick} />

      <SMSModal onSave={onClick} />

      <SMSTemplateModal />

      <SMSTemplateModalSuccess />

      <SendSMSModal onSave={onClick} />

      <QueueModal onSave={onClick} />

      <HangUpModal onSave={onClick} />

      <GoToFlowModal onSave={onClick} />

      <CallBackModal onSave={onClick} />

      <DeleteModal />
    </Layout>
  );
}

export default Flow;
