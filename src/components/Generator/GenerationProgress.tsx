import React from 'react';

export type GenerationStage = 'plotting' | 'drafting' | 'compiling' | 'complete';

interface GenerationProgressProps {
  currentStage: GenerationStage;
  progress?: number; // Percentage 0-100 for the current stage
  className?: string;
}

const stages: { id: GenerationStage; label: string; description: string }[] = [
  { 
    id: 'plotting', 
    label: 'Plotting', 
    description: 'Constructing narrative arc and mystery elements...' 
  },
  { 
    id: 'drafting', 
    label: 'Drafting', 
    description: 'Writing chapters and dialogue...' 
  },
  { 
    id: 'compiling', 
    label: 'Compiling Graphs', 
    description: 'Generating Mermaid diagrams and visual assets...' 
  },
];

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const LoadingIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const PendingIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const GenerationProgress: React.FC<GenerationProgressProps> = ({ 
  currentStage, 
  progress = 0,
  className = ''
}) => {
  const currentStageIndex = stages.findIndex(s => s.id === currentStage);
  const isComplete = currentStage === 'complete';
  const activeIndex = isComplete ? stages.length : currentStageIndex;

  return (
    <div className={`w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Authoring System
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Generating "The AI Bank" Series
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full -z-0"></div>
        <div 
          className="absolute top-5 left-0 h-1 bg-indigo-600 rounded-full -z-0 transition-all duration-500 ease-out"
          style={{ 
            width: `${Math.min(100, (activeIndex / (stages.length - 1)) * 100)}%` 
          }}
        ></div>

        {/* Steps */}
        <div className="flex justify-between w-full relative z-10">
          {stages.map((stage, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            
            return (
              <div key={stage.id} className="flex flex-col items-center w-1/3">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white dark:bg-gray-900
                    ${isActive || isPast 
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-400'}
                    ${isActive ? 'ring-4 ring-indigo-100 dark:ring-indigo-900/30' : ''}
                  `}
                >
                  {isPast ? <CheckIcon /> : isActive ? <LoadingIcon /> : <PendingIcon />}
                </div>
                
                <div className="mt-4 text-center">
                  <span 
                    className={`
                      block text-sm font-semibold transition-colors duration-300
                      ${isActive || isPast ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-500'}
                    `}
                  >
                    {stage.label}
                  </span>
                  
                  {isActive && (
                    <div className="mt-2 flex flex-col items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 animate-pulse">
                        {stage.description}
                      </span>
                      {progress > 0 && (
                        <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isComplete && (
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
          <p className="text-green-700 dark:text-green-400 font-medium flex items-center justify-center gap-2">
            <CheckIcon />
            Generation Complete. Ready for review.
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerationProgress;