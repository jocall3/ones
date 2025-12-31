import { v4 as uuidv4 } from 'uuid';

export interface StoryPrompt {
    topic: string;
    genre: string;
    protagonist: string;
    tone: string;
}

export interface Chapter {
    id: string;
    title: string;
    summary: string;
    sequence: number;
}

export interface BookOutline {
    id: string;
    title: string;
    synopsis: string;
    chapters: Chapter[];
    authorStyle: string;
}

export interface GeneratedContent {
    text: string;
    mermaidGraph: string;
    movieScript: string;
}

/**
 * Mock service layer that simulates the API calls to a large language model 
 * for text generation. This service mimics the latency and structure of 
 * an LLM response without incurring actual API costs during development.
 */
export class AIStoryService {
    private readonly SIMULATED_LATENCY_MS = 1500;

    /**
     * Simulates generating a book outline based on the "James building an AI Bank" theme.
     * Returns a Dan Brown-esque mystery structure without violence.
     */
    public async generateBookOutline(prompt: StoryPrompt): Promise<BookOutline> {
        await this.simulateNetworkDelay();

        const titles = [
            "The Algorithmic Vault",
            "The Ledger of Secrets",
            "Digital Fortress: The Bank",
            "The Neural Currency",
            "Code of the Mint"
        ];

        const selectedTitle = titles[Math.floor(Math.random() * titles.length)];

        return {
            id: uuidv4(),
            title: selectedTitle,
            authorStyle: "Dan Brown (Mystery, No Violence)",
            synopsis: `In the high-stakes world of fintech, James discovers a hidden pattern within the global banking infrastructure. As he attempts to build the world's first truly sentient AI Bank, he uncovers a centuries-old financial riddle that could change the economy forever. It is a race against time to debug the ultimate code before the market opens.`,
            chapters: [
                {
                    id: uuidv4(),
                    title: "The Zero Balance",
                    summary: "James initializes the core kernel, but finds an anomaly in the genesis block.",
                    sequence: 1
                },
                {
                    id: uuidv4(),
                    title: "The Encrypted Lobby",
                    summary: "A mysterious investor approaches James with a key that fits no digital lock.",
                    sequence: 2
                },
                {
                    id: uuidv4(),
                    title: "The Infinite Loop",
                    summary: "The AI begins to trade on its own, revealing a hidden message in the transaction logs.",
                    sequence: 3
                },
                {
                    id: uuidv4(),
                    title: "The Final Transaction",
                    summary: "James must solve the riddle of the AI Bank to save the global financial system.",
                    sequence: 4
                }
            ]
        };
    }

    /**
     * Simulates generating the full text content, a mermaid graph, and a movie script
     * for a specific chapter.
     */
    public async generateChapterContent(chapterTitle: string, context: string): Promise<GeneratedContent> {
        await this.simulateNetworkDelay();

        return {
            text: this.getMockStoryText(chapterTitle),
            mermaidGraph: this.getMockMermaidGraph(chapterTitle),
            movieScript: this.getMockMovieScript(chapterTitle)
        };
    }

    private async simulateNetworkDelay(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, this.SIMULATED_LATENCY_MS));
    }

    private getMockStoryText(title: string): string {
        return `
        James stared at the glowing monitor. The cursor blinked—a rhythmic pulse that seemed to match his own heartbeat. 
        "${title}," he whispered. The code he had written for the AI Bank was supposed to be flawless, a perfect symphony of logic and finance. 
        Yet, the screen displayed a variable he hadn't declared: 'PROJECT_VITRUVIAN'.
        
        The air in the server room was cool, filtered, and smelled faintly of ozone. He adjusted his glasses. 
        This wasn't just a bug; it was a signature. Someone—or something—had been here before him. 
        He began to type furiously, his fingers dancing across the mechanical keyboard. 
        If he could trace the origin of the liquidity pool injection, he might understand why the AI was refusing to open the vault doors.
        
        "Access Denied," the system read. But James knew better. In the world of cryptography, a denial was just a challenge wrapped in a riddle.
        `;
    }

    private getMockMermaidGraph(title: string): string {
        // Returns a valid Mermaid.js graph definition related to banking/AI architecture
        return `
graph TD
    A[James] -->|Inputs Code| B(AI Core Terminal)
    B --> C{Authentication Check}
    C -->|Valid| D[Access Ledger]
    C -->|Invalid| E[Trigger Silent Alarm]
    D --> F[Decrypt Financial History]
    F --> G[Reveal Hidden Pattern]
    G --> H[${title}]
    style B fill:#f9f,stroke:#333,stroke-width:4px
    style H fill:#bbf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5 5
        `;
    }

    private getMockMovieScript(title: string): string {
        return `
SCENE: SERVER ROOM - NIGHT

The room is bathed in the blue glow of LED status lights. Rows of server racks hum with processing power.

JAMES (30s, sharp suit, intense focus) stands before the main terminal.

JAMES
(to himself)
It doesn't make sense. The math is perfect.

He types a command. The screen flashes red.

COMPUTER VOICE (V.O.)
Encryption protocol Alpha-One engaged.

James leans in closer to the screen.

JAMES
Alpha-One? That protocol hasn't been used since the 90s.

He pulls a thumb drive from his pocket. It's labeled "MASTER KEY".

JAMES
Let's see what you're hiding inside the ${title}.

He inserts the drive. The screen turns green. A progress bar appears.

CUT TO:

INT. BANK LOBBY - CONTINUOUS

The digital display boards showing stock prices suddenly freeze, then scramble to reveal a single word: "HELLO".
        `;
    }
}