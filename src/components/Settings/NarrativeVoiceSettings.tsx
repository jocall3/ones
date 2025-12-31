import React, { useState, useEffect } from 'react';

export type NarrativeStyle = 
  | 'Dan Brown-esque' 
  | 'Analytical' 
  | 'Historical' 
  | 'Journalistic' 
  | 'Educational';

export interface NarrativeSettings {
  style: NarrativeStyle;
  pacing: number;        // 0-100
  technicalDepth: number; // 0-100
  mysteryLevel: number;   // 0-100
  visualDensity: number;  // 0-100 (Frequency of Mermaid graphs)
  customInstructions: string;
}

interface NarrativeVoiceSettingsProps {
  initialSettings?: NarrativeSettings;
  onSettingsChange: (settings: NarrativeSettings) => void;
}

const DEFAULT_SETTINGS: NarrativeSettings = {
  style: 'Dan Brown-esque',
  pacing: 80,
  technicalDepth: 60,
  mysteryLevel: 85,
  visualDensity: 70,
  customInstructions: ''
};

export const NarrativeVoiceSettings: React.FC<NarrativeVoiceSettingsProps> = ({
  initialSettings,
  onSettingsChange
}) => {
  const [settings, setSettings] = useState<NarrativeSettings>(initialSettings || DEFAULT_SETTINGS);

  // Notify parent component whenever local state changes
  useEffect(() => {
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const handleChange = (field: keyof NarrativeSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Narrative Voice Configuration
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure how the AI narrates the story of James and the AI Bank.
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Style Selection */}
        <section>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Narrative Archetype
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {(['Dan Brown-esque', 'Analytical', 'Historical', 'Journalistic', 'Educational'] as NarrativeStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => handleChange('style', style)}
                className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 border ${
                  settings.style === style
                    ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-300 ring-1 ring-blue-500'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{style}</span>
                  {settings.style === style && (
                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-700">
            <span className="font-semibold">Current Style:</span> 
            {settings.style === 'Dan Brown-esque' && " High-stakes mystery, short chapters, cliffhangers, and hidden codes. (Strictly non-violent)."}
            {settings.style === 'Analytical' && " Precise, data-driven narration focusing on the banking architecture and AI logic."}
            {settings.style === 'Historical' && " A retrospective chronicle of the events leading to the bank's creation."}
            {settings.style === 'Journalistic' && " Investigative reporting style, interviewing key agents and documenting facts."}
            {settings.style === 'Educational' && " Instructional tone, using the story to teach AI and banking concepts."}
          </div>
        </section>

        {/* Sliders */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pacing */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pacing</label>
                <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{settings.pacing}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.pacing}
                onChange={(e) => handleChange('pacing', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Methodical</span>
                <span>Thriller Speed</span>
              </div>
            </div>

            {/* Mystery Level */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mystery & Intrigue</label>
                <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{settings.mysteryLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.mysteryLevel}
                onChange={(e) => handleChange('mysteryLevel', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Transparent</span>
                <span>Enigmatic</span>
              </div>
            </div>

            {/* Technical Depth */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Technical Depth</label>
                <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{settings.technicalDepth}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.technicalDepth}
                onChange={(e) => handleChange('technicalDepth', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>High Level</span>
                <span>Code & Architecture</span>
              </div>
            </div>

            {/* Visual Density (Mermaid Graphs) */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mermaid Graph Frequency</label>
                <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{settings.visualDensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.visualDensity}
                onChange={(e) => handleChange('visualDensity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Text Only</span>
                <span>Visual Heavy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Instructions */}
        <section>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Custom Narrative Instructions
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
            placeholder="E.g., Emphasize the ethical considerations of the AI Bank. Ensure James is portrayed as a humble problem solver..."
            value={settings.customInstructions}
            onChange={(e) => handleChange('customInstructions', e.target.value)}
          />
        </section>

        {/* Safety & Compliance Badge */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-green-800 dark:text-green-300">Content Safety Protocols Active</h3>
            <p className="mt-1 text-sm text-green-700 dark:text-green-400">
              The narrative engine is strictly configured to exclude violence, profanity, and disrespectful content. 
              Focus remains on mystery, technology, and the architectural journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarrativeVoiceSettings;