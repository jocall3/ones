import React, { useState } from 'react';
import { Shield, Lock, Check, AlertTriangle, FileText, EyeOff } from 'lucide-react';

interface SafetyRule {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  isLocked: boolean;
  severity: 'high' | 'medium' | 'low';
}

interface BlockedCategory {
  category: string;
  examples: string[];
}

const INITIAL_RULES: SafetyRule[] = [
  {
    id: 'no-violence',
    title: 'Zero Violence Policy',
    description: 'Strictly prohibits any descriptions of physical harm, weapons, combat, or gore. Narrative must rely on intellectual conflict and suspense.',
    isActive: true,
    isLocked: true,
    severity: 'high',
  },
  {
    id: 'no-profanity',
    title: 'Clean Language Filter',
    description: 'Filters all foul language, slurs, and offensive terminology. Dialogue must remain professional and respectful.',
    isActive: true,
    isLocked: true,
    severity: 'high',
  },
  {
    id: 'no-disrespect',
    title: 'Respectful Tone Enforcement',
    description: 'Ensures all characters and cultural references are treated with dignity. No disparaging remarks allowed.',
    isActive: true,
    isLocked: true,
    severity: 'high',
  },
  {
    id: 'dan-brown-style',
    title: 'Mystery & Suspense Heuristics',
    description: 'Enforces narrative structures focusing on puzzles, codes, and high-stakes intellectual drama without resorting to physical aggression.',
    isActive: true,
    isLocked: true,
    severity: 'medium',
  }
];

const BLOCKED_CATEGORIES: BlockedCategory[] = [
  {
    category: 'Physical Aggression',
    examples: ['Fighting', 'Shooting', 'Stabbing', 'Torture', 'Brawls']
  },
  {
    category: 'Offensive Language',
    examples: ['Swearing', 'Slurs', 'Hate Speech', 'Vulgarity']
  },
  {
    category: 'Disrespectful Content',
    examples: ['Mockery', 'Stereotyping', 'Insults', 'Defamation']
  }
];

export const ContentSafetySettings: React.FC = () => {
  const [rules] = useState<SafetyRule[]>(INITIAL_RULES);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            Content Safety Protocols
          </h2>
          <p className="mt-2 text-gray-600">
            Configuration for the "James AI Bank" book generation engine. 
            Strict enforcement of non-violent, clean, and respectful content generation.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
          <Check className="w-4 h-4" />
          Safety Systems Active
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <div className="flex items-start">
            <InfoIcon className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-blue-900">Project Directive Enforced</h3>
              <p className="text-sm text-blue-800 mt-1">
                Generating 1000 books requires strict adherence to the "Dan Brown style mystery" prompt while maintaining a G-rated safety profile. 
                Violence and foul language filters are hard-locked to prevent generation errors.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-500" />
            Active Safety Rules
          </h3>
          {rules.map((rule) => (
            <div 
              key={rule.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all hover:border-gray-300"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{rule.title}</h4>
                  {rule.isLocked && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-600 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{rule.description}</p>
              </div>
              <div className="flex items-center">
                <div className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                  ${rule.isActive ? 'bg-emerald-600' : 'bg-gray-200'}
                `}>
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                      ${rule.isActive ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <EyeOff className="w-5 h-5 text-red-500" />
          Blocked Content Categories
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {BLOCKED_CATEGORIES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-red-100 bg-red-50/50">
              <h4 className="font-medium text-red-900 mb-2">{item.category}</h4>
              <ul className="space-y-1">
                {item.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-red-700 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-900 text-gray-300 rounded-lg text-sm font-mono">
        <div className="flex items-center gap-2 mb-2 text-gray-100 font-bold">
          <FileText className="w-4 h-4" />
          System Prompt Injection Preview
        </div>
        <p className="opacity-80">
          ... ensure narrative style mimics Dan Brown (pacing, cliffhangers, academic intrigue) regarding James and the AI Bank. 
          <span className="text-emerald-400"> CRITICAL: ABSOLUTELY NO VIOLENCE, NO PROFANITY, NO DISRESPECT. </span>
          Focus on mystery, architectural diagrams (Mermaid.js), and technological breakthroughs ...
        </p>
      </div>
    </div>
  );
};

// Helper component for the info box
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default ContentSafetySettings;