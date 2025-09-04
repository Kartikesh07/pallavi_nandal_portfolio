import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { portfolioItems } from '../data/portfolioItems.generated';
import PortfolioCard from './PortfolioCard';

Modal.setAppElement('#root'); // This can remain to help with accessibility

const Portfolio = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('All');
    const [subFilter, setSubFilter] = useState('All');
    const [itemsWithMeta, setItemsWithMeta] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);

    // Reset visibleCount when filter or subFilter changes
    useEffect(() => {
        setVisibleCount(6);
    }, [filter, subFilter, itemsWithMeta]);

    // Load metadata.json and merge with portfolioItems
    useEffect(() => {
        async function fetchAndMergeAllMetadata() {
            const folders = Array.from(
                new Set(portfolioItems
                    .map(item => item.subCategory)
                    .filter(Boolean))
            );
            const metadataMap = {};
            for (const folder of folders) {
                const folderEncoded = encodeURIComponent(folder);
                // Try all possible category folders for this subCategory
                const possibleCategories = Array.from(
                    new Set(portfolioItems.filter(i => i.subCategory === folder).map(i => i.category))
                );
                for (const category of possibleCategories) {
                    const categoryEncoded = encodeURIComponent(category);
                    try {
                        const res = await fetch(`/images/${categoryEncoded}/${folderEncoded}/metadata.json`);
                        if (res.ok) {
                            metadataMap[folder] = await res.json();
                            break;
                        }
                    } catch (e) {
                        // ignore missing metadata
                    }
                }
            }
            // Merge: if metadata exists, use only metadata fields + technical fields from item
            const merged = portfolioItems.map(item => {
                const folder = item.subCategory;
                const fileKey = item.image
                    ? item.image.split('/').pop()
                    : item.video
                    ? item.video.split('/').pop()
                    : null;
                const meta = folder && metadataMap[folder] && fileKey
                    ? metadataMap[folder][fileKey]
                    : null;
                if (meta) {
                    // Only use metadata fields + technical fields from item
                    return {
                        id: item.id,
                        image: item.image,
                        video: item.video,
                        mediaType: item.mediaType,
                        category: item.category,
                        subCategory: item.subCategory,
                        ...meta
                    };
                }
                return item;
            });
            setItemsWithMeta(merged);
        }
        fetchAndMergeAllMetadata();
    }, []);

    // Get unique categories and subcategories
    const categories = ['All', ...Array.from(new Set(itemsWithMeta.map(item => item.category).filter(Boolean)))];

    // If a category is selected (not 'All'), get subcategories for that category
    const subCategories = filter !== 'All'
        ? ['All', ...Array.from(new Set(itemsWithMeta.filter(item => item.category === filter && item.subCategory).map(item => item.subCategory)))]
        : [];

    // Filtering logic
    let filteredItems = itemsWithMeta;
    if (filter !== 'All') {
        filteredItems = filteredItems.filter(item => item.category === filter);
        if (subFilter !== 'All' && subCategories.length > 0) {
            filteredItems = filteredItems.filter(item => item.subCategory === subFilter);
        }
    }

    // Always use show more for all filters
    const itemsToShow = filteredItems.slice(0, visibleCount);

    // If filteredItems shrinks below visibleCount, always show all
    useEffect(() => {
        if (visibleCount > filteredItems.length) {
            setVisibleCount(filteredItems.length);
        }
    }, [filteredItems.length]);

    const openModal = (item) => {
        setSelectedItem(item);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedItem(null);
    };

    // Fix: Remove all overflow, height, minHeight, and position styles from section, container, and grid
    return (
        <section id="portfolio" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                
                {/* Section Header and Filters */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                   <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Portfolio
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        A curated collection of designs where every thread tells a story of heritage and innovation.
                    </p>
                    <div className="flex justify-center flex-wrap gap-2 md:gap-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => {
                                    setFilter(category);
                                    setSubFilter('All');
                                }}
                                className={`px-5 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                                    filter === category 
                                    ? 'bg-gray-800 text-white shadow-md' 
                                    : 'bg-[#F9F5F0] text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    {/* Subcategory filter buttons */}
                    {subCategories.length > 1 && (
                        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mt-4">
                            {subCategories.map(sub => (
                                <button
                                    key={sub}
                                    onClick={() => setSubFilter(sub)}
                                    className={`px-4 py-1 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 ${
                                        subFilter === sub
                                        ? 'bg-[#C0A062] text-white shadow-md'
                                        : 'bg-[#F9F5F0] text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Centered Flexbox Grid */}
                <div className="flex flex-wrap justify-center -m-3">
                    <AnimatePresence>
                        {itemsToShow.map(item => (
                            <PortfolioCard key={item.id} item={item} onClick={openModal} />
                        ))}
                    </AnimatePresence>
                </div>
                {/* Show More button for all filters */}
                {visibleCount < filteredItems.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setVisibleCount(prev => Math.min(prev + 6, filteredItems.length))}
                            className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-semibold shadow hover:bg-[#a88c4a] transition"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
            {/* THE FIX: Wrap the Modal logic in a React Portal */}
            {modalIsOpen && selectedItem && ReactDOM.createPortal(
                <AnimatePresence>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Portfolio Item Details"
                        className="ReactModal__Content"
                        overlayClassName="ReactModal__Overlay"
                        bodyOpenClassName="" // <--- Prevents scroll lock on body
                        // If using react-modal >= 3.16.0, you can also use:
                        // preventScroll={false}
                        style={{ overlay: { zIndex: 1000 } }} 
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-y-auto"
                        >
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-20">
                                <FiX size={28} />
                            </button>
                            <div className="w-full md:w-1/2 flex-shrink-0">
                                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover rounded-md"/>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-gray-800 mb-3">{selectedItem.title}</h2>
                                <p className="text-sm font-semibold text-[#C0A062] mb-4 uppercase tracking-wider">{selectedItem.category}</p>
                                <p className="text-gray-600 mb-4 leading-relaxed">{selectedItem.description}</p>
                                <p className="text-gray-700">
                                    <span className="font-semibold text-gray-800">Materials:</span> {selectedItem.fabric}
                                </p>
                            </div>
                        </motion.div>
                    </Modal>
                </AnimatePresence>,
                document.getElementById('modal-root') // <-- 3. TELL THE PORTAL WHERE TO RENDER
            )}
        </section>
    );
};

export default Portfolio;