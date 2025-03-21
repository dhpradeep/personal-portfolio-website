import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }, 1500);
  };

  return (
    <section className="section-padding min-h-screen pt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white-100">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-tertiary mt-2 mb-8"></div>
          <p className="text-gray-600 dark:text-secondary mb-12 max-w-3xl">
            I'm always open to new opportunities and collaborations. Feel free to reach out if you have any questions or just want to say hello!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div data-testid="contact-info">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white-100 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-tertiary mr-4">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white-100">Email</h4>
                    <p className="text-gray-600 dark:text-secondary">your.email@example.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-tertiary mr-4">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white-100">Phone</h4>
                    <p className="text-gray-600 dark:text-secondary">+1 (123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-tertiary mr-4">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white-100">Location</h4>
                    <p className="text-gray-600 dark:text-secondary">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:bg-gray-800 dark:text-white-100"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:bg-gray-800 dark:text-white-100"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:bg-gray-800 dark:text-white-100"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary flex items-center justify-center space-x-2 w-full"
                >
                  {status === 'sending' ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend />
                    </>
                  )}
                </button>
                
                {status === 'success' && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                    Your message has been sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;