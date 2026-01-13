import React from 'react';

interface ErrorDisplayProps {
  errorMessage: string | null;
  onClearError: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage, onClearError }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '10px',
      borderBottom: '1px solid #f5c6cb',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span>{errorMessage}</span>
      <button onClick={onClearError} style={{
        backgroundColor: '#b71c1c',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
      }}>
        Clear
      </button>
    </div>
  );
};

export default ErrorDisplay;