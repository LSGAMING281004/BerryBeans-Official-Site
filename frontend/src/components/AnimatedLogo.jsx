import { useRef, useEffect } from 'react';

const AnimatedLogo = ({ className, speed = 1 }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    }, [speed]);

    return (
        <video
            ref={videoRef}
            src="/gif.mp4"
            className={className}
            autoPlay
            loop
            muted
            playsInline
        />
    );
};

export default AnimatedLogo;
