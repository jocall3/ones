import React from 'react';
import { Link } from 'react-router-dom';

const ApiDocumentationPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">API Documentation</h1>
      <p className="mb-4">
        Welcome to the API documentation for our platform. Here you can find
        detailed information about our APIs, how to use them, and examples to
        help you get started.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
        <p className="mb-2">
          To begin using our APIs, you'll need to authenticate your requests.
          Please refer to our{' '}
          <Link to="/docs/authentication" className="text-blue-500 hover:underline">
            Authentication Guide
          </Link>{' '}
          for detailed instructions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">API Reference</h2>
        <p className="mb-2">
          Explore our comprehensive API reference for detailed information on
          each endpoint, request parameters, and response formats.
        </p>
        <ul className="list-disc list-inside">
          <li>
            <Link to="/docs/api/accounts" className="text-blue-500 hover:underline">
              Accounts API
            </Link>
          </li>
          <li>
            <Link to="/docs/api/payments" className="text-blue-500 hover:underline">
              Payments API
            </Link>
          </li>
          <li>
            <Link to="/docs/api/virtual-accounts" className="text-blue-500 hover:underline">
              Virtual Accounts API
            </Link>
          </li>
          {/* Add more API links as needed */}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Support</h2>
        <p>
          If you have any questions or need assistance, please don't hesitate to
          contact our support team at{' '}
          <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
            support@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default ApiDocumentationPage;