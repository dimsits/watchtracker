import React from 'react';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

function Seen() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Header />
      <main className="pt-20 px-4 md:px-8">
        <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Your seen movies will appear here.
        </p>
      </main>
    </div>
  );
}

export default Seen;

