import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable NavLink component with the animated underline
const NavLink = ({ to, title, closeMenu }) => {
    return (
        <ScrollLink
            to={to}
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            onClick={closeMenu}
            className="relative group cursor-pointer"
        >
            <span className="font-medium tracking-wide text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                {title}
            </span>
            <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-[#C0A062]"
                style={{ width: '100%', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
        </ScrollLink>
    );
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { title: 'About', to: 'about' },
        { title: 'Services', to: 'services' },
        { title: 'Portfolio', to: 'portfolio' },
        
        { title: 'Contact', to: 'contact' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const mobileMenuVariants = {
        hidden: { x: '100%', transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.5 } },
        visible: { x: 0, transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.5 } },
    };

    const mobileLinkContainerVariants = {
        hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const mobileLinkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <>
            <motion.header 
                className="fixed top-0 left-0 w-full z-50 bg-[#F9F5F0]/80 backdrop-blur-lg shadow-sm"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* ===== Logo ===== */}
                    <ScrollLink to="hero" smooth={true} duration={800} className="cursor-pointer">
                        <div className="text-2xl font-serif font-bold text-gray-800">
                            Pallavi Nandal
                        </div>
                    </ScrollLink>
                    
                    {/* ===== Desktop Navigation ===== */}
                    <nav className="hidden md:flex items-center space-x-10">
                        {navLinks.map(link => (
                            <NavLink key={link.to} {...link} />
                        ))}
                    </nav>

                    {/* ===== Mobile Menu Button ===== */}
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="focus:outline-none z-50 relative w-8 h-8">
                            <motion.div
                                animate={{
                                    y: isMobileMenuOpen ? '0.5rem' : '0.25rem',
                                    rotate: isMobileMenuOpen ? 45 : 0,
                                }}
                                className="absolute h-0.5 w-full bg-gray-800"
                            />
                             <motion.div
                                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                                className="absolute h-0.5 w-full mt-2 bg-gray-800"
                            />
                            <motion.div
                                animate={{
                                    y: isMobileMenuOpen ? '0.5rem' : '1.25rem',
                                    rotate: isMobileMenuOpen ? -45 : 0,
                                }}
                                className="absolute h-0.5 w-full bg-gray-800"
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ===== Mobile Menu Panel ===== */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex items-center justify-center"
                    >
                        <motion.nav
                            variants={mobileLinkContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex flex-col items-center space-y-8"
                        >
                            {navLinks.map(link => (
                                <motion.div key={link.to} variants={mobileLinkVariants} className="text-3xl text-gray-800">
                                    <NavLink {...link} closeMenu={toggleMobileMenu} />
                                </motion.div>
                            ))}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;