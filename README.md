# 🎭 Meme-inator

A modern, feature-rich meme generator built with React that allows you to create, customize, and download memes with ease!

## ✨ Features

### 🎨 **Enhanced UI/UX**
- **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Loading States**: Elegant loading animations and error handling

### 🖼️ **Meme Creation**
- **Random Meme Generation**: Get random memes from the Reddit API
- **Text Overlay**: Add custom top and bottom text to any meme
- **Real-time Preview**: See your changes instantly as you type

### 🎛️ **Customization Options**
- **Font Size Control**: Adjustable font size from 20px to 80px
- **Color Customization**: Choose any color for text and stroke
- **Stroke Width**: Adjustable text outline thickness (1-5px)
- **Font Family Selection**: Multiple font options (Impact, Arial Black, Comic Sans MS, etc.)
- **Text Reset**: Quick reset button to clear all text

### 💾 **Export & Share**
- **High-Quality Download**: Download memes as PNG files with 2x resolution
- **Cross-Origin Support**: Handles images from various sources
- **Automatic Naming**: Generated filenames with timestamps

### 🔧 **Technical Features**
- **Error Handling**: Graceful fallbacks when API calls fail
- **Performance Optimized**: Efficient state management and rendering
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern React**: Built with React 18 and latest best practices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Meme-inator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
Meme-inator/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx      # Application header
│   │   ├── MemeEditor.jsx  # Main meme editor
│   │   ├── Loading.jsx     # Loading component
│   │   └── Footer.jsx      # Application footer
│   ├── hooks/              # Custom React hooks
│   │   └── useMemeApi.js   # Meme API integration
│   ├── utils/              # Utility functions
│   │   └── memeUtils.js    # Meme-related utilities
│   ├── styles/             # CSS stylesheets
│   │   ├── App.css         # Main application styles
│   │   └── MemeEditor.css  # Meme editor styles
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── public/                 # Public assets
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **HTML2Canvas**: Image capture and download functionality
- **CSS3**: Modern styling with gradients, backdrop filters, and animations

## 🎯 How to Use

1. **Generate a Meme**: Click the "New Meme" button to get a random meme
2. **Add Text**: Click "Customize" to open the settings panel
3. **Customize**: 
   - Enter top and bottom text
   - Adjust font size, color, and stroke
   - Choose your preferred font family
4. **Download**: Click "Download" to save your meme as a PNG file

## 🔧 Customization

### Adding New Fonts
To add new fonts, edit the `fontFamily` options in `MemeEditor.jsx`:

```javascript
<option value="Your Font">Your Font</option>
```

### Modifying Colors
Update the color arrays in `memeUtils.js` to add new color options:

```javascript
export const getRandomColor = () => {
    const colors = [
        '#yourcolor1', '#yourcolor2', // Add your colors here
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
```

### API Configuration
The app uses the Reddit Meme API. You can modify the API endpoint in `useMemeApi.js`:

```javascript
const response = await fetch("https://meme-api.com/gimme/100");
```

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check your internet connection and ensure the meme API is accessible
2. **Download not working**: Make sure the image has loaded completely before downloading
3. **Text not appearing**: Verify that you've entered text in the customization panel

### Error Handling
The app includes comprehensive error handling:
- Network errors are caught and displayed to the user
- Fallback images are provided when API calls fail
- Loading states prevent interaction during data fetching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Reddit Meme API**: For providing the meme images
- **Framer Motion**: For the smooth animations
- **Lucide**: For the beautiful icons
- **HTML2Canvas**: For the download functionality

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Made with ❤️ by Devang Jain**

*Create, customize, and share your memes with the world!*
