import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Shuffle, Settings, Type, Palette, RotateCcw, Image } from 'lucide-react';
import MemeGallery from './MemeGallery';
import '../styles/MemeEditor.css';
import '../styles/MemeGallery.css';

export default function MemeEditor({ meme, onMemeChange, onGetNewMeme }) {
    const [textSettings, setTextSettings] = useState({
        topText: '',
        bottomText: '',
        fontSize: 40,
        textColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 2,
        fontFamily: 'Impact'
    });

    const [showSettings, setShowSettings] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const memeRef = useRef(null);

    const handleTextChange = (field, value) => {
        setTextSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const downloadMeme = async () => {
        if (!memeRef.current) return;

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const memeContainer = memeRef.current;
            const img = memeContainer.querySelector('img');
            
            if (!img || !img.complete) {
                alert('Please wait for the image to load completely before downloading.');
                return;
            }
            
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            if (textSettings.topText || textSettings.bottomText) {
                ctx.textAlign = 'center';
                ctx.font = `${textSettings.fontSize * (canvas.width / memeContainer.offsetWidth)}px ${textSettings.fontFamily}`;
                
                const strokeWidth = textSettings.strokeWidth * (canvas.width / memeContainer.offsetWidth);
                ctx.strokeStyle = textSettings.strokeColor;
                ctx.lineWidth = strokeWidth;
                ctx.fillStyle = textSettings.textColor;
                
                if (textSettings.topText) {
                    const y = 50 * (canvas.height / memeContainer.offsetHeight);
                    ctx.strokeText(textSettings.topText.toUpperCase(), canvas.width / 2, y);
                    ctx.fillText(textSettings.topText.toUpperCase(), canvas.width / 2, y);
                }
                
                if (textSettings.bottomText) {
                    const y = canvas.height - 50 * (canvas.height / memeContainer.offsetHeight);
                    ctx.strokeText(textSettings.bottomText.toUpperCase(), canvas.width / 2, y);
                    ctx.fillText(textSettings.bottomText.toUpperCase(), canvas.width / 2, y);
                }
            }
            
            const link = document.createElement('a');
            link.download = 'meme-inator-meme.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('Error downloading meme:', error);
            alert('Failed to download meme. Please try again.');
        }
    };

    const resetText = () => {
        setTextSettings(prev => ({
            ...prev,
            topText: '',
            bottomText: ''
        }));
    };

    const handleGallerySelect = (imageUrl, memeData) => {
        const newMeme = {
            ...meme,
            randomImage: imageUrl,
            meme: memeData,
            textSettings: {
                ...meme.textSettings,
                topText: '',
                bottomText: ''
            }
        };
        
        onMemeChange(newMeme);
        
        setTextSettings(prev => ({
            ...prev,
            topText: '',
            bottomText: ''
        }));
        setImageLoading(true);
    };

    const getTextStyle = () => ({
        fontSize: `${textSettings.fontSize}px`,
        color: textSettings.textColor,
        fontFamily: textSettings.fontFamily,
        textShadow: `
            ${textSettings.strokeWidth}px ${textSettings.strokeWidth}px 0 ${textSettings.strokeColor},
            -${textSettings.strokeWidth}px -${textSettings.strokeWidth}px 0 ${textSettings.strokeColor},
            ${textSettings.strokeWidth}px -${textSettings.strokeWidth}px 0 ${textSettings.strokeColor},
            -${textSettings.strokeWidth}px ${textSettings.strokeWidth}px 0 ${textSettings.strokeColor}
        `
    });

    useEffect(() => {
        setImageLoading(true);
    }, [meme.randomImage]);

    return (
        <div className="meme-editor">
            <div className="editor-controls">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="control-btn primary"
                    onClick={onGetNewMeme}
                >
                    <Shuffle size={20} />
                    New Meme
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="control-btn secondary"
                    onClick={() => setShowGallery(true)}
                >
                    <Image size={20} />
                    Gallery
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="control-btn secondary"
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Settings size={20} />
                    Customize
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="control-btn success"
                    onClick={downloadMeme}
                >
                    <Download size={20} />
                    Download
                </motion.button>
            </div>

            <motion.div
                className="meme-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="meme" ref={memeRef}>
                    {imageLoading && (
                        <div className="image-loading">
                            <div className="loading-spinner" />
                            <p>Loading meme...</p>
                        </div>
                    )}
                    
                    <img 
                        className={`meme-image ${imageLoading ? 'loading' : ''}`}
                        src={meme.randomImage} 
                        alt="Meme" 
                        onLoad={handleImageLoad}
                        style={{ display: imageLoading ? 'none' : 'block' }}
                    />
                    
                    {!imageLoading && textSettings.topText && (
                        <div className="meme-text top" style={getTextStyle()}>
                            {textSettings.topText}
                        </div>
                    )}
                    {!imageLoading && textSettings.bottomText && (
                        <div className="meme-text bottom" style={getTextStyle()}>
                            {textSettings.bottomText}
                        </div>
                    )}
                </div>
            </motion.div>

            {showSettings && (
                <motion.div
                    className="settings-panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="settings-grid">
                        <div className="setting-group">
                            <label>
                                <Type size={16} />
                                Top Text
                            </label>
                            <input
                                type="text"
                                value={textSettings.topText}
                                onChange={(e) => handleTextChange('topText', e.target.value)}
                                placeholder="Enter top text..."
                                maxLength={50}
                            />
                        </div>

                        <div className="setting-group">
                            <label>
                                <Type size={16} />
                                Bottom Text
                            </label>
                            <input
                                type="text"
                                value={textSettings.bottomText}
                                onChange={(e) => handleTextChange('bottomText', e.target.value)}
                                placeholder="Enter bottom text..."
                                maxLength={50}
                            />
                        </div>

                        <div className="setting-group">
                            <label>Font Size</label>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                value={textSettings.fontSize}
                                onChange={(e) => handleTextChange('fontSize', parseInt(e.target.value))}
                            />
                            <span>{textSettings.fontSize}px</span>
                        </div>

                        <div className="setting-group">
                            <label>
                                <Palette size={16} />
                                Text Color
                            </label>
                            <input
                                type="color"
                                value={textSettings.textColor}
                                onChange={(e) => handleTextChange('textColor', e.target.value)}
                            />
                        </div>

                        <div className="setting-group">
                            <label>Stroke Color</label>
                            <input
                                type="color"
                                value={textSettings.strokeColor}
                                onChange={(e) => handleTextChange('strokeColor', e.target.value)}
                            />
                        </div>

                        <div className="setting-group">
                            <label>Stroke Width</label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={textSettings.strokeWidth}
                                onChange={(e) => handleTextChange('strokeWidth', parseInt(e.target.value))}
                            />
                            <span>{textSettings.strokeWidth}px</span>
                        </div>

                        <div className="setting-group">
                            <label>Font Family</label>
                            <select
                                value={textSettings.fontFamily}
                                onChange={(e) => handleTextChange('fontFamily', e.target.value)}
                            >
                                <option value="Impact">Impact</option>
                                <option value="Arial Black">Arial Black</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Times New Roman">Times New Roman</option>
                            </select>
                        </div>

                        <div className="setting-group">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="reset-btn"
                                onClick={resetText}
                            >
                                <RotateCcw size={16} />
                                Reset Text
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}

            <MemeGallery
                isVisible={showGallery}
                onClose={() => setShowGallery(false)}
                onSelectMeme={handleGallerySelect}
            />
        </div>
    );
} 