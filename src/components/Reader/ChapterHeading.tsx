import React from 'react';
import styled, { keyframes } from 'styled-components';

// --- Types ---

export interface ChapterHeadingProps {
  /** The chapter number (e.g., 1, "I", "One") */
  chapterNumber: string | number;
  /** The main title of the chapter */
  title: string;
  /** The location setting for the scene (e.g., "Zurich, Switzerland") */
  location?: string;
  /** The specific time or cryptic timestamp (e.g., "23:45 CET", "T-Minus 48 Hours") */
  timestamp?: string;
  /** Optional class name for styling overrides */
  className?: string;
}

// --- Animations ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// --- Styled Components ---

const HeadingContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem 2rem;
  text-align: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-out forwards;
`;

const ChapterLabel = styled.span`
  font-family: 'Cinzel', 'Georgia', serif;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #555;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const MainTitle = styled.h1`
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  background-color: #d4af37; /* Gold accent for the 'Bank' feel */
  margin-bottom: 1.5rem;
`;

const CrypticMetadata = styled.div`
  font-family: 'Courier New', 'Roboto Mono', monospace;
  font-size: 0.8rem;
  color: #003366; /* Deep blue for the corporate/AI aesthetic */
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  &::before {
    content: '[';
    color: #888;
    margin-right: 0.25rem;
  }
  
  &::after {
    content: ']';
    color: #888;
    margin-left: 0.25rem;
  }
`;

const DataPoint = styled.span`
  position: relative;
  
  &:not(:last-child)::after {
    content: '//';
    margin-left: 1rem;
    color: #ccc;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 6px;
  height: 12px;
  background-color: #d4af37;
  margin-left: 4px;
  animation: ${blink} 1s step-end infinite;
`;

// --- Component ---

export const ChapterHeading: React.FC<ChapterHeadingProps> = ({
  chapterNumber,
  title,
  location,
  timestamp,
  className,
}) => {
  const hasMetadata = location || timestamp;

  return (
    <HeadingContainer className={className}>
      <ChapterLabel>Chapter {chapterNumber}</ChapterLabel>
      <MainTitle>{title}</MainTitle>
      <Divider />
      
      {hasMetadata && (
        <CrypticMetadata>
          {location && <DataPoint>{location}</DataPoint>}
          {timestamp && <DataPoint>{timestamp}</DataPoint>}
          <Cursor />
        </CrypticMetadata>
      )}
    </HeadingContainer>
  );
};

export default ChapterHeading;