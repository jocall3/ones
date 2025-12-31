import React, { useMemo } from 'react';

// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------

export type ScriptElementType = 
  | 'SCENE_HEADING' 
  | 'ACTION' 
  | 'CHARACTER' 
  | 'DIALOGUE' 
  | 'PARENTHETICAL' 
  | 'TRANSITION'
  | 'UNKNOWN';

export interface ScriptElement {
  id: string;
  type: ScriptElementType;
  text: string;
}

export interface ScriptViewProps {
  /**
   * The title of the screenplay.
   */
  title?: string;
  /**
   * The author or credit line.
   */
  author?: string;
  /**
   * The raw script content (string) or structured elements.
   * If a string is provided, it will be parsed using basic screenplay heuristics.
   */
  scriptContent: string | ScriptElement[];
  /**
   * Optional class name for the container.
   */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helper: Simple Screenplay Parser (Heuristic)
// ---------------------------------------------------------------------------

const parseScriptText = (text: string): ScriptElement[] => {
  const lines = text.split('\n');
  const elements: ScriptElement[] = [];
  
  let lastType: ScriptElementType = 'UNKNOWN';

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return; // Skip empty lines

    let type: ScriptElementType = 'ACTION';

    // 1. Check for Scene Headings (INT./EXT.)
    if (
      trimmed.startsWith('INT.') || 
      trimmed.startsWith('EXT.') || 
      trimmed.startsWith('INT/EXT') || 
      trimmed.startsWith('I/E')
    ) {
      type = 'SCENE_HEADING';
    }
    // 2. Check for Transitions (Ends in TO:, usually right aligned)
    else if (trimmed.endsWith(' TO:') && trimmed === trimmed.toUpperCase()) {
      type = 'TRANSITION';
    }
    // 3. Check for Character Names (All Caps, not a scene heading, usually short)
    // Heuristic: If previous was Action or Scene, and this is ALL CAPS and short, it's likely a character.
    else if (
      trimmed === trimmed.toUpperCase() && 
      trimmed.length < 50 && 
      !trimmed.includes('(') && // Parentheticals are handled separately usually
      (lastType === 'ACTION' || lastType === 'SCENE_HEADING' || lastType === 'UNKNOWN')
    ) {
      type = 'CHARACTER';
    }
    // 4. Check for Parentheticals
    else if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
      type = 'PARENTHETICAL';
    }
    // 5. Dialogue (Follows Character or Parenthetical)
    else if (lastType === 'CHARACTER' || lastType === 'PARENTHETICAL') {
      type = 'DIALOGUE';
    }
    // 6. Default to Action
    else {
      type = 'ACTION';
    }

    elements.push({
      id: `line-${index}`,
      type,
      text: trimmed
    });

    lastType = type;
  });

  return elements;
};

// ---------------------------------------------------------------------------
// Component: ScriptView
// ---------------------------------------------------------------------------

const ScriptView: React.FC<ScriptViewProps> = ({ 
  title = "UNTITLED SCREENPLAY", 
  author = "James & The AI Bank", 
  scriptContent,
  className = ""
}) => {

  // Memoize the parsed elements to avoid re-parsing on every render
  const elements = useMemo(() => {
    if (Array.isArray(scriptContent)) {
      return scriptContent;
    }
    return parseScriptText(scriptContent);
  }, [scriptContent]);

  return (
    <div className={`w-full h-full overflow-y-auto bg-gray-100 p-8 ${className}`}>
      {/* Paper Container */}
      <div 
        className="max-w-[8.5in] mx-auto bg-white shadow-lg min-h-[11in] p-[1in] relative"
        style={{ fontFamily: '"Courier Prime", "Courier New", Courier, monospace' }}
      >
        {/* Title Page Simulation (Only if title is present and it's the top of the view) */}
        <div className="mb-16 text-center border-b pb-8 mb-8 border-gray-200">
          <h1 className="text-4xl font-bold underline mb-4 uppercase tracking-widest">{title}</h1>
          <p className="text-lg">Written by</p>
          <p className="text-xl font-bold mb-4">{author}</p>
          <p className="text-xs text-gray-400">DRAFT: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Script Content */}
        <div className="space-y-4 text-[12pt] leading-tight text-black">
          {elements.map((el) => {
            switch (el.type) {
              case 'SCENE_HEADING':
                return (
                  <div key={el.id} className="font-bold uppercase mt-8 mb-4">
                    {el.text}
                  </div>
                );
              
              case 'ACTION':
                return (
                  <div key={el.id} className="mb-4 text-justify">
                    {el.text}
                  </div>
                );

              case 'CHARACTER':
                return (
                  <div key={el.id} className="mt-6 mb-0 w-full text-center pr-[15%] pl-[15%]">
                    <span className="uppercase font-bold block w-full text-center">
                      {el.text}
                    </span>
                  </div>
                );

              case 'PARENTHETICAL':
                return (
                  <div key={el.id} className="mb-0 w-full text-center pr-[20%] pl-[20%]">
                    <span className="block w-full text-center text-sm">
                      {el.text}
                    </span>
                  </div>
                );

              case 'DIALOGUE':
                return (
                  <div key={el.id} className="mb-4 w-full text-center pr-[15%] pl-[15%]">
                    <span className="block w-full text-left mx-auto max-w-[3.5in]">
                      {el.text}
                    </span>
                  </div>
                );

              case 'TRANSITION':
                return (
                  <div key={el.id} className="mt-4 mb-4 w-full text-right uppercase font-bold">
                    {el.text}
                  </div>
                );

              default:
                return (
                  <div key={el.id} className="mb-2">
                    {el.text}
                  </div>
                );
            }
          })}
        </div>

        {/* Page Number Placeholder (Visual only) */}
        <div className="absolute top-8 right-12 text-gray-400 text-xs">
          1.
        </div>
      </div>
    </div>
  );
};

export default ScriptView;