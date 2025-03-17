// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock framer-motion properly with forwardRef
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
      section: React.forwardRef((props, ref) => <section ref={ref} {...props} />),
      span: React.forwardRef((props, ref) => <span ref={ref} {...props} />),
      p: React.forwardRef((props, ref) => <p ref={ref} {...props} />),
      a: React.forwardRef((props, ref) => <a ref={ref} {...props} />),
      button: React.forwardRef((props, ref) => <button ref={ref} {...props} />),
      img: React.forwardRef((props, ref) => <img ref={ref} {...props} />),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});