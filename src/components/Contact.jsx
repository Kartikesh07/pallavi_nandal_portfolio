import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import { FaInstagram, FaPinterest } from 'react-icons/fa';

// Define the contact methods as an array for easy mapping
const contactMethods = [
    {
        icon: FiMail,
        title: "By Email",
        handle: "pallavinandal67@gmail.com",
        href: "mailto:pallavinandal67@gmail.com",
        cta: "Send an Inquiry"
    },
    {
        icon: FaInstagram,
        title: "On Instagram",
        handle: "@stylist.pallavi_nandal",
        href: "https://www.instagram.com/stylist.pallavi_nandal?igsh=MTl4NHZoMHFlaGwwZA==", // Replace with actual Instagram link
        cta: "View My Feed"
    },
    {
        icon: FaPinterest,
        title: "For Inspiration",
        handle: "pal__1611",
        href: "https://pin.it/1JQimHOKT", // Replace with actual Pinterest link
        cta: "See My Pins"
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};


const Contact = () => {
    return (
        <section 
            id="contact" 
            className="relative min-h-screen py-20 md:py-32 bg-white flex flex-col items-center justify-center text-center"
        >
            <div className="container mx-auto px-6 relative z-10">
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 
                        style={{ fontFamily: "'Playfair Display', serif" }} 
                        className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
                    >
                        Let's Connect
                    </h2>
                    <p className="mb-16 max-w-2xl mx-auto text-lg text-gray-600">
                        The conversation starts here. Choose your preferred way to connect and let's create something beautiful together.
                    </p>
                </motion.div>

                {/* Interactive Contact Cards */}
                <motion.div 
                    className="grid md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <motion.a
                                key={index}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block bg-white p-8 rounded-lg overflow-hidden border border-gray-200 shadow-lg transition-all duration-300"
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                            >
                                {/* The animated background */}
                                <div className="absolute inset-0 bg-[#C0A062] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out origin-bottom"></div>
                                
                                <div className="relative z-10 flex flex-col items-center">
                                    <Icon className="mb-4 text-[#C0A062] group-hover:text-gray-900 transition-colors duration-300" size={40} />
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-1">{method.title}</h3>
                                    <p className="text-gray-500 group-hover:text-gray-800 transition-colors duration-300 mb-6">{method.handle}</p>
                                    
                                    <div className="flex items-center text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-gray-900">
                                        <span>{method.cta}</span>
                                        <FiArrowRight className="ml-2" />
                                    </div>
                                </div>
                            </motion.a>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
