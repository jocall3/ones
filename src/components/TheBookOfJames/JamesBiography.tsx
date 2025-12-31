import React, { useState } from 'react';

const JamesBiography: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'blueprint'>('narrative');

  const mermaidGraph = `graph TD
    A[James's Laptop] -->|Uploads The File| B(The Neural Core)
    B --> C{Pattern Recognition}
    C -->|Safe| D[AI Bank Ledger]
    C -->|Anomaly| E[The Hidden Protocol]
    D --> F[Global Financial Harmony]
    E --> G[The Mystery of the 1000 Books]
    style B fill:#f9f,stroke:#333,stroke-width:4px
    style E fill:#bbf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5 5`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-serif p-8 md:p-16">
      <div className="max-w-4xl mx-auto shadow-2xl bg-white rounded-lg overflow-hidden border border-slate-200">
        
        {/* Header Section */}
        <header className="bg-slate-900 text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">The Architect</h1>
          <p className="text-slate-400 text-lg italic">"The code was not written; it was discovered."</p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`flex-1 py-4 text-center font-sans font-semibold transition-colors ${
              activeTab === 'narrative' 
                ? 'bg-white text-indigo-900 border-t-4 border-indigo-900' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            The Biography
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`flex-1 py-4 text-center font-sans font-semibold transition-colors ${
              activeTab === 'blueprint' 
                ? 'bg-white text-indigo-900 border-t-4 border-indigo-900' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            The Blueprint (Mermaid)
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 leading-relaxed">
          
          {activeTab === 'narrative' && (
            <article className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Chapter 1: The Silicon Silence</h2>
              <p className="mb-6">
                James sat in the dimly lit corner of the server room, the rhythmic blinking of the status LEDs serving as the only clock he trusted. He wasn't a banker, nor was he a politician. He was a cryptographer who had stumbled upon a truth so profound it had to be hidden in plain sight.
              </p>
              <p className="mb-6">
                It began with <strong>"The File"</strong>. A dataset that shouldn't have existed—a perfect predictive model of economic flow that mirrored organic neural networks. James realized that traditional banking was rigid, prone to human error and greed. He envisioned something purer: an AI Bank.
              </p>
              
              <div className="my-8 p-6 bg-indigo-50 border-l-4 border-indigo-900 italic text-indigo-900">
                "To build the bank, I must first build the mind that runs it. It requires no vaults of steel, only chains of logic." — James's Journal, Entry 001.
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Chapter 2: The Architecture of Trust</h2>
              <p className="mb-6">
                The world saw a new fintech app; James saw a fortress of mathematics. He worked in solitude, coding the core engine known as <em>The Ledger of Truth</em>. There was no violence in his revolution, only the quiet clicking of a mechanical keyboard.
              </p>
              <p className="mb-6">
                But mysteries lingered. Why did the AI generate exactly 1,000 books of data every night? What was contained within those volumes? Some whispered they were predictions of the future, others claimed they were merely optimized interest rates. James knew the truth: they were the keys to a system where corruption was mathematically impossible.
              </p>
              <p>
                He wasn't just building a bank. He was writing a story, one block of code at a time, ensuring that when the AI awoke, it would serve humanity with unwavering precision.
              </p>
            </article>
          )}

          {activeTab === 'blueprint' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The System Architecture</h2>
              <p className="mb-6 text-slate-600">
                The following graph represents the logical flow James designed to isolate "The File" from external corruption.
              </p>
              
              <div className="bg-slate-900 rounded-lg p-6 shadow-inner overflow-x-auto">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                  <span className="text-xs font-mono text-slate-400">src/graphs/ai_bank_core.mmd</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <pre className="font-mono text-sm text-green-400 whitespace-pre">
                  {mermaidGraph}
                </pre>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Technical Analysis</h3>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li><strong>Node B (The Neural Core):</strong> The central processing unit where James uploaded the initial seed data.</li>
                  <li><strong>Node E (The Hidden Protocol):</strong> The mysterious subroutine that generates the 1,000 books. Access is restricted to James alone.</li>
                  <li><strong>Flow Logic:</strong> The system prioritizes pattern recognition over raw transaction volume, ensuring stability.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="bg-slate-100 p-6 text-center border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Excerpt from <em>"The Book of James"</em> — Volume 1 of 1000.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <span className="inline-block w-2 h-2 bg-slate-300 rounded-full"></span>
            <span className="inline-block w-2 h-2 bg-slate-300 rounded-full"></span>
            <span className="inline-block w-2 h-2 bg-slate-300 rounded-full"></span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default JamesBiography;