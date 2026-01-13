// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock any external dependencies or globals here
// Example:
// jest.mock('axios');

// If you need to mock the window object or other browser globals:
// Object.defineProperty(window, 'myCustomProperty', {
//   value: 'myCustomValue',
//   writable: true,
// });

// Example of mocking a module:
// jest.mock('./myModule', () => ({
//   myFunction: jest.fn(() => 'mocked value'),
// }));

// Add any global setup or teardown logic here
// Example:
beforeEach(() => {
  // Clear mocks before each test
  jest.clearAllMocks();
});

// afterAll(() => {
//   // Clean up after all tests
// });