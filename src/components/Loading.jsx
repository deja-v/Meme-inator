import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="loading-container">
            <motion.div
                className="loading-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 size={48} className="loading-spinner" />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Loading Memes...
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="loading-subtitle"
                >
                    Preparing the ultimate meme experience
                </motion.p>
            </motion.div>
        </div>
    );
} 