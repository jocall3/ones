import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-100 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Product</h6>
            <ul className="text-sm text-gray-500">
              <li><Link to="/features" className="hover:text-blue-500">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-500">Pricing</Link></li>
              <li><Link to="/integrations" className="hover:text-blue-500">Integrations</Link></li>
              <li><Link to="/customers" className="hover:text-blue-500">Customers</Link></li>
              <li><Link to="/case-studies" className="hover:text-blue-500">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
            <ul className="text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
              <li><Link to="/team" className="hover:text-blue-500">Our Team</Link></li>
              <li><Link to="/careers" className="hover:text-blue-500">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-blue-500">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Resources</h6>
            <ul className="text-sm text-gray-500">
              <li><Link to="/documentation" className="hover:text-blue-500">Documentation</Link></li>
              <li><Link to="/support" className="hover:text-blue-500">Support</Link></li>
              <li><Link to="/api" className="hover:text-blue-500">API</Link></li>
              <li><Link to="/community" className="hover:text-blue-500">Community</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Legal</h6>
            <ul className="text-sm text-gray-500">
              <li><Link to="/terms" className="hover:text-blue-500">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-500">Privacy Policy</Link></li>
              <li><Link to="/security" className="hover:text-blue-500">Security</Link></li>
              <li><Link to="/gdpr" className="hover:text-blue-500">GDPR Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Connect</h6>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;