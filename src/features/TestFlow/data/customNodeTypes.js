import CallBack from '../../CommVoiceAdmin/components/nodes/CallBack';
import CallerID from '../../CommVoiceAdmin/components/nodes/CallerID';
import CallerList from '../../CommVoiceAdmin/components/nodes/CallerList';
import Connect from '../../CommVoiceAdmin/components/nodes/Connect';
import Email from '../../CommVoiceAdmin/components/nodes/Email';
import GetValue from '../../CommVoiceAdmin/components/nodes/GetValue';
import GoToFlow from '../../CommVoiceAdmin/components/nodes/GoToFlow';
import Greetify from '../../CommVoiceAdmin/components/nodes/Greetify';
import HangUp from '../../CommVoiceAdmin/components/nodes/HangUp';
import Hours from '../../CommVoiceAdmin/components/nodes/Hours';
import IVRMenu from '../../CommVoiceAdmin/components/nodes/IVRMenu';
import IncomingCall from '../../CommVoiceAdmin/components/nodes/IncomingCall';
import PassThru from '../../CommVoiceAdmin/components/nodes/PassThru';
import Queue from '../../CommVoiceAdmin/components/nodes/Queue';
import SMS from '../../CommVoiceAdmin/components/nodes/SMS';
import SendSMS from '../../CommVoiceAdmin/components/nodes/SendSMS';
import Shortcut from '../../CommVoiceAdmin/components/nodes/Shortcut';
import Start from '../../CommVoiceAdmin/components/nodes/Start';
import VoiceMail from '../../CommVoiceAdmin/components/nodes/VoiceMail';

const customNodeTypes = {
  start: Start,
  incomingCall: IncomingCall,

  greetify: Greetify,
  'ivr-menu': IVRMenu,
  connect: Connect,

  hours: Hours,
  voicemail: VoiceMail,
  email: Email,

  'caller-id': CallerID,
  'caller-list': CallerList,
  shortcut: Shortcut,

  'get-value': GetValue,
  passthru: PassThru,
  sms: SMS,

  'send-sms': SendSMS,
  queue: Queue,
  'hang-up': HangUp,

  'goto-flow': GoToFlow,
  callBack: CallBack,
};

export default customNodeTypes;
