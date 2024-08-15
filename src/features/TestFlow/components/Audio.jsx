import React from 'react';

function Audio({ audioRef, selectedVoice, handleAudioError }) {
  return (
    <audio ref={audioRef} controls style={{ display: 'none' }} onError={handleAudioError}>
      <track kind="captions" />
      <source src={selectedVoice?.url} type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default Audio;
