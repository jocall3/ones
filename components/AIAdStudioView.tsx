import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import Card from './Card';
import { Bot } from 'lucide-react';
import { VideoModel, AspectRatio, GenerationSettings, GenerationMode, VideoAsset, AdProject, AppConfig } from '../types';

// Simulation polling messages
const POLLING_MESSAGES = [ 
    "Initializing Neural Video Synthesis Engine...", 
    "Analyzing semantic intent vectors...", 
    "Generating high-fidelity frame buffer...", 
    "Executing temporal coherence algorithms...", 
    "Optimizing lighting and global illumination...", 
    "Finalizing secure asset manifest..." 
];

const AIAdStudioView: React.FC = () => {
    const [prompt, setPrompt] = useState('A hyper-realistic cinematic 15-second commercial for a futuristic self-driving electric vehicle navigating a neon-lit Tokyo street at night.');
    const [isGenerating, setIsGenerating] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pollingStep, setPollingStep] = useState(0);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        setVideoUrl(null);
        setPollingStep(0);

        const pollingInterval = setInterval(() => {
            setPollingStep(prev => (prev + 1) % POLLING_MESSAGES.length);
        }, 3000);

        try {
            // FIX: Removed 'as string' and using process.env.API_KEY directly as per guidelines
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Fixed: Use 'any' type for operation to resolve issues with SDK type inference and unknown assignments
            let operation: any = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                prompt: prompt,
                config: {
                    numberOfVideos: 1,
                    resolution: '720p',
                    aspectRatio: '16:9'
                }
            });

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
            }

            if (operation.error) {
                // Fixed: Explicitly handle error message from unknown operation type to resolve assignment error on line 54
                throw new Error(String(operation.error.message || 'Generation failed'));
            }

            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            // FIX: Use typeof check to narrow down 'unknown' type of downloadLink to 'string' for fetch call
            if (typeof downloadLink === 'string') {
                const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred during generation.');
        } finally {
            clearInterval(pollingInterval);
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tighter">AI AD STUDIO</h2>
                    <p className="text-gray-400 text-sm">Professional video generation via Veo 3.1 Fast</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-cyan-400 text-xs font-bold uppercase">
                    Model: Veo 3.1 Preview
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Creative Directives" className="lg:col-span-2">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Narrative Prompt</label>
                            <textarea 
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                className="w-full h-40 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                                placeholder="Describe your vision..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Aspect Ratio</label>
                                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm">
                                    <option>16:9 Landscape</option>
                                    <option>9:16 Portrait</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration</label>
                                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm">
                                    <option>Short (5s)</option>
                                    <option>Standard (15s)</option>
                                </select>
                            </div>
                        </div>
                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt.trim()}
                            className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                        >
                            {isGenerating ? 'Computing Frame Sequence...' : 'Execute Synthesis'}
                        </button>
                        {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                    </div>
                </Card>

                <Card title="Real-time Preview" className="lg:col-span-1">
                    <div className="aspect-video bg-black rounded-lg border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                        {isGenerating ? (
                            <div className="text-center p-6 space-y-4">
                                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
                                <p className="text-xs text-cyan-400 font-mono animate-pulse">{POLLING_MESSAGES[pollingStep]}</p>
                            </div>
                        ) : videoUrl ? (
                            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center p-8 space-y-2 opacity-30">
                                <Bot size={48} className="mx-auto text-gray-500" />
                                <p className="text-xs text-gray-400">Awaiting Signal Ingestion</p>
                            </div>
                        )}
                    </div>
                    {videoUrl && (
                        <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex justify-between items-center">
                            <span className="text-xs text-gray-400">Asset Ready</span>
                            <a href={videoUrl} download="ad_asset.mp4" className="text-xs font-bold text-cyan-400 hover:underline">Download MP4</a>
                        </div>
                    )}
                </Card>
            </div>
            
            <Card title="Recent Synthesized Assets">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                     {[...Array(6)].map((_, i) => (
                         <div key={i} className="aspect-video bg-gray-800 rounded border border-gray-700 opacity-20 hover:opacity-100 transition-opacity cursor-pointer"></div>
                     ))}
                </div>
            </Card>
        </div>
    );
};

export default AIAdStudioView;