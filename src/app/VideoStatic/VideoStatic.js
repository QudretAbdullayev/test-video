"use client";

import { useRef } from "react";
import styles from "./VideoStatic.module.scss";

const VideoStatic = ({ src, ...props }) => {
  const playerRef = useRef(null);

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (playerRef.current.paused) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  };

  const restartVideo = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
    }
  };

  const muteToggle = () => {
    if (playerRef.current) {
      playerRef.current.muted = !playerRef.current.muted;
    }
  };

  return (
    <div className={styles.video}>
      <video
        {...props}
        autoPlay
        loop
        muted
        playsInline
        ref={playerRef}
        className={styles.player}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Test amaçlı kontrol butonları */}
      <div className={styles.controls}>
        <button onClick={playVideo}>Play</button>
        <button onClick={pauseVideo}>Pause</button>
        <button onClick={togglePlay}>Play / Pause</button>
        <button onClick={restartVideo}>Restart</button>
        <button onClick={muteToggle}>Mute / Unmute</button>
      </div>
    </div>
  );
};

export default VideoStatic;
