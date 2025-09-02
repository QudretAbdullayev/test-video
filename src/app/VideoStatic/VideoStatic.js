"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoStatic.module.scss";

const VideoStatic = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const tryPlay = async () => {
      try {
        await el.play();
        setCanPlay(true);
      } catch {
        // Low Power Mode veya autoplay policy block
        setCanPlay(false);
      }
    };
    tryPlay();
  }, [src]);

  if (!canPlay) {
    // fallback görsel
    return (
      <div className={styles.wrapper}>
        <img src={poster} alt="Video fallback" className={styles.fallback} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
        controls={false}
      >
        <source src={src} type="video/mp4" />
        {/* Eski tarayıcılar için fallback */}
        <img src={poster} alt="Video fallback" />
      </video>
    </div>
  );
};

export default VideoStatic;
