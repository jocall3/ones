import React from 'react';
import ForexArena from '../../../../components/ForexArena';

/**
 * ForexArenaPage serves as the main view for foreign exchange trading.
 * It provides a dedicated page that houses the ForexArena component,
 * which contains the core trading functionality, charts, and order books.
 * This page component provides a structured layout for the trading interface.
 */
const ForexArenaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Forex Trading Arena
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl dark:text-gray-400">
            Engage with global currency markets. Analyze real-time data, execute trades, and manage your portfolio.
          </p>
        </header>
        
        <main>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <ForexArena />
          </div>
        </main>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>All trading involves risk. Please trade responsibly.</p>
          <p>&copy; {new Date().getFullYear()} Magic Main. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ForexArenaPage;