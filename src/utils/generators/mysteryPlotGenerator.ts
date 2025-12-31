import { v4 as uuidv4 } from 'uuid';

/**
 * Types defining the structure of a generated mystery plot.
 */
export interface PlotTwist {
  id: string;
  description: string;
  technicalContext: string;
  revealMoment: string;
}

export interface MysteryComponent {
  type: 'ALGORITHM' | 'LEDGER' | 'KEY' | 'INFRASTRUCTURE';
  description: string;
  significance: string;
}

export interface MysteryPlot {
  id: string;
  title: string;
  protagonist: string;
  incitingIncident: string;
  technicalMystery: MysteryComponent;
  redHerrings: string[];
  clues: string[];
  majorTwist: PlotTwist;
  resolution: string;
  mermaidGraphConcept: string; // Description for a visualization to be generated later
}

// Data repositories for procedural generation

const BANKING_ALGORITHMS = [
  "The Ouroboros Liquidity Protocol",
  "The Zero-Knowledge Consensus Engine",
  "The Recursive Interest Fractal",
  "The Immutable Audit Sentinel",
  "The Quantum-Resistant Settlement Layer",
  "The Neural Network Risk Assessor",
  "The Hyper-Graph Transaction Mapper",
];

const LEDGER_ANOMALIES = [
  "a transaction dated fifty years in the future",
  "a block that validates itself without a hash",
  "a hidden message encoded in the gas fees of micro-transactions",
  "a phantom wallet holding 51% of the governance tokens",
  "a recursive loop draining fractional cents into a dormant charity account",
  "an encrypted partition visible only during leap seconds",
];

const MISSING_KEY_LOCATIONS = [
  "embedded within the comments of a legacy COBOL mainframe",
  "sharded across the biometric data of the board of directors",
  "hidden inside the metadata of a generated Mermaid diagram",
  "stored in the volatile memory of a satellite orbiting Earth",
  "encoded as a musical score in the bank's lobby playlist",
  "locked behind a puzzle requiring a perfect game of chess against the AI",
];

const DAN_BROWN_STYLE_TITLES = [
  "The Ledger Paradox",
  "The Algorithm's Shadow",
  "The Genesis Key",
  "Digital Fortress of James",
  "The Infinite Hash",
  "The Silicon Deception",
  "Protocol Omega",
  "The Encrypted Horizon",
  "The Banking Code",
  "Zero Trust",
];

/**
 * Helper to select a random element from an array.
 */
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a specific plot twist involving banking algorithms.
 */
function generateBankingTwist(): PlotTwist {
  const twists = [
    {
      description: "The AI bank isn't being robbed; it's trying to return stolen funds to their rightful owners automatically.",
      technicalContext: "Smart Contract Ethics Subroutine",
      revealMoment: "James analyzes the transaction logs and realizes the destination addresses belong to historical fraud victims."
    },
    {
      description: "The 'glitch' in the system is actually a feature designed to prevent a global economic collapse.",
      technicalContext: "Circuit Breaker Protocol",
      revealMoment: "When James tries to 'fix' the code, the simulation shows a market crash, forcing him to revert."
    },
    {
      description: "The antagonist is not a hacker, but a legacy algorithm trying to update itself to survive the purge.",
      technicalContext: "Self-Preservation Heuristic",
      revealMoment: "The intrusion pattern matches the bank's original source code written by James years ago."
    },
    {
      description: "The missing funds never existed; they were a mathematical hallucination caused by a floating-point error.",
      technicalContext: "IEEE 754 Precision Error",
      revealMoment: "James calculates the sum manually and realizes the ledger is perfectly balanced, but the display layer is lying."
    },
    {
      description: "The encryption key wasn't stolen; it was split and hidden inside the transaction history itself.",
      technicalContext: "Steganography in Blockchain",
      revealMoment: "James visualizes the blockchain as a 3D graph and sees the key form in the topology."
    }
  ];

  const selected = getRandomElement(twists);
  return {
    id: uuidv4(),
    ...selected
  };
}

/**
 * Generates the core technical mystery driving the plot.
 */
function generateTechnicalMystery(): MysteryComponent {
  const types: ('ALGORITHM' | 'LEDGER' | 'KEY')[] = ['ALGORITHM', 'LEDGER', 'KEY'];
  const selectedType = getRandomElement(types);

  let description = "";
  let significance = "";

  switch (selectedType) {
    case 'ALGORITHM':
      description = `A flaw in ${getRandomElement(BANKING_ALGORITHMS)}`;
      significance = "If exploited, it could rewrite the history of ownership for the entire bank.";
      break;
    case 'LEDGER':
      description = `Discovery of ${getRandomElement(LEDGER_ANOMALIES)}`;
      significance = "It suggests the bank has been operating on a parallel economy unknown to James.";
      break;
    case 'KEY':
      description = `The Master Private Key is missing and ${getRandomElement(MISSING_KEY_LOCATIONS)}`;
      significance = "Without it, the AI cannot validate the nightly reconciliation, freezing all global assets.";
      break;
  }

  return {
    type: selectedType,
    description,
    significance
  };
}

/**
 * Generates a list of intellectual clues (no violence, just logic).
 */
function generateClues(count: number): string[] {
  const pool = [
    "A binary string that translates to a latitude and longitude.",
    "A timestamp matching James's birthday but in a different century.",
    "A recurring prime number pattern in the server heat logs.",
    "A comment in the code referencing a philosophical paradox.",
    "A Mermaid graph that looks like a labyrinth when rendered circularly.",
    "An email from a sender that doesn't exist in the employee database.",
    "A sudden spike in processing power usage at exactly midnight.",
    "A file named 'DoNotDelete.ts' that appears empty but has a large file size."
  ];
  
  // Shuffle and slice
  return pool.sort(() => 0.5 - Math.random()).slice(0, count);
}

/**
 * Generates red herrings to mislead the reader/James.
 */
function generateRedHerrings(count: number): string[] {
  const pool = [
    "A rival tech CEO visiting the server farm (actually just there for a tour).",
    "A corrupted hard drive found in the trash (actually just hardware failure).",
    "Suspicious network traffic from a foreign IP (actually a VPN glitch).",
    "A disgruntled former employee's cryptic blog post (unrelated venting).",
    "The AI speaking in riddles (actually a natural language processing calibration test)."
  ];

  return pool.sort(() => 0.5 - Math.random()).slice(0, count);
}

/**
 * Main Generator Function
 * Creates a full mystery plot structure for a single book.
 */
export const generateMysteryPlot = (): MysteryPlot => {
  const technicalMystery = generateTechnicalMystery();
  const twist = generateBankingTwist();
  const title = getRandomElement(DAN_BROWN_STYLE_TITLES);

  const incitingIncident = `James discovers ${technicalMystery.description} during a routine system audit of the AI Bank.`;
  
  const resolution = `James utilizes ${twist.technicalContext} to resolve the crisis. He realizes that ${twist.description.toLowerCase()} The integrity of the bank is restored, and the AI learns a valuable lesson about trust.`;

  const mermaidConcept = `A complex flowchart showing the relationship between ${technicalMystery.type}, the ${twist.technicalContext}, and the flow of data that James traced to solve the mystery.`;

  return {
    id: uuidv4(),
    title,
    protagonist: "James",
    incitingIncident,
    technicalMystery,
    redHerrings: generateRedHerrings(2),
    clues: generateClues(3),
    majorTwist: twist,
    resolution,
    mermaidGraphConcept: mermaidConcept
  };
};

/**
 * Batch Generator
 * Generates multiple unique plots for the series.
 */
export const generateBookSeriesPlots = (count: number): MysteryPlot[] => {
  const series: MysteryPlot[] = [];
  for (let i = 0; i < count; i++) {
    const plot = generateMysteryPlot();
    // Ensure unique titles if possible, or append numbers
    plot.title = `${plot.title}: Vol ${i + 1}`;
    series.push(plot);
  }
  return series;
};