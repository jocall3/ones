import React, { useMemo } from 'react';

export interface KeywordDefinition {
  id: string;
  term: string;
  definition: string;
  codeReference?: string;
  type?: 'class' | 'function' | 'variable' | 'concept';
}

interface TextContentProps {
  content: string;
  keywords: KeywordDefinition[];
  onKeywordClick?: (keyword: KeywordDefinition) => void;
  className?: string;
}

/**
 * TextContent Component
 * 
 * Renders narrative text for the AI Bank story.
 * Automatically parses the content to identify and highlight technical keywords.
 * Clicking a keyword triggers the onKeywordClick callback to show code definitions.
 */
export const TextContent: React.FC<TextContentProps> = ({
  content,
  keywords,
  onKeywordClick,
  className = '',
}) => {
  
  const processedContent = useMemo(() => {
    if (!content) return null;

    // If no keywords are provided, return the content as is
    if (!keywords || keywords.length === 0) {
      return <>{content}</>;
    }

    // Sort keywords by length (descending) to ensure longest terms are matched first
    // This prevents "AI" from matching inside "AI Bank" prematurely
    const sortedKeywords = [...keywords].sort((a, b) => b.term.length - a.term.length);

    // Escape special regex characters to safely create a RegExp
    const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regex pattern that matches any of the keywords (case-insensitive)
    // The capturing group () ensures the delimiter (the keyword) is included in the split array
    const pattern = new RegExp(`(${sortedKeywords.map(k => escapeRegExp(k.term)).join('|')})`, 'gi');

    // Split the content by the pattern
    const parts = content.split(pattern);

    return parts.map((part, index) => {
      // Check if the current part matches a keyword (case-insensitive)
      const match = sortedKeywords.find(k => k.term.toLowerCase() === part.toLowerCase());

      if (match) {
        return (
          <span
            key={`${match.id}-${index}`}
            onClick={(e) => {
              e.stopPropagation();
              onKeywordClick?.(match);
            }}
            className="
              inline-block 
              cursor-pointer 
              text-indigo-700 
              font-semibold 
              hover:text-indigo-900 
              hover:bg-indigo-50 
              rounded 
              px-0.5 
              mx-0.5
              transition-all 
              duration-200 
              border-b-2 
              border-indigo-100 
              hover:border-indigo-500
            "
            title={`View code definition for: ${match.term}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onKeywordClick?.(match);
              }
            }}
            aria-label={`View definition for ${match.term}`}
          >
            {part}
          </span>
        );
      }

      // Render regular text
      return <span key={index}>{part}</span>;
    });
  }, [content, keywords, onKeywordClick]);

  return (
    <article className={`prose prose-lg max-w-none font-serif text-gray-800 leading-loose whitespace-pre-wrap ${className}`}>
      {processedContent}
    </article>
  );
};

export default TextContent;