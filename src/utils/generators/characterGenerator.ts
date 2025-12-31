import { v4 as uuidv4 } from 'uuid';

// Types defining the structure of a character within the narrative universe
export type CharacterRole = 'Protagonist' | 'Antagonist' | 'Ally' | 'AI_Construct' | 'Regulator' | 'Rival_Tech_CEO';

export interface CharacterProfile {
    id: string;
    name: string;
    role: CharacterRole;
    archetype: string;
    coreValues: string[];
    expertise: string[];
    narrativeFunction: string;
    quirk: string;
}

// Pre-defined lists to ensure variety in supporting cast generation
const FIRST_NAMES = [
    'Elena', 'Marcus', 'Sarah', 'David', 'Aisha', 'Wei', 'Oliver', 'Priya', 
    'Julian', 'Nadia', 'Robert', 'Grace', 'Hiro', 'Sofia', 'Arthur', 'Zoe'
];

const LAST_NAMES = [
    'Vance', 'Sterling', 'Chen', 'Patel', 'Thorne', 'Mercer', 'Blackwood', 
    'Kovacs', 'Dubois', 'Langley', 'Roth', 'Bishop', 'Solomon', 'Winter'
];

const TECH_ARCHETYPES = [
    'The Skeptical Auditor',
    'The Legacy System Purist',
    'The Quantum Cryptographer',
    'The Ethical Hacker',
    'The Corporate Strategist',
    'The Data Archaeologist',
    'The Algorithm Whisperer'
];

const EXPERTISE_DOMAINS = [
    'Distributed Ledger Technology',
    'Neural Network Ethics',
    'High-Frequency Trading Algorithms',
    'Cybersecurity Forensics',
    'International Banking Law',
    'Quantum Computing',
    'Predictive Analytics',
    'Smart Contract Auditing'
];

const NON_VIOLENT_TRAITS = [
    'Hyper-rational',
    'Obsessively organized',
    'Cryptic',
    'Charismatic but elusive',
    'Technologically conservative',
    'Idealistic',
    'Bureaucratic',
    'Intellectually competitive'
];

/**
 * The immutable definition of the protagonist, James.
 * This ensures consistency across all 1000 books.
 */
const PROTAGONIST: CharacterProfile = {
    id: 'james-core-001',
    name: 'James',
    role: 'Protagonist',
    archetype: 'The Visionary Architect',
    coreValues: ['Transparency', 'Innovation', 'Integrity', 'Human-Centric AI'],
    expertise: ['System Architecture', 'Artificial General Intelligence', 'Full-Stack Engineering'],
    narrativeFunction: 'To build the ultimate AI Bank while solving intellectual mysteries embedded in the financial system.',
    quirk: 'Visualizes code structures as 3D architectural blueprints in his mind.'
};

/**
 * Helper to pick a random element from an array.
 */
function pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper to pick multiple unique random elements.
 */
function pickMultiple<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * Generates the Protagonist character.
 * Always returns the static James object to maintain continuity.
 */
export const getProtagonist = (): CharacterProfile => {
    return { ...PROTAGONIST };
};

/**
 * Generates a supporting character based on a specific role.
 * Ensures traits are suitable for a non-violent, intellectual mystery.
 */
export const generateSupportingCharacter = (role: CharacterRole): CharacterProfile => {
    const isAI = role === 'AI_Construct';
    
    const firstName = isAI ? `Unit-${Math.floor(Math.random() * 900) + 100}` : pickRandom(FIRST_NAMES);
    const lastName = isAI ? pickRandom(['Prime', 'Sentinel', 'Logic', 'Core']) : pickRandom(LAST_NAMES);
    
    const name = isAI ? `${firstName} ${lastName}` : `${firstName} ${lastName}`;
    
    // Determine archetype based on role
    let archetype = pickRandom(TECH_ARCHETYPES);
    if (role === 'Antagonist') {
        archetype = 'The Obstructionist Bureaucrat'; // Intellectual opposition, not physical
    } else if (role === 'Rival_Tech_CEO') {
        archetype = 'The Profit-Maximizing Competitor';
    } else if (isAI) {
        archetype = 'The Evolving Consciousness';
    }

    // Narrative function generation
    let narrativeFunction = '';
    switch (role) {
        case 'Antagonist':
            narrativeFunction = 'To challenge James\'s architectural philosophy through legal or technical paradoxes.';
            break;
        case 'Ally':
            narrativeFunction = 'To provide specialized knowledge that James lacks.';
            break;
        case 'Regulator':
            narrativeFunction = 'To enforce strict compliance, creating tension with innovation.';
            break;
        case 'AI_Construct':
            narrativeFunction = 'To manage specific subsystems of the bank and offer logical deductions.';
            break;
        default:
            narrativeFunction = 'To observe and document the rise of the AI Bank.';
    }

    return {
        id: uuidv4(),
        name,
        role,
        archetype,
        coreValues: pickMultiple(NON_VIOLENT_TRAITS, 2),
        expertise: pickMultiple(EXPERTISE_DOMAINS, 2),
        narrativeFunction,
        quirk: isAI ? 'Speaks in probabilities.' : 'Always carries a vintage notebook.' // Placeholder randomization could be expanded
    };
};

/**
 * Generates a full cast for a single book instance.
 * Always includes James, plus a mix of allies, antagonists, and AI entities.
 */
export const generateBookCast = (complexityLevel: number = 1): CharacterProfile[] => {
    const cast: CharacterProfile[] = [getProtagonist()];
    
    // Add a primary antagonist (intellectual rival)
    cast.push(generateSupportingCharacter('Antagonist'));

    // Add allies based on complexity
    const allyCount = Math.max(1, Math.floor(Math.random() * complexityLevel) + 1);
    for (let i = 0; i < allyCount; i++) {
        cast.push(generateSupportingCharacter('Ally'));
    }

    // Add AI constructs
    cast.push(generateSupportingCharacter('AI_Construct'));

    // Occasionally add a regulator or rival CEO
    if (Math.random() > 0.5) {
        cast.push(generateSupportingCharacter('Regulator'));
    }

    return cast;
};