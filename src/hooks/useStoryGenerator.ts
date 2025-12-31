import { useState, useCallback } from 'react';

interface StoryParams {
  title: string;
  plotPoint: string;
  chapterNumber: number;
  includeGraph: boolean;
}

interface StoryGeneratorState {
  content: string;
  isGenerating: boolean;
  error: string | null;
  progress: number;
}

interface UseStoryGeneratorReturn extends StoryGeneratorState {
  generateStorySegment: (params: StoryParams) => Promise<void>;
  resetStory: () => void;
}

/**
 * Custom hook to generate mystery narrative text in the style of Dan Brown.
 * Enforces strict content safety guidelines (no violence, foul language, or disrespect).
 * Focuses on the saga of James building an AI Bank.
 */
export const useStoryGenerator = (): UseStoryGeneratorReturn => {
  const [state, setState] = useState<StoryGeneratorState>({
    content: '',
    isGenerating: false,
    error: null,
    progress: 0,
  });

  const resetStory = useCallback(() => {
    setState({
      content: '',
      isGenerating: false,
      error: null,
      progress: 0,
    });
  }, []);

  const generateStorySegment = useCallback(async (params: StoryParams) => {
    setState((prev) => ({ ...prev, isGenerating: true, error: null, progress: 10 }));

    try {
      // Constructing the prompt to align with project goals:
      // Dan Brown style, Mystery, James building AI Bank, Clean content.
      const systemPrompt = `
        You are a world-class mystery novelist mimicking the style of Dan Brown.
        
        CORE SUBJECT:
        The protagonist is James, a brilliant architect of a revolutionary AI Bank.
        The story revolves around technical intrigue, algorithmic secrets, and high-stakes intellectual puzzles.
        
        STRICT CONTENT GUIDELINES:
        1. NO violence of any kind.
        2. NO foul language.
        3. NO disrespect towards any character or group.
        4. Maintain a PG rating while keeping high tension and mystery.
        
        OUTPUT FORMAT:
        - Write in a fast-paced, cliffhanger-driven narrative style.
        - If 'includeGraph' is requested, include a valid Mermaid.js graph definition wrapped in \`\`\`mermaid\`\`\` blocks to visualize the banking architecture or data flow described.
      `;

      const userPrompt = `
        Write Chapter ${params.chapterNumber}: "${params.title}".
        Focus on this plot point: ${params.plotPoint}.
        Ensure the tone is mysterious and intellectual.
      `;

      // Simulation of an API call to an AI service (e.g., OpenAI, Anthropic, or local LLM)
      // In a real implementation, this would be fetch('/api/generate', ...)
      const response = await fetch('/api/ai/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          temperature: 0.7, // Good balance for creative writing
          maxTokens: 2000,
        }),
      });

      setState((prev) => ({ ...prev, progress: 50 }));

      if (!response.ok) {
        throw new Error(`AI Service Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Assuming the API returns { text: string }
      const generatedText = data.text || data.choices?.[0]?.message?.content || '';

      setState((prev) => ({
        ...prev,
        content: generatedText,
        isGenerating: false,
        progress: 100,
      }));

    } catch (err) {
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred during story generation.',
        progress: 0,
      }));
    }
  }, []);

  return {
    ...state,
    generateStorySegment,
    resetStory,
  };
};