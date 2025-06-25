import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Search, Star, Image, RefreshCw } from 'lucide-react';
import memesData from '../memesData.jsx';
import { getAllFallbackMemes } from '../utils/fallbackMemes.js';

export default function MemeGallery({ onSelectMeme, isVisible, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [failedImages, setFailedImages] = useState(new Set());

    // Get popular meme templates from the data
    const popularMemes = memesData.data.memes.slice(0, 20);
    const fallbackMemes = getAllFallbackMemes();
    
    // Combine regular memes with fallback memes
    const allMemes = [...popularMemes, ...fallbackMemes];
    
    const categories = [
        { id: 'all', name: 'All Memes' },
        { id: 'classic', name: 'Classic' },
        { id: 'recent', name: 'Recent' },
        { id: 'popular', name: 'Popular' },
        { id: 'fallback', name: 'Reliable Templates' }
    ];

    const filteredMemes = allMemes.filter(meme => {
        const matchesSearch = meme.name.toLowerCase().includes(searchTerm.toLowerCase());
        const notFailed = !failedImages.has(meme.id);
        
        if (selectedCategory === 'fallback') {
            return matchesSearch && meme.id.startsWith('fallback');
        }
        
        return matchesSearch && notFailed;
    });

    const handleMemeSelect = (meme) => {
        onSelectMeme(meme.url, meme);
        onClose();
    };

    const handleImageError = (memeId) => {
        setFailedImages(prev => new Set([...prev, memeId]));
    };

    const handleImageLoad = (memeId) => {
        setFailedImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(memeId);
            return newSet;
        });
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="meme-gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="meme-gallery"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="gallery-header">
                    <h2>
                        <Grid size={24} />
                        Meme Gallery
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="gallery-controls">
                    <div className="search-container">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search memes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="meme-grid">
                    {filteredMemes.map((meme, index) => (
                        <motion.div
                            key={meme.id}
                            className={`meme-card ${meme.id.startsWith('fallback') ? 'fallback-meme' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleMemeSelect(meme)}
                        >
                            <div className="meme-card-image">
                                <img 
                                    src={meme.url} 
                                    alt={meme.name}
                                    onLoad={() => handleImageLoad(meme.id)}
                                    onError={() => handleImageError(meme.id)}
                                />
                                <div className="meme-card-overlay">
                                    <Star size={16} />
                                    <span>Use Template</span>
                                </div>
                                {meme.id.startsWith('fallback') && (
                                    <div className="fallback-badge">
                                        Reliable
                                    </div>
                                )}
                            </div>
                            <div className="meme-card-info">
                                <h4>{meme.name}</h4>
                                <p>{meme.width} × {meme.height}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredMemes.length === 0 && (
                    <div className="no-results">
                        {searchTerm ? (
                            <>
                                <p>No memes found matching "{searchTerm}"</p>
                                <button onClick={() => setSearchTerm('')}>Clear Search</button>
                            </>
                        ) : (
                            <>
                                <Image size={48} />
                                <h3>No Memes Available</h3>
                                <p>Some meme images may not be loading due to server restrictions.</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="retry-btn"
                                    onClick={() => setFailedImages(new Set())}
                                >
                                    <RefreshCw size={16} />
                                    Retry Loading
                                </motion.button>
                            </>
                        )}
                    </div>
                )}

                {failedImages.size > 0 && (
                    <div className="failed-images-notice">
                        <p>
                            {failedImages.size} meme{failedImages.size !== 1 ? 's' : ''} failed to load. 
                            Try the "Reliable Templates" category for guaranteed working images.
                        </p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
} 