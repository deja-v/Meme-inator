import { Heart, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <p>
                        Made with <Heart className="heart-icon" size={16} /> by Devang Jain
                    </p>
                </div>
                <div className="footer-section">
                    <a 
                        href="http://github.com/deja-v/Meme-inator" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        <Github size={16} />
                        GitHub
                    </a>
                    <a 
                        href="https://imgflip.com/api" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        <ExternalLink size={16} />
                        Meme API
                    </a>
                </div>
            </div>
        </footer>
    );
} 