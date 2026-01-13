import React from 'react';
import { Link } from 'react-router-dom';

const WhitepapersPage = () => {
  const whitepapers = [
    {
      title: 'The Future of Payments: Trends and Innovations',
      description: 'Explore the latest trends in payment technology and their impact on businesses.',
      downloadLink: '/whitepapers/future-of-payments.pdf',
      topics: ['Payments', 'Fintech', 'Innovation']
    },
    {
      title: 'AI in Financial Services: Transforming Operations',
      description: 'Discover how artificial intelligence is revolutionizing financial operations and customer service.',
      downloadLink: '/whitepapers/ai-in-finance.pdf',
      topics: ['AI', 'Financial Services', 'Automation']
    },
    {
      title: 'Blockchain Technology: Applications in Banking',
      description: 'Understand the potential of blockchain technology in enhancing security and efficiency in banking.',
      downloadLink: '/whitepapers/blockchain-in-banking.pdf',
      topics: ['Blockchain', 'Banking', 'Security']
    },
    {
      title: 'Cybersecurity in Fintech: Protecting Financial Data',
      description: 'Learn about the critical cybersecurity measures needed to protect sensitive financial data.',
      downloadLink: '/whitepapers/cybersecurity-fintech.pdf',
      topics: ['Cybersecurity', 'Fintech', 'Data Protection']
    },
    {
      title: 'Regulatory Compliance in the Digital Age',
      description: 'Navigate the complex landscape of regulatory compliance in the rapidly evolving digital finance sector.',
      downloadLink: '/whitepapers/regulatory-compliance.pdf',
      topics: ['Regulatory Compliance', 'Digital Finance', 'Legal']
    },
    {
      title: 'Open Banking: Opportunities and Challenges',
      description: 'Examine the opportunities and challenges presented by the open banking movement.',
      downloadLink: '/whitepapers/open-banking.pdf',
      topics: ['Open Banking', 'API', 'Financial Innovation']
    },
    {
      title: 'The Rise of Digital Currencies: A Comprehensive Guide',
      description: 'A comprehensive guide to understanding digital currencies and their potential impact on the global economy.',
      downloadLink: '/whitepapers/digital-currencies.pdf',
      topics: ['Digital Currencies', 'Cryptocurrency', 'Economy']
    },
    {
      title: 'Data Analytics in Finance: Driving Insights',
      description: 'Explore how data analytics is used to drive insights and improve decision-making in the finance industry.',
      downloadLink: '/whitepapers/data-analytics-finance.pdf',
      topics: ['Data Analytics', 'Finance', 'Insights']
    },
    {
      title: 'The Impact of Cloud Computing on Financial Institutions',
      description: 'Assess the impact of cloud computing on the efficiency and scalability of financial institutions.',
      downloadLink: '/whitepapers/cloud-computing-finance.pdf',
      topics: ['Cloud Computing', 'Financial Institutions', 'Scalability']
    },
    {
      title: 'Mobile Banking: Enhancing Customer Experience',
      description: 'Discover how mobile banking is transforming customer experience and accessibility in the financial sector.',
      downloadLink: '/whitepapers/mobile-banking.pdf',
      topics: ['Mobile Banking', 'Customer Experience', 'Accessibility']
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Financial Technology Whitepapers</h1>
      <p className="mb-4">
        Download our insightful whitepapers to stay informed about the latest trends and innovations in financial technology.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {whitepapers.map((whitepaper, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{whitepaper.title}</h2>
              <p className="text-gray-700 mb-3">{whitepaper.description}</p>
              <Link to={whitepaper.downloadLink} target="_blank" download className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download
              </Link>
            </div>
            <div className="bg-gray-100 p-2">
              <span className="text-gray-600 text-sm">Topics:</span>
              {whitepaper.topics.map((topic, i) => (
                <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhitepapersPage;