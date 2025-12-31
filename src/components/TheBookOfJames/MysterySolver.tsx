import React, { useState, useEffect, useRef, useCallback } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'monospace',
});

// --- Types ---

interface Puzzle {
  id: number;
  chapterTitle: string;
  narrative: string;
  graphDefinition: string;
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

interface MysterySolverProps {
  onChapterUnlock?: (chapterId: number) => void;
  initialLevel?: number;
}

// --- Data: The Chronicles of James & The AI Bank ---

const PUZZLES: Puzzle[] = [
  {
    id: 1,
    chapterTitle: "Chapter 1: The Genesis Protocol",
    narrative: "James stood before the server rack, the hum of the cooling fans whispering secrets of the future. To launch the AI Bank, he had to establish the primary ethical constraint node. The architecture was complex, a labyrinth of logic gates designed to prevent greed. One connection was missing.",
    graphDefinition: `
graph TD
    A[Start: James's Terminal] -->|Initiate| B(Core AI Kernel)
    B --> C{Ethical Check}
    C -->|Pass| D[Ledger Allocation]
    C -->|Fail| E[Termination]
    D --> F[Global Banking Network]
    G[Empathy Subroutine] -.->|Injects Bias| C
    H[Greed Filter] -->|???| C
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style H fill:#bbf,stroke:#333,stroke-width:2px
    `,
    question: "Analyze the flow. To ensure the 'Ethical Check' passes without corruption, how must the 'Greed Filter' interact with the decision node?",
    options: [
      "It must bypass the Ethical Check entirely.",
      "It must provide a hard block input to the Ethical Check.",
      "It must receive data from the Global Banking Network first.",
      "It must terminate the Core AI Kernel."
    ],
    correctAnswer: "It must provide a hard block input to the Ethical Check.",
    hint: "Look at the arrow direction from node H. It is a direct input to C, unlike the dotted injection from G."
  },
  {
    id: 2,
    chapterTitle: "Chapter 2: The Silent Transaction",
    narrative: "The bank was live. Millions of transactions flowed like water through a canyon. Suddenly, an anomaly appeared in the logs. A transaction that existed everywhere and nowhere at once. James consulted the sequence logs. The timestamp was impossible.",
    graphDefinition: `
sequenceDiagram
    participant User
    participant API_Gateway
    participant AI_Sentinel
    participant Ledger_DB

    User->>API_Gateway: Request Transfer
    API_Gateway->>AI_Sentinel: Validate Request
    AI_Sentinel->>AI_Sentinel: Run Predictive Model
    AI_Sentinel-->>API_Gateway: Validation OK
    API_Gateway->>Ledger_DB: Write Transaction
    Ledger_DB-->>API_Gateway: Success (200 OK)
    Note over AI_Sentinel,Ledger_DB: The Shadow Gap
    API_Gateway-->>User: Transfer Complete
    `,
    question: "James noticed a temporal discrepancy labeled 'The Shadow Gap'. Between which two events did the AI hesitate to calculate the moral weight of the money?",
    options: [
      "Between the User Request and API Gateway.",
      "During the Predictive Model execution.",
      "Between Validation OK and Writing to Ledger.",
      "After the Transfer was Complete."
    ],
    correctAnswer: "Between Validation OK and Writing to Ledger.",
    hint: "Follow the vertical timeline. The Note is placed specifically between the Sentinel's response and the DB write."
  },
  {
    id: 3,
    chapterTitle: "Chapter 3: The Immutable Truth",
    narrative: "The AI Bank wasn't just a bank; it was a fortress of truth. James had architected a class structure where 'Value' could not exist without 'Trust'. An intruder tried to instantiate a 'FraudulentLoan' object, but the compiler threw an error. The inheritance chain held the key.",
    graphDefinition: `
classDiagram
    class Asset {
        +int id
        +float value
        +verify()
    }
    class Trust {
        +string signature
        +bool isVerified
    }
    class Loan {
        +approve()
    }
    class AI_Loan {
        +analyzeRisk()
    }
    
    Asset <|-- Loan
    Trust *-- Asset : Composition
    Loan <|-- AI_Loan
    
    class FraudulentLoan {
        +bypassChecks()
    }
    
    AI_Loan <|.. FraudulentLoan : Implements (Error)
    `,
    question: "The intruder attempted to make 'FraudulentLoan' implement 'AI_Loan'. Why did the architecture reject this instantiation based on the diagram?",
    options: [
      "Because FraudulentLoan inherits from Trust directly.",
      "Because Asset is a private class.",
      "Because Composition requires Trust to exist before Asset, and FraudulentLoan lacks Trust.",
      "Because the arrow indicates realization (interface), but AI_Loan is a concrete class inheriting from Asset."
    ],
    correctAnswer: "Because the arrow indicates realization (interface), but AI_Loan is a concrete class inheriting from Asset.",
    hint: "Look at the arrow types. The dotted line with the hollow triangle implies implementation of an interface, but AI_Loan is depicted as a subclass of Loan."
  }
];

// --- Components ---

const MermaidDiagram: React.FC<{ chart: string; id: string }> = ({ chart, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (containerRef.current) {
        try {
          // Clear previous content
          containerRef.current.innerHTML = '';
          
          // Generate unique ID for the SVG
          const uniqueId = `mermaid-${id}-${Date.now()}`;
          
          // Render
          const { svg } = await mermaid.render(uniqueId, chart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid rendering failed:", error);
          if (containerRef.current) {
            containerRef.current.innerHTML = '<div class="text-red-500 p-4">Error decoding the ancient scrolls (Graph Render Error).</div>';
          }
        }
      }
    };

    renderChart();
  }, [chart, id]);

  return (
    <div 
      ref={containerRef} 
      className="w-full overflow-x-auto flex justify-center p-6 bg-slate-900 rounded-lg border border-slate-700 shadow-inner"
      style={{ minHeight: '200px' }}
    />
  );
};

const MysterySolver: React.FC<MysterySolverProps> = ({ onChapterUnlock, initialLevel = 0 }) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(initialLevel);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'neutral'; message: string } | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentPuzzle = PUZZLES[currentLevelIndex];
  const isLastLevel = currentLevelIndex === PUZZLES.length - 1;

  const handleOptionSelect = (option: string) => {
    if (isSolved) return;
    setSelectedOption(option);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    if (selectedOption === currentPuzzle.correctAnswer) {
      setFeedback({
        type: 'success',
        message: "Access Granted. The logic holds. The encryption dissolves."
      });
      setIsSolved(true);
      if (onChapterUnlock) {
        onChapterUnlock(currentPuzzle.id);
      }
    } else {
      setFeedback({
        type: 'error',
        message: "Access Denied. The algorithm detects a flaw in your reasoning."
      });
    }
  };

  const handleNextLevel = () => {
    if (isLastLevel) {
      setFeedback({
        type: 'success',
        message: "Congratulations. You have deciphered the complete architecture of the AI Bank."
      });
      return;
    }
    
    setCurrentLevelIndex(prev => prev + 1);
    setSelectedOption(null);
    setFeedback(null);
    setIsSolved(false);
    setShowHint(false);
  };

  if (!currentPuzzle) {
    return <div className="text-white">The archives are empty.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-950 text-slate-200 font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="mb-8 border-b border-amber-700 pb-4">
        <h1 className="text-3xl font-bold text-amber-500 tracking-wider uppercase mb-2">
          The Book of James
        </h1>
        <div className="flex justify-between items-end">
          <h2 className="text-xl text-slate-400 font-light">
            {currentPuzzle.chapterTitle}
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Decryption Progress: {Math.round(((currentLevelIndex) / PUZZLES.length) * 100)}%
          </span>
        </div>
      </header>

      {/* Narrative */}
      <section className="mb-8 bg-slate-900 p-6 rounded-lg border-l-4 border-amber-600 shadow-lg">
        <p className="text-lg leading-relaxed italic font-serif text-slate-300">
          "{currentPuzzle.narrative}"
        </p>
      </section>

      {/* Puzzle Area */}
      <main className="flex-grow space-y-8">
        
        {/* Graph Visualization */}
        <div className="w-full bg-black rounded-xl overflow-hidden border border-slate-800 relative">
          <div className="absolute top-0 left-0 bg-slate-800 text-xs px-2 py-1 text-slate-400 rounded-br">
            FIG {currentPuzzle.id}.0 - ARCHITECTURE VISUALIZATION
          </div>
          <MermaidDiagram chart={currentPuzzle.graphDefinition} id={`puzzle-${currentPuzzle.id}`} />
        </div>

        {/* Question & Interaction */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-xl font-semibold text-amber-500 mb-4 flex items-center">
            <span className="mr-2">⚡</span> Logic Gate Challenge
          </h3>
          <p className="text-md mb-6 text-slate-300">{currentPuzzle.question}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentPuzzle.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                disabled={isSolved}
                className={`
                  p-4 rounded-lg text-left transition-all duration-200 border
                  ${selectedOption === option 
                    ? 'bg-amber-900/30 border-amber-500 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-500 text-slate-300'}
                  ${isSolved && selectedOption !== option ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span className="font-mono text-amber-600 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                {option}
              </button>
            ))}
          </div>

          {/* Controls & Feedback */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-slate-500 hover:text-amber-400 underline decoration-dotted transition-colors"
              >
                {showHint ? "Hide Clue" : "Consult the Archives (Hint)"}
              </button>
              
              {showHint && (
                <span className="text-sm text-amber-400/80 italic animate-pulse">
                  {currentPuzzle.hint}
                </span>
              )}
            </div>

            <div className="flex gap-3 w-full md:w-auto justify-end">
              {!isSolved ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className={`
                    px-8 py-3 rounded font-bold uppercase tracking-widest transition-all
                    ${selectedOption 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg' 
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
                  `}
                >
                  Verify Logic
                </button>
              ) : (
                <button
                  onClick={handleNextLevel}
                  className="px-8 py-3 rounded font-bold uppercase tracking-widest bg-green-700 hover:bg-green-600 text-white shadow-[0_0_20px_rgba(21,128,61,0.4)] transition-all animate-bounce-slight"
                >
                  {isLastLevel ? "Complete Chronicle" : "Next Chapter >>"}
                </button>
              )}
            </div>
          </div>

          {/* Feedback Message */}
          {feedback && (
            <div className={`mt-6 p-4 rounded border ${
              feedback.type === 'success' 
                ? 'bg-green-900/20 border-green-800 text-green-400' 
                : 'bg-red-900/20 border-red-800 text-red-400'
            }`}>
              <div className="flex items-center">
                <span className="text-2xl mr-3">{feedback.type === 'success' ? '🔓' : '🔒'}</span>
                <span className="font-mono">{feedback.message}</span>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default MysterySolver;