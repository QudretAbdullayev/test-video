"use client"

import { useRef } from 'react';
import styles from './VideoStatic.module.scss';

const VideoStatic = ({ src, props }) => {
    const playerRef = useRef(null);
    let playVideo = (event) => {
        if (playerRef.current) {
           playerRef.current.play()
        }
     }
    return (
        <div className={styles.video}>
        <video
            {...props}
            controls={false} autoPlay={true} loop muted playsInline={false} 
            type="video/mp4"
            ref={playerRef}
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    );
};

export default VideoStatic;