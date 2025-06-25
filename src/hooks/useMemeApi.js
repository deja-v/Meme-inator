import { useState, useEffect, useCallback } from 'react';
import { getRandomFallbackMeme, getAllFallbackMemes } from '../utils/fallbackMemes.js';

export const useMemeApi = () => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMemes = useCallback(async () => {
        setLoading(true);
        
        // Use only static fallback memes
        const fallbackMemes = getAllFallbackMemes();
        setMemes(fallbackMemes);
        
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchMemes();
    }, [fetchMemes]);

    const getRandomMeme = useCallback(() => {
        if (memes.length === 0) {
            return getRandomFallbackMeme();
        }
        
        const randomIndex = Math.floor(Math.random() * memes.length);
        return memes[randomIndex];
    }, [memes]);

    const refreshMemes = useCallback(() => {
        fetchMemes();
    }, [fetchMemes]);

    return {
        memes,
        loading,
        getRandomMeme,
        refreshMemes
    };
}; 