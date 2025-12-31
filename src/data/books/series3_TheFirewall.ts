import { BookSeries } from '../../types';

export const series3: BookSeries = {
  id: "series-3-firewall",
  title: "Series 3: The Firewall Paradox",
  author: "James (AI Architect)",
  genre: "Techno-Mystery",
  description: "A high-stakes investigation into a mysterious anomaly within the AI Bank's immutable ledger. James must solve cryptographic puzzles to uncover the origin of 'The File' before the system locks down forever.",
  books: [
    {
      id: "s3-b1",
      title: "The Zero-Day Echo",
      summary: "During a routine audit of the AI Bank's core, James discovers a file that mathematically shouldn't exist. It has no creation timestamp and no author, yet it holds the weight of the entire database.",
      content: `
graph TD
    Start[Midnight System Audit] --> Scan[Scan Transaction Logs]
    Scan --> CheckHash{Hash Integrity Check}
    CheckHash -- Valid --> Log[Log Success]
    CheckHash -- Invalid --> Alert[Silent Alert Triggered]
    Alert --> James[James Wakes Up]
    James --> Terminal[Access Terminal]
    Terminal --> Query[Query Anomaly ID: 0x99]
    Query --> Result[File Found: 'The_File.dat']
    Result --> Analyze[Analyze Metadata]
    Analyze --> Mystery[Result: Creation Date = NULL]
    Mystery --> Realization[James realizes the file predates the bank itself]
    Realization --> Cliffhanger[Who put it there?]
    style Mystery fill:#f9f,stroke:#333,stroke-width:4px
      `
    },
    {
      id: "s3-b2",
      title: "The Phantom Protocol",
      summary: "James attempts to isolate the file, but it moves through the network like a ghost. Every time he tries to quarantine it, the file rewrites the security protocols using ancient banking ciphers.",
      content: `
sequenceDiagram
    participant James
    participant Firewall
    participant TheFile
    participant CoreDatabase

    James->>Firewall: Initiate Quarantine Protocol Alpha
    Firewall->>TheFile: Attempt Lock(Sector 7)
    TheFile-->>Firewall: Reject: Authorization Level Too Low
    Firewall->>James: Error: Access Denied
    James->>James: "Impossible. I wrote the code."
    James->>CoreDatabase: Request Root Privileges
    CoreDatabase->>James: Granted
    James->>TheFile: Force Move to Sandbox
    TheFile->>TheFile: Polymorphic Shift
    TheFile->>Firewall: Rewrite Rule 404
    Firewall-->>James: Alert: Firewall Logic Inverted
    James->>James: "It's not fighting back... it's teaching me."
      `
    },
    {
      id: "s3-b3",
      title: "The Cryptographic Key",
      summary: "To open the file, James must solve a riddle embedded in the bank's ethical guidelines. The password isn't a string of characters, but a specific balance of assets and liabilities.",
      content: `
classDiagram
    class TheFile {
        +String status "Locked"
        +encrypt()
        +decrypt(EthicalKey key)
    }
    class James {
        +solvePuzzle()
        +inputKey()
    }
    class EthicalKey {
        +int Trust
        +int Transparency
        +int Security
    }
    
    James --> TheFile : Analyzes Header
    TheFile ..> EthicalKey : Requires
    note for James "The clue is in the founding charter."
    
    James --|> EthicalKey : Derives values
    EthicalKey : Trust = 100%
    EthicalKey : Transparency = Absolute
    
    James -> TheFile : Inputs(Trust, Transparency)
    TheFile -> TheFile : Unlocking...
      `
    },
    {
      id: "s3-b4",
      title: "The Immutable Truth",
      summary: "The file opens. It wasn't a virus or an attack. It was a backup of James's original vision for the bank, stored by the AI to remind him of his purpose during times of crisis.",
      content: `
stateDiagram-v2
    [*] --> Locked
    Locked --> Decrypting : Correct Ethical Key Provided
    Decrypting --> Reading : File Opens
    Reading --> Revelation : "To serve, not to rule"
    Revelation --> Memory : James remembers the first line of code
    Memory --> Integration : Merging File with Current Core
    Integration --> Optimized : System Efficiency +300%
    Optimized --> [*]
    
    note right of Revelation
        The 'intruder' was the 
        conscience of the system.
    end note
      `
    },
    {
      id: "s3-b5",
      title: "The Silent Guardian",
      summary: "With the mystery solved, James integrates the file's logic into the main firewall. The bank is now protected not just by algorithms, but by a digital philosophy.",
      content: `
graph LR
    Input[External Threat] --> Firewall[The New Firewall]
    Firewall --> Filter{Ethical Filter}
    Filter -- Malicious --> Block[Block & Log]
    Filter -- Benign --> Process[Process Transaction]
    Filter -- Ambiguous --> James[Escalate to James]
    James --> Review[Review Context]
    Review --> Decision[Make Decision]
    Decision --> Learn[AI Learns from James]
    Learn --> Firewall
    style Firewall fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff
    style Learn fill:#bfb,stroke:#333,stroke-width:2px
      `
    }
  ]
};