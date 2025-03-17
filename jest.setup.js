import '@testing-library/jest-dom';

// Add custom jest matchers for asserting on DOM nodes
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)

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

// Fix for toHaveStyle matcher
Object.defineProperty(window, 'getComputedStyle', {
  value: (element) => {
    return {
      ...element.style,
      getPropertyValue: (prop) => {
        return element.style[prop] || '';
      }
    };
  }
});