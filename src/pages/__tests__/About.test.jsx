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
    
    // Get the skills section by its heading
    const skillsHeading = screen.getByRole('heading', { name: /My Skills/i });
    expect(skillsHeading).toBeInTheDocument();
    
    // Get the parent container of the skills section
    const skillsSection = skillsHeading.closest('div').parentElement;
    
    // Look for skills within this section
    const skillTexts = within(skillsSection).getAllByText(/JavaScript|React|HTML\/CSS/i);
    
    // Check if we have at least one of each skill
    const hasJavaScript = skillTexts.some(text => /JavaScript/i.test(text.textContent));
    const hasReact = skillTexts.some(text => /React/i.test(text.textContent));
    const hasHTML = skillTexts.some(text => /HTML\/CSS/i.test(text.textContent));
    
    expect(hasJavaScript).toBeTruthy();
    expect(hasReact).toBeTruthy();
    expect(hasHTML).toBeTruthy();
    
    // Check for progress bars
    const progressBars = skillsSection.querySelectorAll('.bg-tertiary.h-2.rounded-full');
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