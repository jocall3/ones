import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Database, Lock, Cpu, Star, Filter, Library, ChevronDown, Info } from 'lucide-react';

// --- Types & Interfaces ---

interface BookEntry {
  id: string;
  title: string;
  subtitle: string;
  volume: number;
  theme: 'mystery' | 'tech' | 'finance' | 'legacy';
  color: string;
  publishDate: string;
  summary: string;
}

// --- Mock Data Generation (The James Legacy Archive) ---

const ADJECTIVES = ['Silent', 'Digital', 'Infinite', 'Hidden', 'Encrypted', 'Golden', 'Neural', 'Quantum', 'Immutable', 'Velvet'];
const NOUNS = ['Ledger', 'Vault', 'Protocol', 'Horizon', 'Cipher', 'Legacy', 'Transaction', 'Key', 'Sequence', 'Paradox'];
const SUBTITLES = [
  'How James Built the Future',
  'The AI Banking Revolution',
  'Secrets of the Code',
  'A Foundation of Trust',
  'The Architect\'s Vision',
  'Beyond the Firewall',
  'The Ethical Algorithm',
  'Solving the Financial Enigma',
  'The Blueprint of Tomorrow',
  'Wisdom in the Machine'
];

const THEME_COLORS = {
  mystery: 'from-indigo-900 to-slate-900',
  tech: 'from-emerald-900 to-slate-900',
  finance: 'from-amber-900 to-slate-900',
  legacy: 'from-rose-900 to-slate-900',
};

const generateBooks = (count: number): BookEntry[] => {
  return Array.from({ length: count }, (_, i) => {
    const vol = i + 1;
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const themeKeys: (keyof typeof THEME_COLORS)[] = ['mystery', 'tech', 'finance', 'legacy'];
    const theme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    
    return {
      id: `bk-${vol}`,
      title: `The ${adj} ${noun}`,
      subtitle: SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)],
      volume: vol,
      theme,
      color: THEME_COLORS[theme],
      publishDate: new Date(2024, 0, 1 + i).toLocaleDateString(),
      summary: `In Volume ${vol}, James encounters a complex puzzle within the AI banking core. Using intellect and ethical reasoning, he constructs a new module that ensures fairness for all depositors, securing the legacy of the digital vault.`
    };
  });
};

// --- Components ---

const BookCover = ({ book, onClick }: { book: BookEntry; onClick: (b: BookEntry) => void }) => {
  return (
    <motion.div
      layoutId={`book-${book.id}`}
      className="group relative w-full aspect-[2/3] cursor-pointer perspective-1000"
      onClick={() => onClick(book)}
      whileHover={{ scale: 1.05, rotateY: -5, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Spine/Side effect for 3D feel */}
      <div className="absolute left-0 top-1 bottom-1 w-2 bg-white/10 rounded-l-sm transform -translate-x-1 skew-y-6 origin-right opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Main Cover */}
      <div className={`h-full w-full rounded-r-md rounded-l-sm shadow-xl bg-gradient-to-br ${book.color} border-l-4 border-white/10 flex flex-col p-4 relative overflow-hidden`}>
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between text-center">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200/70 font-serif">Vol. {book.volume}</span>
            <h3 className="font-serif text-lg leading-tight text-amber-50 drop-shadow-md">{book.title}</h3>
          </div>

          <div className="flex justify-center items-center opacity-60">
            {book.theme === 'mystery' && <Lock size={24} className="text-indigo-300" />}
            {book.theme === 'tech' && <Cpu size={24} className="text-emerald-300" />}
            {book.theme === 'finance' && <Database size={24} className="text-amber-300" />}
            {book.theme === 'legacy' && <Library size={24} className="text-rose-300" />}
          </div>

          <div className="space-y-2">
            <div className="h-px w-1/2 mx-auto bg-amber-200/30" />
            <p className="text-[9px] text-amber-100/80 font-sans tracking-wide uppercase">The James Archive</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BookDetailModal = ({ book, onClose }: { book: BookEntry; onClose: () => void }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        layoutId={`book-${book.id}`}
        className="bg-slate-900 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-amber-900/30 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Cover Art */}
        <div className={`md:w-1/3 bg-gradient-to-br ${book.color} p-8 flex items-center justify-center relative`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="aspect-[2/3] w-48 shadow-2xl rounded-r-md border-l-4 border-white/20 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
             <h2 className="font-serif text-2xl text-amber-50 mb-2">{book.title}</h2>
             <div className="h-px w-12 bg-amber-200/50 my-4" />
             <span className="text-xs uppercase tracking-widest text-amber-100">James's Legacy</span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:w-2/3 p-8 text-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-serif text-amber-500 mb-1">{book.title}</h2>
              <p className="text-lg text-slate-400 italic">{book.subtitle}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronDown className="text-slate-400" />
            </button>
          </div>

          <div className="flex gap-4 mb-8 text-sm text-slate-400">
            <span className="flex items-center gap-1"><BookOpen size={14} /> Volume {book.volume}</span>
            <span className="flex items-center gap-1"><Star size={14} /> Best Seller</span>
            <span className="flex items-center gap-1 capitalize"><Filter size={14} /> {book.theme}</span>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg leading-relaxed text-slate-300">
              {book.summary}
            </p>
            <p className="text-slate-400 mt-4">
              In this installment, the architecture of the AI Bank faces a theoretical paradox. 
              James must navigate the labyrinth of code without compromising the core values of the institution. 
              A tale of intellect, puzzles, and the quiet power of building something that lasts.
            </p>
          </div>

          <div className="mt-auto flex gap-4">
            <button className="flex-1 bg-amber-700 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <BookOpen size={18} /> Read Chapter 1
            </button>
            <button className="flex-1 border border-slate-600 hover:border-amber-500 hover:text-amber-500 text-slate-300 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Info size={18} /> View Mermaid Graph
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main View ---

export default function LibraryView() {
  const [books, setBooks] = useState<BookEntry[]>([]);
  const [visibleBooks, setVisibleBooks] = useState<BookEntry[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 24;

  // Initialize 1000 books
  useEffect(() => {
    const allBooks = generateBooks(1000);
    setBooks(allBooks);
    setVisibleBooks(allBooks.slice(0, ITEMS_PER_PAGE));
  }, []);

  // Infinite Scroll Observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    }
  }, [handleObserver]);

  // Update visible books when page changes or search changes
  useEffect(() => {
    let filtered = books;
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      filtered = books.filter(b => 
        b.title.toLowerCase().includes(lowerQ) || 
        b.subtitle.toLowerCase().includes(lowerQ) ||
        b.volume.toString().includes(lowerQ)
      );
    }
    
    // If searching, show all matches (up to a limit to prevent lag), else paginate
    if (searchQuery) {
      setVisibleBooks(filtered.slice(0, 100)); // Limit search results for performance
    } else {
      setVisibleBooks(filtered.slice(0, page * ITEMS_PER_PAGE));
    }
  }, [page, books, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      
      {/* Header Section */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-900/20 rounded-lg border border-amber-700/50">
                <Library className="text-amber-500" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-amber-50 tracking-wide">The James Archive</h1>
                <p className="text-xs text-slate-400 uppercase tracking-widest">1,000 Volumes of the AI Bank Chronicles</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 sm:text-sm transition-all"
                placeholder="Search the archives (e.g. 'Protocol', 'Vol 42')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: The Shelf */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats / Intro */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Database size={120} />
          </div>
          <h2 className="text-xl font-serif text-amber-200 mb-2">The Master Collection</h2>
          <p className="text-slate-400 max-w-2xl">
            Explore the complete history of how James constructed the world's first sentient banking infrastructure. 
            A saga of code, mystery, and ethical dilemmas, written without violence, honoring the intellect of the builder.
          </p>
          <div className="mt-4 flex gap-4 text-sm font-mono text-amber-500/80">
            <span>Total Volumes: 1,000</span>
            <span>•</span>
            <span>Status: Archived</span>
            <span>•</span>
            <span>Security Level: Alpha</span>
          </div>
        </div>

        {/* Grid */}
        {visibleBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            <AnimatePresence>
              {visibleBooks.map((book) => (
                <BookCover key={book.id} book={book} onClick={setSelectedBook} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p>No records found in the archive matching your query.</p>
          </div>
        )}

        {/* Infinite Scroll Loader */}
        {!searchQuery && visibleBooks.length < books.length && (
          <div ref={loaderRef} className="py-12 flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-amber-900 border-t-amber-500 rounded-full animate-spin" />
              <span className="text-xs text-slate-500 uppercase tracking-widest">Retrieving Archives...</span>
            </div>
          </div>
        )}

        {/* End of Archive Indicator */}
        {!searchQuery && visibleBooks.length >= books.length && (
          <div className="py-12 text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
              End of Archive
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}