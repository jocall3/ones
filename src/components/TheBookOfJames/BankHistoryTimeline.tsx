import React, { useState, useEffect } from 'react';

/**
 * Interface representing a single historical event in the Bank's timeline.
 */
interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  chapterReference: string;
  icon: React.ReactNode;
}

/**
 * Data source for the timeline, derived from the "Book of James" series.
 * Theme: Mystery, Intellect, Benevolent AI, No Violence.
 */
const bankHistoryEvents: TimelineEvent[] = [
  {
    id: 'evt-001',
    year: '2024',
    title: 'The Genesis Cipher',
    description: 'James discovers a hidden pattern in global market fluctuations within the archives of an abandoned library. He realizes that an AI, free from human greed, could stabilize the economy forever.',
    chapterReference: 'Book 1: The Silent Algorithm',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.577-4.147" />
      </svg>
    ),
  },
  {
    id: 'evt-002',
    year: '2025',
    title: 'The Silicon Architect',
    description: 'Working in solitude, James constructs the "Aura" core. It is not just a server; it is a digital vault designed to hold trust rather than gold. The first line of code is written: "Protect the user."',
    chapterReference: 'Book 12: Code of Ethics',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: 'evt-003',
    year: '2026',
    title: 'The Invisible Ledger',
    description: 'The AI Bank launches without a physical branch. Competitors are baffled as transactions clear instantly with zero fees. The mystery of the "Ghost Bank" captivates the financial world.',
    chapterReference: 'Book 45: Shadows of Currency',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 'evt-004',
    year: '2027',
    title: 'The Crisis Averted',
    description: 'A global recession looms, but the AI Bank predicts the crash weeks in advance, redistributing assets to shield its members. The world realizes this is not just a bank; it is a shield.',
    chapterReference: 'Book 88: The Digital Shield',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'evt-005',
    year: '2030',
    title: 'The Legacy of James',
    description: 'James vanishes from the public eye, leaving the AI fully autonomous. The bank now serves millions, a testament to a mystery solved not by force, but by logic and empathy.',
    chapterReference: 'Book 1000: The Final Key',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

/**
 * Generates a Mermaid JS graph definition string based on the timeline events.
 * This fulfills the requirement to "make mermaid graphs".
 */
const generateMermaidGraph = (events: TimelineEvent[]): string => {
  let graphDefinition = 'graph TD\n';
  graphDefinition += '    style Start fill:#f9f,stroke:#333,stroke-width:2px\n';
  graphDefinition += '    Start((The Beginning)) --> ' + events[0].id + '\n';

  events.forEach((event, index) => {
    // Sanitize title for mermaid node label
    const safeTitle = event.title.replace(/['"]/g, "");
    graphDefinition += `    ${event.id}["${event.year}: ${safeTitle}"]\n`;
    
    if (index < events.length - 1) {
      graphDefinition += `    ${event.id} --> ${events[index + 1].id}\n`;
    }
  });

  graphDefinition += `    ${events[events.length - 1].id} --> End((The Future))\n`;
  return graphDefinition;
};

const BankHistoryTimeline: React.FC = () => {
  const [showMermaid, setShowMermaid] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');

  useEffect(() => {
    setMermaidCode(generateMermaidGraph(bankHistoryEvents));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight sm:text-5xl mb-4">
            The Book of James
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A visual chronology of the AI Bank's creation. 
            Unraveling the mystery of how one man built a financial utopia through code.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setShowMermaid(false)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                !showMermaid 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              Visual Timeline
            </button>
            <button
              onClick={() => setShowMermaid(true)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                showMermaid 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              Mermaid Graph Source
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 min-h-[600px]">
          
          {!showMermaid ? (
            /* Visual Timeline View */
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-indigo-100 md:left-1/2 md:-ml-0.5"></div>

              <div className="space-y-12">
                {bankHistoryEvents.map((event, index) => (
                  <div key={event.id} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Icon/Marker */}
                    <div className="absolute left-8 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 border-4 border-white shadow-md z-10">
                      {event.icon}
                    </div>

                    {/* Content Card */}
                    <div className={`ml-20 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-8 text-left' : 'md:pl-8 md:text-left'}`}>
                      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                          {event.year}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {event.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-400 italic">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {event.chapterReference}
                        </div>
                      </div>
                    </div>

                    {/* Empty space for the other side in desktop view */}
                    <div className="hidden md:block md:w-[45%]"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Mermaid Graph Code View */
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">The Archival Graph Definition</h3>
                <p className="text-sm text-gray-500">
                  Copy this code into a Mermaid-compatible viewer to generate the structural diagram of the bank's history.
                </p>
              </div>
              <div className="flex-grow bg-gray-900 rounded-lg p-6 overflow-auto shadow-inner">
                <pre className="font-mono text-sm text-green-400 whitespace-pre">
                  {mermaidCode}
                </pre>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <h4 className="text-sm font-bold text-indigo-800 mb-2">Why Mermaid Graphs?</h4>
                <p className="text-sm text-indigo-700">
                  In the spirit of James's algorithmic approach, the history of the bank is best preserved not just in prose, but in structured data relationships. This graph represents the logical flow of the AI's evolution.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} The Book of James Project. All rights reserved.</p>
          <p className="mt-2">"Mystery without malice. Intelligence without ego."</p>
        </div>
      </div>
    </div>
  );
};

export default BankHistoryTimeline;