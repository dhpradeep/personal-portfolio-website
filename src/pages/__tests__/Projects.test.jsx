import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import Projects from '../Projects';

// Mock react-intersection-observer
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
    
    expect(screen.getByRole('heading', { name: /My Projects/i, level: 2 })).toBeInTheDocument();
  });

  test('renders project cards', () => {
    renderWithProviders(<Projects />);
    
    // Check for project titles using heading role with specific level
    const projectHeadings = screen.getAllByRole('heading', { level: 3 });
    
    // Check if we have the expected project titles
    const projectTitles = projectHeadings.map(heading => heading.textContent);
    expect(projectTitles).toContain('E-Commerce Website');
    expect(projectTitles).toContain('Task Management App');
    expect(projectTitles).toContain('Weather Dashboard');
  });

  test('renders project tags', () => {
    renderWithProviders(<Projects />);
    
    // Get all tags and check if specific ones exist
    const tags = screen.getAllByText(/React|Node\.js|MongoDB|Firebase|Express/i);
    
    // Check if we have at least one of each
    const tagTexts = tags.map(tag => tag.textContent);
    expect(tagTexts.some(text => /React/i.test(text))).toBeTruthy();
    expect(tagTexts.some(text => /Node\.js/i.test(text))).toBeTruthy();
    expect(tagTexts.some(text => /MongoDB/i.test(text))).toBeTruthy();
    expect(tagTexts.some(text => /Firebase/i.test(text))).toBeTruthy();
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
    
    const descTexts = descriptions.map(desc => desc.textContent);
    expect(descTexts.some(text => /e-commerce platform/i.test(text))).toBeTruthy();
    expect(descTexts.some(text => /task management application/i.test(text))).toBeTruthy();
    expect(descTexts.some(text => /weather.*dashboard/i.test(text))).toBeTruthy();
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