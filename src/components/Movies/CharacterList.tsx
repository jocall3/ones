import React from 'react';

interface Character {
  id: string;
  name: string;
  role: string;
  actor: string;
  traits: string[];
  description: string;
  archetype: string;
}

const characters: Character[] = [
  {
    id: 'char_001',
    name: 'James',
    role: 'The Founder',
    actor: 'Dev Patel',
    archetype: 'The Visionary',
    traits: ['Ethical Genius', 'Algorithmic Intuition', 'Relentless Optimism'],
    description: 'A brilliant programmer who discovers a way to decentralize banking using pure AI logic. He races against time to deploy the "Sovereign Code" before traditional financial institutions can shut him down. Driven by a desire for transparency, not greed.',
  },
  {
    id: 'char_002',
    name: 'The Auditor',
    role: 'The Antagonist',
    actor: 'Tilda Swinton',
    archetype: 'The Gatekeeper',
    traits: ['Meticulous', 'Regulatory Master', 'Traditionalist'],
    description: 'A high-ranking official from the Global Financial Oversight Committee. She isn\'t evil, but she believes the AI Bank represents a chaotic risk to the world economy. She uses red tape and forensic accounting as her weapons to dismantle James\'s work.',
  },
  {
    id: 'char_003',
    name: 'The Architect',
    role: 'Lead Systems Engineer',
    actor: 'Oscar Isaac',
    archetype: 'The Builder',
    traits: ['Quantum Logic', 'Silent Observer', 'Structural Perfectionist'],
    description: 'James\'s mysterious partner who exists mostly in the shadows. While James handles the vision and the code, The Architect builds the unbreachable infrastructure. A master of encryption who speaks in riddles and mathematical constants.',
  },
  {
    id: 'char_004',
    name: 'Sarah "Loop" Jenkins',
    role: 'Forensic Data Analyst',
    actor: 'Florence Pugh',
    archetype: 'The Decoder',
    traits: ['Pattern Recognition', 'White Hat Hacker', 'Inquisitive'],
    description: 'Originally hired by The Auditor to find flaws in James\'s system, she slowly realizes the AI Bank is mathematically perfect and ethically sound, leading to a crisis of loyalty.',
  }
];

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 transition-transform hover:scale-[1.02] duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{character.name}</h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm uppercase tracking-wide">{character.role}</p>
          </div>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full font-semibold">
            {character.archetype}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {character.description}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Key Traits</h4>
          <div className="flex flex-wrap gap-2">
            {character.traits.map((trait, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded border border-indigo-100 dark:border-indigo-800"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Cast: {character.actor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterList: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Dramatis Personae
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The key players in the "AI Bank" saga. A story of code, ethics, and the silent revolution of the financial system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterList;