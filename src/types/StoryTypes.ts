export type Genre = 'Mystery' | 'Tech Thriller' | 'Corporate Drama' | 'Educational';

export type CharacterRole = 'Protagonist' | 'Antagonist' | 'Mentor' | 'Ally' | 'Skeptic';

export type DiagramType = 'flowchart' | 'sequence' | 'class' | 'state' | 'er' | 'gantt' | 'pie';

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  archetype: string; // e.g., "The Visionary", "The Regulator", "The Legacy Banker"
  occupation: string;
  personalityTraits: string[];
  // Specific to the "James building an AI Bank" narrative
  technicalExpertise: string[]; // e.g., "Blockchain", "Neural Networks", "Compliance"
  motivation: string;
  backstory: string;
}

export interface Setting {
  id: string;
  name: string;
  location: string;
  description: string;
  significance: string; // Why this location matters to the AI Bank plot
}

export interface MermaidGraph {
  id: string;
  title: string;
  type: DiagramType;
  code: string; // The raw Mermaid syntax
  caption: string;
  contextDescription: string; // Explanation of how this technical diagram relates to the plot
}

export interface PlotPoint {
  id: string;
  description: string;
  type: 'Inciting Incident' | 'Rising Action' | 'Climax' | 'Falling Action' | 'Resolution' | 'Twist';
  tensionLevel: number; // 1-10
  involvedCharacterIds: string[];
  technicalChallenge: string | null; // The specific AI/Banking problem being solved or obstructed
}

export interface MovieScene {
  id: string;
  slugline: string; // e.g., INT. SERVER ROOM - DAY
  actionLines: string[];
  dialogue: {
    characterId: string;
    text: string;
    parenthetical?: string;
  }[];
  visualEffectsCue?: string; // Instructions for visualizing the AI/Data streams
  associatedGraphId?: string; // If a graph is displayed on a screen during the scene
}

export interface Chapter {
  id: string;
  bookId: string;
  sequenceNumber: number;
  title: string;
  summary: string;
  content: string; // The narrative text
  wordCount: number;
  charactersPresent: string[]; // Character IDs
  graphs: MermaidGraph[];
  plotPoints: PlotPoint[];
  movieScript?: MovieScene[]; // The cinematic adaptation of this chapter
}

export interface BookMetadata {
  isbn?: string;
  publicationDate?: string;
  language: string;
  targetAudience: string;
  contentRating: 'G' | 'PG'; // Strict adherence to no violence/foul language
}

export interface Book {
  id: string;
  title: string;
  seriesNumber: number;
  seriesTitle: string; // "The AI Bank Chronicles"
  author: string; // "AI Author"
  genre: Genre;
  logline: string;
  synopsis: string;
  themes: string[]; // e.g., "Innovation vs Tradition", "Ethical AI", "Financial Inclusion"
  characters: Character[];
  settings: Setting[];
  chapters: Chapter[];
  totalWordCount: number;
  metadata: BookMetadata;
  status: 'Drafting' | 'Editing' | 'Completed' | 'Published';
}

export interface NarrativeConfig {
  tone: 'Intellectual' | 'Suspenseful' | 'Inspirational';
  pacing: 'Fast' | 'Moderate' | 'Slow';
  complexityLevel: 'High' | 'Medium' | 'Low'; // Technical depth of the banking/AI explanations
  includeDiagrams: boolean;
  generateMovieScript: boolean;
}