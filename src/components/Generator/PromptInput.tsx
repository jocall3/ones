import React, { useState, FormEvent } from 'react';

interface BookGenerationParams {
  title: string;
  plotPremise: string;
  technicalDomain: string;
  mysteryIntensity: number;
  generateMermaid: boolean;
  generateMovieScript: boolean;
}

interface PromptInputProps {
  onGenerate: (params: BookGenerationParams) => void;
  isGenerating?: boolean;
}

const TECHNICAL_DOMAINS = [
  'Distributed Ledger Consistency',
  'Neural Network Architecture',
  'Cybersecurity & Encryption',
  'Database Race Conditions',
  'High-Frequency Trading Algorithms',
  'Cloud Infrastructure Scaling',
  'Ethical AI Governance',
  'Legacy System Migration'
];

export const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isGenerating = false }) => {
  const [plotPremise, setPlotPremise] = useState('');
  const [technicalDomain, setTechnicalDomain] = useState(TECHNICAL_DOMAINS[0]);
  const [mysteryIntensity, setMysteryIntensity] = useState(7);
  const [generateMermaid, setGenerateMermaid] = useState(true);
  const [generateMovieScript, setGenerateMovieScript] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!plotPremise.trim()) return;

    // Auto-generate a working title based on the premise for the initial state
    const derivedTitle = `The ${technicalDomain.split(' ').pop()} Protocol`;

    onGenerate({
      title: derivedTitle,
      plotPremise,
      technicalDomain,
      mysteryIntensity,
      generateMermaid,
      generateMovieScript,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          New Book Configuration
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Define the parameters for the next James the AI Banker mystery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Plot Premise Input */}
        <div className="space-y-2">
          <label htmlFor="premise" className="block text-sm font-medium text-slate-700">
            Core Plot Scenario
          </label>
          <textarea
            id="premise"
            value={plotPremise}
            onChange={(e) => setPlotPremise(e.target.value)}
            placeholder="e.g., James fixes a race condition in the vault while tracking a phantom transaction..."
            className="w-full h-32 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-800 placeholder-slate-400"
            required
          />
          <p className="text-xs text-slate-500 text-right">
            Style: Dan Brown Mystery (Clean/Non-violent)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical Domain Selection */}
          <div className="space-y-2">
            <label htmlFor="domain" className="block text-sm font-medium text-slate-700">
              Technical Focus
            </label>
            <select
              id="domain"
              value={technicalDomain}
              onChange={(e) => setTechnicalDomain(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
            >
              {TECHNICAL_DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Mystery Intensity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="intensity" className="block text-sm font-medium text-slate-700">
                Mystery Complexity
              </label>
              <span className="text-sm font-bold text-blue-600">{mysteryIntensity}/10</span>
            </div>
            <input
              type="range"
              id="intensity"
              min="1"
              max="10"
              value={mysteryIntensity}
              onChange={(e) => setMysteryIntensity(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Output Toggles */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <label className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors flex-1">
            <input
              type="checkbox"
              checked={generateMermaid}
              onChange={(e) => setGenerateMermaid(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="text-sm font-medium text-slate-700">Generate Mermaid Graphs</span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors flex-1">
            <input
              type="checkbox"
              checked={generateMovieScript}
              onChange={(e) => setGenerateMovieScript(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="text-sm font-medium text-slate-700">Generate Movie Script</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !plotPremise.trim()}
          className={`w-full py-4 px-6 rounded-lg font-bold text-white shadow-md transition-all transform hover:-translate-y-0.5 
            ${isGenerating || !plotPremise.trim() 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
            }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Writing Book & Generating Assets...
            </span>
          ) : (
            'Initialize Book Generation'
          )}
        </button>
      </form>
    </div>
  );
};