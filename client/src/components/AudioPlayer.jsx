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
        <button className="mt-4" onClick={() => handlePlayPause()}>
          {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
        <button className="mt-4" onClick={() => handlePlayRate(0.5)}>
          0.5 speed
        </button>
        <button className="mt-4" onClick={() => handlePlayRate(0.75)}>
          0.75 speed
        </button>{" "}
        <button className="mt-4" onClick={() => handlePlayRate(1)}>
          Normal
        </button>{" "}
        <button className="mt-4" onClick={() => handlePlayRate(1.25)}>
          1.25 speed
        </button>
        <button className="mt-4" onClick={() => handlePlayRate(1.5)}>
          1.5 speed
        </button>
        <button className="mt-4" onClick={() => handlePlayRate(1.75)}>
          1.75 speed
        </button>
      </div>
    </div>
  );
};
