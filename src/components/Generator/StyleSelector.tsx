import React from 'react';

export interface NarrativeStyleOption {
  id: string;
  label: string;
  description: string;
}

export const NARRATIVE_STYLES: NarrativeStyleOption[] = [
  {
    id: 'clean_mystery',
    label: 'Clean Mystery (Dan Brown Style)',
    description: 'High-stakes intellectual puzzles and secrets. Fast-paced, suspenseful, but strictly free of violence, foul language, or disrespect.'
  },
  {
    id: 'tech_architect',
    label: 'Technical Architect',
    description: 'Focuses on the engineering challenges, mermaid graph structures, and the code behind the AI Bank.'
  },
  {
    id: 'corporate_saga',
    label: 'Corporate Saga',
    description: 'The dramatic journey of building a financial institution, dealing with regulations, and strategic maneuvering.'
  },
  {
    id: 'future_visionary',
    label: 'Future Visionary',
    description: 'Inspirational and forward-looking, focusing on how the AI Bank changes the world.'
  }
];

interface StyleSelectorProps {
  value: string;
  onChange: (styleId: string) => void;
  disabled?: boolean;
  className?: string;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  const selectedOption = NARRATIVE_STYLES.find((s) => s.id === value) || NARRATIVE_STYLES[0];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label 
        htmlFor="narrative-style-select" 
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Narrative Style
      </label>
      
      <div className="relative">
        <select
          id="narrative-style-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-describedby="style-description"
        >
          {NARRATIVE_STYLES.map((style) => (
            <option key={style.id} value={style.id}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      <p 
        id="style-description" 
        className="text-xs text-gray-500 dark:text-gray-400 italic"
      >
        {selectedOption.description}
      </p>
    </div>
  );
};

export default StyleSelector;