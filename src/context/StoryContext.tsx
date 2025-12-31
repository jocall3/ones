import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---

export interface Chapter {
  id: number;
  title: string;
  content: string;
  mermaidGraph: string; // Graph representing the plot or banking architecture
}

export interface Book {
  id: string;
  title: string;
  author: string;
  summary: string;
  genre: string;
  chapters: Chapter[];
  coverColor: string;
}

export interface MovieScript {
  bookId: string;
  status: 'idle' | 'generating' | 'completed';
  scriptContent: string;
  scenes: { sceneNumber: number; description: string; dialogue: string }[];
}

interface StoryContextType {
  library: Book[];
  currentBook: Book | null;
  movieScript: MovieScript;
  isLoading: boolean;
  selectBook: (bookId: string) => void;
  generateMovieScript: (bookId: string) => Promise<void>;
  clearMovieScript: () => void;
}

// --- Mock Data Generation Helpers ---

const ADJECTIVES = ['Silent', 'Digital', 'Encrypted', 'Hidden', 'Infinite', 'Quantum', 'Neural', 'Logical', 'Immutable', 'Distributed'];
const NOUNS = ['Ledger', 'Vault', 'Protocol', 'Key', 'Transaction', 'Consensus', 'Code', 'Cipher', 'Network', 'Reserve'];
const MYSTERY_SUFFIXES = ['Conspiracy', 'Enigma', 'Paradox', 'Secret', 'Legacy', 'Blueprint', 'Origin', 'Sequence', 'Equation', 'Truth'];

const generateBookTitle = (index: number): string => {
  const adj = ADJECTIVES[index % ADJECTIVES.length];
  const noun = NOUNS[(index + 2) % NOUNS.length];
  const suffix = MYSTERY_SUFFIXES[(index + 5) % MYSTERY_SUFFIXES.length];
  return `The ${adj} ${noun} ${suffix}`;
};

const generateMermaidGraph = (seed: number) => {
  return `
graph TD
    A[James] -->|Builds| B(AI Core ${seed})
    B -->|Optimizes| C{Global Finance}
    C -->|Secure| D[The Bank of Tomorrow]
    D -->|Protects| E[User Assets]
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style D fill:#bbf,stroke:#333,stroke-width:2px
  `;
};

const generateChapters = (bookId: string): Chapter[] => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    title: `Chapter ${i + 1}: The ${i === 0 ? 'Inception' : i === 4 ? 'Resolution' : 'Discovery'}`,
    content: `James sat before the terminal, the glow of the monitor illuminating his determined face. The AI Bank wasn't just code; it was a promise of a fair financial future. In this chapter, James uncovers a subtle inefficiency in the legacy banking protocols that hints at a deeper mystery, solved only through logic and ethical engineering.`,
    mermaidGraph: generateMermaidGraph(parseInt(bookId) + i),
  }));
};

const generateLibrary = (): Book[] => {
  const books: Book[] = [];
  for (let i = 1; i <= 1000; i++) {
    books.push({
      id: i.toString(),
      title: generateBookTitle(i),
      author: "James The Architect",
      genre: "Techno-Mystery",
      summary: `In book #${i}, James faces a complex algorithmic puzzle. A mystery unfolds within the secure vaults of the AI Bank, requiring intellect and integrity to solve. No violence, just pure deductive reasoning and architectural genius.`,
      chapters: generateChapters(i.toString()),
      coverColor: `hsl(${(i * 137) % 360}, 70%, 50%)`,
    });
  }
  return books;
};

// --- Context Setup ---

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};

interface StoryProviderProps {
  children: ReactNode;
}

export const StoryProvider: React.FC<StoryProviderProps> = ({ children }) => {
  const [library, setLibrary] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movieScript, setMovieScript] = useState<MovieScript>({
    bookId: '',
    status: 'idle',
    scriptContent: '',
    scenes: [],
  });

  // Initialize Library
  useEffect(() => {
    const loadLibrary = async () => {
      setIsLoading(true);
      // Simulate async loading for realism
      await new Promise((resolve) => setTimeout(resolve, 500));
      const generatedBooks = generateLibrary();
      setLibrary(generatedBooks);
      setIsLoading(false);
    };

    loadLibrary();
  }, []);

  const selectBook = (bookId: string) => {
    const book = library.find((b) => b.id === bookId);
    if (book) {
      setCurrentBook(book);
      // Reset movie script when changing books
      if (movieScript.bookId !== bookId) {
        clearMovieScript();
      }
    }
  };

  const clearMovieScript = () => {
    setMovieScript({
      bookId: '',
      status: 'idle',
      scriptContent: '',
      scenes: [],
    });
  };

  const generateMovieScript = async (bookId: string) => {
    const book = library.find((b) => b.id === bookId);
    if (!book) return;

    setMovieScript({
      bookId,
      status: 'generating',
      scriptContent: '',
      scenes: [],
    });

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const scriptContent = `
TITLE: ${book.title.toUpperCase()} - THE MOVIE
AUTHOR: Based on the work of James The Architect

FADE IN:

INT. SERVER ROOM - DAY

JAMES (30s, sharp, focused) types rapidly. Screens surround him, displaying complex MERMAID GRAPHS of the new banking infrastructure.

JAMES
(To himself)
The latency is gone. The ethical protocols are holding.

Suddenly, a notification blinks. A mystery in the ledger.

JAMES
Curious. The numbers balance, but the timestamp is... impossible.

James leans in. The mystery begins.
    `;

    const scenes = [
      {
        sceneNumber: 1,
        description: "James discovers the anomaly in the AI Bank's core ledger.",
        dialogue: "James: 'Logic dictates a solution exists.'",
      },
      {
        sceneNumber: 2,
        description: "James visualizes the data flow using a holographic graph.",
        dialogue: "James: 'The path is clear now.'",
      },
      {
        sceneNumber: 3,
        description: "The system stabilizes as the mystery is resolved through code.",
        dialogue: "James: 'System secure. Integrity maintained.'",
      },
    ];

    setMovieScript({
      bookId,
      status: 'completed',
      scriptContent,
      scenes,
    });
  };

  const value: StoryContextType = {
    library,
    currentBook,
    movieScript,
    isLoading,
    selectBook,
    generateMovieScript,
    clearMovieScript,
  };

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
};