import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Magnet } from '../motion/Magnet';
import { FiSettings, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { accent, changeAccent, accents } = useTheme();

  const colorMap = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 glass-panel p-4 rounded-2xl flex flex-col gap-3 shadow-2xl border border-dark-border"
          >
            <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-dark-muted">
              Select Accent
            </h4>
            <div className="flex gap-2">
              {accents.map((color) => (
                <button
                  key={color}
                  onClick={() => changeAccent(color)}
                  data-cursor="pointer"
                  className={`w-6 h-6 rounded-full ${colorMap[color]} relative transition-transform duration-200 hover:scale-125 ${
                    accent === color ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-bg' : ''
                  }`}
                  title={color}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Magnet strength={25}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          data-cursor="pointer"
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border border-dark-border shadow-lg transition-colors hover:text-accent"
        >
          {isOpen ? <FiX size={20} /> : <FiSettings size={20} className="animate-spin-slow" />}
        </button>
      </Magnet>
    </div>
  );
};
