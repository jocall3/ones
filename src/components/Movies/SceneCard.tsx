import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
});

export interface Scene {
  id: string;
  sequenceNumber: number;
  title: string;
  location: string; // e.g., "INT. JAMES'S OFFICE - DAY"
  characters: string[];
  plotSummary: string;
  blockingGraph: string; // Mermaid flowchart/sequence diagram syntax
}

interface SceneCardProps {
  scene: Scene;
  className?: string;
}

const MermaidDiagram: React.FC<{ code: string; id: string }> = ({ code, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        // Unique ID for the SVG container to prevent conflicts
        const uniqueId = `mermaid-svg-${id}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Attempt to render the mermaid graph
        const { svg } = await mermaid.render(uniqueId, code);
        setSvgContent(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering failed:', err);
        setError('Failed to render blocking diagram.');
        // Mermaid leaves error text in the DOM sometimes, clean it up if needed
        const errorElement = document.querySelector(`#d${id}`); 
        if (errorElement) errorElement.remove();
      }
    };

    if (code) {
      renderDiagram();
    }
  }, [code, id]);

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-600 text-sm rounded">
        {error}
        <pre className="mt-2 text-xs text-gray-500 overflow-x-auto">{code}</pre>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="mermaid-output w-full overflow-x-auto flex justify-center py-4 bg-white rounded-md border border-gray-100"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

const SceneCard: React.FC<SceneCardProps> = ({ scene, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Header: Scene Info */}
      <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
            Scene {scene.sequenceNumber}
          </h3>
          <h2 className="text-xl font-semibold text-slate-800">
            {scene.title}
          </h2>
        </div>
        <div className="text-right">
          <span className="inline-block bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
            {scene.location}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Plot Summary */}
        <section>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Action & Plot</h4>
          <p className="text-gray-700 leading-relaxed text-sm">
            {scene.plotSummary}
          </p>
        </section>

        {/* Characters */}
        <section>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Characters Present</h4>
          <div className="flex flex-wrap gap-2">
            {scene.characters.map((char, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
              >
                {char}
              </span>
            ))}
          </div>
        </section>

        {/* Blocking Diagram */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Blocking & Movement</h4>
            <span className="text-[10px] text-gray-400 italic">Generated via Mermaid.js</span>
          </div>
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
            <MermaidDiagram code={scene.blockingGraph} id={scene.id} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SceneCard;