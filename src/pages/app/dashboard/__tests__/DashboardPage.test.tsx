import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../../../components/Dashboard'; // Adjust the import path as necessary
import { DataContext } from '../../../../context/DataContext'; // Adjust the import path as necessary

// Mock the DataContext value
const mockDataContextValue = {
  accounts: [
    { id: '1', name: 'Checking Account', balance: 1000 },
    { id: '2', name: 'Savings Account', balance: 5000 },
  ],
  transactions: [
    { id: '1', accountId: '1', description: 'Grocery Store', amount: -50 },
    { id: '2', accountId: '2', description: 'Interest Payment', amount: 10 },
  ],
  // Add other necessary mock data and functions here
  fetchAccounts: jest.fn(),
  fetchTransactions: jest.fn(),
  loading: false,
  error: null,
};

describe('DashboardPage', () => {
  it('renders the Dashboard component with data', async () => {
    render(
      <MemoryRouter>
        <DataContext.Provider value={mockDataContextValue}>
          <Dashboard />
        </DataContext.Provider>
      </MemoryRouter>
    );

    // Wait for the component to render and display data
    await waitFor(() => {
      expect(screen.getByText('Checking Account')).toBeInTheDocument();
      expect(screen.getByText('$1,000.00')).toBeInTheDocument(); // Assuming balance is formatted with commas and decimals
      expect(screen.getByText('Savings Account')).toBeInTheDocument();
      expect(screen.getByText('$5,000.00')).toBeInTheDocument();
      expect(screen.getByText('Grocery Store')).toBeInTheDocument();
      expect(screen.getByText('Interest Payment')).toBeInTheDocument();
    });
  });

  it('displays a loading state when data is loading', () => {
    const loadingDataContextValue = {
      ...mockDataContextValue,
      loading: true,
    };

    render(
      <MemoryRouter>
        <DataContext.Provider value={loadingDataContextValue}>
          <Dashboard />
        </DataContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Or whatever loading indicator you use
  });

  it('displays an error message when there is an error', () => {
    const errorDataContextValue = {
      ...mockDataContextValue,
      error: 'Failed to fetch data',
    };

    render(
      <MemoryRouter>
        <DataContext.Provider value={errorDataContextValue}>
          <Dashboard />
        </DataContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument(); // Or whatever error display you use
  });

  it('calls fetchAccounts and fetchTransactions on mount', () => {
    render(
      <MemoryRouter>
        <DataContext.Provider value={mockDataContextValue}>
          <Dashboard />
        </DataContext.Provider>
      </MemoryRouter>
    );

    expect(mockDataContextValue.fetchAccounts).toHaveBeenCalled();
    expect(mockDataContextValue.fetchTransactions).toHaveBeenCalled();
  });
});