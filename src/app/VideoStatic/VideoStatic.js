"use client"

import styles from './VideoStatic.module.scss';

const VideoStatic = ({ src, props }) => {
    return (
        <div className={styles.video}>
        <video
            {...props}
            autoPlay={true} loop={true} muted={true} playsInline={true} 
            type="video/mp4"
            poster="https://video.y.co/upload/f_auto,q_auto,c_fill,so_auto,ar_16:9,w_2560/v1708037304/landing-video-homepage-2022_nqvybq.jpg"
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    );
};

export default VideoStatic;