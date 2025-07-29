import { Zap, Sparkles } from 'lucide-react';
import icon from "../assets/icon.svg";

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <img className="icon" height="40px" src={icon} alt="Meme-inator" />
                    <h1>Meme-inator</h1>
                    <Sparkles className="sparkle-icon" size={20} />
                </div>
                <div className="header-subtitle">
                    <Zap className="zap-icon" size={16} />
                    <span>Create, Customize, Share!</span>
                </div>
            </div>
        </header>
    );
} 