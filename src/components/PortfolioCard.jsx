import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

// Animation Variants for hover/tap feedback
const cardHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

const videoTransitionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const PortfolioCard = ({ item }) => {
    const [playVideo, setPlayVideo] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    // Only allow flipping for images. Videos will play on click.
    const isFlippable = item.mediaType !== 'video';
    const showDetails = isFlippable && (item.description || item.stylist || item.photographer || item.brand);

    const aspectRatio = '3 / 4';

    const videoRotationStyle = item.rotate
        ? { transform: 'rotate(90deg) scale(1.33)', width: '100%', height: '100%', objectFit: 'cover' }
        : {};

    const handleCardClick = (e) => {
        // Prevent click propagation from close buttons or links
        if (e.target.closest('.no-flip')) return;

        if (isFlippable) {
            // Only flip if there are details to show
            if (showDetails) setIsFlipped(!isFlipped);
        } else {
            setPlayVideo(true);
        }
    };

    const handleCloseVideo = (e) => {
        e.stopPropagation();
        setPlayVideo(false);
    };

    const handleShowDetail = (e) => {
        e.stopPropagation();
        setShowDetail(true);
    };

    const handleCloseDetail = (e) => {
        e.stopPropagation();
        setShowDetail(false);
    };

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-3">
            {/* This container enables the 3D perspective for the flip */}
            <div className="w-full" style={{ perspective: '1200px' }}>
                <motion.div
                    className="relative w-full cursor-pointer"
                    style={{ aspectRatio, transformStyle: 'preserve-3d' }}
                    onClick={handleCardClick}
                    variants={cardHoverVariants}
                    initial="initial"
                    // Disable hover effect when card is flipped for better UX
                    whileHover={!isFlipped ? 'hover' : 'initial'}
                    // Animate the flip
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    {/* ===== Front of the Card (Visible by default) ===== */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-lg shadow-lg bg-black overflow-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }} // translateZ for iOS perf
                    >
                        {item.mediaType === 'video' ? (
                            playVideo ? (
                                <div className="relative w-full h-full">
                                    <button
                                        onClick={handleCloseVideo}
                                        className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 rounded-full p-1 text-white"
                                    >
                                        <FiX size={24} />
                                    </button>
                                    <video
                                        src={item.video ? encodeURI(item.video) : undefined}
                                        className="w-full h-full object-cover rounded-lg"
                                        controls
                                        autoPlay
                                        playsInline
                                        poster={item.image ? encodeURI(item.image) : undefined}
                                        style={videoRotationStyle}
                                    />
                                </div>
                            ) : (
                                <>
                                    <video
                                        src={item.video ? encodeURI(item.video) : undefined}
                                        className="w-full h-full object-cover"
                                        controls={false}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        poster={item.image ? encodeURI(item.image) : undefined}
                                        style={videoRotationStyle}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                                            <circle cx="28" cy="28" r="28" fill="rgba(0,0,0,0.4)" />
                                            <polygon points="22,18 40,28 22,38" fill="#fff" />
                                        </svg>
                                    </div>
                                    {item.rotate && (
                                        <div className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                            Rotated
                                        </div>
                                    )}
                                </>
                            )
                        ) : (
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.image ? encodeURI(item.image) : ''})` }}
                            />
                        )}
                    </div>

                    {/* ===== Back of the Card (Hidden by default, rotated) ===== */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-lg shadow-lg bg-[#F9F5F0] text-gray-800 p-6 flex flex-col justify-center"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg) translateZ(0)',
                        }}
                    >
                        <div className="text-center max-h-full overflow-y-auto">
                           <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[#C0A062] mb-4">
                                Details
                            </h3>
                            {/* Dynamically render all metadata fields except technical ones */}
                            <div className="space-y-2 text-sm">
                                {Object.entries(item)
                                    .filter(([key, value]) =>
                                        !['id', 'image', 'video', 'mediaType', 'category', 'subCategory'].includes(key) &&
                                        value !== undefined &&
                                        value !== null &&
                                        value !== '' &&
                                        typeof value !== 'object'
                                    )
                                    .map(([key, value]) => (
                                        <p key={key}>
                                            <span className="font-semibold text-gray-800">
                                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                            </span> {value}
                                        </p>
                                    ))
                                }
                                {Object.entries(item)
                                    .filter(([key, value]) =>
                                        !['id', 'image', 'video', 'mediaType', 'category', 'subCategory'].includes(key) &&
                                        value !== undefined &&
                                        value !== null &&
                                        value !== '' &&
                                        typeof value !== 'object'
                                    ).length === 0 && (
                                        <span>No details available.</span>
                                    )
                                }
                            </div>
                        </div>
                        {/* Overlay for details */}
                        {showDetail && (
                            <div className="absolute inset-0 z-20 bg-black bg-opacity-80 flex flex-col justify-center items-center rounded-lg">
                                <button
                                    onClick={handleCloseDetail}
                                    className="absolute top-2 right-2 z-30 bg-black bg-opacity-50 rounded-full p-1 text-white"
                                >
                                    <FiX size={24} />
                                </button>
                                <div className="text-white text-center px-6 py-4 max-h-full overflow-y-auto">
                                    {
                                        Object.keys(item)
                                            .filter(key =>
                                                !['id', 'image', 'video', 'mediaType', 'category', 'subCategory'].includes(key) &&
                                                typeof item[key] !== 'object' &&
                                                item[key] !== undefined &&
                                                item[key] !== null &&
                                                String(item[key]).trim() !== ''
                                            )
                                            .map(key => (
                                                <p className="mb-1" key={key}>
                                                    <span className="font-semibold">
                                                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                                    </span> {item[key]}
                                                </p>
                                            ))
                                    }
                                    {
                                        Object.keys(item)
                                            .filter(key =>
                                                !['id', 'image', 'video', 'mediaType', 'category', 'subCategory'].includes(key) &&
                                                typeof item[key] !== 'object' &&
                                                item[key] !== undefined &&
                                                item[key] !== null &&
                                                String(item[key]).trim() !== ''
                                            ).length === 0 && (
                                                <span>No details available.</span>
                                            )
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PortfolioCard;