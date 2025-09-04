import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2, // Lower values are faster
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // A popular easing function
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // This function is called on every animation frame
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        // Start the animation frame loop
        requestAnimationFrame(raf);
        
        // Cleanup function to destroy the Lenis instance when the component unmounts
        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // This component does not render anything
};

export default SmoothScroll;