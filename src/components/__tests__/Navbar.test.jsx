import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from '../Navbar';

// Mock window.scrollTo
global.scrollTo = jest.fn();

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
  });

  test('renders navbar with logo and navigation links', () => {
    renderWithProviders(<Navbar />);
    
    // Check if logo/brand name is rendered
    expect(screen.getByText(/Your Name/i)).toBeInTheDocument();
    
    // Check if navigation links are rendered
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  test('toggles mobile menu when menu button is clicked', () => {
    // Mock window.innerWidth to simulate mobile view
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    
    renderWithProviders(<Navbar />);
    
    // Mobile menu should be hidden initially
    expect(screen.queryByRole('list')).not.toBeVisible();
    
    // Click the menu button
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible after clicking
    expect(screen.getByRole('list')).toBeVisible();
    
    // Click again to hide
    fireEvent.click(menuButton);
    
    // Mobile menu should be hidden again
    expect(screen.queryByRole('list')).not.toBeVisible();
  });

  test('scrolls to top when logo is clicked', () => {
    renderWithProviders(<Navbar />);
    
    const logo = screen.getByText(/Your Name/i);
    fireEvent.click(logo);
    
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});