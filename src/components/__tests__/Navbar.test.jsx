import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from '../Navbar';

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock useTheme to control dark mode
jest.mock('../../context/ThemeContext', () => ({
  ...jest.requireActual('../../context/ThemeContext'),
  useTheme: jest.fn().mockReturnValue({
    darkMode: false,
    toggleTheme: jest.fn(),
  }),
}));

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    // Clear mocks
    jest.clearAllMocks();
    
    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    window.dispatchEvent(new Event('resize'));
  });

  test('renders navbar with logo and navigation links', () => {
    renderWithProviders(<Navbar />);
    
    // Check if logo/brand name is rendered
    expect(screen.getByText(/Your Name/i)).toBeInTheDocument();
    
    // Check if navigation links are rendered - use getAllByRole instead of getByText
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.some(link => /Home/i.test(link.textContent))).toBeTruthy();
    expect(navLinks.some(link => /About/i.test(link.textContent))).toBeTruthy();
    expect(navLinks.some(link => /Projects/i.test(link.textContent))).toBeTruthy();
    expect(navLinks.some(link => /Contact/i.test(link.textContent))).toBeTruthy();
  });

  test('toggles mobile menu when menu button is clicked', () => {
    // Mock window.innerWidth to simulate mobile view
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    window.dispatchEvent(new Event('resize'));
    
    renderWithProviders(<Navbar />);
    
    // Find the menu button (using icon's parent)
    const menuButton = screen.getByRole('button', { name: '' });
    
    // Click the menu button to open menu
    fireEvent.click(menuButton);
    
    // Check if mobile menu links are visible
    const mobileLinks = screen.getAllByRole('listitem');
    expect(mobileLinks.length).toBeGreaterThan(0);
    
    // Click again to hide
    fireEvent.click(menuButton);
  });

  test('scrolls to top when logo is clicked', () => {
    renderWithProviders(<Navbar />);
    
    const logo = screen.getByText(/Your Name/i).closest('a');
    fireEvent.click(logo);
    
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('changes active link when clicked', () => {
    renderWithProviders(<Navbar />);
    
    // Click on About link - use getAllByRole to get all links and find the About one
    const navLinks = screen.getAllByRole('link');
    const aboutLink = navLinks.find(link => /About/i.test(link.textContent));
    fireEvent.click(aboutLink);
    
    // Click on Projects link
    const projectsLink = navLinks.find(link => /Projects/i.test(link.textContent));
    fireEvent.click(projectsLink);
  });

  test('handles scroll event', () => {
    // Mock scrollY
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    
    renderWithProviders(<Navbar />);
    
    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));
    
    // Change scrollY and trigger again
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    window.dispatchEvent(new Event('scroll'));
  });
});