import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import App from '../App';

// Mock the components used in App
jest.mock('../components/Navbar', () => () => <div data-testid="navbar-mock">Navbar Mock</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer-mock">Footer Mock</div>);
jest.mock('../pages/Home', () => () => <div data-testid="home-mock">Home Mock</div>);
jest.mock('../pages/About', () => () => <div data-testid="about-mock">About Mock</div>);
jest.mock('../pages/Projects', () => () => <div data-testid="projects-mock">Projects Mock</div>);
jest.mock('../pages/Contact', () => () => <div data-testid="contact-mock">Contact Mock</div>);

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders navbar and footer', () => {
    renderWithProviders(<App />);
    
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    renderWithProviders(<App />);
    
    expect(screen.getByTestId('home-mock')).toBeInTheDocument();
  });

  test('applies dark mode class when dark mode is active', () => {
    // Mock the useTheme hook to return darkMode as true
    jest.mock('../context/ThemeContext', () => ({
      ...jest.requireActual('../context/ThemeContext'),
      useTheme: () => ({ darkMode: true, toggleTheme: jest.fn() }),
    }));
    
    renderWithProviders(<App />);
    
    // Check if the dark class is applied
    const appContainer = screen.getByTestId('app-container');
    expect(appContainer).toHaveClass('dark');
  });
});