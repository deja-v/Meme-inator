import { useState, useEffect, useCallback } from 'react';
import { getRandomFallbackMeme, getAllFallbackMemes } from '../utils/fallbackMemes.js';

export const useMemeApi = () => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMemes = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch memes from Imgflip API
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            if (data.success && data.data && data.data.memes) {
                setMemes(data.data.memes);
            } else {
                // Fallback if API response is not as expected
                setMemes(getAllFallbackMemes());
            }
        } catch (error) {
            // Fallback to static memes on error
            setMemes(getAllFallbackMemes());
        }
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