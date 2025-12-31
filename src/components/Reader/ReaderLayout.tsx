import React, { useState, useEffect, ReactNode } from 'react';
import { 
  BookOpen, 
  Shield, 
  Battery, 
  Wifi, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Menu, 
  Network, 
  PlayCircle,
  Search,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ReaderLayoutProps {
  children: ReactNode;
  bookTitle?: string;
  chapterTitle?: string;
  currentPage?: number;
  totalPages?: number;
  isLoading?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onToggleGraph?: () => void;
  onPlayMovie?: () => void;
}

const ReaderLayout: React.FC<ReaderLayoutProps> = ({
  children,
  bookTitle = "The AI Banker: Genesis",
  chapterTitle = "Chapter 1: The Algorithm",
  currentPage = 1,
  totalPages = 100,
  isLoading = false,
  onNextPage,
  onPrevPage,
  onToggleGraph,
  onPlayMovie
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(18);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    // Initialize time and update every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-300 font-sans overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* Top System Bar - Tablet/Secure Device Aesthetic */}
      <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 text-[10px] md:text-xs font-mono text-slate-500 select-none z-50">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 text-cyan-500 font-semibold tracking-wider">
            <Shield size={12} />
            SECURE_LINK_ESTABLISHED
          </span>
          <span className="hidden md:inline opacity-70">PROTOCOL: JAMES_AI_BANK_V1</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="tracking-widest">{currentTime}</span>
          <div className="flex items-center gap-1">
            <Wifi size={12} />
            <span className="text-[10px]">5G</span>
          </div>
          <Battery size={12} className="text-emerald-500" />
        </div>
      </div>

      {/* Main Application Header */}
      <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 md:px-6 shadow-lg z-40 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-cyan-400 active:scale-95"
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-sm md:text-base font-bold text-slate-100 tracking-wide uppercase flex items-center gap-2">
              <BookOpen size={16} className="text-cyan-600" />
              {bookTitle}
            </h1>
            <span className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-wider">
              {chapterTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={onPlayMovie}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded text-xs font-medium transition-all text-cyan-400 group"
          >
            <PlayCircle size={14} className="group-hover:text-cyan-300" />
            <span>SIMULATION</span>
          </button>

          <button 
            onClick={onToggleGraph}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500/50 rounded text-xs font-medium transition-all text-purple-400 group"
          >
            <Network size={14} className="group-hover:text-purple-300" />
            <span>DATA GRAPH</span>
          </button>

          <div className="h-6 w-px bg-slate-800 mx-1"></div>

          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <Search size={18} />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex bg-slate-950">
        
        {/* Left Gutter / Decoration */}
        <div className="hidden lg:block w-16 border-r border-slate-800 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-slate-900/20 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent opacity-50"></div>
          <div className="absolute top-8 left-0 w-full flex justify-center">
             <div className="w-1 h-16 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 rounded-full"></div>
          </div>
        </div>

        {/* Reading Surface */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent p-0 md:p-8 lg:p-12 flex justify-center relative">
          
          {/* Background Grid Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          {/* The "Manuscript" Container */}
          <div 
            className="max-w-4xl w-full bg-slate-900/40 border border-slate-800 md:rounded-sm shadow-2xl relative backdrop-blur-sm flex flex-col min-h-[80vh]"
          >
            {/* High-Tech Corners */}
            <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-sm"></div>
            <div className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-sm"></div>
            <div className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-sm"></div>
            <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-sm"></div>

            {/* Content Padding */}
            <div className="flex-1 p-6 md:p-12 lg:p-16">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4 animate-pulse">
                  <div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-500 rounded-full animate-spin"></div>
                  <p className="text-xs font-mono text-cyan-500">DECRYPTING MANUSCRIPT...</p>
                </div>
              ) : (
                <article 
                  className="prose prose-invert prose-slate max-w-none font-serif leading-loose text-slate-300"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {children}
                </article>
              )}
            </div>

            {/* Manuscript Footer */}
            <div className="mt-auto p-6 border-t border-slate-800/50 flex justify-between items-center text-[10px] text-slate-600 font-mono uppercase tracking-widest">
               <span>Confidential // Eyes Only</span>
               <span>Ref: {currentPage.toString().padStart(4, '0')}</span>
            </div>
          </div>
        </div>

        {/* Right Gutter / Decoration */}
        <div className="hidden lg:block w-16 border-l border-slate-800 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-slate-900/20 relative">
           <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent opacity-50"></div>
        </div>
      </main>

      {/* Bottom Navigation Control Deck */}
      <footer className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-4 md:px-8 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
        
        {/* Progress Section */}
        <div className="w-1/4 hidden md:block">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono">
                <span>PROGRESS</span>
                <span>{Math.round((currentPage / totalPages) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-700 to-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500 ease-out"
                    style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
            </div>
        </div>

        {/* Main Controls */}
        <div className="flex-1 flex items-center justify-center gap-6 md:gap-8">
            <button 
                onClick={onPrevPage}
                disabled={currentPage <= 1}
                className="group p-3 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-cyan-950/30 hover:border-cyan-500/50 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                aria-label="Previous Page"
            >
                <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            <div className="flex flex-col items-center w-24">
                <span className="font-mono text-lg font-bold text-slate-200">
                    {currentPage}
                </span>
                <span className="text-[10px] text-slate-600 font-mono border-t border-slate-700 w-full text-center mt-1 pt-1">
                    OF {totalPages}
                </span>
            </div>

            <button 
                onClick={onNextPage}
                disabled={currentPage >= totalPages}
                className="group p-3 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-cyan-950/30 hover:border-cyan-500/50 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                aria-label="Next Page"
            >
                <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>

        {/* View Controls */}
        <div className="w-1/4 flex justify-end items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <button 
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))} 
                  className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  A-
                </button>
                <div className="w-px h-4 bg-slate-700 mx-1"></div>
                <button 
                  onClick={() => setFontSize(Math.min(32, fontSize + 2))} 
                  className="px-2 py-1 text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  A+
                </button>
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-slate-500 hover:text-cyan-400 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
        </div>
      </footer>
    </div>
  );
};

export default ReaderLayout;