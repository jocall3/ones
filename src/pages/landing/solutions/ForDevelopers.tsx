import React from 'react';
import { Link } from 'react-router-dom';

const ForDevelopers = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">For Developers</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">APIs</h2>
        <p className="text-gray-700 mb-4">
          Our comprehensive suite of APIs allows you to seamlessly integrate our platform into your existing systems.
          From payment processing to account management, our APIs provide the flexibility and control you need.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <Link to="/api/expectedPayments" className="text-blue-500 hover:underline">
              Expected Payments API
            </Link>
          </li>
          <li>
            <Link to="/api/incomingPaymentDetails" className="text-blue-500 hover:underline">
              Incoming Payment Details API
            </Link>
          </li>
          <li>
            <Link to="/api/securityComplianceApi" className="text-blue-500 hover:underline">
              Security Compliance API
            </Link>
          </li>
          <li>
            <Link to="/api/virtualAccountsApi" className="text-blue-500 hover:underline">
              Virtual Accounts API
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">SDKs</h2>
        <p className="text-gray-700 mb-4">
          Accelerate your development process with our pre-built SDKs. Available in multiple languages, our SDKs
          provide a simplified interface to our APIs, reducing the complexity of integration.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>JavaScript SDK</li>
          <li>Python SDK</li>
          <li>Java SDK</li>
          <li>.NET SDK</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Developer Tools</h2>
        <p className="text-gray-700 mb-4">
          We provide a range of developer tools to help you build, test, and deploy your applications.
          Our tools include a sandbox environment, API documentation, and a support forum.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <Link to="/components/ApiPlaygroundView" className="text-blue-500 hover:underline">
              API Playground
            </Link>
          </li>
          <li>
            <Link to="/components/APIStatusView" className="text-blue-500 hover:underline">
              API Status Dashboard
            </Link>
          </li>
          <li>Comprehensive API Documentation</li>
          <li>Sandbox Environment</li>
          <li>Support Forum</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Resources</h2>
        <p className="text-gray-700 mb-4">
          Explore our resources to learn more about our platform and how to integrate it into your applications.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Developer Blog
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Tutorials
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Sample Code
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ForDevelopers;