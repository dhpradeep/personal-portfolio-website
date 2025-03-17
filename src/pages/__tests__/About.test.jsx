import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import About from '../About';

// Mock framer-motion and react-intersection-observer
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

jest.mock('react-intersection-observer', () => ({
  useInView: () => [jest.fn(), true],
}));

const renderWithProviders = (ui) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('About Page', () => {
  test('renders about section with heading', () => {
    renderWithProviders(<About />);
    
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  });

  test('renders bio information', () => {
    renderWithProviders(<About />);
    
    expect(screen.getByText(/Who I Am/i)).toBeInTheDocument();
    expect(screen.getByText(/passionate frontend developer/i)).toBeInTheDocument();
  });

  test('renders skills section', () => {
    renderWithProviders(<About />);
    
    expect(screen.getByText(/My Skills/i)).toBeInTheDocument();
    
    // Check for specific skills
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/HTML\/CSS/i)).toBeInTheDocument();
  });
});