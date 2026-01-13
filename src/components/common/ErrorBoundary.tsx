import React, { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: React.ErrorInfo | null;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  const [state, setState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
    info: null,
  });

  useEffect(() => {
    if (state.hasError) {
      console.error("ErrorBoundary caught an error:", state.error, state.info);
    }
  }, [state.hasError, state.error, state.info]);

  const resetErrorBoundary = () => {
    setState({ hasError: false, error: null, info: null });
  };

  if (state.hasError) {
    return (
      <div>
        {fallback || (
          <div>
            <h2>Something went wrong.</h2>
            <p>Please try again later.</p>
            <button onClick={resetErrorBoundary}>Try again</button>
            {state.error && <details style={{ whiteSpace: 'pre-wrap' }}>
              {state.error.message}
              <br />
              {state.info?.componentStack}
            </details>}
          </div>
        )}
      </div>
    );
  }

  return (
    try {
      return children as React.ReactNode;
    } catch (error: any) {
      setState({ hasError: true, error: error, info: { componentStack: 'N/A' } });
      return null;
    }
  );
};

export default ErrorBoundary;