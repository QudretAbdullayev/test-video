"use client"
import { useEffect, useRef } from 'react';
import styles from './VideoStatic.module.scss';

const VideoStatic = ({ src, ...props }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // iOS low battery mode detection ve play button gizleme
        const hideControls = () => {
            // Inline stil ile zorla gizle
            const style = document.createElement('style');
            style.textContent = `
                video::-webkit-media-controls {
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                }
                video::-webkit-media-controls-start-playbook-button {
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                }
                video::-webkit-media-controls-panel {
                    display: none !important;
                }
                video::-webkit-media-controls-play-button {
                    display: none !important;
                }
                video::-webkit-media-controls-start-playback-button {
                    display: none !important;
                }
            `;
            
            if (!document.head.querySelector('#video-controls-style')) {
                style.id = 'video-controls-style';
                document.head.appendChild(style);
            }
        };

        // Video yüklendiğinde kontrolleri gizle
        const handleLoadedData = () => {
            hideControls();
            
            // Video overlay ile play butonunu maskele
            video.style.pointerEvents = 'none';
            
            // Otomatik oynatmaya zorla (mümkünse)
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Oynatılamadı, ama kontroller hala gizli kalacak
                });
            }
        };

        // Event listeners
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplay', hideControls);
        video.addEventListener('loadstart', hideControls);
        
        // İlk yüklenmede de çalıştır
        if (video.readyState >= 2) {
            handleLoadedData();
        }

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplay', hideControls);
            video.removeEventListener('loadstart', hideControls);
        };
    }, [src]);

    return (
        <div className={styles.videoContainer}>
            <video
                ref={videoRef}
                {...props}
                controls={false}
                autoPlay={true}
                loop
                muted
                playsInline={true} // iOS için önemli
                webkit-playsinline="true" // Eski iOS versiyonları için
                type="video/mp4"
                className={styles.video}
                disablePictureInPicture
                disableRemotePlaybook
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Overlay div ile play butonunu tamamen maskele */}
            <div className={styles.overlay}></div>
        </div>
    );
};

export default VideoStatic;