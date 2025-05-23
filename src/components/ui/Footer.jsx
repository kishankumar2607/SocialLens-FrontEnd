import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({ variant = 'full' }) => {
  const currentYear = new Date().getFullYear();
  
  // Full footer with multiple columns
  if (variant === 'full') {
    return (
      <footer className="bg-surface-dark border-t border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <Link to="/homepage" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-white font-display font-bold text-xl">Analytics</span>
              </Link>
              <p className="mt-4 text-sm text-text-secondary">
                Powerful analytics platform for data-driven insights and visualization.
              </p>
              <div className="mt-6 flex space-x-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-primary transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Icon name="Twitter" size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-primary transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Icon name="Linkedin" size={20} />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-primary transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Icon name="Github" size={20} />
                </a>
              </div>
            </div>
            
            {/* Product Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-display font-medium text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/features" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/integrations" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link to="/changelog" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-display font-medium text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/documentation" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/api" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-display font-medium text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-text-secondary hover:text-primary transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-tertiary text-sm">
              &copy; {currentYear} Analytics Inc. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-text-tertiary hover:text-primary text-sm transition-colors duration-200">
                Privacy
              </Link>
              <Link to="/terms" className="text-text-tertiary hover:text-primary text-sm transition-colors duration-200">
                Terms
              </Link>
              <Link to="/cookies" className="text-text-tertiary hover:text-primary text-sm transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  // Minimal footer with just copyright and essential links
  return (
    <footer className="bg-surface-dark border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-white font-display font-bold text-sm">Analytics</span>
          </div>
          
          <p className="mt-4 md:mt-0 text-text-tertiary text-sm">
            &copy; {currentYear} Analytics Inc. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-text-tertiary hover:text-primary text-sm transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/terms" className="text-text-tertiary hover:text-primary text-sm transition-colors duration-200">
              Terms
            </Link>
            <a 
              href="mailto:support@analytics.com" 
              className="text-text-tertiary hover:text-primary text-sm transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;