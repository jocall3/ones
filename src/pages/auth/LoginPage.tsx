import React from 'react';
import { LoginView } from '../../components/LoginView'; // Assuming LoginView is in components
import { AuthContext } from '../../context/AuthContext'; // Assuming AuthContext is available
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { isLoggedIn, login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoginView onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;