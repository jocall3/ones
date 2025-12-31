import React, { useMemo, useState } from 'react';

// --- Types ---

export interface Book {
  id: string;
  title: string;
  series: string;
  seriesOrder: number;
  author: string;
  description: string;
  coverImage?: string;
  publishDate?: string;
  tags?: string[];
}

export interface BookshelfProps {
  books: Book[];
  isLoading?: boolean;
  onBookSelect?: (book: Book) => void;
}

// --- Components ---

const BookCard: React.FC<{ book: Book; onClick?: (book: Book) => void }> = ({ book, onClick }) => {
  return (
    <div 
      className="group relative flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
      onClick={() => onClick?.(book)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(book);
        }
      }}
    >
      {/* Cover Area */}
      <div className="aspect-[2/3] w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={`Cover of ${book.title}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center">
            <div className="w-12 h-12 mb-3 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-white font-serif text-lg leading-tight line-clamp-3 drop-shadow-md">
              {book.title}
            </h3>
          </div>
        )}
        
        {/* Series Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          Vol. {book.seriesOrder}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h4 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
            {book.title}
          </h4>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {book.series}
          </p>
        </div>

        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
          {book.description}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-xs text-slate-400 font-medium truncate max-w-[60%]">
            {book.author}
          </span>
          <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Graph
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

const SeriesSection: React.FC<{ seriesName: string; books: Book[]; onBookSelect?: (book: Book) => void }> = ({ 
  seriesName, 
  books,
  onBookSelect 
}) => {
  return (
    <section className="py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end gap-4 mb-6 border-b border-slate-200 pb-2">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          {seriesName}
        </h2>
        <span className="text-sm text-slate-500 font-medium mb-1">
          {books.length} {books.length === 1 ? 'Book' : 'Books'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onClick={onBookSelect} />
        ))}
      </div>
    </section>
  );
};

export const Bookshelf: React.FC<BookshelfProps> = ({ books, isLoading = false, onBookSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Group books by series and sort them
  const groupedBooks = useMemo(() => {
    const groups: Record<string, Book[]> = {};
    
    // Filter based on search
    const filteredBooks = books.filter(b => 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.series.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Grouping
    filteredBooks.forEach(book => {
      if (!groups[book.series]) {
        groups[book.series] = [];
      }
      groups[book.series].push(book);
    });

    // Sorting within series
    Object.keys(groups).forEach(series => {
      groups[series].sort((a, b) => a.seriesOrder - b.seriesOrder);
    });

    return groups;
  }, [books, searchTerm]);

  // Get sorted series names
  const seriesNames = Object.keys(groupedBooks).sort();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          The James AI Bank Archives
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore the mystery of the algorithmic vault. 1,000 volumes of clean, high-stakes financial intrigue and technological evolution.
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-full leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-shadow"
            placeholder="Search titles, series, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {seriesNames.length > 0 ? (
          seriesNames.map((series) => (
            <SeriesSection 
              key={series} 
              seriesName={series} 
              books={groupedBooks[series]} 
              onBookSelect={onBookSelect}
            />
          ))
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
              <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No books found</h3>
            <p className="mt-1 text-slate-500">Try adjusting your search terms or check back later for new releases.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookshelf;