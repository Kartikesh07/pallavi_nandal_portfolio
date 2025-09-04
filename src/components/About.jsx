import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start']
    });

    // Parallax effect for the flanking text columns
    const leftTextY = useTransform(scrollYProgress, [0.1, 0.7], ['30%', '-30%']);
    const rightTextY = useTransform(scrollYProgress, [0.1, 0.7], ['30%', '-30%']);
    
    // Fade-in animation for the main image
    const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const imageScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

    return (
        <section id="about" ref={targetRef} className="relative py-20 md:py-32 bg-[#F9F5F0] overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* Decorative Background Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <p 
                        style={{ fontFamily: "'Playfair Display', serif" }} 
                        className="text-[20rem] md:text-[30rem] font-bold text-gray-200/80 leading-none"
                    >
                        AV
                    </p>
                </div>
                
                {/* THE FIX: Use a 7-column grid for better balance */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-7 gap-8 md:gap-12 items-center">
                    
                    {/* Left Column: The Philosophy (takes 2 columns) */}
                    <motion.div 
                        className="md:col-span-2 text-right"
                        style={{ y: leftTextY }}
                    >
                        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-gray-800 mb-4">My Philosophy</h3>
                        <p className="text-gray-600 leading-relaxed">
                            I believe fashion is a conversation between eras. My design philosophy is to weave India's rich artisanal legacy into clean, contemporary silhouettes.
                        </p>
                    </motion.div>

                    {/* Center Column: The Image (takes 3 columns) */}
                    <motion.div 
                        className="relative h-[400px] md:h-[550px] rounded-lg shadow-2xl overflow-hidden md:col-span-3 order-first md:order-none"
                        style={{ opacity: imageOpacity, scale: imageScale }}
                    >
                        <img 
                            src="images/portfolio.jpg" // Replace with your image path
                            alt="Fashion Designer Portrait"
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>

                    {/* Right Column: The Journey (takes 2 columns) */}
                    {/* <motion.div 
                        className="md:col-span-2 text-left"
                        style={{ y: rightTextY }}
                    >
                        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-gray-800 mb-4">The Journey</h3>
                        <p className="text-gray-600 leading-relaxed">
                            A graduate of NIFT, my work has been featured in leading publications and worn by icons of cinema, all while honoring the artisans behind the craft.
                        </p>
                    </motion.div> */}

                </div>
            </div>
        </section>
    );
};

export default About;