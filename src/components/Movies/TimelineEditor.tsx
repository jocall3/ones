import React, { useState, useRef, useEffect } from 'react';

// --- Types ---

interface Scene {
  id: string;
  title: string;
  description: string;
  duration: number; // Duration in seconds
  startAt: number;  // Calculated start time in seconds
  color: string;
}

interface TimelineProps {
  onSave?: (scenes: Scene[]) => void;
}

// --- Mock Data Generation ---

const generateInitialScenes = (): Scene[] => {
  const rawScenes = [
    { title: 'The Spark', desc: 'James realizes the banking system is outdated while waiting in line.', dur: 120, col: '#60A5FA' },
    { title: 'The Blueprint', desc: 'Drafting the architecture of the AI Core in a quiet library.', dur: 180, col: '#818CF8' },
    { title: 'First Line of Code', desc: 'James begins the implementation of the secure ledger.', dur: 240, col: '#34D399' },
    { title: 'The Anomaly', desc: 'A mysterious pattern emerges in the transaction logs.', dur: 150, col: '#F87171' },
    { title: 'The Investigation', desc: 'James analyzes the data streams to find the source.', dur: 200, col: '#FBBF24' },
    { title: 'The Breakthrough', desc: 'The AI learns to optimize cash flow automatically.', dur: 160, col: '#A78BFA' },
    { title: 'Global Launch', desc: 'The AI Bank goes live, serving millions instantly.', dur: 300, col: '#60A5FA' },
  ];

  let currentTime = 0;
  return rawScenes.map((s, i) => {
    const scene = {
      id: `scene-${i}`,
      title: s.title,
      description: s.desc,
      duration: s.dur,
      startAt: currentTime,
      color: s.col,
    };
    currentTime += s.dur;
    return scene;
  });
};

// --- Helper Functions ---

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// --- Components ---

export const TimelineEditor: React.FC<TimelineProps> = ({ onSave }) => {
  const [scenes, setScenes] = useState<Scene[]>(generateInitialScenes());
  const [zoom, setZoom] = useState<number>(1); // Pixels per second
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Recalculate start times whenever duration or order changes
  useEffect(() => {
    let currentTime = 0;
    const updatedScenes = scenes.map(scene => {
      const updated = { ...scene, startAt: currentTime };
      currentTime += scene.duration;
      return updated;
    });
    // Only update state if start times actually changed to avoid loops
    const hasChanged = updatedScenes.some((s, i) => s.startAt !== scenes[i].startAt);
    if (hasChanged) {
      setScenes(updatedScenes);
    }
  }, [scenes]);

  // Playback simulation
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setPlayheadPosition(prev => {
          const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / zoom); // Adjust speed relative to zoom for visual smoothness if needed, but 1s is 1s.
      // Actually, let's just tick every real second.
    }
    return () => clearInterval(interval);
  }, [isPlaying, scenes, zoom]);

  // Handlers
  const handleDurationChange = (id: string, newDuration: number) => {
    if (newDuration < 10) return; // Minimum 10 seconds
    setScenes(prev => prev.map(s => s.id === id ? { ...s, duration: newDuration } : s));
  };

  const handleSceneSelect = (id: string) => {
    setSelectedSceneId(id);
  };

  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

  const selectedScene = scenes.find(s => s.id === selectedSceneId);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white font-sans overflow-hidden rounded-lg shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-blue-400">Movie Adaptation Timeline</h2>
          <p className="text-xs text-gray-400">Project: James' AI Bank • Mystery / Tech</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Total Runtime</div>
            <div className="text-xl font-mono font-bold">{formatTime(totalDuration)}</div>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isPlaying ? 'Pause' : 'Play Preview'}
          </button>
          <button 
            onClick={() => onSave && onSave(scenes)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
          >
            Save Timeline
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Scene List / Editor */}
        <div className="w-1/3 min-w-[300px] bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700 bg-gray-850">
            <h3 className="font-semibold text-gray-300 mb-2">Scene Details</h3>
            {selectedScene ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={selectedScene.title}
                    onChange={(e) => setScenes(scenes.map(s => s.id === selectedScene.id ? {...s, title: e.target.value} : s))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Description</label>
                  <textarea 
                    value={selectedScene.description}
                    onChange={(e) => setScenes(scenes.map(s => s.id === selectedScene.id ? {...s, description: e.target.value} : s))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Duration (sec)</label>
                    <input 
                      type="number" 
                      value={selectedScene.duration}
                      onChange={(e) => handleDurationChange(selectedScene.id, parseInt(e.target.value) || 0)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                    <div className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-gray-400 cursor-not-allowed">
                      {formatTime(selectedScene.startAt)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-sm italic py-8 text-center">
                Select a scene from the timeline to edit details.
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {scenes.map((scene) => (
              <div 
                key={scene.id}
                onClick={() => handleSceneSelect(scene.id)}
                className={`p-3 rounded cursor-pointer border transition-all ${
                  selectedSceneId === scene.id 
                    ? 'bg-gray-700 border-blue-500 shadow-md' 
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm truncate">{scene.title}</span>
                  <span className="text-xs font-mono text-gray-400">{formatTime(scene.duration)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{scene.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Visual Timeline */}
        <div className="flex-1 flex flex-col bg-gray-900 relative">
          
          {/* Toolbar */}
          <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Zoom:</span>
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.1" 
                value={zoom} 
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-32 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-xs text-gray-500">
              Drag edges to resize (Coming Soon) • Click to Select
            </div>
          </div>

          {/* Timeline Track Area */}
          <div 
            className="flex-1 overflow-x-auto overflow-y-hidden relative custom-scrollbar"
            ref={scrollContainerRef}
          >
            <div 
              className="relative h-full min-w-full"
              style={{ width: `${totalDuration * zoom + 100}px` }}
            >
              {/* Time Rulers */}
              <div className="absolute top-0 left-0 right-0 h-8 border-b border-gray-700 bg-gray-850 flex items-end">
                {Array.from({ length: Math.ceil(totalDuration / 60) + 1 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bottom-0 border-l border-gray-600 text-[10px] text-gray-500 pl-1"
                    style={{ left: `${i * 60 * zoom}px`, height: '50%' }}
                  >
                    {i}:00
                  </div>
                ))}
              </div>

              {/* Playhead */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none transition-all duration-100 ease-linear"
                style={{ left: `${playheadPosition * zoom}px` }}
              >
                <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rounded-full shadow-sm" />
              </div>

              {/* Scenes Track */}
              <div className="absolute top-12 left-0 right-0 h-32 px-4">
                {scenes.map((scene) => (
                  <div
                    key={scene.id}
                    onClick={() => handleSceneSelect(scene.id)}
                    className={`absolute top-2 h-24 rounded-md border-2 overflow-hidden cursor-pointer transition-all group hover:z-10 ${
                      selectedSceneId === scene.id ? 'border-white shadow-lg z-10' : 'border-transparent opacity-90 hover:opacity-100'
                    }`}
                    style={{
                      left: `${scene.startAt * zoom}px`,
                      width: `${scene.duration * zoom}px`,
                      backgroundColor: scene.color,
                    }}
                  >
                    <div className="p-2 h-full flex flex-col">
                      <span className="text-xs font-bold text-white drop-shadow-md truncate">
                        {scene.title}
                      </span>
                      {scene.duration * zoom > 60 && (
                        <span className="text-[10px] text-white/80 drop-shadow-md mt-1 line-clamp-2">
                          {scene.description}
                        </span>
                      )}
                    </div>
                    
                    {/* Hover Duration Indicator */}
                    <div className="absolute bottom-1 right-2 text-[10px] font-mono text-white/90 bg-black/20 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatTime(scene.duration)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Background Grid Lines */}
              <div className="absolute top-8 bottom-0 left-0 right-0 pointer-events-none">
                {Array.from({ length: Math.ceil(totalDuration / 10) }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-gray-800"
                    style={{ left: `${i * 10 * zoom}px` }}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Status */}
      <div className="h-8 bg-gray-800 border-t border-gray-700 flex items-center px-4 text-xs text-gray-500 justify-between">
        <span>Timeline Mode: Edit</span>
        <span>{scenes.length} Scenes • {formatTime(totalDuration)} Total Runtime</span>
      </div>
    </div>
  );
};

export default TimelineEditor;