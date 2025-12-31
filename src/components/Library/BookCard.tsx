import React from 'react';
import { BookOpen, Film, PlayCircle, Info } from 'lucide-react';

export interface Book {
  id: string;
  title: string;
  summary: string;
  coverUrl?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
}

interface BookCardProps {
  book: Book;
  onRead: (bookId: string) => void;
  onAdaptToMovie: (bookId: string) => void;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onRead, 
  onAdaptToMovie,
  className = ''
}) => {
  const { id, title, summary, coverUrl, author = "James AI", genre = "Financial Mystery" } = book;

  return (
    <div className={`group relative flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 ${className}`}>
      {/* Book Cover Area */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        {coverUrl ? (
          <img 
            src={coverUrl} 
            alt={`Cover for ${title}`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 p-4 text-center">
            <BookOpen className="w-12 h-12 text-indigo-400 mb-2 opacity-80" />
            <span className="text-slate-300 font-serif text-sm italic">The James AI Bank Chronicles</span>
          </div>
        )}
        
        {/* Overlay Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/10">
          {genre}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 font-serif leading-tight line-clamp-2" title={title}>
          {title}
        </h3>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-3 uppercase tracking-wider">
          By {author}
        </p>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 flex-grow">
          {summary}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => onRead(id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label={`Read ${title}`}
          >
            <BookOpen size={16} />
            <span>Read</span>
          </button>
          
          <button
            onClick={() => onAdaptToMovie(id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label={`Adapt ${title} to Movie`}
          >
            <Film size={16} />
            <span>Adapt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;