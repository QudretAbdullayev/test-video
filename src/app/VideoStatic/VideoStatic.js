"use client"

import styles from './VideoStatic.module.scss';

const VideoStatic = ({ src, props }) => {
    return (
        <div className={styles.video}>
        <video
            {...props}
            autoPlay={true} loop={true} muted={true} playsInline={true} 
            type="video/mp4"
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    );
};

export default VideoStatic;