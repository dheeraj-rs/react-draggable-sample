import React from 'react';

import IncomingCall from '../ComponentPlayingComponents/IncomingCall';
import Hours from '../ComponentPlayingComponents/Hours';
import Greetify from '../ComponentPlayingComponents/Greetify';
import IVRMenu from '../ComponentPlayingComponents/IVRMenu';
import Connect from '../ComponentPlayingComponents/Connect';
import HangUp from '../ComponentPlayingComponents/HangUp';

import Actions from './Actions';
import Timer from './Timer';
import Voicemail from '../ComponentPlayingComponents/Voicemail';
import CallerID from '../ComponentPlayingComponents/CallerID';
import Shortcut from '../ComponentPlayingComponents/Shortcut';
import Passthru from '../ComponentPlayingComponents/Passthru';
import SMS from '../ComponentPlayingComponents/SMS';
import BulkSMS from '../ComponentPlayingComponents/BulkSMS';

function ComponentPlaying({ activeNodeType, time = '', handleStart, handleStop, handleReset }) {
  return (
    <>
      <Actions handleStart={handleStart} handleStop={handleStop} handleReset={handleReset} />
      <div className="mt-3 shadow-11 rounded call-playing" id="callIncoming">
        <Timer time={time} />

        <IncomingCall isVisible={activeNodeType === 'incomingCall'} />
        <Hours isVisible={activeNodeType === 'hours'} />
        <Greetify isVisible={activeNodeType === 'greetify'} />
        <IVRMenu isVisible={activeNodeType === 'ivr-menu'} />
        <Connect isVisible={activeNodeType === 'connect'} />
        <HangUp isVisible={activeNodeType === 'hang-up'} handleStop={handleStop} />
        <Voicemail isVisible={activeNodeType === 'voice-mail'} />
        <CallerID isVisible={activeNodeType === 'caller-id'} />
        <Shortcut isVisible={activeNodeType === 'shortcut'} />
        <Passthru isVisible={activeNodeType === 'pass-through'} />
        <SMS isVisible={activeNodeType === 'sms'} />
        <BulkSMS isVisible={activeNodeType === 'send-sms'} />
      </div>
    </>
  );
}

export default ComponentPlaying;
