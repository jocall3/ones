import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * A layout component for authentication pages (Login, Sign Up, SSO, etc.).
 * It provides a simple, centered container on a plain background.
 *
 * @param {AuthLayoutProps} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout, typically the form or view for the specific auth page.
 * @returns {JSX.Element} The rendered authentication layout.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Optional: Add a logo or app name here */}
        {/* 
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="App Logo" className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome
          </h2>
        </div> 
        */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 py-10">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;