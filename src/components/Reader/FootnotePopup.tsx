import React, { useEffect, useRef, useState } from 'react';
import { X, BookOpen, Search, Network, BrainCircuit, Lock } from 'lucide-react';

export type FootnoteType = 'banking_term' | 'plot_clue' | 'ai_concept';

export interface FootnoteData {
  id: string;
  term: string;
  definition: string;
  type: FootnoteType;
  relatedGraphId?: string; // ID for a Mermaid graph visualization
  chapterReference?: number;
}

interface FootnotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: FootnoteData | null;
  position: { x: number; y: number };
}

/**
 * FootnotePopup
 * 
 * Displays contextual information for the "James AI Bank" series.
 * Handles technical banking definitions, AI architecture concepts, and mystery plot clues.
 */
const FootnotePopup: React.FC<FootnotePopupProps> = ({ isOpen, onClose, data, position }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [displayStyle, setDisplayStyle] = useState<React.CSSProperties>({});

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Calculate position to ensure popup stays within viewport
  useEffect(() => {
    if (isOpen && position) {
      const width = 320; // Approximate width of the card
      const padding = 20;
      
      let left = position.x - (width / 2);
      let top = position.y + 20; // 20px offset below the text

      // Horizontal boundary check
      if (left < padding) left = padding;
      if (left + width > window.innerWidth - padding) {
        left = window.innerWidth - width - padding;
      }

      // Vertical boundary check (flip to top if near bottom)
      if (top + 200 > window.innerHeight) {
        top = position.y - 220; // Flip above
      }

      setDisplayStyle({
        top: `${top}px`,
        left: `${left}px`,
        position: 'fixed',
        zIndex: 50,
      });
    }
  }, [isOpen, position]);

  if (!isOpen || !data) return null;

  // Theme configuration based on footnote type
  const getTheme = (type: FootnoteType) => {
    switch (type) {
      case 'plot_clue':
        return {
          borderColor: 'border-amber-500',
          bgColor: 'bg-amber-50',
          iconColor: 'text-amber-700',
          titleColor: 'text-amber-900',
          Icon: Search,
          label: 'Mystery Clue',
          buttonBg: 'bg-amber-100 hover:bg-amber-200 text-amber-900'
        };
      case 'ai_concept':
        return {
          borderColor: 'border-purple-500',
          bgColor: 'bg-purple-50',
          iconColor: 'text-purple-700',
          titleColor: 'text-purple-900',
          Icon: BrainCircuit,
          label: 'AI Architecture',
          buttonBg: 'bg-purple-100 hover:bg-purple-200 text-purple-900'
        };
      case 'banking_term':
      default:
        return {
          borderColor: 'border-slate-500',
          bgColor: 'bg-slate-50',
          iconColor: 'text-slate-700',
          titleColor: 'text-slate-900',
          Icon: Lock,
          label: 'Banking Protocol',
          buttonBg: 'bg-slate-200 hover:bg-slate-300 text-slate-900'
        };
    }
  };

  const theme = getTheme(data.type);
  const IconComponent = theme.Icon;

  return (
    <div
      ref={popupRef}
      style={displayStyle}
      className={`
        w-80 rounded-lg shadow-2xl border-l-4 bg-white 
        transform transition-all duration-200 ease-out
        ${theme.borderColor}
        animate-in fade-in zoom-in-95
      `}
      role="dialog"
      aria-modal="true"
      aria-labelledby="footnote-title"
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${theme.bgColor} rounded-tr-lg`}>
        <div className="flex items-center gap-2">
          <IconComponent className={`w-4 h-4 ${theme.iconColor}`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${theme.iconColor}`}>
            {theme.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 rounded"
          aria-label="Close popup"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 
          id="footnote-title" 
          className={`text-lg font-serif font-bold mb-2 leading-tight ${theme.titleColor}`}
        >
          {data.term}
        </h3>
        
        <p className="text-sm text-gray-700 leading-relaxed font-sans">
          {data.definition}
        </p>

        {/* Action Footer */}
        {data.relatedGraphId && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => {
                // Dispatch custom event for the graph viewer component to catch
                const event = new CustomEvent('open-mermaid-graph', { 
                  detail: { graphId: data.relatedGraphId } 
                });
                window.dispatchEvent(event);
                onClose();
              }}
              className={`
                w-full flex items-center justify-center gap-2 px-3 py-2 
                rounded-md text-xs font-semibold transition-colors
                ${theme.buttonBg}
              `}
            >
              <Network size={14} />
              View System Graph
            </button>
          </div>
        )}
      </div>
      
      {/* Decorative background pattern for subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
};

export default FootnotePopup;