import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FiCamera, FiHeart, FiBriefcase } from 'react-icons/fi';

// Define services data
const servicesData = [
    {
        icon: FiCamera,
        title: "Commercial Shoots",
        description: "Styling and bespoke creations for high-fashion editorials, ad campaigns, and brand lookbooks.",
        link: "contact",
    },
    {
        icon: FiHeart,
        title: "Weddings & Bridal",
        description: "Exquisite, custom-designed bridal wear and trousseaus that honor tradition with a modern touch.",
        link: "contact",
    },
    {
        icon: FiBriefcase,
        title: "Fashion Consultancy",
        description: "Expert guidance on collection development, brand identity, and sourcing for emerging designers.",
        link: "contact",
    }
];

// Reusable ServiceCard component
const ServiceCard = ({ icon: Icon, title, description, link, index }) => (
    <motion.div
        className="group bg-white p-8 rounded-lg shadow-lg border border-gray-200/80 text-center flex flex-col h-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
        <div className="flex-grow">
            <div className="inline-block p-4 bg-[#F9F5F0] rounded-full mb-6 transition-colors duration-300 group-hover:bg-[#C0A062]/20">
                <Icon className="text-4xl text-[#C0A062] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="mt-8">
            <ScrollLink
                to={link}
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
            >
                <button className="font-semibold text-gray-700 group-hover:text-[#C0A062] transition-colors duration-300">
                    Inquire Now &rarr;
                </button>
            </ScrollLink>
        </div>
    </motion.div>
);

const Services = () => {
    return (
        <section id="services" className="py-20 md:py-32 bg-[#F9F5F0]">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold text-gray-800">
                        My Offerings
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Bringing bespoke design and a unique artistic vision to every project.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;