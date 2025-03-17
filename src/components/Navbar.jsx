import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      id: 'home',
      title: 'Home',
      path: '/'
    },
    {
      id: 'about',
      title: 'About',
      path: '/about'
    },
    {
      id: 'projects',
      title: 'Projects',
      path: '/projects'
    },
    {
      id: 'contact',
      title: 'Contact',
      path: '/contact'
    }
  ];

  return (
    <nav className={`w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? 'bg-white-100 dark:bg-primary shadow-md' : 'bg-transparent'}`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <p className='text-[18px] font-bold cursor-pointer flex text-gray-800 dark:text-white'>
            Your Name &nbsp;
            <span className='hidden sm:block'>| Portfolio</span>
          </p>
        </Link>

        <div className='flex items-center gap-4'>
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme} 
            className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
          >
            {darkMode ? <FiSun className="text-white" /> : <FiMoon className="text-gray-800" />}
          </button>

          {/* Desktop Navigation */}
          <ul className='list-none hidden sm:flex flex-row gap-6'>
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? 'text-tertiary dark:text-white-100' : 'text-gray-600 dark:text-secondary'
                } hover:text-tertiary dark:hover:text-white-100 text-[16px] font-medium cursor-pointer transition-colors`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={nav.path}>{nav.title}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation */}
          <div className='sm:hidden flex flex-1 justify-end items-center'>
            <div
              className='w-[28px] h-[28px] cursor-pointer flex items-center justify-center'
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <FiX className="text-gray-800 dark:text-white" /> : <FiMenu className="text-gray-800 dark:text-white" />}
            </div>

            <div
              className={`${
                !toggle ? 'hidden' : 'flex'
              } p-6 bg-white-100 dark:bg-black-100 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-lg`}
            >
              <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-medium cursor-pointer text-[16px] ${
                      active === nav.title ? 'text-tertiary dark:text-white-100' : 'text-gray-600 dark:text-secondary'
                    }`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.title);
                    }}
                  >
                    <Link to={nav.path}>{nav.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;