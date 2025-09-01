# Modern Headline Editor

A beautiful, feature-rich headline editor built with React, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

## ✨ Features

### 🎨 Core Layout
- **Sidebar Gallery**: Draggable preset cards (Hero, Minimal, Neon, Elegant, Bold, Modern)
- **Live Preview**: Real-time preview of your headline with all effects applied
- **Editor Panel**: Comprehensive controls for typography, gradients, and effects

### 🎯 Editor Features
- **Typography Controls**:
  - Font family selection (Inter, Roboto, Open Sans, Lato, Poppins, etc.)
  - Font size slider (12px - 120px)
  - Font weight slider (100 - 900)
  - Line height adjustment (0.8 - 2.5)
  - Letter spacing control (-5px - 20px)

- **Gradient System**:
  - Toggle gradient on/off
  - Direction controls (→, ←, ↑, ↓)
  - Two-color picker
  - Pre-built color templates (Ocean Blue, Sunset, Forest, Neon Pink, Golden, Purple Dream)

- **Visual Effects**:
  - Per-letter animations (fade, slide, stagger)
  - Hover glow effects
  - Text shadow
  - Text outline
  - Fade-in animations
  - Shadow presets (soft, medium, neon)

### 🌙 Theme & Polish
- **Dark/Light Mode**: Toggle with smooth transitions
- **Glassmorphism**: Beautiful backdrop blur effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works on all screen sizes

### 📤 Export & Share
- **Export Options**:
  - JSON settings file
  - React component file
  - HTML snippet (copied to clipboard)
  - PNG image export
- **Share Features**:
  - Generate shareable URLs with encoded settings
  - Copy shareable links
  - Web Share API support

### 💾 Persistence
- **LocalStorage**: Automatic saving of settings and presets
- **URL Loading**: Load settings from shareable URLs
- **Session Persistence**: Maintains state across browser sessions

### ⌨️ Keyboard Shortcuts
- `Cmd/Ctrl + K`: Quick actions menu
- `Cmd/Ctrl + D`: Toggle dark mode
- `Escape`: Reset to default settings

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd headline-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons
- **html2canvas** - Image export
- **Vite** - Build tool

## 📁 Project Structure

```
src/
├── components/
│   ├── EditorPanel.tsx      # Main editor controls
│   ├── PreviewPanel.tsx     # Live preview area
│   ├── PresetCard.tsx       # Preset gallery cards
│   ├── Sidebar.tsx          # Sidebar with presets and actions
│   ├── ThemeProvider.tsx    # Theme context provider
│   └── KeyboardShortcuts.tsx # Keyboard event handlers
├── store/
│   └── editorStore.ts       # Zustand store (legacy)
├── utils/
│   ├── exportUtils.ts       # Export functionality
│   ├── localStorageUtils.ts # LocalStorage persistence
│   └── shareUtils.ts        # URL sharing utilities
├── types/
│   └── Type.ts             # TypeScript type definitions
├── store.ts                # Main Zustand store
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## 🎨 Preset Gallery

The application comes with 6 beautiful pre-designed presets:

1. **Hero** - Large, bold with blue gradient and stagger animation
2. **Minimal** - Clean, simple typography
3. **Neon** - Glowing neon effect with purple gradient
4. **Elegant** - Sophisticated with purple gradient and letter spacing
5. **Bold** - Extra large, bold statement with orange gradient
6. **Modern** - Contemporary design with green gradient

## 🔧 Customization

### Adding New Presets
Add new presets to the `defaultPresets` array in `src/store.ts`:

```typescript
{
  id: 'custom',
  name: 'Custom Preset',
  settings: {
    ...defaultSettings,
    text: 'Your Custom Text',
    fontSize: 48,
    fontWeight: 700,
    gradientEnabled: true,
    gradientColors: ['#your-color-1', '#your-color-2'],
    // ... other settings
  },
}
```

### Adding New Fonts
1. Add the font import to `src/index.css`
2. Add the font name to the `fontFamilies` array in `EditorPanel.tsx`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Lucide](https://lucide.dev/) for beautiful icons
