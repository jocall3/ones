/**
 * @file src/utils/generators/bookTitleGenerator.ts
 * @purpose Algorithm to procedurally generate 1000 unique, mystery-themed titles related to banking and AI.
 * The titles are designed to evoke a sense of intellectual mystery, in the style of Dan Brown,
 * but without any violence, foul language, or disrespectful content. The core theme revolves
 * around the concept of "James built an AI bank".
 */

// --- Helper Functions ---

/**
 * Selects a random element from an array.
 * @param arr The array to pick from.
 * @returns A random element of type T.
 */
const getRandomElement = <T>(arr: T[]): T => {
  if (arr.length === 0) {
    throw new Error("Cannot get a random element from an empty array.");
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Converts a string to Title Case.
 * @param str The string to convert.
 * @returns The title-cased string.
 */
const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


// --- Word Banks ---

const adjectives = [
  'Silent', 'Forgotten', 'Hidden', 'Lost', 'Quantum', 'Digital', 'Golden',
  'Final', 'Unseen', 'Infinite', 'Broken', 'Sovereign', 'Virtual', 'Neural',
  'Encrypted', 'Decentralized', 'Immutable', 'Hollow', 'Phantom', 'Ethereal',
  'Binary', 'First', 'Last', 'Zero-Sum', 'Ascendant', 'Cognitive', 'Recursive',
  'Synthetic', 'Woven', 'Glass', 'Iron', 'Perfect', 'Seventh', 'Solitary'
];

const mysteryNouns = [
  'Enigma', 'Paradox', 'Secret', 'Legacy', 'Conundrum', 'Cipher', 'Key',
  'Shadow', 'Veil', 'Labyrinth', 'Gambit', 'Equation', 'Sequence', 'Pattern',
  'Riddle', 'Puzzle', 'Blueprint', 'Chronicle', 'Testament', 'Covenant',
  'Mandala', 'Symmetry', 'Resonance', 'Echo', 'Question', 'Clue'
];

const techNouns = [
  'Algorithm', 'Protocol', 'Matrix', 'Genesis', 'Oracle', 'Sentinel', 'Architect',
  'Node', 'Core', 'Network', 'System', 'Code', 'Singularity', 'Interface',
  'Processor', 'Chain', 'Mind', 'Cognition', 'Nexus', 'Spire', 'Engine', 'Weaver'
];

const financeNouns = [
  'Ledger', 'Vault', 'Currency', 'Transaction', 'Credit', 'Asset', 'Trust',
  'Standard', 'Reserve', 'Fortune', 'Balance', 'Account', 'Token', 'Coin',
  'Pact', 'Bond', 'Index', 'Sum', 'Principle', 'Inheritance'
];

const conceptNouns = [
  'Trust', 'Identity', 'Value', 'Time', 'Logic', 'Order', 'Truth', 'Proof',
  'Consensus', 'Equilibrium', 'Infinity', 'Memory', 'Reason', 'Purpose',
  'Choice', 'Future', 'Past', 'Sanctuary', 'Promise'
];

const gerunds = [
  'Decoding', 'Unlocking', 'Securing', 'Tracing', 'Balancing', 'Calculating',
  'Verifying', 'Forging', 'Architecting', 'Encrypting', 'Remembering',
  'Solving', 'Weaving', 'Chasing', 'Finding'
];

// Combined lists for broader templates
const allNouns = [...mysteryNouns, ...techNouns, ...financeNouns, ...conceptNouns];
const concreteNouns = [...techNouns, ...financeNouns];


// --- Title Templates ---

type TitleTemplate = () => string;

const templates: TitleTemplate[] = [
  () => `The ${getRandomElement(adjectives)} ${getRandomElement(allNouns)}`,
  () => `The ${getRandomElement(allNouns)}'s ${getRandomElement(mysteryNouns)}`,
  () => `${getRandomElement(gerunds)} the ${getRandomElement(concreteNouns)}`,
  () => `The ${getRandomElement(conceptNouns)} ${getRandomElement(mysteryNouns)}`,
  () => `The ${getRandomElement(techNouns)} Protocol`,
  () => `The ${getRandomElement(financeNouns)} of ${getRandomElement(conceptNouns)}`,
  () => `The ${getRandomElement(adjectives)} Gambit`,
  () => `The ${getRandomElement(mysteryNouns)} Code`,
  () => `${getRandomElement(conceptNouns)} and ${getRandomElement(conceptNouns)}`,
  () => `The Shadow of the ${getRandomElement(techNouns)}`,
  () => `The ${getRandomElement(mysteryNouns)}'s Key`,
  () => `A ${getRandomElement(adjectives)} ${getRandomElement(conceptNouns)}`,
  () => `The ${getRandomElement(techNouns)}'s Ledger`,
  () => `The ${getRandomElement(financeNouns)} Paradox`,
  () => `The ${getRandomElement(adjectives)} Equation`,
  () => `The ${getRandomElement(techNouns)} Enigma`,
  () => `The ${getRandomElement(conceptNouns)} Key`,
  () => `The ${getRandomElement(adjectives)} Inheritance`,
];


// --- Main Generator Function ---

/**
 * Generates a specified number of unique, mystery-themed book titles
 * related to AI and banking.
 *
 * @param count The number of unique titles to generate. Defaults to 1000.
 * @returns An array of unique book titles.
 */
export const generateBookTitles = (count: number = 1000): string[] => {
  const titles = new Set<string>();
  let attempts = 0;
  // Set a generous attempt limit to prevent potential infinite loops
  // if the word banks are too small for the requested count.
  const maxAttempts = count * 25;

  while (titles.size < count && attempts < maxAttempts) {
    const template = getRandomElement(templates);
    const title = titleCase(template());

    // Ensure concepts in "X and Y" are not the same word
    if (title.includes(' And ')) {
      const parts = title.split(' And ');
      if (parts[0] === parts[1]) {
        attempts++;
        continue; // Skip this attempt and try again
      }
    }

    titles.add(title);
    attempts++;
  }

  if (titles.size < count) {
    console.warn(
      `Could not generate the requested number of unique titles. ` +
      `Generated ${titles.size} of ${count}. ` +
      `Consider expanding the word banks or templates.`
    );
  }

  return Array.from(titles);
};