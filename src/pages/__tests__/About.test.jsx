import { render, screen, within } from '@testing-library/react';
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
    
    // Get the skills section
    const skillsSection = screen.getByRole('heading', { name: /My Skills/i }).closest('div').parentElement;
    
    // Check for specific skills within the skills section
    const skillItems = within(skillsSection).getAllByRole('listitem');
    
    // Check if at least one skill item contains JavaScript
    const hasJavaScript = skillItems.some(item => 
      item.textContent.includes('JavaScript') || 
      within(item).queryByText(/JavaScript/i)
    );
    expect(hasJavaScript).toBeTruthy();
    
    // Check for other skills
    const hasReact = skillItems.some(item => 
      item.textContent.includes('React') || 
      within(item).queryByText(/React/i)
    );
    expect(hasReact).toBeTruthy();
    
    const hasHTML = skillItems.some(item => 
      item.textContent.includes('HTML') || 
      within(item).queryByText(/HTML/i)
    );
    expect(hasHTML).toBeTruthy();
  });

  test('renders skill progress bars', () => {
    renderWithProviders(<About />);
    
    // Get all progress bars
    const progressBars = document.querySelectorAll('.bg-tertiary.h-2.rounded-full');
    expect(progressBars.length).toBeGreaterThanOrEqual(6);
    
    // Check if each progress bar has a width attribute
    progressBars.forEach(bar => {
      const style = window.getComputedStyle(bar);
      expect(style.width).not.toBe('');
      
      // Alternative check that doesn't rely on computed styles
      const widthAttr = bar.getAttribute('style');
      expect(widthAttr).toMatch(/width:/);
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