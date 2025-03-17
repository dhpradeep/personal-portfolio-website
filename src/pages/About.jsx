import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            About Me
          </h2>
          <div className="w-16 h-1 bg-tertiary mt-2 mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white-100 mb-4">
                Who I Am
              </h3>
              <p className="text-gray-600 dark:text-secondary mb-4">
                I'm a passionate frontend developer with a strong focus on creating 
                intuitive and performant user interfaces. With several years of experience
                in web development, I specialize in React and modern JavaScript.
              </p>
              <p className="text-gray-600 dark:text-secondary mb-4">
                My journey in web development started in 2018, and since then, I've worked
                on various projects ranging from small business websites to complex web applications.
              </p>
              <p className="text-gray-600 dark:text-secondary">
                When I'm not coding, you can find me hiking, reading, or experimenting with new technologies.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white-100 mb-4">
                My Skills
              </h3>
              
              <div className="space-y-4">
                {['JavaScript', 'React', 'HTML/CSS', 'Tailwind CSS', 'Node.js', 'Git'].map((skill) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-secondary">{skill}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-tertiary h-2 rounded-full" 
                        style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;