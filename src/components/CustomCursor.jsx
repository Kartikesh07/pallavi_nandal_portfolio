import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [cursorVariant, setCursorVariant] = useState("default");

    // --- Mouse position values ---
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // --- Spring physics for smooth movement ---
    // Fast spring for the main dot
    const fastSpring = { damping: 25, stiffness: 700, mass: 0.5 };
    const dotX = useSpring(cursorX, fastSpring);
    const dotY = useSpring(cursorY, fastSpring);

    // Slower, "laggy" spring for the trailing ring
    const slowSpring = { damping: 30, stiffness: 200, mass: 1.5 };
    const ringX = useSpring(cursorX, slowSpring);
    const ringY = useSpring(cursorY, slowSpring);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        
        window.addEventListener('mousemove', moveCursor);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.style.cursor === 'pointer'
            ) {
                setCursorVariant('link');
            } else {
                setCursorVariant('default');
            }
        };
        
        document.addEventListener('mouseover', handleMouseOver);
        
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);
    
    // --- Variants for scaling ---
    // These only control the size of the elements
    const scaleVariants = {
        default: {
            dotScale: 1,
            ringScale: 1,
        },
        link: {
            dotScale: 1.5,
            ringScale: 0,
        }
    };

    return (
        <div className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none">
            {/* The Trailing Ring */}
            <motion.div
                className="w-8 h-8 rounded-full border-2 border-[#C0A062]"
                style={{
                    // THE FIX: Use the 'slow' spring values for position
                    x: ringX, 
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                variants={scaleVariants}
                animate={cursorVariant}
                transition={{ duration: 0.2 }}
                // Use the 'scale' property from the variants
                transformTemplate={({ scale }) => `scale(${scale})`}
                custom={{ scale: scaleVariants[cursorVariant].ringScale }}
            />
            {/* The Main Dot */}
            <motion.div
                className="w-2 h-2 rounded-full bg-[#C0A062]"
                 style={{
                    // THE FIX: Use the 'fast' spring values for position
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                variants={scaleVariants}
                animate={cursorVariant}
                transition={{ duration: 0.2 }}
                // Use the 'scale' property from the variants
                transformTemplate={({ scale }) => `scale(${scale})`}
                custom={{ scale: scaleVariants[cursorVariant].dotScale }}
            />
        </div>
    );
};

// A simple wrapper to fix Framer Motion's `transformTemplate` issue with a more direct approach
const FinalCursor = () => {
    const [cursorVariant, setCursorVariant] = useState("default");

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const fastSpring = { damping: 25, stiffness: 700, mass: 0.5 };
    const dotX = useSpring(cursorX, fastSpring);
    const dotY = useSpring(cursorY, fastSpring);

    const slowSpring = { damping: 30, stiffness: 200, mass: 1.5 };
    const ringX = useSpring(cursorX, slowSpring);
    const ringY = useSpring(cursorY, slowSpring);
    
    useEffect(() => {
        // ... (useEffect logic is the same)
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        const handleMouseOver = (e) => {
            const target = e.target;
            if (/* ... hover logic ... */
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.style.cursor === 'pointer'
            ) {
                setCursorVariant('link');
            } else {
                setCursorVariant('default');
            }
        };
        document.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none">
            <motion.div
                className="w-8 h-8 rounded-full border-2 border-[#C0A062]"
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
                animate={{ scale: cursorVariant === 'link' ? 0 : 1 }}
                transition={{ type: 'spring', ...slowSpring }}
            />
            <motion.div
                className="w-2 h-2 rounded-full bg-[#C0A062]"
                style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
                animate={{ scale: cursorVariant === 'link' ? 1.8 : 1 }}
                transition={{ type: 'spring', ...fastSpring }}
            />
        </div>
    );
}

export default FinalCursor;