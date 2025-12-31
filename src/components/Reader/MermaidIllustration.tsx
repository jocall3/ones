import React, { useEffect, useState, useId } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with a theme suitable for a mystery/techno-thriller book reader
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: '"Crimson Text", "Georgia", serif', // Book-like font for the graph text
  flowchart: {
    curve: 'basis',
    padding: 20,
  },
});

interface MermaidIllustrationProps {
  /**
   * The Mermaid diagram definition string.
   * Example: "graph TD; A[James] -->|Builds| B(AI Bank);"
   */
  chart: string;
  
  /**
   * A descriptive caption for the illustration, often providing a clue.
   */
  caption?: string;
  
  /**
   * Optional CSS class for the wrapper.
   */
  className?: string;
}

/**
 * A specialized view that renders a Mermaid graph embedded in the book page.
 * Used to visualize system architectures, clues, or relationships in the story.
 */
export const MermaidIllustration: React.FC<MermaidIllustrationProps> = ({
  chart,
  caption,
  className = '',
}) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Generate a unique ID for this specific graph instance to prevent DOM collisions
  const uniqueId = useId().replace(/:/g, '');
  const graphId = `mermaid-graph-${uniqueId}`;

  useEffect(() => {
    let isMounted = true;

    const renderGraph = async () => {
      if (!chart) return;

      setIsProcessing(true);
      setError(null);

      try {
        // mermaid.render returns an object containing the SVG string in v10+
        // We pass a unique ID and the chart definition
        const { svg } = await mermaid.render(graphId, chart);

        if (isMounted) {
          setSvgContent(svg);
          setIsProcessing(false);
        }
      } catch (err) {
        console.error('Failed to render Mermaid graph:', err);
        if (isMounted) {
          setError('The architectural blueprint is corrupted or encrypted.');
          setIsProcessing(false);
        }
      }
    };

    renderGraph();

    return () => {
      isMounted = false;
    };
  }, [chart, graphId]);

  return (
    <figure 
      className={`mermaid-illustration-container my-8 w-full flex flex-col items-center ${className}`}
      role="img" 
      aria-label={caption || "Diagram illustrating the text"}
    >
      <div 
        className="w-full overflow-x-auto bg-slate-50 border border-slate-200 rounded-md p-6 shadow-inner flex justify-center min-h-[150px]"
      >
        {error ? (
          <div className="flex flex-col items-center justify-center text-red-800 p-4 text-center">
            <svg 
              className="w-8 h-8 mb-2 opacity-70" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-mono text-sm">{error}</span>
          </div>
        ) : isProcessing ? (
          <div className="flex items-center justify-center w-full h-full text-slate-400 animate-pulse font-mono text-xs uppercase tracking-widest">
            Deciphering Schematics...
          </div>
        ) : (
          <div 
            className="mermaid-svg-wrapper w-full flex justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>

      {caption && (
        <figcaption className="mt-3 text-sm text-slate-600 font-serif italic text-center max-w-prose leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MermaidIllustration;