import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Context Providers ---
import { AuthProvider } from '../context/AuthContext';
import { DataProvider } from '../context/DataContext';
import { CitibankAPIProvider } from '../contexts/CitibankAPIProvider';
import { MoneyMovementProvider } from '../components/MoneyMovementProvider';
import { PlaidProvider } from '../components/PlaidContext';
import { StripeNexusProvider } from '../components/stripe-nexus/stripe-nexus-provider';

// --- UI Components & Views ---
import { viewRegistry } from './viewRegistry';
import LandingPage from '../components/LandingPage';
import LoginView from '../components/LoginView';
import Dashboard from '../components/Dashboard';
import Loading from '../components/Loading';

// --- Layouts & Guards ---
import AuthGuard from '../components/AuthGuard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

/**
 * A standard layout for the authenticated part of the application.
 * It includes a sidebar, a header, and the main content area where pages are rendered.
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  </div>
);

/**
 * Renders the application's routes.
 * It separates public routes (like landing and login) from protected routes 
 * that require authentication. Protected routes are wrapped in the AppLayout.
 */
const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginView />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </AuthGuard>
          }
        />

        {/* Dynamically generate routes from the view registry */}
        {viewRegistry.map(({ path, component: Component, name }) => (
          <Route
            key={name}
            path={path}
            element={
              <AuthGuard>
                <AppLayout>
                  <Component />
                </AppLayout>
              </AuthGuard>
            }
          />
        ))}

        {/* Fallback route for any other path */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

/**
 * The root component of the application.
 * Its primary responsibility is to set up all the necessary context providers
 * and render the main router component (`AppRouter`). This keeps the root clean
 * and focused on global state management.
 */
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <CitibankAPIProvider>
            <PlaidProvider>
              <MoneyMovementProvider>
                <StripeNexusProvider>
                  <AppRouter />
                </StripeNexusProvider>
              </MoneyMovementProvider>
            </PlaidProvider>
          </CitibankAPIProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;