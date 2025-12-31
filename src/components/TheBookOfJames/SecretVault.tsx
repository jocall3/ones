import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface SecretVaultProps {
  booksReadCount: number;
}

/**
 * The SecretVault component.
 * 
 * Hidden deep within the application's architecture, this component represents
 * the inner sanctum of James's creation. It is protected by a knowledge gate.
 * Only those who have consumed enough of the library may witness the blueprints
 * of the AI Bank.
 */
const SecretVault: React.FC<SecretVaultProps> = ({ booksReadCount }) => {
  // The number of books required to decipher the encryption
  const KNOWLEDGE_THRESHOLD = 10;
  
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [decryptionSequence, setDecryptionSequence] = useState<string[]>([]);
  const [showBlueprint, setShowBlueprint] = useState<boolean>(false);
  const vaultRef = useRef<HTMLDivElement>(null);

  // Check for access clearance
  useEffect(() => {
    if (booksReadCount >= KNOWLEDGE_THRESHOLD) {
      setIsUnlocked(true);
    }
  }, [booksReadCount]);

  // Handle the "decryption" animation sequence upon unlocking
  useEffect(() => {
    if (isUnlocked) {
      const sequence = [
        "INITIALIZING HANDSHAKE PROTOCOL...",
        "VERIFYING BIOMETRIC SIGNATURE: JAMES...",
        "ACCESSING SECURE LEDGER...",
        "DECRYPTING NEURAL ARCHITECTURE...",
        "ACCESS GRANTED."
      ];

      let delay = 0;
      sequence.forEach((msg, index) => {
        delay += 800 + Math.random() * 500;
        setTimeout(() => {
          setDecryptionSequence(prev => [...prev, msg]);
          if (index === sequence.length - 1) {
            setTimeout(() => setShowBlueprint(true), 1000);
          }
        }, delay);
      });
    }
  }, [isUnlocked]);

  // Render Mermaid graph when blueprint is revealed
  useEffect(() => {
    if (showBlueprint) {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'monospace'
      });
      
      // slight delay to ensure DOM is ready
      setTimeout(() => {
        mermaid.run({
          querySelector: '.mermaid-diagram',
        });
      }, 100);
    }
  }, [showBlueprint]);

  const aiBankGraph = `
    graph TD
      root[James's Vision] -->|Inception| core(AI Core: The Architect)
      core -->|Analysis| market{Global Markets}
      market -->|Volatility| risk[Risk Mitigation Module]
      market -->|Opportunity| growth[Wealth Generation Engine]
      
      risk -->|Stabilize| ledger[(Immutable Ledger)]
      growth -->|Distribute| ledger
      
      ledger -->|Output| humanity[Universal Prosperity]
      
      style root fill:#bbf,stroke:#333,stroke-width:2px
      style core fill:#f96,stroke:#333,stroke-width:4px
      style ledger fill:#9f9,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
  `;

  if (!isUnlocked) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 p-8 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl text-slate-300 font-serif relative overflow-hidden">
        {/* Locked State UI */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6 text-center z-10 relative">
          <div className="text-6xl mb-2 opacity-80">🔒</div>
          <h2 className="text-3xl tracking-[0.2em] text-red-400 uppercase border-b border-red-900 pb-2">
            Restricted Area
          </h2>
          <p className="max-w-lg text-lg leading-relaxed italic text-slate-400">
            "The keys to the future are hidden in the pages of the past. 
            Only the scholar who has traversed {KNOWLEDGE_THRESHOLD} volumes may enter the Vault of James."
          </p>
          
          <div className="w-full max-w-md mt-8">
            <div className="flex justify-between text-xs font-mono text-cyan-500 mb-2">
              <span>DECRYPTION PROGRESS</span>
              <span>{booksReadCount} / {KNOWLEDGE_THRESHOLD} KEYS</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
              <div 
                className="h-full bg-cyan-600 shadow-[0_0_10px_rgba(8,145,178,0.7)] transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((booksReadCount / KNOWLEDGE_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={vaultRef} className="w-full max-w-5xl mx-auto mt-12 bg-black text-green-500 font-mono rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)] border border-green-900 overflow-hidden">
      {/* Header */}
      <div className="bg-green-900/20 p-4 border-b border-green-800 flex justify-between items-center">
        <h1 className="text-xl tracking-widest font-bold">/// THE VAULT OF JAMES ///</h1>
        <span className="text-xs animate-pulse">SECURE CONNECTION: ACTIVE</span>
      </div>

      <div className="p-8 min-h-[500px]">
        {!showBlueprint ? (
          <div className="space-y-2">
            {decryptionSequence.map((line, idx) => (
              <div key={idx} className="typing-effect border-r-2 border-green-500 pr-2 w-fit animate-pulse">
                {`> ${line}`}
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-fadeIn space-y-12">
            {/* Narrative Section */}
            <section className="border-l-4 border-green-600 pl-6 py-2 bg-green-900/10">
              <h3 className="text-2xl font-serif text-white mb-4">The Architect's Journal: Entry #001</h3>
              <p className="text-green-300 leading-relaxed font-serif italic text-lg">
                "They said banking was about hoarding. I say it is about flow. 
                Like water, currency must move to sustain life. I built the AI not to govern, 
                but to garden—to prune the waste and water the seeds of innovation. 
                This is not just a bank; it is a self-sustaining ecosystem."
              </p>
            </section>

            {/* Mermaid Graph Section */}
            <section className="flex flex-col items-center bg-slate-900/50 p-6 rounded-lg border border-green-800/50">
              <h4 className="text-sm uppercase tracking-widest text-green-400 mb-6 border-b border-green-800 pb-2 w-full text-center">
                System Architecture: Project Genesis
              </h4>
              <div className="mermaid-diagram w-full flex justify-center">
                {aiBankGraph}
              </div>
            </section>

            {/* Movie Script Snippet */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-green-800 rounded bg-black">
                <h5 className="text-white font-bold mb-2">SCENE 12: THE REVELATION</h5>
                <p className="text-xs text-green-600 mb-2">INT. SERVER ROOM - NIGHT</p>
                <p className="text-sm text-green-400 leading-relaxed">
                  JAMES stands before the towering rack of servers. The blue light reflects in his eyes.
                  He types a single command. The hum of the fans changes pitch—a harmonious chord.
                  <br/><br/>
                  <span className="text-white">JAMES</span><br/>
                  It's alive. It's not just calculating interest anymore. It's calculating potential.
                </p>
              </div>
              
              <div className="p-4 border border-green-800 rounded bg-black flex flex-col justify-center items-center text-center">
                <div className="text-4xl mb-4">🗝️</div>
                <h5 className="text-white font-bold">MASTER KEY ACQUIRED</h5>
                <p className="text-sm text-green-400 mt-2">
                  You have unlocked the secrets of the AI Bank.
                  <br/>
                  Continue reading to expand the algorithm.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-green-900/20 p-2 text-center text-[10px] text-green-700 border-t border-green-800">
        ENCRYPTED BY JAMES // UNAUTHORIZED ACCESS IS IMPOSSIBLE // TRUTH IS THE ONLY KEY
      </div>
    </div>
  );
};

export default SecretVault;