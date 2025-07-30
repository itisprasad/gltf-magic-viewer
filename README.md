# 3D Model Viewer

A modern, web-based 3D model viewer built with React, Three.js, and React Three Fiber. Upload and interact with .glb and .gltf 3D models with a professional interface and comprehensive viewing controls.

![3D Model Viewer](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=center)

## Features

- 🎯 **Drag & Drop Upload**: Simply drag .glb/.gltf files into the viewer
- 🔄 **Interactive Controls**: Rotate, pan, and zoom with mouse/touch
- 🎨 **Visual Options**: Toggle wireframe mode and switch environments
- 📊 **Model Information**: View file details and format information
- 🌍 **Environment Lighting**: Multiple preset environments for optimal viewing
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **WebGL Accelerated**: Hardware-accelerated 3D rendering
- 🎭 **Professional UI**: Dark theme optimized for 3D content viewing

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **3D Engine**: Three.js + React Three Fiber
- **3D Utilities**: React Three Drei
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **File Handling**: react-dropzone

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd 3d-model-viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

## Usage Guide

### Uploading Models

1. **Drag & Drop**: Drag a .glb or .gltf file directly onto the upload area
2. **File Browser**: Click "Choose File" to browse and select a model
3. **Supported Formats**: .glb (binary) and .gltf (JSON) files

### Viewer Controls

#### Mouse Controls
- **Left Click + Drag**: Rotate the model around its center
- **Right Click + Drag**: Pan the camera view
- **Scroll Wheel**: Zoom in and out
- **Reset Camera**: Click the "Reset Camera" button to return to default view

#### Viewer Options
- **Wireframe Mode**: Toggle between solid and wireframe rendering
- **Environment**: Choose from 10 different lighting environments
- **Model Info**: View file name, size, and format details

### Keyboard Shortcuts
- **Escape**: Clear current model
- **Space**: Reset camera to default position

## Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Static Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Netlify: Drag the `dist` folder to Netlify deploy
   - Vercel: Connect your GitHub repo for automatic deployment
   - AWS S3: Upload `dist` contents to S3 bucket with static hosting
   - GitHub Pages: Use GitHub Actions to deploy from the `dist` folder

### Deploy with Node.js Server

1. **Install serve globally**
   ```bash
   npm install -g serve
   ```

2. **Build and serve**
   ```bash
   npm run build
   serve -s dist -l 3000
   ```

3. **Using PM2 for production**
   ```bash
   npm install -g pm2
   npm run build
   pm2 serve dist 3000 --name "3d-viewer"
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
   ```

2. **Build and run**
   ```bash
   docker build -t 3d-viewer .
   docker run -p 3000:3000 3d-viewer
   ```

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── ModelViewer.tsx  # 3D canvas and viewer logic
│   ├── FileUpload.tsx   # File upload interface
│   ├── ViewerControls.tsx # Control panel
│   └── ModelInfo.tsx    # Model information display
├── pages/
│   ├── Index.tsx        # Main application page
│   └── NotFound.tsx     # 404 error page
├── lib/
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
├── index.css           # Global styles and design system
└── main.tsx            # Application entry point
```

## Environment Variables

No environment variables are required for basic functionality. All 3D rendering happens client-side.

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

**Requirements**: WebGL 2.0 support is required for optimal performance.

## Troubleshooting

### Common Issues

1. **Model not loading**
   - Ensure file is valid .glb/.gltf format
   - Check browser console for specific error messages
   - Try a different model file to isolate the issue

2. **Performance issues**
   - Large models (>50MB) may load slowly
   - Reduce model complexity or file size if needed
   - Ensure hardware acceleration is enabled in browser

3. **Controls not working**
   - Check if WebGL is enabled in browser settings
   - Try refreshing the page
   - Ensure you're using a supported browser

### File Format Support

- **.glb**: Binary GLTF format (recommended for better performance)
- **.gltf**: JSON GLTF format (larger file size but human-readable)

### Performance Tips

- Use .glb format for better loading performance
- Optimize models before uploading (Blender, etc.)
- Consider model complexity for web viewing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Three.js**: The foundational 3D library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers and abstractions
- **shadcn/ui**: Beautiful UI component library
- **Radix UI**: Primitive components for accessibility

## Support

For issues and questions:
1. Check the [Issues](../../issues) section
2. Review the troubleshooting guide above
3. Create a new issue with detailed information

---

**Built with ❤️ using React, Three.js, and modern web technologies**