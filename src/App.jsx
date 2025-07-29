import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import MemeEditor from './components/MemeEditor';
import Loading from './components/Loading';
import Footer from './components/Footer';
import { useMemeApi } from './hooks/useMemeApi';
import './styles/App.css';

function App() {
    const { memes, loading, getRandomMeme, refreshMemes } = useMemeApi();
    const [currentMeme, setCurrentMeme] = useState({
        randomImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY3ZWVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DbGFzc2ljIE1lbWU8L3RleHQ+PC9zdmc+",
        textSettings: {
            topText: '',
            bottomText: '',
            fontSize: 40,
            textColor: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 2,
            fontFamily: 'Impact'
        }
    });

    const [appLoading, setAppLoading] = useState(true);

    useEffect(() => {
        // Simulate initial app loading
        const timer = setTimeout(() => {
            setAppLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (memes.length > 0) {
            const randomMeme = getRandomMeme();
            if (randomMeme) {
                setCurrentMeme(prev => ({
                    ...prev,
                    randomImage: randomMeme.url,
                    meme: randomMeme
                }));
            }
        }
    }, [memes, getRandomMeme]);

    const handleGetNewMeme = useCallback(() => {
        const randomMeme = getRandomMeme();
        if (randomMeme) {
            setCurrentMeme(prev => ({
                ...prev,
                randomImage: randomMeme.url,
                meme: randomMeme,
                textSettings: {
                    ...prev.textSettings,
                    topText: '',
                    bottomText: ''
                }
            }));
        }
    }, [getRandomMeme]);

    const handleMemeChange = useCallback((newMeme) => {
        setCurrentMeme(newMeme);
    }, []);

    if (appLoading) {
        return <Loading />;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Header />
                
                <main className="main-content">
                    {loading ? (
                        <Loading />
                    ) : (
                        <MemeEditor
                            meme={currentMeme}
                            onMemeChange={handleMemeChange}
                            onGetNewMeme={handleGetNewMeme}
                        />
                    )}
                </main>
                <Footer />
            </motion.div>
        </AnimatePresence>
    );
}

export default App;
