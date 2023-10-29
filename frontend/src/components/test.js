import React, { useState, useEffect } from 'react';
import { decode } from 'wav-decoder';
import { useChat } from "../context/chatContext";

const AudioPlayer = () => {
  const { audio} = useChat();

  const [audioPlayer, setAudioPlayer] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  // audio, 
  useEffect(() => {
    if (!audio) return;

    const decodeAudio = async () => {
      try {
        // Decode the audio buffer
        const audioData = new Uint8Array(audio);
        const decodedAudio = await decode(audioData);

        // Create an audio buffer from the decoded data
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(decodedAudio.channelData[0].buffer);

        // Create an audio player
        const player = new Audio();
        player.src = URL.createObjectURL(new Blob([audioBuffer], { type: 'audio/wav' }));

        setAudioPlayer(player);
        setAudioContext(audioContext);

      } catch (error) {
        console.error('Error decoding audio:', error);
      }
    };

    decodeAudio();
  }, [audio]);

  const playAudio = () => {
    if (audioPlayer) {
      audioPlayer.play();
    }
  };

  return (
    <div>
      <button onClick={playAudio}>Play Audio</button>
    </div>
  );
};

export default AudioPlayer;






 {/* {inboxId == null ? (
        <>
          <div
            style={{
              backgroundColor: "#DDDDF7",
              color: "#5d5b8d",
              textAlign: "center",
              paddingBottom: "50px",
            }}
          >
            <p>End-to-end encrypted</p>
          </div>
        </>
      ) : ( */}





      // inbox already know sender is fatima and receiver is noor 
      // when fatima is login (useId match in the inbox 
      // sender is fatima and receiver is noor  
      // receiver show )
      // when noor is login (useId is not match in the inbox 
      // sender is fatima and sender is fatima 
      // receiver show )


 