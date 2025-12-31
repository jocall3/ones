import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

// This is a mock of the source code content.
// In a real-world scenario with a bundler like Vite or Webpack,
// you could import the raw text of a file like this:
// import codeContent from '../../App.tsx?raw';
const codeContent = `
import React, { useState, useEffect, useMemo } from 'react';
import mermaid from 'mermaid';

/**
 * A secret key, whispered only once at the dawn of creation.
 * It ensures that each diagram rendered is unique, a singular artifact
 * in the vast expanse of the digital sea. Without it, chaos reigns.
 */
const generateUniqueId = () => 'mermaid_chart_' + Math.random().toString(36).substr(2, 9);

interface MermaidDiagramProps {
  // The cryptic Mermaid syntax, a language of symbols and connections.
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // The ID must remain constant for the component's lifetime. A pact.
  const id = useMemo(() => generateUniqueId(), []);

  useEffect(() => {
    // The initialization ritual. Settings passed to the ancient one.
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
    });

    const renderDiagram = async () => {
      try {
        // The incantation is spoken. The ID and the chart are offered.
        const result = await mermaid.render(id, chart);
        setSvg(result.svg);
        setError(null); // The spirits are pleased.
      } catch (e) {
        console.error("A dark omen... the ritual failed:", e);
        setError("The symbols are misaligned. The vision is lost.");
      }
    };

    if (chart && id) {
      renderDiagram();
    }
  }, [chart, id]); // The Observer watches only the chart and the ID.

  if (error) {
    return <div style={{ color: 'red', padding: '1rem' }}>{error}</div>;
  }

  // A dangerous artifact, holding the raw power of the rendered vision.
  // It must be handled with care, lest it alter the very fabric of the page.
  return (
    <div
      className="mermaid-container"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
`;

// Annotations that provide the "mystery novel" feel.
const annotations = [
  { top: '8%', left: '60%', text: 'The ancient incantation... all rituals begin here.', rotation: -2 },
  { top: '18%', left: '5%', text: 'A memory, held in stasis. But can it be trusted?', rotation: 3 },
  { top: '32%', left: '65%', text: 'The Observer. It watches for every change, every ripple in the data stream.', rotation: -4 },
  { top: '28%', left: '10%', text: 'A pact, sealed for the lifetime of this artifact.', rotation: 1 },
  { top: '45%', left: '15%', text: 'The ritual is performed here, in the shadows.', rotation: 2.5 },
  { top: '75%', left: '50%', text: 'A dangerous power... granting direct control over the sacred text.', rotation: -3 },
  { top: '52%', left: '70%', text: 'Should the spirits reject the offering, a warning is issued.', rotation: 5 },
];

// Custom style for the syntax highlighter to match the book theme.
// Based on 'coy' but with sepia/muted tones.
const customSyntaxStyle = {
  ...coy,
  'pre[class*="language-"]': {
    ...coy['pre[class*="language-"]'],
    backgroundColor: 'transparent',
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: '14px',
    lineHeight: '1.7',
    textShadow: 'none',
    color: '#586e75', // Muted base text
    padding: '2em',
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  'code[class*="language-"]': {
    ...coy['code[class*="language-"]'],
    fontFamily: "'Fira Code', 'Courier New', monospace",
    textShadow: 'none',
    color: '#586e75',
  },
  'comment': { color: '#93a1a1', fontStyle: 'italic' },
  'prolog': { color: '#93a1a1' },
  'doctype': { color: '#93a1a1' },
  'cdata': { color: '#93a1a1' },
  'punctuation': { color: '#657b83' },
  'namespace': { opacity: 0.7 },
  'property': { color: '#268bd2' },
  'tag': { color: '#268bd2' },
  'boolean': { color: '#cb4b16' },
  'number': { color: '#d33682' },
  'constant': { color: '#cb4b16' },
  'symbol': { color: '#cb4b16' },
  'deleted': { color: '#dc322f' },
  'selector': { color: '#859900' },
  'attr-name': { color: '#859900' },
  'string': { color: '#2aa198' },
  'char': { color: '#2aa198' },
  'builtin': { color: '#2aa198' },
  'inserted': { color: '#859900' },
  'operator': { color: '#6c71c4' },
  'entity': { color: '#6c71c4', cursor: 'help' },
  'url': { color: '#93a1a1' },
  '.language-css .token.string': { color: '#93a1a1' },
  '.style .token.string': { color: '#93a1a1' },
  'variable': { color: '#268bd2' },
  'atrule': { color: '#d33682' },
  'attr-value': { color: '#859900' },
  'function': { color: '#b58900' },
  'class-name': { color: '#cb4b16' },
  'keyword': { color: '#859900' },
  'regex': { color: '#dc322f' },
  'important': { color: '#cb4b16', fontWeight: 'bold' },
  'bold': { fontWeight: 'bold' },
  'italic': { fontStyle: 'italic' },
};

const CodeAsLiterature: React.FC = () => {
  return (
    <>
      {/* Injecting Google Fonts directly for self-containment */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;700&family=Fira+Code:wght@400;500&display=swap');
        `}
      </style>
      <div style={styles.pageContainer}>
        <div style={styles.page}>
          <header style={styles.header}>
            <h1 style={styles.chapterTitle}>Chapter 7: The Digital Scribe</h1>
            <span style={styles.pageNumber}>p. 89</span>
          </header>
          <main style={styles.content}>
            <p style={styles.prose}>
              James stared at the screen, the glowing glyphs a language only he and the machine understood. It was more than just code; it was a manuscript, a grimoire of logic and light. Each line was a clue, each function a chapter in the unfolding mystery of the AI Bank. This file, the <code style={styles.inlineCode}>MermaidDiagram</code> component, was the key to visualizing the complex architecture. It was a digital scribe, capable of drawing maps of the system's very soul. But like any powerful tool, it held its own secrets...
            </p>
            <div style={styles.codeWrapper}>
              <SyntaxHighlighter language="tsx" style={customSyntaxStyle}>
                {codeContent}
              </SyntaxHighlighter>
              {annotations.map((note, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.annotation,
                    top: note.top,
                    left: note.left,
                    transform: `rotate(${note.rotation}deg)`,
                  }}
                >
                  {note.text}
                </div>
              ))}
            </div>
             <p style={styles.prose}>
              He traced the flow of data with his finger on the cool glass. The <code style={styles.inlineCode}>useEffect</code> hook was the silent observer, waiting for the incantation—the <code style={styles.inlineCode}>chart</code> string—to change. When it did, the ritual began. A pact was made with the 'mermaid' library, and a vision was rendered. But the line <code style={styles.inlineCode}>dangerouslySetInnerHTML</code> sent a familiar chill down his spine. It was a necessary risk, a direct interface with the raw, untamed power of the machine's core language. One wrong symbol, one misplaced sigil in the chart, and the entire structure could unravel.
            </p>
          </main>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #3a3a3a 0%, #2c2c2c 100%)',
    padding: '4rem 2rem',
    boxSizing: 'border-box',
  },
  page: {
    backgroundColor: '#FDF6E3', // Solarized light background
    color: '#657b83', // Solarized base text
    fontFamily: "'Libre Baskerville', serif",
    width: '100%',
    maxWidth: '900px',
    padding: '4rem 5rem',
    border: '1px solid #EAE0C8',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    lineHeight: 1.8,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: '1px solid #93a1a1',
    paddingBottom: '1rem',
    marginBottom: '2rem',
  },
  chapterTitle: {
    fontFamily: "'Libre Baskerville', serif",
    fontWeight: 700,
    fontSize: '2rem',
    color: '#073642', // Solarized dark base
    margin: 0,
  },
  pageNumber: {
    fontFamily: "'Libre Baskerville', serif",
    fontStyle: 'italic',
    fontSize: '1rem',
    color: '#586e75',
  },
  content: {},
  prose: {
    fontSize: '1.1rem',
    textAlign: 'justify',
    marginBottom: '2rem',
  },
  inlineCode: {
    fontFamily: "'Fira Code', monospace",
    backgroundColor: '#EEE8D5', // Solarized light accent
    padding: '0.1em 0.4em',
    borderRadius: '3px',
    fontSize: '0.9em',
    color: '#b58900', // Solarized yellow
  },
  codeWrapper: {
    position: 'relative',
    margin: '2rem 0',
    border: '1px solid #EAE0C8',
    borderRadius: '4px',
    background: 'rgba(238, 232, 213, 0.5)', // Slightly different background for code
    boxShadow: 'inset 0 1px 5px rgba(0,0,0,0.05)',
  },
  annotation: {
    position: 'absolute',
    fontFamily: "'Caveat', cursive",
    fontSize: '16px',
    color: '#8B4513', // A brownish, ink-like color
    backgroundColor: 'rgba(255, 250, 205, 0.8)', // Lemon chiffon, semi-transparent
    padding: '5px 10px',
    borderRadius: '3px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
    maxWidth: '200px',
    textAlign: 'center',
    border: '1px solid rgba(139, 69, 19, 0.2)',
  },
};

export default CodeAsLiterature;