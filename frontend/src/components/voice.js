import React, { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Mic from '../img/mic.png'

import io from 'socket.io-client';
import { useChat } from '../context/chatContext';

function Voice() {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });
  const socket = io('http://192.168.18.113:3002');
  const { idUser } = useChat();


  const handleRecordingStop = async () => {
    if (mediaBlobUrl) {
      try {
        const response = await fetch(mediaBlobUrl);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();

        socket.emit('sendAudio', { userId: idUser, audioData: arrayBuffer });
      } catch (error) {
        console.error('Error fetching or converting audio data:', error);
      }
    } else {
      console.error('mediaBlobUrl is undefined');
    }
  };
  useEffect(() => {
    if (mediaBlobUrl) {
      handleRecordingStop()
    }
  }, [mediaBlobUrl])

  return (
    <div>
 <button onClick={() => {
          if (status === 'recording') {
            stopRecording();
          } else {
            startRecording();
          }
        }}>Mic</button>


    </div>
  );
}

export default Voice;




