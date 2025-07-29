// Utility functions for meme operations

export const formatText = (text) => {
    if (!text) return '';
    return text.toUpperCase().trim();
};

export const validateImageUrl = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

export const getRandomColor = () => {
    const colors = [
        '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
        '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomStrokeColor = () => {
    const colors = [
        '#000000', '#ffffff', '#ff0000', '#0000ff', '#008000'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const generateMemeFileName = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `meme-inator-${timestamp}.png`;
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const getFontSizeForText = (text, maxWidth, maxHeight) => {
    if (!text) return 40;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let fontSize = 40;
    
    ctx.font = `${fontSize}px Impact`;
    let textWidth = ctx.measureText(text).width;
    
    while (textWidth > maxWidth * 0.8 && fontSize > 20) {
        fontSize -= 2;
        ctx.font = `${fontSize}px Impact`;
        textWidth = ctx.measureText(text).width;
    }
    
    return fontSize;
}; 