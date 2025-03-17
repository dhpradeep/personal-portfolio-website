import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website',
      description: 'A fully responsive e-commerce platform built with React and Node.js.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://via.placeholder.com/600x400?text=E-Commerce+Project',
      source_code_link: 'https://github.com/',
      live_demo_link: 'https://example.com/',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A drag-and-drop task management application with user authentication.',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      image: 'https://via.placeholder.com/600x400?text=Task+Management+App',
      source_code_link: 'https://github.com/',
      live_demo_link: 'https://example.com/',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application that displays forecast data using a third-party API.',
      tags: ['JavaScript', 'API', 'CSS'],
      image: 'https://via.placeholder.com/600x400?text=Weather+Dashboard',
      source_code_link: 'https://github.com/',
      live_demo_link: 'https://example.com/',
    },
  ];

  return (
    <section className="section-padding min-h-screen pt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white-100">
            My Projects
          </h2>
          <div className="w-16 h-1 bg-tertiary mt-2 mb-8"></div>
          
          <p className="text-gray-600 dark:text-secondary mb-12 max-w-3xl">
            Here are some of my recent projects. Each project is built with a focus on performance, 
            responsiveness, and user experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white-100 dark:bg-tertiary rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white-100 mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-secondary mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.source_code_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-tertiary dark:hover:text-white-100 transition-colors"
                    >
                      <FiGithub size={20} />
                    </a>
                    <a 
                      href={project.live_demo_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-tertiary dark:hover:text-white-100 transition-colors"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;