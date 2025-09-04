import React from 'react';
import { motion } from 'framer-motion';
import { useAnimateInView } from '../hooks/useAnimateInView';

const AnimatedSection = ({ children, customClassName = '' }) => {
    const { ref, controls } = useAnimateInView();
    const animationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animationVariants}
            className={customClassName}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;