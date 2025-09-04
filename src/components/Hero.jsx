import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import BackgroundAnimation from './BackgroundAnimation'; // We will render this conditionally

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return isMobile;
};

const Hero = () => {
    const isMobile = useIsMobile();
    
    // --- Mouse position logic for DESKTOP ONLY ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 40, stiffness: 300, mass: 1 };
    const smoothMouse = {
        x: useSpring(mouseX, springConfig),
        y: useSpring(mouseY, springConfig),
    };

    useEffect(() => {
        // Only add the mouse move listener on non-mobile devices
        if (!isMobile) {
            const handleMouseMove = (e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isMobile, mouseX, mouseY]);


    // --- Common text container animation for ALL devices ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const designerName = "Pallavi Nandal";
    const tagline = "Timeless Elegance, Modern Craft";

    return (
        <section id="hero" className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#F9F5F0]">
            
            {/* THE FIX: Conditionally render the heavy animation only on desktop */}
            {!isMobile && <BackgroundAnimation />}

            <motion.div
                className="relative z-10 text-center px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        // THE FIX: Only apply the CSS variables for the gradient on desktop
                        ...(!isMobile && {
                            '--mouse-x': `${smoothMouse.x.get()}px`,
                            '--mouse-y': `${smoothMouse.y.get()}px`,
                        })
                    }}
                    // THE FIX: Apply different classes for mobile vs desktop
                    className={`text-6xl md:text-9xl font-bold ${
                        isMobile
                            ? 'text-gray-800' // Clean, solid text for mobile
                            : 'text-gray-800 bg-clip-text text-transparent bg-gradient-radial from-[#C0A062] to-gray-800' // Interactive gradient for desktop
                    }`}
                    aria-label={designerName}
                >
                    {designerName}
                </h1>

                <motion.p
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    className="text-lg md:text-xl mt-4 tracking-widest uppercase font-light text-gray-500"
                    variants={itemVariants}
                >
                    {tagline}
                </motion.p>
            </motion.div>

            {/* Poppins font and gradient styles */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
                
                .bg-gradient-radial {
                    background-image: radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), var(--tw-gradient-from) 0%, var(--tw-gradient-to) 40%);
                }
                `}
            </style>
        </section>
    );
};

export default Hero;