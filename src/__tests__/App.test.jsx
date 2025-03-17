import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the components used in App
jest.mock('../components/Navbar', () => () => <div data-testid="navbar-mock">Navbar Mock</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer-mock">Footer Mock</div>);
jest.mock('../pages/Home', () => () => <div data-testid="home-mock">Home Mock</div>);
jest.mock('../pages/About', () => () => <div data-testid="about-mock">About Mock</div>);
jest.mock('../pages/Projects', () => () => <div data-testid="projects-mock">Projects Mock</div>);
jest.mock('../pages/Contact', () => () => <div data-testid="contact-mock">Contact Mock</div>);

// Mock ThemeContext
jest.mock('../context/ThemeContext', () => ({
  ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>,
  useTheme: () => ({ darkMode: false, toggleTheme: jest.fn() }),
}));

describe('App Component', () => {
  test('renders navbar and footer', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('home-mock')).toBeInTheDocument();
  });

  test('renders about page when navigated to /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('about-mock')).toBeInTheDocument();
  });

  test('renders projects page when navigated to /projects', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('projects-mock')).toBeInTheDocument();
  });

  test('renders contact page when navigated to /contact', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('contact-mock')).toBeInTheDocument();
  });
});