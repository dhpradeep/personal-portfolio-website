import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import Projects from '../Projects';

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

describe('Projects Page', () => {
  test('renders projects section with heading', () => {
    renderWithProviders(<Projects />);
    
    expect(screen.getByText(/My Projects/i)).toBeInTheDocument();
  });

  test('renders project cards', () => {
    renderWithProviders(<Projects />);
    
    // Check for project titles
    expect(screen.getByText(/E-Commerce Website/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Management App/i)).toBeInTheDocument();
    expect(screen.getByText(/Weather Dashboard/i)).toBeInTheDocument();
  });

  test('renders project tags', () => {
    renderWithProviders(<Projects />);
    
    // Check for specific tags
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    expect(screen.getByText(/MongoDB/i)).toBeInTheDocument();
    expect(screen.getByText(/Firebase/i)).toBeInTheDocument();
  });

  test('renders project links', () => {
    renderWithProviders(<Projects />);
    
    // Get all links
    const links = screen.getAllByRole('link');
    
    // Check if we have at least 6 links (2 per project: GitHub and live demo)
    expect(links.length).toBeGreaterThanOrEqual(6);
    
    // Check if links have correct attributes
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('renders project descriptions', () => {
    renderWithProviders(<Projects />);
    
    expect(screen.getByText(/A fully responsive e-commerce platform/i)).toBeInTheDocument();
    expect(screen.getByText(/A drag-and-drop task management application/i)).toBeInTheDocument();
    expect(screen.getByText(/A weather application that displays forecast data/i)).toBeInTheDocument();
  });
});