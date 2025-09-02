"use client"
import { useEffect, useRef, useState } from 'react';
import styles from './VideoStatic.module.scss';

const VideoStatic = ({ src, ...props }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [isLowPowerMode, setIsLowPowerMode] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // iOS düşük güç modu tespiti
        const detectLowPowerMode = () => {
            // iOS'ta düşük güç modunda video otomatik başlamaz
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            if (isIOS) {
                // Video yüklenmeyi bekle
                video.addEventListener('loadstart', () => {
                    setTimeout(() => {
                        if (video.paused && video.readyState > 0) {
                            setIsLowPowerMode(true);
                            setShowPlayButton(true);
                        }
                    }, 500);
                });
            }
        };

        // Video eventi dinleyicileri
        const handlePlay = () => {
            setIsPlaying(true);
            setShowPlayButton(false);
        };

        const handlePause = () => {
            setIsPlaying(false);
            // iOS'ta otomatik pause durumunda play button göster
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            if (isIOS && !video.ended) {
                setShowPlayButton(true);
            }
        };

        const handleStalled = () => {
            // Video takıldığında
            setShowPlayButton(true);
        };

        const handleWaiting = () => {
            // Video bekliyor durumunda
            setShowPlayButton(true);
        };

        const handleCanPlay = () => {
            // Video oynatılmaya hazır
            if (video.paused) {
                // iOS'ta otomatik play denemesi
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Otomatik play başarısız, kullanıcı etkileşimi gerekli
                        setShowPlayButton(true);
                    });
                }
            }
        };

        // Event listener'ları ekle
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('stalled', handleStalled);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('canplay', handleCanPlay);

        detectLowPowerMode();

        // Cleanup
        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('stalled', handleStalled);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    // Play button tıklama handler'ı
    const handlePlayClick = () => {
        const video = videoRef.current;
        if (video) {
            video.play().then(() => {
                setIsPlaying(true);
                setShowPlayButton(false);
            }).catch((error) => {
                console.error('Video play failed:', error);
            });
        }
    };

    // Tam ekran tıklama handler'ı (gizli overlay için)
    const handleVideoClick = () => {
        const video = videoRef.current;
        if (video && video.paused) {
            handlePlayClick();
        }
    };

    return (
        <div className={styles.videoContainer}>
            <video
                ref={videoRef}
                {...props}
                controls={false}
                autoPlay={true}
                loop
                muted
                playsInline
                preload="metadata"
                className={styles.video}
                onContextMenu={(e) => e.preventDefault()} // Sağ tık menüsünü engelle
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* iOS düşük güç modu için overlay */}
            <div className={styles.overlay} onClick={handleVideoClick} />

            {/* iOS play button */}
            {showPlayButton && (
                <div className={styles.playButtonContainer} onClick={handlePlayClick}>
                    <div className={styles.playButton}>
                        <svg viewBox="0 0 24 24" className={styles.playIcon}>

                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoStatic;