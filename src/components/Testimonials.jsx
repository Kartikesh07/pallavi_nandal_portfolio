import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { testimonials } from '../data/mockData';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 md:py-32 bg-[#F9F5F0] overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold text-gray-800">
                        Words of Praise
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Hear from clients and collaborators who have experienced the magic of my designs.
                    </p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <Swiper
                        modules={[EffectCreative, Navigation, Pagination, Autoplay]}
                        effect={'creative'}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: ['-120%', 0, -500],
                                rotate: [0, 0, -12],
                                opacity: 0.6,
                            },
                            next: {
                                shadow: true,
                                translate: ['120%', 0, -500],
                                rotate: [0, 0, 12],
                                opacity: 0.6,
                            },
                        }}
                        loop={true}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{ 
                            el: '.swiper-pagination-custom',
                            clickable: true 
                        }}
                        className="!overflow-visible"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index} className="!w-full md:!w-3/5 lg:!w-1/2 !opacity-100">
                                {/* The Card Itself */}
                                <div className="bg-white rounded-lg p-8 md:p-12 relative shadow-xl border border-gray-200/80 min-h-[350px] flex flex-col justify-center">
                                    <FaQuoteLeft className="absolute top-8 left-8 text-7xl text-gray-100 z-0" />
                                    <blockquote className="relative z-10">
                                        <p style={{ fontFamily: "'Playfair Display', serif", textShadow: 'none' }}
                                           className="text-xl md:text-2xl italic text-gray-700 mb-8">
                                            {testimonial.quote}
                                        </p>
                                        <footer className="flex items-center">
                                            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#C0A062]/50"/>
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                                                <p className="text-gray-500">{testimonial.title}</p>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-10">
                        <button className="bg-white/50 hover:bg-white text-gray-700 p-3 rounded-full shadow-md transition-all">
                            <FiArrowLeft size={24} />
                        </button>
                    </div>
                    <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-10">
                        <button className="bg-white/50 hover:bg-white text-gray-700 p-3 rounded-full shadow-md transition-all">
                            <FiArrowRight size={24} />
                        </button>
                    </div>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination-custom text-center mt-12"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;