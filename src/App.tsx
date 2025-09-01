import { motion } from "framer-motion";
import { Sidebar } from "./components/Sidebar";
import { EditorPanel } from "./components/EditorPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { useEditorStore } from "./store";
import { ThemeProvider } from "./components/ThemeProvider";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";

const App = () => {
  const { darkMode } = useEditorStore();

  return (
    <ThemeProvider>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <KeyboardShortcuts />
        
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`sticky top-0 z-50 backdrop-blur-md border-b ${
            darkMode 
              ? 'bg-gray-900/80 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                  whileHover={{ scale: 1.05 }}
                />
                <div>
                  <motion.h1 
                    className="text-2xl font-bold"
                    whileHover={{ scale: 1.05 }}
                  >
                    Headline Editor
                  </motion.h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    React • TypeScript • Tailwind • Motion • Zustand
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Press Cmd/Ctrl + K for quick actions
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => useEditorStore.getState().toggleDarkMode()}
                >
                  {darkMode ? '☀️' : '🌙'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">
            {/* Left Sidebar */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="col-span-3"
            >
              <Sidebar />
            </motion.div>

            {/* Center Editor Panel */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="col-span-5"
            >
              <EditorPanel />
            </motion.div>

            {/* Right Preview Panel */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="col-span-4"
            >
              <PreviewPanel />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-center py-4 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Built with — drag presets, tweak controls, and export your creation.
        </motion.footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
