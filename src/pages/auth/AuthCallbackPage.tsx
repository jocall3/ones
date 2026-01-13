import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loading } from '../../components/Loading';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleAuthCallback, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        await handleAuthCallback(location.search);
        // Redirect to a default page or a page specified in the state
        const redirectPath = localStorage.getItem('redirect_uri') || '/dashboard';
        localStorage.removeItem('redirect_uri'); // Clean up
        navigate(redirectPath, { replace: true });
      } catch (error) {
        console.error('Authentication callback error:', error);
        navigate('/login', { replace: true }); // Redirect to login on error
      }
    };

    if (!isAuthenticated && !isLoading) {
      processAuth();
    } else if (isAuthenticated) {
      navigate('/dashboard', { replace: true }); // Redirect if already authenticated
    }
  }, [handleAuthCallback, isAuthenticated, isLoading, location.search, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f0f2f5',
    }}>
      <Loading message="Authenticating..." />
    </div>
  );
};

export default AuthCallbackPage;