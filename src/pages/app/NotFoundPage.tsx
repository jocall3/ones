import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{
        fontSize: '4em',
        color: '#333',
        marginBottom: '0.5em',
      }}>404 - Not Found</h1>
      <p style={{
        fontSize: '1.5em',
        color: '#666',
        marginBottom: '1em',
        textAlign: 'center',
      }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" style={{
        padding: '0.75em 1.5em',
        fontSize: '1.2em',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '5px',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease',
      }}>
        Go back to homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;