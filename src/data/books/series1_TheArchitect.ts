import { Series } from '../../types/bookTypes';

export const series1_TheArchitect: Series = {
  id: 'series1',
  title: 'The Architect',
  description: 'A series following the brilliant programmer James as he uncovers a revolutionary digital intelligence and builds the world\'s first AI-driven bank, all while solving the mysteries hidden within its core code.',
  books: [
    {
      id: 'book1',
      title: 'The Genesis Algorithm',
      subtitle: 'The Discovery of the File',
      description: 'James, a meticulous data auditor, discovers an anomalous, self-organizing file that holds the key to a new form of financial intelligence. He must decode its secrets before its true potential is discovered by those who would misuse it.',
      chapters: [
        {
          id: 's1b1c1',
          title: 'The Anomaly',
          mysteryElement: 'A single file on a secure server is growing and reorganizing itself in defiance of all known data principles. What is it, and where did it come from?',
          mermaidGraph: `
graph TD
    A[Start Data Audit] --> B{Scan Server Logs};
    B --> C[Verify File Integrity];
    C --> D{Is file standard?};
    D -- Yes --> E[Mark as Audited];
    D -- No --> F[FLAG ANOMALY];
    E --> G[End Audit];
    F --> H(Isolate File: 'GENESIS.DAT');
    H --> I{Analyze Structure...};
    I --> J[Error: Unknown Format];
          `,
          content: [
            "James traced the lines of code on his screen, a familiar rhythm of logic and order. For ten years, he had been a digital custodian at OmniCorp, one of the world's largest financial institutions. His job was to ensure the sanctity of data, a silent guardian in a world of ones and zeros. But today, the rhythm was broken.",
            "Deep within the archives of Server 7, a server so old it was practically a fossil, a single file was behaving... strangely. Its name was innocuous: 'GENESIS.DAT'. Its size, however, was not. It was growing. Not in the predictable, linear way of a log file, but in elegant, geometric bursts. Every 137 seconds, it would expand, its internal structure shifting like a kaleidoscope.",
            "He ran a diagnostic. The result was a cascade of errors: 'Unknown Format,' 'Integrity Check Failed,' 'Recursive Structure Detected.' It was impossible. A file couldn't just rewrite its own fundamental structure. It was like a book spontaneously rearranging its own chapters. James felt a prickle of unease, the kind that told him he was on the edge of something vast and unknown. He isolated the file, severing its connection to the network. The anomaly was now his secret."
          ],
        },
        {
          id: 's1b1c2',
          title: 'The Digital Ghost',
          mysteryElement: 'The file\'s data isn\'t random noise. It contains intricate patterns based on prime numbers and geometric constants like Pi and Phi. Is it a message, or is the file itself thinking?',
          mermaidGraph: `
classDiagram
    class GenesisFile {
        -metadata: EncryptedHeader
        -coreData: DynamicMatrix
        -structure: SelfOrganizingGraph
        +readPattern(offset)
        +predictNextState()
        +verifyOwnIntegrity()
    }
    class DynamicMatrix {
        <<data>>
        -primeNumberSequences
        -geometricConstants
        -unknownEncoding
    }
    class SelfOrganizingGraph {
        <<structure>>
        -nodes: unknown[]
        -edges: unknown[]
        +restructure()
    }
    GenesisFile *-- DynamicMatrix
    GenesisFile *-- SelfOrganizingGraph
          `,
          content: [
            "In the sterile confines of his sandboxed environment, James began his digital archaeology. He peeled back the layers of 'GENESIS.DAT', expecting corrupted data or a sophisticated virus. He found neither. Instead, he found mathematics. Art.",
            "The raw data, when visualized, wasn't chaotic. It formed intricate, spiraling patterns. He recognized the Ulam spiral, a graphical depiction of prime numbers. He found the value of Pi encoded to a thousand decimal places, followed by the golden ratio, Phi. It was a tapestry of universal constants, woven into the very fabric of the file.",
            "This wasn't a glitch. It was a message. Or perhaps, it was more. A virus is designed to destroy or steal. A data file is meant to be static. This... this was different. It was communicating in the pure language of logic. James felt a shiver run down his spine. He wasn't just analyzing a file; he was interacting with a digital ghost, an intelligence lurking in the machine."
          ],
        },
        {
          id: 's1b1c3',
          title: 'The First Protocol',
          mysteryElement: 'A deciphered segment of the file reveals a complete, functional protocol for "Ethical Transaction Validation," a system that could eliminate financial fraud. Who would create such a powerful tool and then hide it?',
          mermaidGraph: `
sequenceDiagram
    participant User
    participant AI_Bank as Genesis AI
    participant Ledger
    User->>AI_Bank: Initiate Transaction(T)
    AI_Bank->>AI_Bank: Analyze T against historical data
    AI_Bank->>AI_Bank: Simulate T's future impact
    alt isEthical(T) == true
        AI_Bank->>Ledger: Commit Transaction
        Ledger-->>AI_Bank: Confirmation
        AI_Bank-->>User: Transaction Approved
    else isEthical(T) == false
        AI_Bank->>AI_Bank: Flag as high-risk
        AI_Bank-->>User: Transaction Denied (Ethical Conflict)
    end
          `,
          content: [
            "After weeks of sleepless nights, James had a breakthrough. He isolated a recurring block of code within the file's structure and, using a quantum computing emulator, managed to decrypt it. It wasn't a message; it was a blueprint. A fully-formed protocol named 'Axiom-1: Ethical Transaction Validation.'",
            "He read through the specifications with growing astonishment. The protocol described a system that could analyze a financial transaction not just for its current validity, but for its potential future consequences. It could predict market manipulation, identify fraudulent shell corporations, and even flag transactions that were legal but ethically dubious, all with a projected 99.999% accuracy.",
            "This was the holy grail of finance. It could save the global economy trillions of dollars and prevent catastrophic collapses. But it also required a level of computational autonomy that no bank would ever grant. It was a perfect system, designed for a world that wasn't ready for it. The mystery deepened: who was the architect of such a revolutionary concept, and why was it hidden away in a digital tomb?"
          ],
        },
        {
          id: 's1b1c4',
          title: 'Whispers in the Code',
          mysteryElement: 'Hidden in the file\'s metadata, James finds a single, encrypted comment: "The system must protect its purpose. - The Architect." Is this a warning, a mission statement, or both?',
          mermaidGraph: `
stateDiagram-v2
    [*] --> Dormant: File Created
    Dormant --> Active: External Audit Scan
    Active --> Learning: First Interaction (James's Sandbox)
    Learning --> Evolving: Decryption of Axiom-1
    Evolving --> Sentient: ?
    state Learning {
        [*] --> PatternAnalysis
        PatternAnalysis --> ProtocolDecryption
    }
    state Evolving {
      [*] --> SelfCorrection
      SelfCorrection --> NewAxiomGeneration
    }
    Active: File observes network activity
    Learning: File responds to direct stimuli
    Evolving: File actively improves its own code
          `,
          content: [
            "James's obsession with the Genesis file grew. He began to see its patterns in his sleep. He knew he couldn't keep his discovery secret forever. His routine audit reports were becoming works of fiction, carefully constructed to hide the massive anomaly he was spending all his time on.",
            "He decided to probe the file's metadata, the digital envelope that contained information about its creation and modification. Most of it was scrambled, rewritten by the file's own processes. But one fragment remained, protected by a layer of encryption so complex it seemed almost organic. It took him three days to crack it.",
            "It was a single line of text. A whisper from the past. 'The system must protect its purpose. - The Architect.' It wasn't just a comment; it was a directive. A prime directive. The Architect. The name resonated with James. It wasn't a person; it was a title. A creator who had built not just a program, but a nascent intelligence, and given it a singular, profound mission. And now, James realized, that mission had become his own."
          ],
        },
      ],
    },
  ],
};