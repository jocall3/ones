import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid configuration
mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis'
  }
});

interface CharacterNode {
  id: string;
  label: string;
  group: string;
}

interface Relationship {
  from: string;
  to: string;
  label: string;
  type: 'solid' | 'dotted' | 'thick';
}

const CharacterNetworkGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [bookRange, setBookRange] = useState<number>(50); // Limit initial render for performance

  // Procedural generation of the "James AI Bank" Universe
  const generateGraphDefinition = (limit: number): string => {
    let graph = 'graph TD\n';
    
    // Styling classes
    graph += '    classDef protagonist fill:#e1f5fe,stroke:#01579b,stroke-width:4px;\n';
    graph += '    classDef ai fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;\n';
    graph += '    classDef banker fill:#fff3e0,stroke:#e65100,stroke-width:2px;\n';
    graph += '    classDef mystery fill:#eceff1,stroke:#263238,stroke-width:2px,stroke-dasharray: 5 5;\n';
    graph += '    classDef regulator fill:#ffebee,stroke:#b71c1c,stroke-width:2px;\n';

    // Central Node
    graph += '    James[James: The Visionary]:::protagonist\n';
    graph += '    AICore[The Sovereign AI Ledger]:::ai\n';
    graph += '    James -->|Architects| AICore\n';

    // Generate factions and arcs based on book count
    const factions = ['Legacy_Bankers', 'Ethical_Hackers', 'Global_Regulators', 'Quantum_Researchers'];
    
    for (let i = 1; i <= limit; i++) {
      const bookId = `Book_${i}`;
      const factionIndex = i % factions.length;
      const currentFaction = factions[factionIndex];
      
      // Create a key character for this book/arc
      const charId = `Char_${i}`;
      let charLabel = '';
      let styleClass = '';
      let relation = '';

      if (currentFaction === 'Legacy_Bankers') {
        charLabel = `Director_Halloway_Vol${i}`;
        styleClass = 'banker';
        relation = 'Negotiates Merger';
      } else if (currentFaction === 'Ethical_Hackers') {
        charLabel = `Cipher_Zero_Vol${i}`;
        styleClass = 'mystery';
        relation = 'Tests Security';
      } else if (currentFaction === 'Global_Regulators') {
        charLabel = `Inspector_Vance_Vol${i}`;
        styleClass = 'regulator';
        relation = 'Audits Algorithm';
      } else {
        charLabel = `Dr_Aris_Vol${i}`;
        styleClass = 'ai';
        relation = 'Optimizes Neural Net';
      }

      // Add Node
      graph += `    ${charId}[${charLabel}]:::${styleClass}\n`;

      // Connect to James or the AI Core
      if (i % 5 === 0) {
        // Major plot point connection to James
        graph += `    James -- ${relation} --> ${charId}\n`;
      } else {
        // Connection to the AI system
        graph += `    ${charId} -.->|Interacts| AICore\n`;
      }

      // Inter-character relationships (The Mystery Element)
      if (i > 1) {
        const prevCharId = `Char_${i - 1}`;
        if (i % 3 === 0) {
          graph += `    ${prevCharId} == Investigates ==> ${charId}\n`;
        }
      }
    }

    // Subgraphs for Eras (grouping every 25 books)
    const eras = Math.ceil(limit / 25);
    for (let e = 0; e < eras; e++) {
      graph += `    subgraph Era_${e + 1} [Era ${e + 1}: The ${getEraName(e)}]\n`;
      graph += `      direction TB\n`;
      for (let b = 1; b <= 25; b++) {
        const globalIndex = e * 25 + b;
        if (globalIndex <= limit) {
          graph += `      Char_${globalIndex}\n`;
        }
      }
      graph += `    end\n`;
    }

    return graph;
  };

  const getEraName = (index: number) => {
    const names = [
      "Foundations of Trust",
      "Algorithmic Awakening",
      "The Currency Singularity",
      "Global Integration",
      "Quantum Banking",
      "Interstellar Economics",
      "The Ethical Code",
      "Universal Ledger",
      "Infinite Liquidity",
      "The Final Audit"
    ];
    return names[index % names.length];
  };

  useEffect(() => {
    const renderGraph = async () => {
      if (!containerRef.current) return;
      setIsRendering(true);
      
      try {
        const graphDefinition = generateGraphDefinition(bookRange);
        // Clear previous content
        containerRef.current.innerHTML = '';
        
        // Create a unique ID for the mermaid diagram
        const id = `mermaid-graph-${Date.now()}`;
        
        // Render
        const { svg } = await mermaid.render(id, graphDefinition);
        containerRef.current.innerHTML = svg;
        
        // Apply zoom transform
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.width = '100%';
          svgElement.style.height = 'auto';
          svgElement.style.minHeight = '600px';
        }
      } catch (error) {
        console.error('Mermaid rendering failed:', error);
        containerRef.current.innerHTML = '<div class="text-red-500 p-4">Error rendering graph. The network might be too complex for the current view. Try reducing the book range.</div>';
      } finally {
        setIsRendering(false);
      }
    };

    renderGraph();
  }, [bookRange]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">The James Archive: Character Network</h2>
          <p className="text-sm text-gray-600">Visualizing the 1000-Book Saga of the AI Bank</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 uppercase">Universe Scope (Books)</label>
            <input 
              type="range" 
              min="10" 
              max="200" // Capped for browser performance in this demo
              value={bookRange} 
              onChange={(e) => setBookRange(parseInt(e.target.value))}
              className="w-48 accent-blue-600"
            />
            <span className="text-xs text-right text-blue-600 font-bold">{bookRange} Books Loaded</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.1))}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
            >
              - Zoom
            </button>
            <button 
              onClick={() => setZoomLevel(z => Math.min(3, z + 0.1))}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
            >
              + Zoom
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-hidden relative border border-gray-200 rounded-lg bg-white">
        {isRendering && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-blue-800 font-medium">Analyzing Literary Data...</p>
            </div>
          </div>
        )}
        
        <div 
          className="w-full h-full overflow-auto p-4 transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
        >
          <div ref={containerRef} className="mermaid-container min-w-[1000px]" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-4 text-xs text-center">
        <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-800 font-semibold">
          James (Protagonist)
        </div>
        <div className="p-2 bg-purple-50 border border-purple-200 rounded text-purple-800 font-semibold">
          AI Systems
        </div>
        <div className="p-2 bg-orange-50 border border-orange-200 rounded text-orange-800 font-semibold">
          Legacy Bankers
        </div>
        <div className="p-2 bg-gray-100 border border-gray-300 rounded text-gray-800 font-semibold border-dashed">
          Mystery Figures
        </div>
        <div className="p-2 bg-red-50 border border-red-200 rounded text-red-800 font-semibold">
          Regulators
        </div>
      </div>
    </div>
  );
};

export default CharacterNetworkGraph;