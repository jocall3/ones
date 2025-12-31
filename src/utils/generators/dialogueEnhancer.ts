import { randomBytes } from 'crypto';

/**
 * Configuration options for the dialogue enhancement process.
 */
export interface EnhancementOptions {
    tone?: 'mysterious' | 'analytical' | 'urgent' | 'revelatory';
    speakerIntelligenceLevel?: 'high' | 'genius' | 'ai';
    addDramaticPauses?: boolean;
}

/**
 * A utility class designed to refine generated dialogue.
 * It ensures the text sounds intelligent, mysterious (Dan Brown style),
 * and strictly adheres to safety guidelines (no foul language, violence, or disrespect).
 */
export class DialogueEnhancer {
    
    // A dictionary mapping common words to more intellectual or technical synonyms
    // suitable for an AI/Banking thriller context.
    private static readonly VOCABULARY_MAP: Record<string, string[]> = {
        'think': ['hypothesize', 'calculate', 'deduce', 'extrapolate', 'theorize'],
        'look': ['observe', 'analyze', 'scrutinize', 'examine', 'monitor'],
        'problem': ['anomaly', 'discrepancy', 'variable', 'latency', 'divergence'],
        'secret': ['encrypted', 'classified', 'obscured', 'encoded', 'proprietary'],
        'money': ['capital', 'liquidity', 'assets', 'valuation', 'currency flow'],
        'bank': ['financial fortress', 'ledger', 'reserve', 'institution', 'vault'],
        'computer': ['mainframe', 'neural net', 'processor', 'terminal', 'node'],
        'fast': ['accelerated', 'optimized', 'expedited', 'high-frequency'],
        'weird': ['irregular', 'unprecedented', 'deviant', 'asymmetrical'],
        'check': ['verify', 'audit', 'validate', 'authenticate'],
        'stop': ['halt', 'terminate', 'suspend', 'abort'],
        'change': ['mutate', 'evolve', 'transform', 'shift paradigm'],
        'big': ['substantial', 'massive', 'exponential', 'critical'],
        'bad': ['suboptimal', 'compromised', 'corrupted', 'adverse'],
    };

    // Regex patterns to identify and sanitize foul language or disrespectful terms.
    // This is a heuristic list to ensure safety constraints.
    private static readonly SAFETY_PATTERNS: RegExp[] = [
        /\b(damn|hell|stupid|idiot|shut up|kill|murder|death|die|blood|gun|shoot)\b/gi,
        /\b(hate|ugly|fat|dumb|crazy|insane)\b/gi
    ];

    // Phrases to inject mystery and suspense (Dan Brown style).
    private static readonly MYSTERY_PREFIXES: string[] = [
        "If the calculations are correct,",
        "Against all probability,",
        "Look closer at the metadata.",
        "The pattern is unmistakable.",
        "James knew the risks, but...",
        "It wasn't just code; it was consciousness.",
        "The ledger doesn't lie.",
    ];

    /**
     * Main entry point to enhance a raw dialogue string.
     * @param rawText The original dialogue text.
     * @param options Configuration for the enhancement.
     * @returns The refined, safe, and stylized dialogue.
     */
    public static refine(rawText: string, options: EnhancementOptions = {}): string {
        if (!rawText || rawText.trim().length === 0) {
            return "";
        }

        let processedText = rawText;

        // Step 1: Strict Safety Sanitization
        processedText = this.sanitize(processedText);

        // Step 2: Vocabulary Elevation
        processedText = this.elevateVocabulary(processedText);

        // Step 3: Stylistic Formatting (Mystery & Pacing)
        processedText = this.applyDanBrownStyle(processedText, options);

        return processedText;
    }

    /**
     * Removes or replaces unsafe content to ensure no violence or foul language.
     */
    private static sanitize(text: string): string {
        let cleanText = text;
        
        this.SAFETY_PATTERNS.forEach(pattern => {
            cleanText = cleanText.replace(pattern, (match) => {
                // Replace with neutral, safe alternatives based on context length
                if (match.length <= 4) return "void";
                return "error";
            });
        });

        return cleanText;
    }

    /**
     * Replaces common words with more sophisticated synonyms to sound "intelligent".
     */
    private static elevateVocabulary(text: string): string {
        const words = text.split(/\b/);
        
        const elevatedWords = words.map(word => {
            const lowerWord = word.toLowerCase();
            if (this.VOCABULARY_MAP[lowerWord]) {
                const synonyms = this.VOCABULARY_MAP[lowerWord];
                // Deterministic selection based on word length to avoid total randomness in testing
                const index = word.length % synonyms.length;
                
                // Preserve capitalization
                const replacement = synonyms[index];
                if (word[0] === word[0].toUpperCase()) {
                    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
                }
                return replacement;
            }
            return word;
        });

        return elevatedWords.join('');
    }

    /**
     * Applies stylistic changes to mimic a mystery thriller.
     * Adds ellipses, rhetorical questions, and dramatic pacing.
     */
    private static applyDanBrownStyle(text: string, options: EnhancementOptions): string {
        let styledText = text.trim();

        // 1. Add dramatic pauses (ellipses)
        if (options.addDramaticPauses || Math.random() > 0.5) {
            styledText = styledText.replace(/, /g, " ... ");
        }

        // 2. Ensure sentences end with impact
        if (!styledText.endsWith('.') && !styledText.endsWith('?') && !styledText.endsWith('!')) {
            styledText += ".";
        }

        // 3. Occasionally prepend a mysterious hook if the text is short
        if (styledText.length < 50 && Math.random() > 0.7) {
            const prefix = this.MYSTERY_PREFIXES[Math.floor(Math.random() * this.MYSTERY_PREFIXES.length)];
            styledText = `${prefix} ${styledText}`;
        }

        // 4. Reference "The System" or "James" to tie into the specific plot
        if (options.tone === 'mysterious' && !styledText.includes('James')) {
            // Heuristic injection of plot relevance
            if (styledText.includes('bank') || styledText.includes('vault')) {
                styledText += " Just as James predicted.";
            }
        }

        return styledText;
    }

    /**
     * Generates a cryptic, intelligent monologue for James regarding the AI Bank.
     * Useful for generating filler text or intros.
     */
    public static generateJamesMonologue(): string {
        const templates = [
            "The traditional banking system is a relic. We aren't just building a vault; we are architecting a new form of trust based on pure logic.",
            "They see numbers. I see the architecture of the future. The AI doesn't just store value; it understands it.",
            "Every transaction is a whisper in a storm. My algorithm hears them all.",
            "Security isn't about walls. It's about knowing the intruder's intent before they do."
        ];
        
        const selected = templates[Math.floor(Math.random() * templates.length)];
        return this.refine(selected, { tone: 'mysterious', speakerIntelligenceLevel: 'genius' });
    }

    /**
     * Validates if a piece of dialogue meets the strict "No Disrespect" policy.
     */
    public static validatePoliteness(text: string): boolean {
        const disrespectfulTerms = ['stupid', 'idiot', 'shut up', 'useless', 'fool'];
        const lower = text.toLowerCase();
        return !disrespectfulTerms.some(term => lower.includes(term));
    }
}