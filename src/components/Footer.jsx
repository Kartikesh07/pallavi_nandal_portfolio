import React from 'react';
import { FaInstagram, FaPinterest, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" className="hover:text-white transition-colors duration-300"><FaInstagram size={20} /></a>
                    <a href="#" className="hover:text-white transition-colors duration-300"><FaPinterest size={20} /></a>
                    <a href="#" className="hover:text-white transition-colors duration-300"><FaFacebook size={20} /></a>
                    <a href="#" className="hover:text-white transition-colors duration-300"><FaLinkedin size={20} /></a>
                </div>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Ananya Verma. All Rights Reserved.
                </p>
                <p className="text-xs mt-2">
                    <a href="#" className="hover:text-white underline">Privacy Policy</a> | <a href="#" className="hover:text-white underline">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;