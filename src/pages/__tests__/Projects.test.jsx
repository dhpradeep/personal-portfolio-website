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
    
    expect(screen.getByRole('heading', { name: /My Projects/i })).toBeInTheDocument();
  });

  test('renders project cards', () => {
    renderWithProviders(<Projects />);
    
    // Check for project titles using heading role
    expect(screen.getByRole('heading', { name: /E-Commerce Website/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Task Management App/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Weather Dashboard/i })).toBeInTheDocument();
  });

  test('renders project tags', () => {
    renderWithProviders(<Projects />);
    
    // Get all tags and check if specific ones exist
    const tags = screen.getAllByText(/React|Node\.js|MongoDB|Firebase|Express/i);
    
    // Check if we have at least one of each
    expect(tags.some(tag => /React/i.test(tag.textContent))).toBeTruthy();
    expect(tags.some(tag => /Node\.js/i.test(tag.textContent))).toBeTruthy();
    expect(tags.some(tag => /MongoDB/i.test(tag.textContent))).toBeTruthy();
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
    
    // Get all paragraphs and check if specific descriptions exist
    const descriptions = screen.getAllByText(/platform|application|dashboard/i);
    
    expect(descriptions.some(desc => /e-commerce platform/i.test(desc.textContent))).toBeTruthy();
    expect(descriptions.some(desc => /task management application/i.test(desc.textContent))).toBeTruthy();
    expect(descriptions.some(desc => /weather.*dashboard/i.test(desc.textContent))).toBeTruthy();
  });

  test('project images have correct attributes', () => {
    renderWithProviders(<Projects />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
    
    images.forEach(img => {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
      expect(img).toHaveClass('w-full');
    });
  });
});