import React from 'react';
import { Link } from 'react-router-dom';

const LandingHeader: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            MagicBank
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/features" className="text-gray-500 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-500 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-500 hover:text-gray-900">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-500 hover:text-gray-900">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;