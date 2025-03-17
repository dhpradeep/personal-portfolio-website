import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-30 dark:opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-16 flex flex-col items-start justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-secondary text-lg sm:text-xl">Hello, I'm</p>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-white-100 mt-2">
            Your Name
          </h1>
          <h2 className="text-2xl sm:text-3xl font-medium text-tertiary dark:text-secondary mt-2">
            Frontend Developer
          </h2>
          
          <p className="text-gray-600 dark:text-secondary mt-6 max-w-md">
            I build responsive, user-friendly web applications with modern technologies.
            Passionate about creating intuitive user experiences and clean code.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/projects">
              <button className="btn btn-primary">
                View My Work
              </button>
            </Link>
            <Link to="/contact">
              <button className="btn border border-tertiary dark:border-secondary text-gray-800 dark:text-white-100 hover:bg-tertiary hover:text-white-100 dark:hover:bg-tertiary">
                Contact Me
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;