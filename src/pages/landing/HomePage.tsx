import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Our Platform</h1>
        <p>Discover the future of finance.</p>
        <Link to="/features" className="button primary">Explore Features</Link>
      </header>

      <section className="home-about">
        <h2>About Us</h2>
        <p>
          We are a team of innovators dedicated to providing cutting-edge financial solutions.
          Our platform is designed to empower individuals and businesses alike.
        </p>
      </section>

      <section className="home-services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Virtual Accounts</h3>
            <p>Manage your finances with ease using our virtual account solutions.</p>
            <Link to="/virtual-accounts" className="button secondary">Learn More</Link>
          </div>
          <div className="service-card">
            <h3>Payment Processing</h3>
            <p>Secure and reliable payment processing for your business needs.</p>
            <Link to="/payment-processing" className="button secondary">Learn More</Link>
          </div>
          <div className="service-card">
            <h3>AI-Powered Insights</h3>
            <p>Gain valuable insights into your financial data with our AI-driven tools.</p>
            <Link to="/ai-insights" className="button secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="home-testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"This platform has revolutionized the way I manage my finances. Highly recommended!"</p>
            <p>- John Doe, CEO</p>
          </div>
          <div className="testimonial">
            <p>"The AI-powered insights have helped me make smarter investment decisions."</p>
            <p>- Jane Smith, Investor</p>
          </div>
        </div>
      </section>

      <section className="home-contact">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to our team for assistance.</p>
        <Link to="/contact" className="button primary">Contact Us</Link>
      </section>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;