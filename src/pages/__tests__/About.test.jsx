import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import About from '../About';

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

describe('About Page', () => {
  test('renders about section with heading', () => {
    renderWithProviders(<About />);
    
    expect(screen.getByRole('heading', { name: /About Me/i, level: 2 })).toBeInTheDocument();
  });

  test('renders bio information', () => {
    renderWithProviders(<About />);
    
    expect(screen.getByRole('heading', { name: /Who I Am/i })).toBeInTheDocument();
    expect(screen.getByText(/passionate frontend developer/i)).toBeInTheDocument();
  });

  test('renders skills section', () => {
    renderWithProviders(<About />);
    
    expect(screen.getByRole('heading', { name: /My Skills/i })).toBeInTheDocument();
    
    // Instead of looking for listitem role, look for skill names directly
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/HTML\/CSS/i)).toBeInTheDocument();
    
    // Check for progress bars
    const progressBars = document.querySelectorAll('.bg-tertiary.h-2.rounded-full');
    expect(progressBars.length).toBeGreaterThanOrEqual(3);
  });

  test('renders skill progress bars', () => {
    renderWithProviders(<About />);
    
    // Get all progress bars
    const progressBars = document.querySelectorAll('.bg-tertiary.h-2.rounded-full');
    expect(progressBars.length).toBeGreaterThanOrEqual(6);
    
    // Check if each progress bar has a width style
    progressBars.forEach(bar => {
      expect(bar).toHaveAttribute('style');
      expect(bar.style.width).not.toBe('');
    });
  });

  test('renders multiple paragraphs in bio', () => {
    renderWithProviders(<About />);
    
    const paragraphs = screen.getAllByText(/./i, { selector: 'p.text-gray-600' });
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  test('renders section divider', () => {
    renderWithProviders(<About />);
    
    const divider = document.querySelector('.w-16.h-1.bg-tertiary');
    expect(divider).toBeInTheDocument();
  });
});