import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white-100 dark:bg-tertiary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-secondary text-sm">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-secondary hover:text-tertiary dark:hover:text-white-100 transition-colors"
            >
              <FiGithub size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-secondary hover:text-tertiary dark:hover:text-white-100 transition-colors"
            >
              <FiLinkedin size={20} />
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-secondary hover:text-tertiary dark:hover:text-white-100 transition-colors"
            >
              <FiTwitter size={20} />
            </a>
            <a 
              href="mailto:your.email@example.com" 
              className="text-gray-600 dark:text-secondary hover:text-tertiary dark:hover:text-white-100 transition-colors"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;