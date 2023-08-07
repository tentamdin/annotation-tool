import React, { useRef, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

export const AudioPlayer = ({ state, files, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlayRate = (speed) => {
    audioRef.current.playbackRate = speed;
  };

  const speedRate = [0.5, 0.75, 1, 1.25, 1.5, 1.75];

  return (
    <div className="text-center">
      <audio
        controls
        key={state ? files?.id : files[index]?.id}
        controlsList="nodownload"
        ref={audioRef}
      >
        <source
          src={state ? files?.audioname : files[index]?.audioname}
          type="audio/mp3"
        />
      </audio>
      <div className="d-flex gap-5 justify-content-center">
        <button className="mt-4 btn btn-secondary" onClick={() => handlePlayPause()}>
          {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
        {speedRate.map((speed) => {
          return (
          <button key={speed} className="mt-4 btn btn-info" onClick={() => handlePlayRate(speed)}>
          {speed === 1 ? "Normal" : speed + " speed" } 
        </button>)
        })}
      </div>
    </div>
  );
};
